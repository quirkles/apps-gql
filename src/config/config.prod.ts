import { Config, configBase } from "./config.base";

export const configProd: Config = {
  ...configBase,
  PORT: 4488,
};
