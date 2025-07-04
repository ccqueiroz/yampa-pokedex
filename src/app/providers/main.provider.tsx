import { cn } from "@/lib/utils";
import "../../config/i18n/i18n.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";

const ModalPokemon = lazy(() =>
  import("./modalPokemon/modalPokemon.provider").then((module) => ({
    default: module.default,
  }))
);

type MainProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={cn(
          "min-h-screen min-w-[100vw] bg-slate-500/10 overflow-hidden"
        )}
      >
        {children}
      </main>
      <ModalPokemon />
    </QueryClientProvider>
  );
};
