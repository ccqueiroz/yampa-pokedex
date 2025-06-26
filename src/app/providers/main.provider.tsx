import { cn } from "@/lib/utils";
import "../../config/i18n/i18n.config";

type MainProviderProps = {
  children: React.ReactNode;
};
export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <main className={cn("min-h-screen min-w-[100vw] bg-background")}>
      {children}
    </main>
  );
};
