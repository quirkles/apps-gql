import { Container } from "inversify";
import { type IncomingMessage, ServerResponse } from "http";
import { Logger } from "winston";
import { v4 } from "uuid";

import { container, TYPES } from "../container";

export interface AppContextSessionUserObject {
  jwt: string;
}

export interface AppContext {
  sessionUser: AppContextSessionUserObject | null;
  container: Container;
  logger: Logger;
}

export function createContextFunction(logger: Logger) {
  return async function (contextArg: {
    req: IncomingMessage;
    res: ServerResponse & { req: { body: string } };
  }): Promise<AppContext> {
    const childLogger: Logger = logger.child({
      requestId: v4(),
    });
    // childLogger.info("Incoming request body", {
    //   body: contextArg.res.req.body,
    // });

    const childContainer = container.createChild();

    childContainer.bind<Logger>(TYPES.logger).toConstantValue(childLogger);

    return {
      logger: childLogger,
      container: childContainer,
      sessionUser: null,
    };
  };
}
