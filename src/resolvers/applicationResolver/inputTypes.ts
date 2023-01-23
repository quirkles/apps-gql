import { Field, InputType, registerEnumType } from "type-graphql";

@InputType()
export class ApplicationWhereClause {
  @Field({ nullable: true })
  programId!: string;
}

export const ApplicationOrderByField = {
  createdAt: "createdAt",
  arrivalDate: "arrivalDate",
} as const;

export type ApplicationOrderByField =
  (typeof ApplicationOrderByField)[keyof typeof ApplicationOrderByField];

registerEnumType(ApplicationOrderByField, {
  name: "ApplicationOrderByField", // this one is mandatory
});

export const ApplicationOrderByDirection = {
  apiSchema: "asc",
  desc: "desc",
} as const;

export type ApplicationOrderByDirection =
  (typeof ApplicationOrderByDirection)[keyof typeof ApplicationOrderByDirection];

registerEnumType(ApplicationOrderByDirection, {
  name: "ApplicationOrderByDirection", // this one is mandatory
});

@InputType()
export class ApplicationOrderByClause {
  @Field(() => ApplicationOrderByField, { nullable: true })
  orderBy!: ApplicationOrderByField;

  @Field(() => ApplicationOrderByDirection, { nullable: true })
  orderDirection!: ApplicationOrderByDirection;
}
