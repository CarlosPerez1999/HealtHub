import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionItem } from './entities/prescription-item.entity';
import { PrescriptionItemsService } from './prescription-items.service';
import { PrescriptionItemsResolver } from './prescription-items.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionItem])],
  providers: [PrescriptionItemsService, PrescriptionItemsResolver],
  exports: [PrescriptionItemsService],
})
export class PrescriptionItemsModule {}
