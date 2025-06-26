import { Header } from "@/app/components/header/header.component";

export const Main = () => {
  return (
    <section className="xl:h-screen hsm:h-full relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="container max-auto px-4 relative z-10">
        <Header />
      </div>
    </section>
  );
};
