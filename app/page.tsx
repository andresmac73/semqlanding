import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhySemqSection from "./components/WhySemqSection";
import { VectorTransform3D } from "@/components/visuals";
import {
  EncodingDemo,
  RehydrationPreview,
  DeveloperPlayground,
  ComparisonTable,
  NewDomainNarrative,
} from "@/components/semq";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhySemqSection />
      <section id="what-semq-does" className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">
            What SEMQ Does: A New Embedding Domain
          </h2>
          <p className="text-center text-gray-500 mb-8">
            SEMQ doesn&apos;t just compress embeddings – it converts them into a symbolic
            angular domain, collapsing redundant magnitude and preserving semantic direction.
          </p>

          <div className="flex justify-center mb-8">
            <VectorTransform3D />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Traditional FP32 Space (Euclidean)
              </h3>
              <p className="text-gray-500 mb-3">
                In the usual embedding space, vectors live as high-dimensional floating-point
                numbers. Magnitude (scale) and direction are mixed, which distorts distances
                and adds redundant information.
              </p>
              <ul className="list-disc list-inside text-gray-500 space-y-1 text-sm">
                <li>High-dimensional FP32 vectors with large memory footprint.</li>
                <li>Magnitude influences distance, even when it&apos;s not semantically relevant.</li>
                <li>Storage, bandwidth and vector DB cost grow quickly with scale.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                SEMQ Symbolic Angular Domain
              </h3>
              <p className="text-gray-500 mb-3">
                SEMQ collapses magnitude and keeps only the semantic direction, converting
                vectors into compact symbolic angular codes that are easier to store, index
                and analyze.
              </p>
              <ul className="list-disc list-inside text-gray-500 space-y-1 text-sm">
                <li>Magnitudes are collapsed; direction (angle) is preserved.</li>
                <li>Embeddings become discrete symbolic codes instead of raw floats.</li>
                <li>Sharper semantic clusters and new indexing strategies become possible.</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-10">
            Before: continuous high-dimensional floats. Now: compact symbolic angles that keep
            the same meaning.
          </p>
        </div>
      </section>
      <EncodingDemo />
      <RehydrationPreview />
      <DeveloperPlayground />
      <ComparisonTable />
      <NewDomainNarrative />
      <Footer />
    </main>
  );
}
