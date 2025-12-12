import { NextResponse } from "next/server";

function dot(a: number[], b: number[]) {
  return a.reduce((sum, v, i) => sum + v * b[i], 0);
}

function norm(a: number[]) {
  return Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const label = body?.label;

  if (!label || typeof label !== "string") {
    return NextResponse.json({ error: "Missing label" }, { status: 400 });
  }

  const dim = 32;

  // Aquí debería ir la integración real:
  // 1) Llamar al proveedor de embeddings (OpenAI u otro) para obtener el vector FP32.
  // 2) Pasar el embedding al SDK de SEMQ para obtener el código simbólico.
  // 3) Rehidratar usando la LUT/decodificación del SDK y calcular métricas reales.

  const fp32 = Array.from({ length: dim }, (_, i) => {
    const val = Math.sin(i * 0.7 + label.length * 0.3) * 0.9;
    return Number(val.toFixed(3));
  });

  const semq = fp32.map((v) => {
    const q = Math.max(-3, Math.min(3, Math.round(v * 4)));
    return q;
  });

  const rehydrated = semq.map((q) => {
    const val = (q / 4) * 1.0;
    return Number(val.toFixed(3));
  });

  const dotVal = dot(fp32, rehydrated);
  const n1 = norm(fp32);
  const n2 = norm(rehydrated);
  const cosineSimilarity = n1 === 0 || n2 === 0 ? 0 : dotVal / (n1 * n2);
  const clampedCos = Math.max(-1, Math.min(1, cosineSimilarity));
  const angularErrorRad = Math.acos(clampedCos);
  const angularErrorDeg = (angularErrorRad * 180) / Math.PI;

  const l2Error = Math.sqrt(
    fp32.reduce((sum, v, i) => {
      const d = v - rehydrated[i];
      return sum + d * d;
    }, 0),
  );

  const fp32SizeKB = 30.0;
  const semqSizeKB = 30.0 / 5.33;
  const compressionFactor = fp32SizeKB / semqSizeKB;

  return NextResponse.json({
    dim,
    fp32,
    semq,
    rehydrated,
    bitsPerDim: 6,
    fp32SizeKB: Number(fp32SizeKB.toFixed(2)),
    semqSizeKB: Number(semqSizeKB.toFixed(2)),
    compressionFactor,
    cosineSimilarity,
    angularErrorDeg,
    l2Error,
  });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
