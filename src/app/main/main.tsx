import { Header } from "@/app/components/header/header.component";

export const Main = () => {
  return (
    <section className="min-w-screen xl:h-screen hsm:h-full relative min-h-screen overflow-hidden">
      <div className="container max-auto px-4 relative z-10">
        <Header />
      </div>
    </section>
  );
};
