import React, { useState } from 'react';
import { ArrowLeftRight, Weight, Navigation, Droplets, Ruler } from 'lucide-react';

export default function UnitConverter() {
  const [val, setVal] = useState<string>('');
  
  // Conversions
  const lbsToKg = (Number(val) * 0.453592).toFixed(2);
  const kgToLbs = (Number(val) * 2.20462).toFixed(2);
  const galToLts = (Number(val) * 3.78541).toFixed(2);
  const ltsToGal = (Number(val) * 0.264172).toFixed(2);
  const ftToM = (Number(val) * 0.3048).toFixed(2);
  const mToFt = (Number(val) * 3.28084).toFixed(2);

  return (
    <div className="glass p-8 rounded-[2.5rem] border-white/5 space-y-8">
      <div className="flex items-center gap-3">
        <ArrowLeftRight className="text-brand-light w-6 h-6" />
        <h3 className="text-2xl font-display font-bold text-white tracking-tight">
          Conversión de Unidades
        </h3>
      </div>

      <div className="relative">
        <input 
          type="number" 
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Ingrese un valor..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-display font-bold text-white focus:border-brand-light/50 outline-none transition-all placeholder:text-white/20"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-bold text-sm uppercase tracking-widest">
          Input
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Peso */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 group hover:border-brand/30 transition-colors">
          <div className="flex items-center gap-2 text-white/40 mb-2">
            <Weight className="w-4 h-4 text-brand-light" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Peso</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/40 font-bold">LBS &rarr; KG</span>
            <span className="text-white font-mono">{val ? lbsToKg : '0.00'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/40 font-bold">KG &rarr; LBS</span>
            <span className="text-white font-mono">{val ? kgToLbs : '0.00'}</span>
          </div>
        </div>

        {/* Combustible */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 group hover:border-brand/30 transition-colors">
          <div className="flex items-center gap-2 text-white/40 mb-2">
            <Droplets className="w-4 h-4 text-brand-light" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Volumen</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/40 font-bold">GAL &rarr; LTS</span>
            <span className="text-white font-mono">{val ? galToLts : '0.00'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/40 font-bold">LTS &rarr; GAL</span>
            <span className="text-white font-mono">{val ? ltsToGal : '0.00'}</span>
          </div>
        </div>

        {/* Altitud/Distancia */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 group hover:border-brand/30 transition-colors">
          <div className="flex items-center gap-2 text-white/40 mb-2">
            <Ruler className="w-4 h-4 text-brand-light" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Longitud</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/40 font-bold">FT &rarr; MTS</span>
            <span className="text-white font-mono">{val ? ftToM : '0.00'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/40 font-bold">MTS &rarr; FT</span>
            <span className="text-white font-mono">{val ? mToFt : '0.00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
