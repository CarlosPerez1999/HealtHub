import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length, IsOptional } from 'class-validator';

@InputType()
export class CreateVisibilityLevelInput {
  @Field()
  @IsString()
  @Length(1, 64)
  code: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;
}
