import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/factories/pagination.factory';
import { CountryObject } from './country.model';

@ObjectType()
export class PaginatedCountries extends Paginated(CountryObject) {}
