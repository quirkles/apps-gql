import { Field, ObjectType } from "type-graphql";
import { Nationality } from "./nationality";

@ObjectType("Employment", {})
export class Employment {
  @Field(() => String)
  occupation!: string;

  @Field(() => String)
  status!: string;
}

@ObjectType("Traveller", {})
export class Traveller {
  @Field(() => String)
  emailAddress!: string;

  @Field(() => String)
  displayName!: string;

  @Field(() => String)
  fullName!: string;

  @Field(() => Employment)
  employment!: Employment;

  @Field(() => Nationality)
  nationality!: Nationality;
}
