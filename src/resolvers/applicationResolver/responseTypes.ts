import { createUnionType, ObjectType } from "type-graphql";
import { Application } from "../../datalayer";
import { BadInputResponse, NotFoundResponse } from "../types";
import Connection from "../types/responses/paginatedItems";

export const ApplicationQueryUnion = createUnionType({
  name: "ApplicationQueryResult",
  types: () => [Application, BadInputResponse, NotFoundResponse] as const,
  // our implementation of detecting returned object type
  resolveType: (value: Application | BadInputResponse | NotFoundResponse) => {
    if ("id" in value) {
      return Application;
    }
    switch (value.__typename) {
      case "BadInputResponse":
        return BadInputResponse;
      case "NotFoundResponse":
        return NotFoundResponse;
    }
    return undefined;
  },
});

@ObjectType()
export class ApplicationConnection extends Connection(Application) {}
