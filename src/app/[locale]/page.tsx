import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";

export default async function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
      <AboutPage />
      <ContactPage />
      
    </main>
  );
}
