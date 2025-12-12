"use client";

import { useMemo, useState } from "react";

type EmbeddingOption = {
  id: string;
  label: string;
  sizeLabel: string;
  costPercentage: number;
  highlight?: string;
};

const embeddingOptions: EmbeddingOption[] = [
  { id: "fp32", label: "FP32", sizeLabel: "30 KB", costPercentage: 100 },
  { id: "fp16", label: "FP16", sizeLabel: "15 KB", costPercentage: 70 },
  { id: "int8", label: "INT8", sizeLabel: "7.5 KB", costPercentage: 40 },
  {
    id: "semq",
    label: "SEMQ 6 bits",
    sizeLabel: "≈ 5–6 KB (5× smaller)",
    costPercentage: 20,
    highlight: "Up to 80% cost reduction with SEMQ.",
  },
];

function EmbeddingSizeSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        {embeddingOptions.map((option, index) => (
          <button
            key={option.id}
            className={`px-3 py-1 rounded-full border transition-colors duration-200 ${
              value === index
                ? "border-[#365aa6] bg-[#365aa6] text-white"
                : "border-gray-200 hover:border-[#365aa6]/60"
            }`}
            onClick={() => onChange(index)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={embeddingOptions.length - 1}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#365aa6]"
      />
    </div>
  );
}

function CostGauge({ percentage, note }: { percentage: number; note: string }) {
  return (
    <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-4 space-y-2">
      <p className="text-sm text-gray-600 font-medium">
        Estimated cost per 1M queries
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#365aa6]">
          {percentage}%
        </span>
        <span className="text-sm text-gray-500">vs FP32 baseline</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background:
              "linear-gradient(90deg, #6a90e7 0%, #4a70c7 50%, #2a4785 100%)",
          }}
        />
      </div>
      <p className="text-xs text-gray-500">{note}</p>
    </div>
  );
}

function EmbeddingAnimation({ className }: { className?: string }) {
  const [applySemq, setApplySemq] = useState(false);

  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            {applySemq ? "Symbolic representation" : "Traditional embedding"}
          </p>
          <h3 className="text-lg font-semibold text-[#365aa6]">
            {applySemq ? "SEMQ angular codes" : "FP32 dense vector"}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setApplySemq((prev) => !prev)}
          className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors duration-300 ${
            applySemq ? "bg-[#365aa6]" : "bg-gray-200"
          }`}
        >
          <span className="sr-only">Apply SEMQ</span>
          <span
            className={`inline-block h-7 w-7 transform rounded-full bg-white shadow transition-transform duration-300 ${
              applySemq ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="relative h-24 overflow-hidden">
        <div
          className={`absolute inset-0 flex items-center text-sm text-gray-700 transition-all duration-500 ${
            applySemq ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <code className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-inner w-full">
            [-0.321, 0.552, -0.113, 0.984, -0.447, 0.218, -0.032, 0.761, ...]
          </code>
        </div>
        <div
          className={`absolute inset-0 flex items-center text-sm text-gray-700 transition-all duration-500 ${
            applySemq ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <code className="bg-[#f4f6ff] border border-[#d9e4ff] text-[#2a4785] rounded-lg px-4 py-3 shadow-inner w-full">
            [+3, -1, +2, 0, -2, +1, 0, +3, ...]
          </code>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        {applySemq
          ? "SEMQ converts the vector into compact symbolic angular codes."
          : "Traditional high-dimensional FP32 embedding (768 floats)."}
      </p>
      <p className="text-xs text-gray-500">
        Same meaning, smaller symbolic representation.
      </p>
    </div>
  );
}

export default function WhySemqSection() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const selectedOption = useMemo(
    () => embeddingOptions[sliderIndex],
    [sliderIndex],
  );

  const costNote =
    selectedOption.highlight ??
    "Baseline cost reference for a vector database at FP32 precision.";

  return (
    <section
      id="why-semq"
      className="relative bg-gradient-to-b from-white via-[#f5f7fb] to-white py-16 md:py-24 px-4"
    >
      <div className="container mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a4785]">
            The Problem: Why SEMQ?
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Current embedding representations are too large and expensive to
            store, query and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="h-full">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-6 space-y-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Embedding size</p>
                  <h3 className="text-xl font-semibold text-[#365aa6]">
                    Choose a format
                  </h3>
                </div>
                <span className="text-sm text-gray-500">
                  Each embedding per vector
                </span>
              </div>

              <EmbeddingSizeSlider
                value={sliderIndex}
                onChange={setSliderIndex}
              />

              <div className="bg-[#f7f9fc] border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selected</p>
                  <p className="text-lg font-semibold text-[#2a4785]">
                    {selectedOption.label}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Estimated size</p>
                  <p className="text-lg font-semibold text-[#365aa6]">
                    {selectedOption.sizeLabel}
                  </p>
                </div>
              </div>

              <CostGauge
                percentage={selectedOption.costPercentage}
                note={costNote}
              />
            </div>
          </div>

          <div className="h-full">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-6 space-y-6 h-full flex flex-col">
              <EmbeddingAnimation className="flex-1" />
              <div className="space-y-2 text-sm text-gray-600 leading-6">
                <p className="text-gray-700 font-medium">
                  Why it matters
                </p>
                <p>
                  Dense FP32 vectors balloon storage and query costs. SEMQ keeps
                  the semantic meaning while shrinking payloads so indexes stay
                  light and queries fly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#365aa6]" />
                    <span>Less I/O per lookup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#365aa6]" />
                    <span>Smaller indexes & RAM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#365aa6]" />
                    <span>Cheaper scaling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#365aa6]" />
                    <span>Directional semantics preserved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
