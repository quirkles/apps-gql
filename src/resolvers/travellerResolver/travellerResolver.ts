import {
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { inject, injectable } from "inversify";

import {
  Application,
  ApplicationRepository,
  Nationality,
  Traveller,
} from "../../datalayer";
import { Logger } from "winston";
import { TravellerConnection } from "./responseTypes";

@Resolver(() => Application)
@injectable()
export class TravellerResolver implements ResolverInterface<Traveller> {
  @inject("ApplicationRepository")
  applicationRepository!: ApplicationRepository;

  @inject("logger")
  logger!: Logger;

  @Query(() => TravellerConnection)
  async travellers(): Promise<TravellerConnection> {
    this.logger.info(`travellers query hit`);
    // const userRepo = this.applicationRepository;
    try {
      return {
        items: [],
        total: 0,
        pageInfo: {
          hasNextPage: false,
        },
      };
    } catch (e) {
      // this.logger.warn("Error in applications query");
      return {
        items: [],
        total: 0,
        pageInfo: {
          hasNextPage: false,
        },
      };
    }
  }

  @FieldResolver(() => Nationality)
  async nationality(@Root() root: Traveller): Promise<Nationality> {
    return {
      alpha3ISOCode: "USA",
    };
  }
}
