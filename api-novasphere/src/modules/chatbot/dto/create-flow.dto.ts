import { IsString, IsNotEmpty, IsObject, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFlowDto {
  @ApiProperty({ example: 'Fluxo de Atendimento Principal' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Fluxo inicial para triagem de atendimento' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: {
      nodes: [],
      edges: [],
      initial: 'node-1',
    },
  })
  @IsObject()
  @IsNotEmpty()
  flow: Record<string, any>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 