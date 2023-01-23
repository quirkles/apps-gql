import { inject, injectable } from "inversify";
import { Logger } from "winston";

import { Application } from "../../models";
import { PaginationArgument } from "../../../resolvers/types/arguments";
import {
  ApplicationOrderByClause,
  ApplicationWhereClause,
} from "../../../resolvers";
import { Firestore } from "@google-cloud/firestore";

export type IApplicationRepository = {
  find(findParams: {
    pagination: PaginationArgument;
    where: ApplicationWhereClause;
    order: ApplicationOrderByClause;
  }): Promise<Application[]>;
};

@injectable()
export class ApplicationRepository implements IApplicationRepository {
  @inject("logger")
  logger!: Logger;

  @inject("storageInstance")
  firestore!: Firestore;

  async find(findParams: {
    pagination: PaginationArgument;
    where: ApplicationWhereClause;
    order: ApplicationOrderByClause;
  }): Promise<Application[]> {
    const {
      pagination = {} as PaginationArgument,
      where = {} as ApplicationWhereClause,
      order = {} as ApplicationOrderByClause,
    } = findParams;
    const { programId } = where;
    const { after, first = 10 } = pagination;

    const collectionRef = this.firestore.collection("applications");

    let query = collectionRef.limit(first).orderBy("createdAt", "desc");

    if (programId) {
      query = query.where("programId", "==", programId);
    }
    return query
      .get()
      .then((result) =>
        result.docs.map((doc) => doc.data())
      ) as unknown as Application[];
  }
}
