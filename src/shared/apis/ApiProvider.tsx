import { createContext, ReactNode } from "react";
import { fetchCatFact } from "./fetchCatFact";
import { Api } from "./interface";
import { LocalStorageExpenseService } from "./LocalStorageExpenseService";

export const apiContext = createContext<Api>({} as Api);

apiContext.displayName = "ApiProvider";

export interface IApiProvider {
  api?: Partial<Api>;
  children: ReactNode;
}

const expenseService = new LocalStorageExpenseService();

export const ApiProvider = (props: IApiProvider) => (
  <apiContext.Provider
    value={{ fetchCatFact, ...expenseService, ...props?.api }}
  >
    {props.children}
  </apiContext.Provider>
);
