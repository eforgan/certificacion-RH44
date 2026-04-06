"use client";

import React from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  Circle,
  Zap,
  Cpu,
  Monitor,
  Volume2,
  Wind,
  ShieldCheck
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PRE_FLIGHT_DATA } from '../../lib/data';

export default function PreFlightPage() {
  const { preFlightChecklist, togglePreFlight } = useAppStore();

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Energía': return <Zap className="w-5 h-5" />;
      case 'Hardware': return <Cpu className="w-5 h-5" />;
      case 'Software': return <Monitor className="w-5 h-5" />;
      case 'Audio': return <Volume2 className="w-5 h-5" />;
      case 'Vibración': return <Wind className="w-5 h-5" />;
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const progress = Math.round(
    (Object.values(preFlightChecklist).filter(Boolean).length / PRE_FLIGHT_DATA.length) * 100
  );

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3 uppercase">
            Check-in Pre-Vuelo FSTD
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">EQUIPO LISTO</span>
          </h2>
          <p className="text-white/40 font-medium">Verificación técnica de hardware y sistemas antes de la sesión de QTG.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
           <div className="text-right">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Preparación</p>
              <p className="text-xl font-black text-brand-light">{progress}%</p>
           </div>
           <div className="w-12 h-12 rounded-full border-4 border-white/5 flex items-center justify-center relative">
              <div 
                className="absolute inset-0 rounded-full border-4 border-brand-light transition-all duration-700"
                style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
              />
              <ClipboardCheck className="w-5 h-5 text-brand-light" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRE_FLIGHT_DATA.map((item) => {
          const isDone = preFlightChecklist[item.id];
          return (
            <button
              key={item.id}
              onClick={() => togglePreFlight(item.id)}
              className={`flex items-center gap-6 p-6 rounded-3xl border transition-all duration-300 text-left group ${
                isDone 
                ? 'bg-brand/10 border-brand/30 shadow-lg shadow-brand/5' 
                : 'bg-white/5 border-white/5 hover:border-white/20'
              }`}
            >
              <div className={`p-4 rounded-2xl transition-all ${
                isDone ? 'bg-brand text-white scale-110 shadow-lg' : 'bg-white/5 text-white/30 group-hover:text-white'
              }`}>
                {getIcon(item.cat)}
              </div>
              <div className="flex-1 space-y-1">
                <p className={`text-[10px] font-black uppercase tracking-widest ${isDone ? 'text-brand-light' : 'text-white/20'}`}>
                  {item.cat}
                </p>
                <h4 className={`text-lg font-bold leading-tight ${isDone ? 'text-white' : 'text-white/60'}`}>
                  {item.task}
                </h4>
              </div>
              <div className={`transition-all ${isDone ? 'text-brand-light' : 'text-white/10'}`}>
                {isDone ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
              </div>
            </button>
          );
        })}
      </div>

      {progress === 100 && (
        <div className="p-8 rounded-[3rem] bg-gradient-to-r from-brand to-brand-dark shadow-2xl flex items-center justify-between animate-bounce-subtle">
           <div className="space-y-1">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">¡Helicóptero en Línea!</h3>
              <p className="text-white/70 font-bold text-sm uppercase tracking-widest">Todos los sistemas operativos para certificación.</p>
           </div>
           <button className="px-8 py-4 bg-white text-brand font-black rounded-2xl hover:scale-105 transition-transform uppercase tracking-widest shadow-xl">
             Iniciar QTG Ahora
           </button>
        </div>
      )}
    </div>
  );
}
