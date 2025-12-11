import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { PaginatedRoles } from './models/paginated-roles.object';
import { PaginationInput } from '../../common/dto/pagination.input';
import { handleServiceError } from '../../common/utils/error-handler';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    try {
      const exist = await this.rolesRepository.findOneBy({
        code: createRoleInput.code,
      });
      if (exist)
        throw new ConflictException(
          `A role with the code ${createRoleInput.code} already exists `,
        );
      const role = this.rolesRepository.create(createRoleInput);
      return await this.rolesRepository.save(role);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async findAll(pagination?: PaginationInput): Promise<PaginatedRoles> {
    const take = pagination?.take ?? 10;
    const skip = pagination?.skip ?? 0;

    const [items, total] = await this.rolesRepository.findAndCount({
      take,
      skip,
    });

    return {
      items,
      total,
      take,
      skip,
    };
  }

  async findOne(code: string) {
    try {
      const role = await this.rolesRepository.findOneBy({ code });
      if (!role) throw new NotFoundException(`Role with code ${code} not found`);
      return role;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async update(updateRoleInput: UpdateRoleInput) {
    try {
      const roleToUpdate = await this.rolesRepository.preload(updateRoleInput as Partial<Role>);

      if (!roleToUpdate) throw new NotFoundException(`Role not found`);
      return await this.rolesRepository.save(roleToUpdate);
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async remove(code: string) {
    try {
      const role = await this.findOne(code);
      await this.rolesRepository.softDelete({ code });
      return role;
    } catch (error) {
      handleServiceError(error, this.logger, {
        warnMessage: `Remove attempted on non-existing role: ${code}`,
      });
    }
  }
}
