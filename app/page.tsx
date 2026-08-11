import Navbar from "@/components/home/Navbar";
import HeroBento from "@/components/home/HeroBento";
import BentoShowcase from "@/components/home/BentoShowcase";
import BentoFeatures from "@/components/home/BentoFeatures";
import SocialProof from "@/components/home/SocialProof";
import PricingBento from "@/components/home/PricingBento";
import ClosingCTA from "@/components/home/ClosingCTA";
import Portfolio from "@/components/home/Portfolio";
import FAQ from "@/components/home/Faq";
import Footer from "@/components/home/Footer";
import FloatingWhatsapp from "@/components/home/FloatingWhatsapp";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] overflow-x-hidden">
      <Navbar />
      <HeroBento />
      <BentoShowcase />
      <BentoFeatures />
      <SocialProof />
      <Portfolio />
      <PricingBento />
      <ClosingCTA />
      <FAQ />
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
