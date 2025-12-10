import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesResolver } from './specialties.resolver';
import { Specialty } from './entities/specialty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  providers: [SpecialtiesService, SpecialtiesResolver],
  exports: [SpecialtiesService],
})
export class SpecialtiesModule {}
