import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageType } from '@prisma/client';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ enum: MessageType, default: MessageType.TEXT })
  @IsEnum(MessageType)
  type: MessageType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  receiverId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  groupId?: string;
} 