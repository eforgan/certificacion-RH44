"use client";

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ScatterController
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ScatterController,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  weight: number;    // 2000 – 3000 kg
  altitude: number;  // 0 – 10 000 ft
  condition: 'oei' | 'autorotation';
}

/** Calcula los puntos clave de la curva H/V y expone los datos del gráfico. */
export function computeHVData(weight: number, altitude: number, condition: 'oei' | 'autorotation') {
  const fw = weight / 2500;                           // 0.8 – 1.2  (normalizado a peso base)
  const fa = 1 + (altitude / 10000) * 0.4;            // 1.0 – 1.4  (altura degrada performance)
  const fc = condition === 'autorotation' ? 1.6 : 1.0; // falla total amplía mucho el avoid area

  // ── Zona 1: High-Hover / Low-Speed Avoid Area ─────────────────────────────
  const maxHeight = 400 * fw * fa * fc;               // altura máxima a 0 KIAS
  const minHeight = Math.max(0, 15 / (fw * fa));      // altura mínima (terreno cercano)
  const kneeSpeed = Math.round(45 * fw * fa * (condition === 'autorotation' ? 1.4 : 1.0));

  const lowerCurve: { x: number; y: number }[] = [];
  const upperCurve: { x: number; y: number }[] = [];

  for (let x = 0; x <= kneeSpeed; x += 1) {
    const ratio = x / kneeSpeed;
    const yUpper = maxHeight * Math.pow(1 - ratio, 1.5);
    const yLower = minHeight + (x / kneeSpeed) * 20;

    if (yUpper > yLower) {
      upperCurve.push({ x, y: Math.round(yUpper) });
      lowerCurve.push({ x, y: Math.round(yLower) });
    } else {
      upperCurve.push({ x, y: Math.round(yLower) });
      lowerCurve.push({ x, y: Math.round(yLower) });
      break;
    }
  }

  // ── Zona 2: High-Speed / Low-Altitude Avoid Area ──────────────────────────
  const hsStart = 80 - (condition === 'autorotation' ? 15 : 0);
  const hsEnd   = 160;

  const hsLower: { x: number; y: number }[] = [];
  const hsUpper: { x: number; y: number }[] = [];

  for (let x = hsStart; x <= hsEnd; x += 2) {
    hsLower.push({ x, y: 0 });
    hsUpper.push({ x, y: Math.round((x - hsStart) * 1.2 * fw) });
  }

  // ── Corredor Seguro (área verde indicativa) ───────────────────────────────
  // Franja entre la zona 1 y el inicio de la zona 2 a baja altura
  const safeStart = kneeSpeed;
  const safeEnd   = hsStart;
  const safeLow: { x: number; y: number }[] = [];
  const safeHigh: { x: number; y: number }[] = [];

  if (safeStart < safeEnd) {
    for (let x = safeStart; x <= safeEnd; x += 2) {
      safeLow.push({ x, y: 0 });
      safeHigh.push({ x, y: 30 }); // franja baja indicativa
    }
  }

  // ── Eje Y dinámico (sin clipping) ─────────────────────────────────────────
  const rawMax = Math.max(maxHeight, 200);
  const yAxisMax = Math.max(800, Math.ceil((rawMax * 1.2) / 100) * 100);

  return { lowerCurve, upperCurve, hsLower, hsUpper, safeLow, safeHigh, kneeSpeed, maxHeight, minHeight, yAxisMax };
}

export default function HVChart({ weight, altitude, condition }: Props) {
  const { lowerCurve, upperCurve, hsLower, hsUpper, kneeSpeed, maxHeight, yAxisMax } = useMemo(
    () => computeHVData(weight, altitude, condition),
    [weight, altitude, condition]
  );

  const chartData = useMemo(() => ({
    datasets: [
      // ── 1. Base de la Zona Low-Speed (sin fill propio) ──────────────────
      {
        label: '_base_low',
        data: lowerCurve,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        borderWidth: 0,
        pointRadius: 0,
        fill: false,
        tension: 0.35,
      },
      // ── 2. Zona Avoid: High-Hover / Low-Speed ───────────────────────────
      {
        label: 'Avoid Area — Baja Velocidad',
        data: upperCurve,
        borderColor: 'rgba(239, 68, 68, 0.9)',
        backgroundColor: 'rgba(239, 68, 68, 0.18)',
        borderWidth: 2,
        pointRadius: 0,
        fill: '-1',
        tension: 0.35,
      },
      // ── 3. Suelo de la Zona High-Speed ──────────────────────────────────
      {
        label: '_base_hs',
        data: hsLower,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        borderWidth: 0,
        pointRadius: 0,
        fill: false,
        tension: 0,
      },
      // ── 4. Zona Avoid: High-Speed / Low-Altitude ────────────────────────
      {
        label: 'Avoid Area — Alta Velocidad',
        data: hsUpper,
        borderColor: 'rgba(239, 68, 68, 0.9)',
        backgroundColor: 'rgba(239, 68, 68, 0.18)',
        borderWidth: 2,
        pointRadius: 0,
        fill: '-1',
        tension: 0.2,
      },
      // ── 5. Punto Óptimo "Knee" ───────────────────────────────────────────
      {
        label: `Knee Point (${kneeSpeed} KIAS)`,
        data: [{ x: kneeSpeed, y: Math.round(maxHeight * 0.01 + 20) }],
        backgroundColor: '#3b82f6',
        borderColor: '#ffffff',
        borderWidth: 2,
        pointRadius: 7,
        pointHoverRadius: 10,
        type: 'scatter' as const,
      },
    ],
  }), [lowerCurve, upperCurve, hsLower, hsUpper, kneeSpeed, maxHeight]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 700, easing: 'easeOutQuart' as const },
    scales: {
      x: {
        type: 'linear' as const,
        min: 0,
        max: 160,
        title: {
          display: true,
          text: 'Velocidad Indicada (KIAS)',
          color: 'rgba(255,255,255,0.55)',
          font: { size: 12, weight: 'bold' as const, family: 'Inter' },
        },
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
      },
      y: {
        min: 0,
        max: yAxisMax,
        title: {
          display: true,
          text: 'Altura AGL (ft)',
          color: 'rgba(255,255,255,0.55)',
          font: { size: 12, weight: 'bold' as const, family: 'Inter' },
        },
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255,255,255,0.5)',
          font: { size: 11, family: 'Inter' },
          boxWidth: 14,
          boxHeight: 14,
          borderRadius: 4,
          padding: 18,
          filter: (item: { text: string }) => !item.text.startsWith('_'),
        },
      },
      tooltip: {
        backgroundColor: 'rgba(5,20,50,0.95)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleFont: { size: 12, family: 'Inter', weight: 'bold' as const },
        bodyFont: { size: 12, family: 'Inter' },
        padding: 14,
        cornerRadius: 10,
        callbacks: {
          label: (ctx: { dataset: { label: string }; parsed: { x: number; y: number } }) => {
            if (ctx.dataset.label.includes('Knee')) {
              return ` Punto Óptimo: ${ctx.parsed.x} KIAS | ${ctx.parsed.y} ft AGL`;
            }
            if (ctx.dataset.label.startsWith('_')) return '';
            return ` ${ctx.parsed.x} KIAS — ${ctx.parsed.y} ft AGL`;
          },
        },
      },
    },
  }), [yAxisMax]);

  return (
    <div className="w-full h-full min-h-[500px] relative flex flex-col">
      {/* Encabezado del gráfico */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            AW109E Power · Envolvente H/V
          </p>
          <p className="text-sm font-bold text-white/60">
            {weight} kg · {altitude.toLocaleString()} ft · {condition === 'oei' ? 'Monomotor (OEI)' : 'Falla Total (Auto)'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400">
            <span className="w-3 h-3 rounded bg-red-500/60 inline-block" />
            Avoid Area
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <span className="w-3 h-3 rounded bg-white/10 inline-block" />
            Zona Segura
          </span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="flex-1 min-h-[420px]">
        <Chart type="line" data={chartData as any} options={options as any} />
      </div>

      {/* Pie del gráfico */}
      <p className="text-center text-[9px] text-white/20 font-bold uppercase tracking-[0.2em] mt-4">
        Simulación algorítmica con fines didácticos — No reemplaza el RFM AgustaWestland
      </p>
    </div>
  );
}
