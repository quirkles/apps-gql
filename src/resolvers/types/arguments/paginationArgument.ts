import { Field, InputType, Int, ObjectType } from "type-graphql";

// @ArgsType()
@InputType("PaginationArgument")
export class PaginationArgument {
  @Field((type) => Int, { nullable: true, defaultValue: 10 })
  first?: number;

  @Field((type) => String, { nullable: true })
  after?: string;
}
