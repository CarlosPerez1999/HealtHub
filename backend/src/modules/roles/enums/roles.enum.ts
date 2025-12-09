import { registerEnumType } from '@nestjs/graphql';

export enum RoleEnum {
  'ADMIN' = 'ADMIN',
  'DOCTOR' = 'DOCTOR',
  'RECEPTIONIST' = 'RECEPTIONIST',
  'PATIENT' = 'PATIENT',
}

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
  description: 'Available system roles',
});