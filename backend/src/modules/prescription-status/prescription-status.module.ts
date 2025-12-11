import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionStatus } from './entities/prescription-status.entity';
import { PrescriptionStatusService } from './prescription-status.service';
import { PrescriptionStatusResolver } from './prescription-status.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionStatus])],
  providers: [PrescriptionStatusService, PrescriptionStatusResolver],
  exports: [PrescriptionStatusService],
})
export class PrescriptionStatusModule {}
