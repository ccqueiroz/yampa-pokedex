import { useI18n } from "@/app/hooks/usei18n.hook";
import loadingSvg from "@/assets/loading.svg";

export const Loading = () => {
  const { translation } = useI18n();
  return (
    <div
      role="alert"
      aria-busy="true"
      aria-live="assertive"
      className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0 z-30 bg-gradient-to-tr from-[#bab9b959] to-[#1a1919]"
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <picture>
          <img
            src={loadingSvg}
            className="max-w-[300px] mx-auto opacity-90"
            alt={translation("accessibility.loading_alt")}
            fetchPriority="high"
          />
        </picture>
        <span className="text-2xl text-primary -mt-8">
          {translation("actions.loading")}
        </span>
      </div>
    </div>
  );
};
