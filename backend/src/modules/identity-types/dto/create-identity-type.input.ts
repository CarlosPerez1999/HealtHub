import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateIdentityTypeInput {
  @Field()
  @IsString()
  @Length(1, 32)
  code: string;

  @Field()
  @IsString()
  @Length(1, 255)
  description: string;

  @Field({ nullable: true })
  @IsString()
  @Length(0, 255)
  value?: string;
}
