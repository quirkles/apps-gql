import { Field, ID, ObjectType } from "type-graphql";
import { Traveller } from "./traveller";

@ObjectType("Application", {})
export class Application {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  orderNumber!: string;

  @Field(() => String)
  referenceNumber!: string;

  @Field(() => String)
  processingStatus!: string;

  @Field(() => Date)
  arrivalDate!: Date;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Traveller)
  traveller!: Traveller;
}
