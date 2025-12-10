import { Field, ID, InputType, PartialType, GraphQLISODateTime } from '@nestjs/graphql';
import { CreateMedicalHistoryInput } from './create-medical-history.input';
import { IsUUID, IsOptional } from 'class-validator';

@InputType()
export class UpdateMedicalHistoryInput extends PartialType(CreateMedicalHistoryInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  occurredAt?: string;
}
