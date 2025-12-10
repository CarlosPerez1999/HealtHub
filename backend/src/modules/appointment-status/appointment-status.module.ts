import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentStatusService } from './appointment-status.service';
import { AppointmentStatusResolver } from './appointment-status.resolver';
import { AppointmentStatus } from './entities/appointment-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentStatus])],
  providers: [AppointmentStatusService, AppointmentStatusResolver],
  exports: [AppointmentStatusService],
})
export class AppointmentStatusModule {}
