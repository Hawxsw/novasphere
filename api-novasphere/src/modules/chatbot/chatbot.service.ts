import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsAppService } from '../whatsapp/whatsapp.service';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';

@Injectable()
export class ChatbotService {
  constructor(
    private prisma: PrismaService,
    private whatsappService: WhatsAppService,
  ) {}

  async createFlow(data: CreateFlowDto) {
    return this.prisma.chatbotFlow.create({
      data,
      include: {
        creator: {
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

  async findAllFlows() {
    return this.prisma.chatbotFlow.findMany({
      include: {
        creator: {
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

  async findFlowById(id: string) {
    const flow = await this.prisma.chatbotFlow.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!flow) {
      throw new NotFoundException(`Chatbot flow with ID ${id} not found`);
    }

    return flow;
  }

  async updateFlow(id: string, data: UpdateFlowDto) {
    return this.prisma.chatbotFlow.update({
      where: { id },
      data,
      include: {
        creator: {
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

  async removeFlow(id: string) {
    return this.prisma.chatbotFlow.delete({
      where: { id },
    });
  }

  async processMessage(phoneNumber: string, message: string) {
    // Implementar lógica de processamento de mensagens
    // 1. Identificar sessão ativa
    // 2. Buscar estado atual do fluxo
    // 3. Processar resposta baseada no fluxo
    // 4. Enviar resposta via WhatsApp
    throw new Error('Method not implemented');
  }

  async executeFlow(flowId: string, sessionId: string, input: string) {
    // Implementar lógica de execução do fluxo
    // 1. Carregar fluxo
    // 2. Identificar nó atual
    // 3. Processar input
    // 4. Determinar próximo nó
    // 5. Retornar resposta
    throw new Error('Method not implemented');
  }
} 