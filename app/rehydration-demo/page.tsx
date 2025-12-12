import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RehydrationPreview from "@/components/semq/RehydrationPreview";

export default function RehydrationDemoPage() {
  return (
    <main className="min-h-screen bg-white text-[#365aa6]">
      <Navbar />
      <div className="pt-24">
        <RehydrationPreview />
      </div>
      <Footer />
    </main>
  );
}
