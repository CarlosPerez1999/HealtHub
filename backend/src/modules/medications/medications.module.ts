import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationsService } from './medications.service';
import { MedicationsResolver } from './medications.resolver';
import { Medication } from './entities/medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  providers: [MedicationsService, MedicationsResolver],
  exports: [MedicationsService],
})
export class MedicationsModule {}
