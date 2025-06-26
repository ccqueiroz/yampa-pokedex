import "../../config/i18n/i18n.config";

type MainProviderProps = {
  children: React.ReactNode;
};
export const MainProvider = ({ children }: MainProviderProps) => {
  return <>{children}</>;
};
