import { Field, InputType } from "@nestjs/graphql";
import { RoleEnum } from "src/modules/roles/enums/roles.enum";
import { IsEnum, IsString, Length } from 'class-validator'

@InputType()
export class CreateRoleInput {
  @Field(() => RoleEnum)
  @IsEnum(RoleEnum)
  code: RoleEnum;

  @Field()
  @IsString()
  @Length(3, 50)
  description: string;
}
