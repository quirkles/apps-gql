// Imports the Google Cloud client library
import { join } from "path";

import { Firestore } from "@google-cloud/firestore";
import { IAppConfig } from "../../config";

let firestore: Firestore;

export function createStorageInstance(appConfig: IAppConfig): Firestore {
  const keyFile = join(
    __dirname,
    `../../credentials/sherpa-app.${appConfig.env}.json`
  );
  if (firestore) {
    return firestore;
  }
  firestore = new Firestore({
    keyFilename: keyFile,
  });

  return firestore;
}
