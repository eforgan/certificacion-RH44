"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Wind,
  Weight,
  AlertTriangle,
  Settings2,
  Info,
  TrendingUp,
  Gauge,
  ArrowUpDown,
} from 'lucide-react';
import HVChart, { computeHVData } from '@/components/visual/HVChart';

// ────────────────────────────────────────────────────────────────────────────
// Subcomponente: control dual Slider + Número
// ────────────────────────────────────────────────────────────────────────────
interface DualInputProps {
  label: string;
  unit: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  minLabel: string;
  maxLabel: string;
}

function DualInput({ label, unit, icon, value, min, max, step, onChange, minLabel, maxLabel }: DualInputProps) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
          {icon} {label}
        </label>
        {/* Número editable */}
        <div className="flex items-center gap-1 bg-brand/10 border border-brand/20 rounded-lg overflow-hidden">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            className="w-16 bg-transparent text-brand-light font-black text-xs text-center outline-none py-1 px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-white/30 text-[10px] font-bold pr-2">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand hover:accent-brand-light transition-all cursor-pointer"
      />
      <div className="flex justify-between text-[9px] font-bold text-white/25 uppercase">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Página principal
// ────────────────────────────────────────────────────────────────────────────
export default function HVCurvePage() {
  const [weight, setWeight]       = useState(2700);
  const [altitude, setAltitude]   = useState(2000);
  const [condition, setCondition] = useState<'oei' | 'autorotation'>('oei');

  // Métricas calculadas en el mismo espacio para el panel de estadísticas
  const metrics = useMemo(() => {
    const data = computeHVData(weight, altitude, condition);
    const hsStart = 80 - (condition === 'autorotation' ? 15 : 0);
    const safeWindow = Math.max(0, hsStart - data.kneeSpeed);
    return {
      kneeSpeed: data.kneeSpeed,
      maxAvoidHeight: Math.round(data.maxHeight),
      yAxisMax: data.yAxisMax,
      safeWindow,
      hsStart,
    };
  }, [weight, altitude, condition]);

  return (
    <div className="space-y-8 animate-fade-in pb-20 max-w-7xl mx-auto">

      {/* ── Cabecera ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <Link
            href="/visual"
            className="inline-flex items-center gap-2 text-white/40 hover:text-brand-light transition-colors text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Visuales
          </Link>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Simulador de Curva H/V
            <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-red-500/20">
              Interactivo
            </span>
          </h2>
          <p className="text-white/40 font-medium max-w-2xl">
            Análisis de las áreas críticas (Avoid Area) para el AW109E Power ajustado
            por Peso de Despegue, Altitud de Densidad y condición de motor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* ── Panel de Controles ────────────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-5">
          <div className="glass rounded-[2rem] p-6 border-white/5 shadow-xl sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <Settings2 className="w-5 h-5 text-brand-light" />
              <h3 className="text-white font-display font-bold uppercase tracking-widest text-sm">
                Parámetros
              </h3>
            </div>

            <div className="space-y-8">

              {/* Peso */}
              <DualInput
                label="Peso"
                unit="kg"
                icon={<Weight className="w-3.5 h-3.5" />}
                value={weight}
                min={2000}
                max={3000}
                step={50}
                onChange={setWeight}
                minLabel="Mín 2000"
                maxLabel="MTOW 3000"
              />

              {/* Altitud */}
              <div className="pt-4 border-t border-white/5">
                <DualInput
                  label="Altitud"
                  unit="ft"
                  icon={<Wind className="w-3.5 h-3.5" />}
                  value={altitude}
                  min={0}
                  max={10000}
                  step={500}
                  onChange={setAltitude}
                  minLabel="MSL 0"
                  maxLabel="Max 10 000"
                />
              </div>

              {/* Condición Motor */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> Condición Motor
                </label>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setCondition('oei')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${
                      condition === 'oei'
                        ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Monomotor (OEI)
                  </button>
                  <button
                    onClick={() => setCondition('autorotation')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.1em] transition-all leading-relaxed ${
                      condition === 'autorotation'
                        ? 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                        : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Falla Total (Auto)
                  </button>
                </div>
              </div>

              {/* Nota informativa */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-start gap-3">
                <Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold leading-relaxed">
                  Mayor peso y altitud reducen el margen aerodinámico, expandiendo el Avoid Area.
                </p>
              </div>
            </div>
          </div>

          {/* ── Panel de Métricas Calculadas ───────────────────────────── */}
          <div className="glass rounded-[2rem] p-6 border-white/5 shadow-xl space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-brand-light" />
              <h3 className="text-white font-display font-bold uppercase tracking-widest text-sm">
                Métricas
              </h3>
            </div>

            <MetricRow
              icon={<Gauge className="w-4 h-4 text-amber-400" />}
              label="Knee Speed"
              value={`${metrics.kneeSpeed} KIAS`}
              sub="Velocidad mín. segura"
              highlight="amber"
            />
            <MetricRow
              icon={<ArrowUpDown className="w-4 h-4 text-red-400" />}
              label="Altura Máx. Avoid"
              value={`${metrics.maxAvoidHeight} ft`}
              sub="A 0 KIAS (hover)"
              highlight="red"
            />
            <MetricRow
              icon={<Wind className="w-4 h-4 text-green-400" />}
              label="Ventana Segura"
              value={metrics.safeWindow > 0 ? `${metrics.kneeSpeed}–${metrics.hsStart} KIAS` : 'Reducida'}
              sub="Corredor de baja alt."
              highlight={metrics.safeWindow > 20 ? 'green' : 'red'}
            />
          </div>
        </div>

        {/* ── Gráfico Principal ─────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <div className="glass rounded-[2.5rem] p-4 md:p-8 border-white/5 shadow-2xl overflow-hidden min-h-[600px] flex flex-col relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/[0.02] pointer-events-none" />
            <HVChart weight={weight} altitude={altitude} condition={condition} />
          </div>
        </div>

      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Subcomponente: fila de métrica
// ────────────────────────────────────────────────────────────────────────────
type HighlightColor = 'amber' | 'red' | 'green';

function MetricRow({
  icon,
  label,
  value,
  sub,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  highlight: HighlightColor;
}) {
  const colors: Record<HighlightColor, string> = {
    amber: 'text-amber-400',
    red:   'text-red-400',
    green: 'text-green-400',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">{label}</p>
        <p className={`text-sm font-black truncate ${colors[highlight]}`}>{value}</p>
        <p className="text-[9px] text-white/25 uppercase tracking-widest">{sub}</p>
      </div>
    </div>
  );
}
