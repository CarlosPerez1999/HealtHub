import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsString()
  @Length(1, 64)
  code: string;

  @Field()
  @IsString()
  @Length(3, 255)
  description: string;
}
