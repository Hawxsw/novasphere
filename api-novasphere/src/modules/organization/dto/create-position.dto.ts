import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePositionDto {
  @ApiProperty({ example: 'Gerente de Vendas' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Responsável pela equipe de vendas' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  level: number;
} 