import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createPosition(data: CreatePositionDto) {
    return this.prisma.position.create({
      data,
    });
  }

  async findAllPositions() {
    return this.prisma.position.findMany({
      include: {
        users: {
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

  async findPositionById(id: string) {
    const position = await this.prisma.position.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }

    return position;
  }

  async createDepartment(data: CreateDepartmentDto) {
    return this.prisma.department.create({
      data,
    });
  }

  async findAllDepartments() {
    return this.prisma.department.findMany({
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
          },
        },
      },
    });
  }

  async findDepartmentById(id: string) {
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
          },
        },
      },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async assignUserToPosition(userId: string, positionId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { positionId },
      include: {
        position: true,
      },
    });
  }

  async assignUserToDepartment(userId: string, departmentId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { departmentId },
      include: {
        department: true,
      },
    });
  }

  async getUsersByPosition(positionId: string) {
    return this.prisma.user.findMany({
      where: { positionId },
      include: {
        position: true,
        department: true,
      },
    });
  }

  async getUsersByDepartment(departmentId: string) {
    return this.prisma.user.findMany({
      where: { departmentId },
      include: {
        position: true,
        department: true,
      },
    });
  }
} 