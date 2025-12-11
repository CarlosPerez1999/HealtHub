import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRegulatoryClassInput } from './create-regulatory-class.input';

@InputType()
export class UpdateRegulatoryClassInput extends PartialType(CreateRegulatoryClassInput) {}
