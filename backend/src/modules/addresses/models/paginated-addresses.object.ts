import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { AddressObject } from './address.model';

@ObjectType()
export class PaginatedAddresses extends Paginated(AddressObject) {}
