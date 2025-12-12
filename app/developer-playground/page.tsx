import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DeveloperPlayground from "@/components/semq/DeveloperPlayground";

export default function DeveloperPlaygroundPage() {
  return (
    <main className="min-h-screen bg-white text-[#365aa6]">
      <Navbar />
      <div className="pt-24">
        <DeveloperPlayground />
      </div>
      <Footer />
    </main>
  );
}
