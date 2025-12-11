import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhySemqSection from "./components/WhySemqSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhySemqSection />
      <Footer />
    </main>
  );
}
