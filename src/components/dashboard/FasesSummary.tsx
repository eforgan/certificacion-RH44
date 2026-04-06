"use client";

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { FASES_DATA } from '@/lib/data';

export default function FasesSummary() {
  const { reqs } = useAppStore();

  return (
    <div className="glass p-8 rounded-[2rem] space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-display font-bold text-white/80 tracking-tight">Progreso de Fases</h3>
        <button className="text-[10px] font-bold text-brand-light uppercase tracking-widest hover:underline">Ver todas</button>
      </div>
      <div className="space-y-5">
        {FASES_DATA.map((f) => {
          const done = f.requisitos.filter(r => reqs[r.id]).length;
          const total = f.requisitos.length;
          const pct = Math.round((done / total) * 100);
          
          return (
            <div key={f.n} className="space-y-2 group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-1.5 h-1.5 rounded-full ring-4 ring-white/5 group-hover:ring-white/10 transition-all" 
                    style={{ backgroundColor: f.color }}
                  />
                  <span className="text-xs font-bold text-white/60 tracking-tight">F{f.n} · {f.title.split('—')[1]?.trim()}</span>
                </div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{pct}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700" 
                  style={{ width: `${pct}%`, backgroundColor: f.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
