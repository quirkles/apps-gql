export interface Config {
  IS_GCP: boolean;
  ENCRYPTION_SECRET: string;
  ENCRYPTION_SALT: string;
  PORT: number;
}

export const configBase: Pick<
  Config,
  "IS_GCP" | "ENCRYPTION_SECRET" | "ENCRYPTION_SALT"
> = {
  IS_GCP: process.env.IS_GCP === "1",
  ENCRYPTION_SECRET: "g1rzlhhTuYh1G9cgG63Yv",
  ENCRYPTION_SALT: "inside-mallet-laced-plastic",
} as const;
