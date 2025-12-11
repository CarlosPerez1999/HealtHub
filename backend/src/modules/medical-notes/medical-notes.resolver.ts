import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MedicalNotesService } from './medical-notes.service';
import { MedicalNoteObject } from './models/medical-note.model';
import { CreateMedicalNoteInput } from './dto/create-medical-note.input';
import { UpdateMedicalNoteInput } from './dto/update-medical-note.input';
import { PaginatedMedicalNotes } from './models/paginated-medical-notes.object';

@Resolver(() => MedicalNoteObject)
export class MedicalNotesResolver {
  constructor(private readonly service: MedicalNotesService) {}

  @Mutation(() => MedicalNoteObject)
  createMedicalNote(@Args('input') input: CreateMedicalNoteInput) {
    return this.service.create(input);
  }

  @Query(() => PaginatedMedicalNotes)
  async medicalNotes() {
    const items = await this.service.findAll();
    return { items, total: items.length };
  }

  @Query(() => MedicalNoteObject, { nullable: true })
  medicalNote(@Args('id') id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => MedicalNoteObject)
  updateMedicalNote(
    @Args('id') id: string,
    @Args('input') input: UpdateMedicalNoteInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  removeMedicalNote(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
