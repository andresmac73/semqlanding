"use client";

import GsapFadeIn from "../animations/GsapFadeIn";

export default function SemqAngularDomain3D() {
  return (
    <GsapFadeIn>
      <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-6 space-y-3">
        <h3 className="text-lg font-semibold text-[#365aa6]">
          SEMQ Angular Domain
        </h3>
        <p className="text-sm text-gray-600 leading-6">
          Vectors are normalized and encoded into symbolic angular codes,
          compressing size while preserving direction and meaning.
        </p>
      </div>
    </GsapFadeIn>
  );
}
