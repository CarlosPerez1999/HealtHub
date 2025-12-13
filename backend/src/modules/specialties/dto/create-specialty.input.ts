import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateSpecialtyInput {
  @Field()
  @IsString()
  @Length(1, 32)
  code: string;

  @Field()
  @IsString()
  @Length(1, 100)
  name: string;
}
