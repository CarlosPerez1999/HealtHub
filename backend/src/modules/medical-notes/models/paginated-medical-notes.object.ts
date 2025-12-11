import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { MedicalNoteObject } from './medical-note.model';

@ObjectType()
export class PaginatedMedicalNotes extends Paginated(MedicalNoteObject) {}
