import { PokeImage } from "@/app/components/pokeImage/pokeImage.component";
import { cn } from "@/lib/utils";

export const PokeImageCard = ({
  loading,
  urlImage,
}: {
  loading: boolean;
  urlImage: string;
}) => {
  return (
    <PokeImage
      urlImage={urlImage}
      className={cn(
        "w-[120px] h-[120px] max-w-[120px] max-h-[120px]",
        loading && "brightness-0 contrast-0"
      )}
    />
  );
};
