import { Application } from "../../datalayer";

export function getDocumentFromCursor(cursor: string): Promise<Application> {
  // to do
  return Promise.resolve({ id: cursor } as Application);
}
