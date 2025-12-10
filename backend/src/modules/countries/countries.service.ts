import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { PaginatedCountries } from './models/paginated-countries.object';
import { handleServiceError } from 'src/common/utils/error-handler';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(input: CreateCountryInput): Promise<Country> {
    try {
      const country = this.countryRepository.create(input);
      return await this.countryRepository.save(country);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedCountries> {
    try {
      const take = pagination?.take ?? 10;
      const skip = pagination?.skip ?? 0;
      const [items, total] = await this.countryRepository.findAndCount({ take, skip });
      return { items, total, take, skip } as PaginatedCountries;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(code: string): Promise<Country> {
    try {
      const country = await this.countryRepository.findOne({ where: { code } });
      if (!country) throw new NotFoundException(`Country with code ${code} not found`);
      return country;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(input: UpdateCountryInput): Promise<Country> {
    try {
      const country = await this.countryRepository.preload(input);
      if (!country) throw new NotFoundException(`Country with code ${input.code} not found`);
      return await this.countryRepository.save(country);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string): Promise<Country> {
    try {
      const country = await this.findOne(code);
      await this.countryRepository.remove(country);
      return country;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
