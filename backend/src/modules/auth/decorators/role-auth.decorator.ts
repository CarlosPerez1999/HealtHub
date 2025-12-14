import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from 'src/modules/roles/entities/role.entity';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RoleGuard } from '../guards/role.guard';

export function RolesAuth(roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RoleGuard),
  );
}
