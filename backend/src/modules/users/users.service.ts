import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginatedUsers } from './models/paginated-users.object';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { handleServiceError } from 'src/common/utils/error-handler';
import { Role } from 'src/modules/roles/entities/role.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const { password, roleCode, ...userRes } = createUserInput;
      const exist = await this.usersRepository.findOneBy({
        email: createUserInput.email.toLowerCase(),
      });
      if (exist) throw new ConflictException('Email already in use');

      const hashed = password ? await bcrypt.hash(password, 10) : undefined;

      const createData: Partial<User> = {
        ...userRes,
        ...(hashed ? { passwordHash: hashed } : {}),
      };

      if (roleCode !== undefined && roleCode !== null) {
        if (typeof roleCode !== 'string' || roleCode.trim() === '') {
          throw new BadRequestException('roleCode must be a non-empty string');
        }
        createData.role = { code: roleCode } as Role;
      }

      const user = this.usersRepository.create(createData);
      const saved = await this.usersRepository.save(user);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedUsers> {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;

    const [items, total] = await this.usersRepository.findAndCount({
      take,
      skip,
      relations: ['role'],
    });

    return {
      items,
      total,
      take,
      skip,
    } as PaginatedUsers;
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['role'],
      });
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      return user;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(updateUserInput: UpdateUserInput) {
    try {
      const { password, roleCode, ...userRes } = updateUserInput;

      const hashed = password ? await bcrypt.hash(password, 10) : undefined;

      const preloadData: Partial<User> = {
        ...userRes,
        ...(hashed ? { passwordHash: hashed } : {}),
      };

      if (roleCode !== undefined && roleCode !== null) {
        if (typeof roleCode !== 'string' || roleCode.trim() === '') {
          throw new BadRequestException('roleCode must be a non-empty string');
        }
        preloadData.role = { code: roleCode } as Role;
      }

      const user = await this.usersRepository.preload(preloadData);
      if (!user) throw new NotFoundException('User not found');

      const saved = await this.usersRepository.save(user);
      return await this.findOne(saved.id);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      await this.usersRepository.softDelete(id);
      return user;
    } catch (error) {
      handleServiceError(error, this.logger, {
        warnMessage: `Remove attempted on non-existing user: ${id}`,
      });
    }
  }
}
