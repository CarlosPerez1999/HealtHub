import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryResolver } from './medical-history.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistory])],
  providers: [MedicalHistoryService, MedicalHistoryResolver],
  exports: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
