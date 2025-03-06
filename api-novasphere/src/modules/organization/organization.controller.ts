import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('organization')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('positions')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Criar novo cargo' })
  createPosition(@Body() createPositionDto: CreatePositionDto) {
    return this.organizationService.createPosition(createPositionDto);
  }

  @Get('positions')
  @ApiOperation({ summary: 'Listar todos os cargos' })
  findAllPositions() {
    return this.organizationService.findAllPositions();
  }

  @Get('positions/:id')
  @ApiOperation({ summary: 'Buscar cargo por ID' })
  findPositionById(@Param('id') id: string) {
    return this.organizationService.findPositionById(id);
  }

  @Post('departments')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Criar novo departamento' })
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.organizationService.createDepartment(createDepartmentDto);
  }

  @Get('departments')
  @ApiOperation({ summary: 'Listar todos os departamentos' })
  findAllDepartments() {
    return this.organizationService.findAllDepartments();
  }

  @Get('departments/:id')
  @ApiOperation({ summary: 'Buscar departamento por ID' })
  findDepartmentById(@Param('id') id: string) {
    return this.organizationService.findDepartmentById(id);
  }

  @Put('users/:userId/position/:positionId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Atribuir cargo a usuário' })
  assignUserToPosition(
    @Param('userId') userId: string,
    @Param('positionId') positionId: string,
  ) {
    return this.organizationService.assignUserToPosition(userId, positionId);
  }

  @Put('users/:userId/department/:departmentId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Atribuir departamento a usuário' })
  assignUserToDepartment(
    @Param('userId') userId: string,
    @Param('departmentId') departmentId: string,
  ) {
    return this.organizationService.assignUserToDepartment(userId, departmentId);
  }
} 