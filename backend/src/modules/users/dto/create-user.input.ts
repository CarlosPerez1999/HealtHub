import { Field, InputType, ID } from '@nestjs/graphql';
import { IsEmail, IsString, Length, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(6, 128)
  password: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  roleId?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  active?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  emailVerified?: boolean;
}
