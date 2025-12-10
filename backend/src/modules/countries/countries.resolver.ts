import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { CountryObject } from './models/country.model';
import { PaginatedCountries } from './models/paginated-countries.object';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => CountryObject)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Mutation(() => CountryObject)
  createCountry(@Args('input') input: CreateCountryInput) {
    return this.countriesService.create(input);
  }

  @Query(() => PaginatedCountries)
  countries(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination?: PaginationInput,
  ) {
    return this.countriesService.findAll(pagination);
  }

  @Query(() => CountryObject, { nullable: true })
  country(@Args('code') code: string) {
    return this.countriesService.findOne(code);
  }

  @Mutation(() => CountryObject)
  updateCountry(@Args('input') input: UpdateCountryInput) {
    return this.countriesService.update(input);
  }

  @Mutation(() => CountryObject)
  removeCountry(@Args('code') code: string) {
    return this.countriesService.remove(code);
  }
}
