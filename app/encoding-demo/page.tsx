import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EncodingDemo from "@/components/semq/EncodingDemo";

export default function EncodingDemoPage() {
  return (
    <main className="min-h-screen bg-white text-[#365aa6]">
      <Navbar />
      <div className="pt-24">
        <EncodingDemo />
      </div>
      <Footer />
    </main>
  );
}
