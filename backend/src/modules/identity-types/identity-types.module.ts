import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityTypesService } from './identity-types.service';
import { IdentityTypesResolver } from './identity-types.resolver';
import { IdentityType } from './entities/identity-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityType])],
  providers: [IdentityTypesService, IdentityTypesResolver],
  exports: [IdentityTypesService],
})
export class IdentityTypesModule {}
