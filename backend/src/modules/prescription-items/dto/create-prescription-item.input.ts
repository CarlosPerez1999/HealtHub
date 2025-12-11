import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsString, IsInt, Min } from 'class-validator';

@InputType()
export class CreatePrescriptionItemInput {
  @Field()
  @IsUUID()
  prescriptionId: string;

  @Field()
  @IsUUID()
  medicationId: string;

  @Field()
  @IsString()
  dose: string;

  @Field()
  @IsString()
  frequency: string;

  @Field()
  @IsString()
  duration: string;

  @Field()
  @IsString()
  route: string;

  @Field({ nullable: true })
  @IsString()
  instructions?: string;
}
