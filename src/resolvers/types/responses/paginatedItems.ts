import { ClassType, Field, Int, ObjectType } from "type-graphql";

// this follows the connection spec here: https://relay.dev/graphql/connections.htm#
// function Edge<TItem>(TItemClass: ClassType<TItem>) {
//   @ObjectType(`${TItemClass.name}Edge`, { isAbstract: true })
//   abstract class EdgeClass {
//     @Field((type) => TItemClass)
//     node!: TItem;
//
//     @Field((type) => String)
//     cursor!: string;
//   }
//   return EdgeClass;
// }

@ObjectType({ isAbstract: true })
abstract class PageInfo {
  @Field((type) => String)
  hasNextPage!: boolean;
}

export default function Connection<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType(`${TItemClass.name}Edge`, { isAbstract: true })
  abstract class EdgeClass {
    @Field((type) => TItemClass)
    node!: TItem;

    @Field((type) => String)
    cursor!: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field((type) => [EdgeClass])
    items!: EdgeClass[];

    @Field((type) => Int)
    total!: number;

    @Field(() => PageInfo)
    pageInfo!: PageInfo;
  }
  return PaginatedResponseClass;
}
