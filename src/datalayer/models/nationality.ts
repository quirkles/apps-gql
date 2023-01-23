import { Field, ObjectType } from "type-graphql";

@ObjectType("Nationality", {})
export class Nationality {
  @Field(() => String)
  alpha3ISOCode!: string;
}
