"use client";

import { useState } from "react";

const EXAMPLE_VECTOR_LABEL = "Example embedding from text prompt";

export default function RehydrationPreview() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/semq-rehydrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: EXAMPLE_VECTOR_LABEL }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while simulating rehydration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rehydration-preview" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Rehydration Preview
        </h2>
        <p className="text-center text-gray-500 mb-8 max-w-3xl mx-auto">
          SEMQ encodes embeddings as compact symbolic angular codes. This preview shows how a SEMQ
          code can be rehydrated back into an approximate vector while preserving semantic direction
          with low angular error.
        </p>

        <div className="flex flex-col items-center mb-6">
          <button
            type="button"
            onClick={handleRun}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Simulating rehydration..." : "Run rehydration preview"}
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Using a simulated vector for demo purposes. Plug in the real SEMQ SDK here.
          </p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {result && (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border">
              <h3 className="text-sm font-semibold mb-2">1. Original FP32 Vector</h3>
              <p className="text-xs text-gray-500 mb-2">
                High-dimensional FP32 embedding (truncated view).
              </p>
              <pre className="text-[11px] bg-slate-900 text-slate-100 rounded-lg p-3 overflow-x-auto">
{JSON.stringify(result.fp32.slice(0, 12), null, 2)}…
              </pre>
              <p className="text-[11px] text-gray-500 mt-2">
                Dim: {result.dim} · Precision: FP32
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border">
              <h3 className="text-sm font-semibold mb-2">2. SEMQ Symbolic Code</h3>
              <p className="text-xs text-gray-500 mb-2">
                Discrete angular symbols derived from the original vector (truncated view).
              </p>
              <pre className="text-[11px] bg-slate-900 text-green-100 rounded-lg p-3 overflow-x-auto">
{JSON.stringify(result.semq.slice(0, 12), null, 2)}…
              </pre>
              <p className="text-[11px] text-gray-500 mt-2">
                Bits / dim: {result.bitsPerDim} · Compression factor:{" "}
                {result.compressionFactor.toFixed(2)}×
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border">
              <h3 className="text-sm font-semibold mb-2">3. Rehydrated Vector (approx.)</h3>
              <p className="text-xs text-gray-500 mb-2">
                Approximate vector reconstructed from the SEMQ code (truncated view).
              </p>
              <pre className="text-[11px] bg-slate-900 text-slate-100 rounded-lg p-3 overflow-x-auto">
{JSON.stringify(result.rehydrated.slice(0, 12), null, 2)}…
              </pre>

              <div className="mt-3 space-y-1 text-[11px]">
                <p className="text-gray-500">
                  Cosine similarity (original vs rehydrated):{" "}
                  <span className="font-semibold text-emerald-600">
                    {result.cosineSimilarity.toFixed(3)}
                  </span>
                </p>
                <p className="text-gray-500">
                  Angular error:{" "}
                  <span className="font-semibold text-blue-600">
                    {result.angularErrorDeg.toFixed(2)}°
                  </span>
                </p>
                <p className="text-gray-500">
                  L2 distance:{" "}
                  <span className="font-semibold">
                    {result.l2Error.toFixed(3)}
                  </span>
                </p>
              </div>

              <div className="mt-4">
                <p className="text-[11px] text-gray-500 mb-1">Angular error (0° = perfect match)</p>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{
                      width: `${Math.min((result.angularErrorDeg / 30) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Values under ~10° usually preserve semantic meaning very well.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
