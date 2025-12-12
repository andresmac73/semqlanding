"use client";

const methods = [
  {
    name: "FP32",
    domain: "Continuous numeric",
    symbolic: "No",
    crossModel: "Yes",
    rehydratable: "N/A",
    needsTraining: "No",
    energy: "100%",
    notes: "Baseline: full-precision floats, highest memory and cost.",
  },
  {
    name: "FP16",
    domain: "Continuous numeric",
    symbolic: "No",
    crossModel: "Yes",
    rehydratable: "N/A",
    needsTraining: "No",
    energy: "~70%",
    notes: "Half precision, lower memory but still continuous floats.",
  },
  {
    name: "INT8",
    domain: "Quantization",
    symbolic: "No",
    crossModel: "Limited",
    rehydratable: "No",
    needsTraining: "Yes (calibration/quantization)",
    energy: "~40%",
    notes: "Numeric quantization; usually model-specific, requires calibration.",
  },
  {
    name: "PQ / OPQ / RQ",
    domain: "Vector quantization",
    symbolic: "No",
    crossModel: "Limited",
    rehydratable: "Partial",
    needsTraining: "Yes",
    energy: "20–40%",
    notes: "Codebooks need training; compression is strong but tied to the dataset/model.",
  },
  {
    name: "SimHash",
    domain: "Hashing",
    symbolic: "Partially",
    crossModel: "Yes",
    rehydratable: "No",
    needsTraining: "No",
    energy: "~10%",
    notes: "Good for approximate similarity but not invertible and lossy by design.",
  },
  {
    name: "SEMQ",
    domain: "Symbolic angular domain",
    symbolic: "Yes (100%)",
    crossModel: "Yes (universal)",
    rehydratable: "Yes (LUT-based)",
    needsTraining: "No",
    energy: "~10–15%",
    notes: "New representation: compact symbolic angular codes with strong compression and semantic preservation.",
  },
];

export default function ComparisonTable() {
  return (
    <section id="semq-vs-everyone" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          SEMQ vs Everyone
        </h2>
        <p className="text-center text-gray-500 mb-8 max-w-3xl mx-auto text-sm">
          Compare SEMQ to traditional embedding formats and compression methods. The key difference is not
          just the compression factor, but the fact that SEMQ lives in a symbolic angular domain instead of a
          purely numeric one.
        </p>

        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Method</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Domain</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Symbolic?</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Cross-model</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Rehydratable</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Needs training</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Energy / cost (per 1M queries)
                </th>
              </tr>
            </thead>
            <tbody>
              {methods.map((m) => (
                <tr
                  key={m.name}
                  className={m.name === "SEMQ" ? "bg-emerald-50/70" : "bg-white"}
                >
                  <td className="px-3 py-2 border-t align-top">
                    <span
                      className={
                        m.name === "SEMQ"
                          ? "font-semibold text-emerald-700"
                          : "font-semibold text-gray-800"
                      }
                    >
                      {m.name}
                    </span>
                    <p className="text-[11px] text-gray-500 mt-1">{m.notes}</p>
                  </td>
                  <td className="px-3 py-2 border-t align-top text-gray-700">
                    {m.domain}
                  </td>
                  <td className="px-3 py-2 border-t align-top">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[11px] ${
                        m.symbolic.startsWith("Yes")
                          ? "bg-emerald-100 text-emerald-700"
                          : m.symbolic === "Partially"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {m.symbolic}
                    </span>
                  </td>
                  <td className="px-3 py-2 border-t align-top text-gray-700">
                    {m.crossModel}
                  </td>
                  <td className="px-3 py-2 border-t align-top text-gray-700">
                    {m.rehydratable}
                  </td>
                  <td className="px-3 py-2 border-t align-top text-gray-700">
                    {m.needsTraining}
                  </td>
                  <td className="px-3 py-2 border-t align-top text-gray-700">
                    {m.energy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-gray-400 text-[11px] mt-4 max-w-3xl mx-auto">
          Values are indicative and simplified for comparison. SEMQ&apos;s main contribution is introducing a
          symbolic angular domain for embeddings, rather than being just another numeric quantization method.
        </p>
      </div>
    </section>
  );
}
