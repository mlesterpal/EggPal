import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
