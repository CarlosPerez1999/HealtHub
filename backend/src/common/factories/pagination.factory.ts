import { Field, Int, ObjectType } from '@nestjs/graphql';

export function Paginated<T>(classRef: new () => T) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items: T[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    take: number;

    @Field(() => Int)
    skip: number;
  }

  return PaginatedType;
}
