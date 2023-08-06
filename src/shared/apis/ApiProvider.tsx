import { createContext, ReactNode } from "react";
import { Api } from ".";

export const apiContext = createContext<Api>({} as Api);

apiContext.displayName = "ApiProvider";

interface IApiProvider {
  api: Api;
  children: ReactNode;
}

export const ApiProvider = (props: IApiProvider) => (
  <apiContext.Provider value={props.api}>{props.children}</apiContext.Provider>
);
