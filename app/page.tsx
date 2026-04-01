import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import BundleFlow from "@/components/BundleFlow";
import BuyBack from "@/components/BuyBack";
import SellToUs from "@/components/SellToUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <BundleFlow />
      <BuyBack />
      <SellToUs />
      <Contact />
      <Footer />
    </main>
  );
}
