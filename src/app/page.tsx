import GameGrid from "@/components/GameGrid";
import CategoryGrid from "@/components/CategoryGrid";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { NavItem } from "@/components/NavItem";

export default function Home() {
  return (
    <main>
      <NavItem/>
      <GameGrid />      
      <CategoryGrid />
      <AboutSection />
      <Footer />
    </main>
  );
}
