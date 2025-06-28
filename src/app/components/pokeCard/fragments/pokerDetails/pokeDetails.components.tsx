import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import { useI18n } from "@/app/hooks/usei18n.hook";

export const PokeDetails = () => {
  const { translation } = useI18n();
  return (
    <div className="w-full flex items-center justify-around pb-2">
      <div>
        <Accordion type="single" collapsible className="w-full p-0">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-0">
              <Button variant="link" className="p-0 text-white">
                <span>{translation("actions.expand")}</span>
              </Button>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="w-full flex flex-col gap-0">
                <div>
                  <span>HP</span>
                  <span>45</span>
                </div>
                <div className="w-full flex justify-between">
                  <span>Attack</span>
                  <span>45</span>
                </div>
                <div className="w-full flex justify-between">
                  <span>Defense</span>
                  <span>45</span>
                </div>
                <div className="w-full flex justify-between">
                  <span>Sp. Atk</span>
                  <span>45</span>
                </div>
                <div className="w-full flex justify-between">
                  <span>Sp. Def</span>
                  <span>45</span>
                </div>
                <div className="w-full flex justify-between">
                  <span>Speed</span>
                  <span>45</span>
                </div>
                <div className="w-full flex justify-between text-white ">
                  <span>Total</span>
                  <span>45</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Button variant="link" className="text-white">
        {translation("actions.view_details")}
      </Button>
    </div>
  );
};
