import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID, Length } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field()
  @IsString()
  @Length(1, 255)
  line1: string;

  @Field()
  @IsString()
  @Length(0, 255)
  line2: string;

  @Field()
  @IsString()
  @Length(1, 100)
  city: string;

  @Field()
  @IsString()
  @Length(1, 32)
  postalCode: string;

  @Field(() => ID)
  @IsUUID()
  stateId: string;

  @Field()
  @IsString()
  @Length(1, 8)
  countryCode: string;
}
