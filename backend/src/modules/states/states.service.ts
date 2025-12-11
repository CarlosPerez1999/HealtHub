import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateStateInput } from './dto/update-state.input';
import { PaginationInput } from '../../common/dto/pagination.input';
import { PaginatedStates } from './models/paginated-states.object';
import { handleServiceError } from '../../common/utils/error-handler';

@Injectable()
export class StatesService {
  private readonly logger = new Logger(StatesService.name);

  constructor(
    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,
  ) {}

  async create(input: CreateStateInput): Promise<State> {
    try {
      const state = this.statesRepository.create(input);
      return await this.statesRepository.save(state);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedStates> {
    try {
      const take = pagination?.take ?? 10;
      const skip = pagination?.skip ?? 0;
      const [items, total] = await this.statesRepository.findAndCount({ take, skip });
      return { items, total, take, skip } as PaginatedStates;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findOne(id: string): Promise<State> {
    try {
      const state = await this.statesRepository.findOne({ where: { id } });
      if (!state) throw new NotFoundException(`State with id ${id} not found`);
      return state;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(input: UpdateStateInput): Promise<State> {
    try {
      const state = await this.statesRepository.preload(input);
      if (!state) throw new NotFoundException(`State with id ${input.id} not found`);
      return await this.statesRepository.save(state);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string): Promise<State> {
    try {
      const state = await this.findOne(id);
      await this.statesRepository.remove(state);
      return state;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
