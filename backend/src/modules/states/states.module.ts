import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesService } from './states.service';
import { StatesResolver } from './states.resolver';
import { State } from './entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StatesService, StatesResolver],
  exports: [StatesService],
})
export class StatesModule {}
