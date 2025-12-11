import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegulatoryClassesService } from './regulatory-classes.service';
import { RegulatoryClassesResolver } from './regulatory-classes.resolver';
import { RegulatoryClass } from './entities/regulatory-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegulatoryClass])],
  providers: [RegulatoryClassesService, RegulatoryClassesResolver],
  exports: [RegulatoryClassesService],
})
export class RegulatoryClassesModule {}
