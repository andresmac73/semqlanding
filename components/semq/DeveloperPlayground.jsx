"use client";

import { useState } from "react";

function StorageCostCalculator() {
  const [docs, setDocs] = useState(1_000_000);
  const [dim, setDim] = useState(768);
  const [qps, setQps] = useState(100);

  const costBasePerGB = 0.1;
  const queriesPerMonth = qps * 60 * 60 * 24 * 30;

  const bytesPerVectorFP32 = dim * 4;
  const bytesPerVectorINT8 = dim * 1;
  const bytesPerVectorSEMQ = (dim * 6) / 8;

  const totalBytesFP32 = bytesPerVectorFP32 * docs;
  const totalBytesINT8 = bytesPerVectorINT8 * docs;
  const totalBytesSEMQ = bytesPerVectorSEMQ * docs;

  const gbFP32 = totalBytesFP32 / 1024 ** 3;
  const gbINT8 = totalBytesINT8 / 1024 ** 3;
  const gbSEMQ = totalBytesSEMQ / 1024 ** 3;

  const storageCostFP32 = gbFP32 * costBasePerGB;
  const storageCostINT8 = gbINT8 * costBasePerGB;
  const storageCostSEMQ = gbSEMQ * costBasePerGB;

  const costPerMillionQueries = 1.0;
  const millionsQueries = queriesPerMonth / 1_000_000;
  const queryCostFP32 = costPerMillionQueries * millionsQueries * 1.0;
  const queryCostINT8 = costPerMillionQueries * millionsQueries * 0.7;
  const queryCostSEMQ = costPerMillionQueries * millionsQueries * 0.2;

  const totalFP32 = storageCostFP32 + queryCostFP32;
  const totalINT8 = storageCostINT8 + queryCostINT8;
  const totalSEMQ = storageCostSEMQ + queryCostSEMQ;

  const savingsVsFP32 = totalFP32 - totalSEMQ;
  const savingsPercent = totalFP32 > 0 ? (savingsVsFP32 / totalFP32) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border h-full flex flex-col">
      <h3 className="text-sm font-semibold mb-2">
        A. Storage & Query Cost Calculator
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        Estimate how much you can save moving from FP32 / INT8 to SEMQ for embeddings at scale.
      </p>

      <div className="grid grid-cols-1 gap-3 text-xs mb-3">
        <div className="flex gap-2 items-center">
          <label className="w-32 text-gray-600">Documents</label>
          <input
            type="number"
            className="flex-1 input"
            value={docs}
            onChange={(e) => setDocs(Number(e.target.value) || 0)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="w-32 text-gray-600">Dimensionality</label>
          <input
            type="number"
            className="flex-1 input"
            value={dim}
            onChange={(e) => setDim(Number(e.target.value) || 0)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="w-32 text-gray-600">QPS (queries/s)</label>
          <input
            type="number"
            className="flex-1 input"
            value={qps}
            onChange={(e) => setQps(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-[11px] mb-3">
        <div>
          <p className="font-semibold mb-1">FP32</p>
          <p className="text-gray-500">Storage: ${storageCostFP32.toFixed(2)}/mo</p>
          <p className="text-gray-500">Queries: ${queryCostFP32.toFixed(2)}/mo</p>
          <p className="text-gray-700 font-semibold mt-1">
            Total: ${totalFP32.toFixed(2)}/mo
          </p>
        </div>
        <div>
          <p className="font-semibold mb-1">INT8</p>
          <p className="text-gray-500">Storage: ${storageCostINT8.toFixed(2)}/mo</p>
          <p className="text-gray-500">Queries: ${queryCostINT8.toFixed(2)}/mo</p>
          <p className="text-gray-700 font-semibold mt-1">
            Total: ${totalINT8.toFixed(2)}/mo
          </p>
        </div>
        <div>
          <p className="font-semibold mb-1">SEMQ (6 bits)</p>
          <p className="text-gray-500">Storage: ${storageCostSEMQ.toFixed(2)}/mo</p>
          <p className="text-gray-500">Queries: ${queryCostSEMQ.toFixed(2)}/mo</p>
          <p className="text-emerald-600 font-semibold mt-1">
            Total: ${totalSEMQ.toFixed(2)}/mo
          </p>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <p className="text-[11px] text-emerald-600 font-semibold">
          Savings vs FP32: ${savingsVsFP32.toFixed(2)} / mo ({savingsPercent.toFixed(1)}%)
        </p>
        <p className="text-[10px] text-gray-400 mt-1">
          Numbers are illustrative; plug your own infra prices + SEMQ metrics for precise estimates.
        </p>
      </div>
    </div>
  );
}

function ReplacePineconeMode() {
  const [dbType, setDbType] = useState("postgres");

  const codePostgres = `-- Store SEMQ codes in Postgres
CREATE TABLE semq_embeddings (
  id TEXT PRIMARY KEY,
  code BYTEA,      -- packed SEMQ symbols
  payload JSONB
);

-- Example: Hamming-like search using extension / custom op
SELECT id, payload
FROM semq_embeddings
ORDER BY semq_hamming_distance(code, :query_code)
LIMIT 10;`;

  const codeMongo = `// Store SEMQ codes in MongoDB
db.semq_embeddings.insertOne({
  _id: "doc_1",
  code: BinData(0, "<packed_semq>"),
  payload: {...}
});

// Example: use aggregation + custom operator for distance
db.semq_embeddings.aggregate([
  { $addFields: { dist: { $semqDistance: ["$code", queryCode] } } },
  { $sort: { dist: 1 } },
  { $limit: 10 }
]);`;

  const codeSqlite = `-- Store SEMQ codes in SQLite
CREATE TABLE semq_embeddings (
  id TEXT PRIMARY KEY,
  code BLOB,
  payload TEXT
);

-- Use a custom C extension for semq_distance(code, :query_code)
SELECT id, payload
FROM semq_embeddings
ORDER BY semq_distance(code, :query_code)
LIMIT 10;`;

  let snippet = codePostgres;
  if (dbType === "mongo") snippet = codeMongo;
  if (dbType === "sqlite") snippet = codeSqlite;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border h-full flex flex-col">
      <h3 className="text-sm font-semibold mb-2">
        B. Replace / Complement Vector DBs
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        SEMQ codes can be stored in traditional databases (Postgres, Mongo, SQLite) and queried with
        Hamming-like distance or symbolic indexes, reducing dependency on dedicated vector DBs.
      </p>

      <div className="flex gap-2 mb-3 text-[11px]">
        <button
          onClick={() => setDbType("postgres")}
          className={`px-3 py-1 rounded ${
            dbType === "postgres" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Postgres
        </button>
        <button
          onClick={() => setDbType("mongo")}
          className={`px-3 py-1 rounded ${
            dbType === "mongo" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          MongoDB
        </button>
        <button
          onClick={() => setDbType("sqlite")}
          className={`px-3 py-1 rounded ${
            dbType === "sqlite" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          SQLite
        </button>
      </div>

      <pre className="text-[11px] bg-slate-900 text-slate-100 rounded-lg p-3 overflow-x-auto flex-1">
{snippet}
      </pre>

      <p className="text-[10px] text-gray-400 mt-2">
        Real implementations would use native extensions or UDFs for SEMQ distance, but the idea is simple:
        store symbolic codes and sort by a fast symbolic distance.
      </p>
    </div>
  );
}

function PatternMining() {
  const exampleSemq = [3, -1, 3, 3, 0, -2, 3, -1, 3, 3, 0, -2];
  const pattern = [3, -1, 3];

  const occurrences = [];
  for (let i = 0; i <= exampleSemq.length - pattern.length; i++) {
    const slice = exampleSemq.slice(i, i + pattern.length);
    if (slice.every((v, idx) => v === pattern[idx])) {
      occurrences.push(i);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border h-full flex flex-col">
      <h3 className="text-sm font-semibold mb-2">
        C. Pattern Mining on Symbolic Codes
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        Once embeddings live in a symbolic domain, you can search for recurring patterns in the SEMQ codes,
        like motifs in DNA sequences or time-series.
      </p>

      <div className="mb-3 text-[11px]">
        <p className="text-gray-500 mb-1">Example SEMQ code:</p>
        <div className="flex flex-wrap gap-1">
          {exampleSemq.map((v, idx) => {
            const inMatchRange = occurrences.some(
              (start) => idx >= start && idx < start + pattern.length,
            );
            return (
              <span
                key={idx}
                className={`px-1.5 py-0.5 rounded ${
                  inMatchRange ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {v >= 0 ? `+${v}` : v}
              </span>
            );
          })}
        </div>
      </div>

      <div className="text-[11px]">
        <p className="text-gray-500 mb-1">Pattern to detect:</p>
        <p className="mb-1">
          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 inline-block">
            [{pattern.map((v) => (v >= 0 ? `+${v}` : v)).join(", ")}]
          </span>
        </p>
        <p className="text-gray-500 mb-1">
          Occurrences at positions:{" "}
          <span className="font-semibold text-emerald-600">
            {occurrences.length > 0 ? occurrences.join(", ") : "none"}
          </span>
        </p>
        <p className="text-[10px] text-gray-400 mt-2">
          In a real system, you could mine millions of SEMQ codes for frequent motifs, symbolic clusters,
          and temporal patterns that are hard to see in raw FP32 floats.
        </p>
      </div>
    </div>
  );
}

export default function DeveloperPlayground() {
  return (
    <section id="developer-playground" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Developer Playground
        </h2>
        <p className="text-center text-gray-500 mb-8 max-w-3xl mx-auto text-sm">
          Explore what SEMQ unlocks in practice: cheaper storage and queries, the option to store embeddings in
          traditional databases, and the ability to mine symbolic patterns directly on the codes.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <StorageCostCalculator />
          <ReplacePineconeMode />
          <PatternMining />
        </div>
      </div>
    </section>
  );
}
