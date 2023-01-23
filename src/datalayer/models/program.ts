import { Field, ObjectType } from "type-graphql";

@ObjectType("Program", {})
export class Program {
  @Field(() => String)
  programCode!: string;
}
