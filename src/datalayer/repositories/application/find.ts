import { PaginationArgument } from "../../../resolvers/types/arguments";
import {
  ApplicationOrderByClause,
  ApplicationOrderByDirection,
  ApplicationOrderByField,
  ApplicationWhereClause,
} from "../../../resolvers";
import { Application } from "../../models";
import { CollectionReference } from "@google-cloud/firestore";
import { getDocumentFromCursor } from "../../../resolvers/applicationResolver/cursorUtils";

export async function findWithQuery(
  findParams: {
    pagination: PaginationArgument;
    where: ApplicationWhereClause;
    order: ApplicationOrderByClause;
  },
  collectionRef: CollectionReference<Application>
): Promise<Application[]> {
  const {
    pagination = {} as PaginationArgument,
    where = {} as ApplicationWhereClause,
    order = {} as ApplicationOrderByClause,
  } = findParams;

  const { programId } = where;
  const { after, first = 10 } = pagination;
  const {
    orderBy = ApplicationOrderByField.createdAt,
    orderDirection = ApplicationOrderByDirection.desc,
  } = order;

  const query = collectionRef.limit(first).orderBy(orderBy, orderDirection);

  if (after) {
    const afterDocument = await getDocumentFromCursor(after);
    query.startAfter(afterDocument);
  }
  return Promise.resolve([]);
}

export async function findByStreaming(
  findParams: {
    pagination: PaginationArgument;
    where: ApplicationWhereClause;
    order: ApplicationOrderByClause;
  },
  collectionRef: CollectionReference
): Promise<Application[]> {
  const {
    pagination = {} as PaginationArgument,
    where = {} as ApplicationWhereClause,
    order = {} as ApplicationOrderByClause,
  } = findParams;

  const { programId } = where;
  const { after, first = 10 } = pagination;
  const {
    orderBy = ApplicationOrderByField.createdAt,
    orderDirection = ApplicationOrderByDirection.desc,
  } = order;

  const query = collectionRef.limit(first).orderBy(orderBy, orderDirection);

  if (after) {
    const afterDocument = await getDocumentFromCursor(after);
    query.startAfter(afterDocument);
  }
  return Promise.resolve([]);
}
