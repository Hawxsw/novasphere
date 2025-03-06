import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionStatus } from '@prisma/client';

@Injectable()
export class WhatsAppService {
  constructor(private prisma: PrismaService) {}

  async createSession(data: CreateSessionDto) {
    return this.prisma.whatsAppSession.create({
      data: {
        ...data,
        status: SessionStatus.PENDING,
      },
    });
  }

  async findAllSessions() {
    return this.prisma.whatsAppSession.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findSessionById(id: string) {
    const session = await this.prisma.whatsAppSession.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException(`WhatsApp session with ID ${id} not found`);
    }

    return session;
  }

  async updateSession(id: string, data: UpdateSessionDto) {
    return this.prisma.whatsAppSession.update({
      where: { id },
      data,
    });
  }

  async removeSession(id: string) {
    return this.prisma.whatsAppSession.delete({
      where: { id },
    });
  }

  // Métodos para integração com a API do WhatsApp
  async sendMessage(to: string, message: string) {
    // Implementar integração com API do WhatsApp
    throw new Error('Method not implemented');
  }

  async receiveMessage(from: string, message: string) {
    // Implementar lógica de recebimento de mensagens
    throw new Error('Method not implemented');
  }
} 