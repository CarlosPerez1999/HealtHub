import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisibilityLevelsService } from './visibility-levels.service';
import { VisibilityLevelsResolver } from './visibility-levels.resolver';
import { VisibilityLevel } from './entities/visibility-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisibilityLevel])],
  providers: [VisibilityLevelsService, VisibilityLevelsResolver],
  exports: [VisibilityLevelsService],
})
export class VisibilityLevelsModule {}
