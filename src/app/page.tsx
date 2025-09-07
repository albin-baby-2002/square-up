import { ClientTestimonials } from "@/sections/client-testimonials";
import ContactUs from "@/sections/contact-us";
import Faq from "@/sections/faq";
import Footer from "@/sections/footer";
import Header from "@/sections/header";
import HeroSection from "@/sections/hero-section";
import OurServices from "@/sections/our-services";
import TrustedBy from "@/sections/trusted-by";
import WhyChooseUs from "@/sections/why-choose-us";

export default function Home() {
  return (
    <>
      <Header />
      <main className="border-gray-15 container mx-auto md:border-x">
        <HeroSection />
        <div className=" bg-background ">
          <div className="border-gray-15 mx-4 2xl:mx-0 border-x 2xl:border-x-0">
            <TrustedBy />
            <OurServices />
            <WhyChooseUs />
            <ClientTestimonials />
            <Faq />
            <ContactUs />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
