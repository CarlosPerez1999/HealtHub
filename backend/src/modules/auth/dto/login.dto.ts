import { InputType, PickType } from "@nestjs/graphql";
import { CreateUserInput } from "src/modules/users/dto/create-user.input";

@InputType()
export class LoginDto extends PickType(CreateUserInput, [
  'username',
  'password'
]as const) {}