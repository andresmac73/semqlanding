"use client";

import { useState } from "react";

const EXAMPLE_TEXT = "Generative dairy farming powered by symbolic embeddings.";

export default function EncodingDemo() {
  const [input, setInput] = useState(EXAMPLE_TEXT);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/semq-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="encoding-demo" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Encoding Demo — Try SEMQ Live
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Type a sentence and see how a traditional FP32 embedding compares to its SEMQ symbolic
          code, along with nearest neighbors and recall.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto mb-10 space-y-4"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Input text
          </label>
          <textarea
            className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center gap-4 justify-between">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Encoding..." : "Encode with SEMQ"}
            </button>
            <button
              type="button"
              className="text-xs text-gray-500 underline"
              onClick={() => setInput(EXAMPLE_TEXT)}
            >
              Use example text
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
        </form>

        {result && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border">
              <h3 className="text-sm font-semibold mb-2">
                A. FP32 Embedding
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Original high-dimensional vector (truncated view).
              </p>
              <pre className="text-[11px] bg-slate-900 text-slate-100 rounded-lg p-3 overflow-x-auto">
{JSON.stringify(result.fp32.slice(0, 16), null, 2)}…
              </pre>
              <p className="text-[11px] text-gray-500 mt-2">
                Dim: {result.dim} · Precision: FP32 · Approx size: {result.fp32SizeKB} KB
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border">
              <h3 className="text-sm font-semibold mb-2">
                B. SEMQ Symbolic Code
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Compressed symbolic angular representation (truncated view).
              </p>
              <pre className="text-[11px] bg-slate-900 text-green-100 rounded-lg p-3 overflow-x-auto">
{JSON.stringify(result.semq.slice(0, 16), null, 2)}…
              </pre>
              <p className="text-[11px] text-gray-500 mt-2">
                Bits / dim: {result.bitsPerDim} · Approx size: {result.semqSizeKB} KB
              </p>
              <p className="text-[11px] text-emerald-600 mt-1 font-medium">
                Compression factor: {result.compressionFactor.toFixed(2)}× smaller vs FP32
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border">
              <h3 className="text-sm font-semibold mb-2">
                C. Nearest Neighbors & Recall
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Top-10 neighbors retrieved with FP32 vs SEMQ.
              </p>
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <p className="font-semibold mb-1">FP32 Top-10</p>
                  <ol className="list-decimal list-inside space-y-0.5 text-gray-600">
                    {result.fp32Neighbors.map((n) => (
                      <li key={n.id}>{n.label}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="font-semibold mb-1">SEMQ Top-10</p>
                  <ol className="list-decimal list-inside space-y-0.5 text-gray-600">
                    {result.semqNeighbors.map((n) => (
                      <li key={n.id}>{n.label}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="mt-3 text-[11px]">
                <p className="text-gray-500">
                  Approx Recall@10:
                  <span className="font-semibold text-blue-600 ml-1">
                    {(result.recallAt10 * 100).toFixed(1)}%
                  </span>
                </p>
                <p className="text-gray-400 mt-1">
                  (Simulated demo — hook real SEMQ + embeddings backend here.)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
