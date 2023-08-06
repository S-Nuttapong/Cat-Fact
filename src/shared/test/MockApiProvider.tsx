import { ThemeProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ApiProvider, IApiProvider } from "../apis";

export const MockApiProvider: React.FC<IApiProvider> = ({ api, children }) => {
  return (
    <ApiProvider api={api}>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </ApiProvider>
  );
};
