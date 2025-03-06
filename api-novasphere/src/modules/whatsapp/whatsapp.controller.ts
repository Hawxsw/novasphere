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
import { WhatsAppService } from './whatsapp.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('whatsapp')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('sessions')
  @ApiOperation({ summary: 'Criar nova sessão do WhatsApp' })
  createSession(@Body() createSessionDto: CreateSessionDto) {
    return this.whatsappService.createSession(createSessionDto);
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Listar todas as sessões do WhatsApp' })
  findAllSessions() {
    return this.whatsappService.findAllSessions();
  }

  @Get('sessions/:id')
  @ApiOperation({ summary: 'Buscar sessão do WhatsApp por ID' })
  findSessionById(@Param('id') id: string) {
    return this.whatsappService.findSessionById(id);
  }

  @Put('sessions/:id')
  @ApiOperation({ summary: 'Atualizar sessão do WhatsApp' })
  updateSession(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.whatsappService.updateSession(id, updateSessionDto);
  }

  @Delete('sessions/:id')
  @ApiOperation({ summary: 'Remover sessão do WhatsApp' })
  removeSession(@Param('id') id: string) {
    return this.whatsappService.removeSession(id);
  }

  @Post('send')
  @ApiOperation({ summary: 'Enviar mensagem via WhatsApp' })
  async sendMessage(
    @Body() data: { to: string; message: string },
  ) {
    return this.whatsappService.sendMessage(data.to, data.message);
  }
} 