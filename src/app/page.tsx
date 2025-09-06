import Header from "@/sections/header";
import HeroSection from "@/sections/hero-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className=" mx-auto container border-x border-gray-15">
        <HeroSection />
      </main>
    </>
  );
}
