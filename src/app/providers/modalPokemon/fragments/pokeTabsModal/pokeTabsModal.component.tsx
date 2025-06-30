import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { TabContentStatus } from "./fragments/TabContentStatus/tabContentStatus.component";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { TabContentDetails } from "./fragments/TabContentDetails/tabContentDetails.component";

export const PokeTabsModal = () => {
  const { translation } = useI18n();
  return (
    <div className="w-full mt-8">
      <Tabs defaultValue="status" className="mx-auto">
        <TabsList className="w-full flex">
          <TabsTrigger className="grow h-11 rounded-[16px]" value="status">
            {translation("tabs_modal.status.label")}
          </TabsTrigger>
          <TabsTrigger className="grow h-11 rounded-[16px]" value="details">
            {translation("tabs_modal.details.label")}
          </TabsTrigger>
        </TabsList>
        <div className="w-full mt-4 mb-3 px-2">
          <TabContentStatus />
          <TabContentDetails />
        </div>
      </Tabs>
    </div>
  );
};
