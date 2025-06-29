import { Button } from "@/app/components/ui/button";
import { useI18n } from "@/app/hooks/usei18n.hook";

export const PokeDetails = () => {
  const { translation } = useI18n();
  return (
    <div className="w-full flex items-center justify-around pb-2">
      <Button variant="link" className="text-white">
        {translation("actions.view_details")}
      </Button>
    </div>
  );
};
