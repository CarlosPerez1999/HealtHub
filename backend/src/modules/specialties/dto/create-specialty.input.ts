import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreateSpecialtyInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 32)
  code?: string;

  @Field()
  @IsString()
  @Length(1, 100)
  name: string;
}
