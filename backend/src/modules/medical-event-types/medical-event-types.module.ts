import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalEventType } from './entities/medical-event-type.entity';
import { MedicalEventTypesService } from './medical-event-types.service';
import { MedicalEventTypesResolver } from './medical-event-types.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalEventType])],
  providers: [MedicalEventTypesService, MedicalEventTypesResolver],
  exports: [MedicalEventTypesService],
})
export class MedicalEventTypesModule {}
