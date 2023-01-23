import { Firestore } from "@google-cloud/firestore";

import { Container } from "inversify";

import { TYPES } from "./types";
import { ApplicationResolver } from "../resolvers";
import { appConfig, IAppConfig } from "../config";
import {
  ApplicationRepository,
  IApplicationRepository,
  createStorageInstance,
} from "../datalayer";

const container = new Container({ skipBaseClassChecks: true });

// Constants
// const sharedCryptoService = new CryptoService(appConfig); // we use a shared instance, so we can generate an iv each time
// container
//   .bind<ICryptoService>(TYPES.cryptoService)
//   .toConstantValue(sharedCryptoService);
//
const sharedStorageInstance = createStorageInstance(appConfig);
container
  .bind<Firestore>(TYPES.storageInstance)
  .toConstantValue(sharedStorageInstance);
//
container.bind<IAppConfig>(TYPES.appConfig).toConstantValue(appConfig);

// Resolvers
container
  .bind<ApplicationResolver>(ApplicationResolver)
  .to(ApplicationResolver)
  .inSingletonScope();

// Repositories
container
  .bind<IApplicationRepository>(TYPES.ApplicationRepository)
  .to(ApplicationRepository);

export { container, TYPES };
