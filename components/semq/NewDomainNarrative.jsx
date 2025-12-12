"use client";

export default function NewDomainNarrative() {
  return (
    <section id="why-new-domain" className="py-20 bg-slate-900 text-slate-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Why This Is a New Domain
        </h2>
        <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto text-sm">
          SEMQ is not just another compression trick. It introduces a symbolic angular domain for
          embeddings, similar to how JPEG introduced a transform domain for images. The key shift is
          moving from raw numeric values to compact symbolic angles that still preserve meaning.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-800/70 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-semibold mb-2">1. Numeric Domain</h3>
            <p className="text-[12px] text-slate-300 mb-3">
              FP32 / FP16 / INT8 embeddings live as continuous real-valued vectors. Magnitude and
              direction are mixed; distances depend on both, even when magnitude is not semantically
              important.
            </p>
            <ul className="text-[11px] text-slate-300 space-y-1">
              <li>• High memory footprint.</li>
              <li>• Continuous floats, hard to index symbolically.</li>
              <li>• No clear patterns at the code level.</li>
            </ul>
          </div>

          <div className="bg-slate-800/70 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-semibold mb-2">2. Hash Domain</h3>
            <p className="text-[12px] text-slate-300 mb-3">
              Hashing methods (like SimHash) map vectors into compact binary signatures. They are fast
              and efficient, but lossy by design and not rehydratable back into a meaningful vector.
            </p>
            <ul className="text-[11px] text-slate-300 space-y-1">
              <li>• Great for approximate similarity.</li>
              <li>• Not invertible, hard to recover geometry.</li>
              <li>• Codes are opaque, not structured as angles.</li>
            </ul>
          </div>

          <div className="bg-emerald-500/10 rounded-xl border border-emerald-500/60 p-4">
            <h3 className="text-sm font-semibold mb-2 text-emerald-200">
              3. SEMQ Symbolic Angular Domain
            </h3>
            <p className="text-[12px] text-emerald-100 mb-3">
              SEMQ discards redundant magnitude and keeps semantic direction, encoding embeddings as
              symbolic angular codes. These codes are compact, rehydratable, and live in a domain that
              is both geometric and symbolic.
            </p>
            <ul className="text-[11px] text-emerald-100 space-y-1">
              <li>• Magnitude collapsed, angle preserved.</li>
              <li>• Discrete symbolic codes (like an alphabet of directions).</li>
              <li>• Rehydratable via LUTs, compatible across models.</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-800/70 rounded-2xl border border-slate-700 p-5 mb-8">
          <h3 className="text-sm font-semibold mb-2">
            From Raw Pixels to JPEG — From FP32 to SEMQ
          </h3>
          <p className="text-[12px] text-slate-300 mb-3">
            For images, raw pixels were never the final form. JPEG introduced a transform domain
            (frequency coefficients) where compression and storage become efficient, without breaking
            visual meaning. Pixels are no longer the unit of storage — coefficients are.
          </p>
          <p className="text-[12px] text-slate-300 mb-3">
            For embeddings, FP32/FP16 vectors don&apos;t need to be the final form either. SEMQ introduces
            a symbolic angular domain where the unit of storage is a compact code that represents
            direction, not raw floating-point magnitudes.
          </p>
          <p className="text-[12px] text-emerald-200 font-semibold">
            In other words: JPEG is to pixels what SEMQ aims to be to embeddings — a new representation
            space where compression, indexing and analysis make much more sense.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-2">Why this matters for infrastructure</h4>
            <ul className="text-[12px] text-slate-300 space-y-1">
              <li>• Embeddings become cheaper to store and query at massive scale.</li>
              <li>• You can move part of your retrieval stack to symbolic operations.</li>
              <li>• Edge and mobile devices can carry more semantics with fewer bits.</li>
              <li>• New index types and hardware instructions become possible.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Why this matters for research & products</h4>
            <ul className="text-[12px] text-slate-300 space-y-1">
              <li>• Opens a new space of algorithms in a symbolic angular domain.</li>
              <li>• Enables interpretability and pattern mining over codes.</li>
              <li>• Decouples semantic representation from floating-point formats.</li>
              <li>• Can be layered on top of any existing embedding model.</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-10 max-w-3xl mx-auto">
          SEMQ&apos;s core idea is simple but powerful: if meaning lives in the angle between vectors, then
          embeddings deserve their own angular, symbolic representation domain — not just smaller floats.
        </p>
      </div>
    </section>
  );
}
