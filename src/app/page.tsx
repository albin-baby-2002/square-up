import Header from "@/sections/header";
import HeroSection from "@/sections/hero-section";
import TrustedBy from "@/sections/trusted-by";

export default function Home() {
  return (
    <>
      <Header />
      <main className=" mx-auto container border-x border-gray-15">
        <HeroSection />
        <TrustedBy/>
        <div className=" h-[800px] w-full"></div>
      </main>
    </>
  );
}
