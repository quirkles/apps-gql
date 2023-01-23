import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { inject, injectable } from "inversify";

import { Application, ApplicationRepository, Traveller } from "../../datalayer";
import { Logger } from "winston";
import { ApplicationConnection } from "./responseTypes";
import { ApplicationOrderByClause, ApplicationWhereClause } from "./inputTypes";
import { PaginationArgument } from "../types/arguments";

@Resolver(() => Application)
@injectable()
export class ApplicationResolver implements ResolverInterface<Application> {
  @inject("ApplicationRepository")
  applicationRepository!: ApplicationRepository;

  @inject("logger")
  logger!: Logger;

  @Query(() => ApplicationConnection)
  async applications(
    @Arg("pagination", { nullable: true, defaultValue: {} })
    pagination: PaginationArgument,
    @Arg("where", { nullable: true, defaultValue: {} })
    where: ApplicationWhereClause,
    @Arg("order", { nullable: true, defaultValue: {} })
    order: ApplicationOrderByClause
  ): Promise<ApplicationConnection> {
    this.logger.info("pagination", { pagination });
    this.logger.info("where", { where });
    try {
      const applications: Application[] = await this.applicationRepository.find(
        {
          pagination,
          where,
          order
        }
      );
      console.log("applications", applications);
      return {
        items: applications.map((app) => {
          return {
            node: app,
            cursor: app.id,
          };
        }),
        total: 0,
        pageInfo: {
          hasNextPage: false,
        },
      };
    } catch (e) {
      this.logger.warn(`Error in applications query: ${(e as Error).message}`);
      return {
        items: [],
        total: 0,
        pageInfo: {
          hasNextPage: false,
        },
      };
    }
  }

  @FieldResolver(() => Traveller)
  async traveller(@Root() root: Application): Promise<Traveller> {
    return {
      displayName: "test",
      emailAddress: "hardcoded",
      employment: {
        occupation: "",
        status: "",
      },
      fullName: `root: ${root.id}`,
      nationality: {
        alpha3ISOCode: "USA",
      },
    };
  }
}
