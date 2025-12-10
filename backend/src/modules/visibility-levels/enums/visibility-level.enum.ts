import { registerEnumType } from '@nestjs/graphql';

export enum VisibilityLevelEnum {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  INTERNAL = 'INTERNAL',
}

registerEnumType(VisibilityLevelEnum, {
  name: 'VisibilityLevelEnum',
  description: 'Available visibility levels',
});
