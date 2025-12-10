import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentTypesService } from './appointment-types.service';
import { AppointmentTypesResolver } from './appointment-types.resolver';
import { AppointmentType } from './entities/appointment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentType])],
  providers: [AppointmentTypesService, AppointmentTypesResolver],
  exports: [AppointmentTypesService],
})
export class AppointmentTypesModule {}
