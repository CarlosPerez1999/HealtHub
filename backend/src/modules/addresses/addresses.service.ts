import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { PaginatedAddresses } from './models/paginated-addresses.object';
import { handleServiceError } from 'src/common/utils/error-handler';
import { User } from 'src/modules/users/entities/user.entity';
import { State } from 'src/modules/states/entities/state.entity';
import { Country } from 'src/modules/countries/entities/country.entity';

@Injectable()
export class AddressesService {
  private readonly logger = new Logger(AddressesService.name);

  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {}

  async create(input: CreateAddressInput): Promise<Address> {
    try {
      const { userId, stateId, countryCode, line1, line2, city, postalCode } = input;
      if (!userId) throw new BadRequestException('userId is required');
      if (!stateId) throw new BadRequestException('stateId is required');
      if (!countryCode) throw new BadRequestException('countryCode is required');

      const createData: Partial<Address> = {
        line1,
        line2,
        city,
        postalCode,
        user: { id: userId } as User,
        state: { id: stateId } as State,
        country: { code: countryCode } as Country,
      };

      const address = this.addressesRepository.create(createData);
      const saved = await this.addressesRepository.save(address);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedAddresses> {
    try {
      const take = pagination?.take ?? 10;
      const skip = pagination?.skip ?? 0;
      const [items, total] = await this.addressesRepository.findAndCount({ take, skip, relations: ['user', 'state', 'country'] });
      return { items, total, take, skip } as PaginatedAddresses;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(id: string): Promise<Address> {
    try {
      const address = await this.addressesRepository.findOne({ where: { id }, relations: ['user', 'state', 'country'] });
      if (!address) throw new NotFoundException(`Address with id ${id} not found`);
      return address;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(input: UpdateAddressInput) {
    try {
      const { id, userId, stateId, countryCode, line1, line2, city, postalCode } = input;
      const preloadData: Partial<Address> = { id };

      if (line1 !== undefined) preloadData.line1 = line1;
      if (line2 !== undefined) preloadData.line2 = line2;
      if (city !== undefined) preloadData.city = city;
      if (postalCode !== undefined) preloadData.postalCode = postalCode;

      if (userId) preloadData.user = { id: userId } as User;
      if (stateId) preloadData.state = { id: stateId } as State;
      if (countryCode) preloadData.country = { code: countryCode } as Country;

      const address = await this.addressesRepository.preload(preloadData as Partial<Address>);
      if (!address) throw new NotFoundException('Address not found');
      const saved = await this.addressesRepository.save(address);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      const address = await this.findOne(id);
      await this.addressesRepository.softDelete(id);
      return address;
    } catch (error) {
      handleServiceError(error, this.logger, {
        warnMessage: `Remove attempted on non-existing address: ${id}`,
      });
    }
  }
}
