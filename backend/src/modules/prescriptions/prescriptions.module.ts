import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsResolver } from './prescriptions.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription])],
  providers: [PrescriptionsService, PrescriptionsResolver],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
