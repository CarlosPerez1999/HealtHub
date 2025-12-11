import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalNote } from './entities/medical-note.entity';
import { MedicalNotesService } from './medical-notes.service';
import { MedicalNotesResolver } from './medical-notes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalNote])],
  providers: [MedicalNotesService, MedicalNotesResolver],
  exports: [MedicalNotesService],
})
export class MedicalNotesModule {}
