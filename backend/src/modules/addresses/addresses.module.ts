import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesService } from './addresses.service';
import { AddressesResolver } from './addresses.resolver';
import { Address } from './entities/address.entity';
import { User } from '../users/entities/user.entity';
import { State } from '../states/entities/state.entity';
import { Country } from '../countries/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User, State, Country])],
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
