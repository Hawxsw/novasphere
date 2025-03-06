import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { MessengerGateway } from './messenger.gateway';

@Injectable()
export class MessengerService {
  constructor(
    private prisma: PrismaService,
    private messengerGateway: MessengerGateway,
  ) {}

  async createMessage(data: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data,
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        group: true,
      },
    });

    // Emitir evento de nova mensagem via WebSocket
    if (message.groupId) {
      this.messengerGateway.emitToGroup(message.groupId, 'newMessage', message);
    } else if (message.receiverId) {
      this.messengerGateway.emitToUser(message.receiverId, 'newMessage', message);
    }

    return message;
  }

  async findUserMessages(userId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        group: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createGroup(data: CreateGroupDto) {
    return this.prisma.group.create({
      data: {
        name: data.name,
        description: data.description,
        avatar: data.avatar,
        members: {
          create: data.memberIds.map(userId => ({
            userId,
            isAdmin: true,
          })),
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async findUserGroups(userId: string) {
    return this.prisma.group.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async markMessageAsRead(messageId: string, userId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }

    if (message.receiverId !== userId) {
      throw new Error('User is not the receiver of this message');
    }

    return this.prisma.message.update({
      where: { id: messageId },
      data: { read: true },
    });
  }
} 