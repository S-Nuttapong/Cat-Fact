import { ThemeProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  ApiProvider,
  LocalStorageExpenseService,
  fetchCatFact,
} from "./shared/apis";

import { theme } from "./theme";

const expenseDetailServices = new LocalStorageExpenseService();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={{ ...expenseDetailServices, fetchCatFact }}>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </ApiProvider>
  </React.StrictMode>
);
