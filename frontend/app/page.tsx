import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProduct from "@/components/FeaturedProduct";
import BestSellers from "@/components/BestSellers";
import ShowcaseSection from "@/components/ShowcaseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProduct />
        <BestSellers />
        <ShowcaseSection />
      </main>
      <Footer />
    </>
  );
}
