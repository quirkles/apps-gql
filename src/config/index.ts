import { Secrets } from "./secrets.base";
import { secretsLocal } from "./secrets.local";
import { secretsProd } from "./secrets.prod";

import { Config } from "./config.base";
import { configLocal } from "./config.local";
import { configSandbox } from "./config.sandbox";
import { configStaging } from "./config.staging";
import { configProd } from "./config.prod";
import { secretsSandbox } from "./secrets.sandbox";
import { secretsStaging } from "./secrets.staging";

type Env = "local" | "staging" | "sandbox" | "production";

export interface IAppConfig extends Secrets, Config {
  env: Env;
}

const DEFAULT_ENVIRONMENT = "local" as const;

let env: Env = DEFAULT_ENVIRONMENT;

switch (process.env.ENVIRONMENT as Env | string) {
  case "local":
    env = "local";
    break;
  case "staging":
    env = "staging";
    break;
  case "sandbox":
    env = "sandbox";
    break;
  case "production":
    env = "production";
    break;
  default:
    console.log(
      `Encountered unexpected ENVIRONMENT env var: ${process.env.ENVIRONMENT}, falling back to ${DEFAULT_ENVIRONMENT}`
    );
}

let config: Config;
let secrets: Secrets;

switch (env) {
  case "local":
    config = configLocal;
    secrets = secretsLocal;
    break;
  case "staging":
    config = configStaging;
    secrets = secretsStaging;
    break;
  case "sandbox":
    config = configSandbox;
    secrets = secretsSandbox;
    break;
  case "production":
    config = configProd;
    secrets = secretsProd;
    break;
}

export const appConfig: IAppConfig = {
  ...config,
  ...secrets,
  env,
};
