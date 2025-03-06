import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('chatbot')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('flows')
  @ApiOperation({ summary: 'Criar novo fluxo de chatbot' })
  createFlow(@Body() createFlowDto: CreateFlowDto) {
    return this.chatbotService.createFlow(createFlowDto);
  }

  @Get('flows')
  @ApiOperation({ summary: 'Listar todos os fluxos de chatbot' })
  findAllFlows() {
    return this.chatbotService.findAllFlows();
  }

  @Get('flows/:id')
  @ApiOperation({ summary: 'Buscar fluxo de chatbot por ID' })
  findFlowById(@Param('id') id: string) {
    return this.chatbotService.findFlowById(id);
  }

  @Put('flows/:id')
  @ApiOperation({ summary: 'Atualizar fluxo de chatbot' })
  updateFlow(
    @Param('id') id: string,
    @Body() updateFlowDto: UpdateFlowDto,
  ) {
    return this.chatbotService.updateFlow(id, updateFlowDto);
  }

  @Delete('flows/:id')
  @ApiOperation({ summary: 'Remover fluxo de chatbot' })
  removeFlow(@Param('id') id: string) {
    return this.chatbotService.removeFlow(id);
  }

  @Post('process')
  @ApiOperation({ summary: 'Processar mensagem recebida' })
  async processMessage(
    @Body() data: { phoneNumber: string; message: string },
  ) {
    return this.chatbotService.processMessage(data.phoneNumber, data.message);
  }
} 