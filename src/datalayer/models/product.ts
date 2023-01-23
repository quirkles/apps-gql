import { Field, ObjectType } from "type-graphql";

@ObjectType("Product", {})
export class Product {
  @Field(() => String)
  productCode!: string;
}
