import { ObjectType } from "type-graphql";
import { Traveller } from "../../datalayer";
import Connection from "../types/responses/paginatedItems";

@ObjectType()
export class TravellerConnection extends Connection(Traveller) {}
