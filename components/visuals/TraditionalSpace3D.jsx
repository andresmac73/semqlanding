"use client";

import GsapFadeIn from "../animations/GsapFadeIn";

export default function TraditionalSpace3D() {
  return (
    <GsapFadeIn>
      <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-6 space-y-3">
        <h3 className="text-lg font-semibold text-[#365aa6]">
          FP32 Euclidean Space
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          Dense floating-point vectors spread across a magnitude-heavy space,
          making indexes larger and I/O slower.
        </p>
      </div>
    </GsapFadeIn>
  );
}
