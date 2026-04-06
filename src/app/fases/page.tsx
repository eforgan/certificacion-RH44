"use client";

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Layers,
  ArrowRight,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { FASES_DATA } from '@/lib/data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function FasesPage() {
  const { reqs, toggleReq, reqNotes, saveReqNote } = useAppStore();
  const [expanded, setExpanded] = useState<number[]>([1]);

  const toggleExpand = (n: number) => {
    setExpanded(prev => 
      prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]
    );
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Proceso de Certificación RAAC 60
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">6 Fases</span>
          </h2>
          <p className="text-white/40 font-medium">Cronograma de habilitación técnica ANAC</p>
        </div>
      </div>

      {/* Grid of Phases */}
      <div className="grid grid-cols-1 gap-8">
        {FASES_DATA.map((f) => {
          const isExpanded = expanded.includes(f.n);
          const doneCount = f.requisitos.filter(r => reqs[r.id]).length;
          const totalCount = f.requisitos.length;
          const pct = Math.round((doneCount / totalCount) * 100);
          
          return (
            <div 
              key={f.n} 
              className={cn(
                "glass rounded-[2.5rem] border-white/5 transition-all duration-500 overflow-hidden",
                isExpanded ? "ring-2 ring-brand-light/20 shadow-[0_32px_80px_rgba(0,0,0,0.5)]" : "hover:bg-white/[0.03]"
              )}
            >
              {/* Card Header */}
              <div 
                className="p-8 cursor-pointer flex items-center gap-6 select-none"
                onClick={() => toggleExpand(f.n)}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-display font-bold shadow-lg"
                  style={{ backgroundColor: `${f.color}22`, color: f.color, border: `1px solid ${f.color}44` }}
                >
                  {f.n}
                </div>
                
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-display font-bold text-white tracking-tight">{f.title}</h3>
                    {pct === 100 && <CheckCircle2 className="w-5 h-5 text-success" />}
                  </div>
                  <p className="text-sm text-white/40 font-medium line-clamp-1">{f.desc}</p>
                </div>

                <div className="flex items-center gap-8 px-6 border-l border-white/5">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Progreso</p>
                    <p className="text-xl font-display font-bold text-white leading-none">{pct}%</p>
                  </div>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/20 hover:text-white transition-all bg-white/5"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Progress Bar (Visible even when collapsed) */}
              <div className="h-1 w-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000" 
                  style={{ width: `${pct}%`, backgroundColor: f.color }}
                />
              </div>

              {/* Card Body (Expandable) */}
              {isExpanded && (
                <div className="p-10 bg-white/[0.01] border-t border-white/5 animate-fade-in-slow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Requirements List */}
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">Requisitos Mandatorios</h4>
                      <div className="space-y-5">
                        {f.requisitos.map((req) => (
                          <div 
                            key={req.id} 
                            className="flex items-start gap-4 group/item"
                          >
                            <button
                              onClick={() => toggleReq(req.id)}
                              className={cn(
                                "mt-0.5 w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center shadow-lg",
                                reqs[req.id] 
                                  ? "bg-success border-success text-white scale-110" 
                                  : "border-white/10 hover:border-white/30 text-transparent"
                              )}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <div className="flex-1 space-y-2">
                                <p className={cn(
                                    "text-sm font-medium leading-relaxed transition-colors",
                                    reqs[req.id] ? "text-white/60" : "text-white/90"
                                )}>
                                    {req.text}
                                </p>
                                <span className="text-[10px] font-bold text-brand-light/40 uppercase tracking-widest">{req.id}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Phase Status & Notes */}
                    <div className="space-y-8">
                       <div className="glass bg-white/[0.02] p-8 rounded-[2rem] border-white/5 relative overflow-hidden group">
                           <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                           <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Estado de Fase</h4>
                           {pct === 100 ? (
                             <div className="flex items-center gap-4 text-success">
                                <div className="p-3 bg-success/10 rounded-2xl"><CheckCircle2 className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wider">Completado ✓</p>
                                    <p className="text-xs text-success/60 font-medium">Toda la documentación verificada.</p>
                                </div>
                             </div>
                           ) : pct > 0 ? (
                             <div className="flex items-center gap-4 text-warning">
                                <div className="p-3 bg-warning/10 rounded-2xl"><Clock className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wider">En Progreso</p>
                                    <p className="text-xs text-warning/60 font-medium">Tareas pendientes de auditoría.</p>
                                </div>
                             </div>
                           ) : (
                             <div className="flex items-center gap-4 text-white/20">
                                <div className="p-3 bg-white/5 rounded-2xl"><AlertCircle className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wider text-white/40">Pendiente</p>
                                    <p className="text-xs text-white/20 font-medium">No se ha iniciado la fase.</p>
                                </div>
                             </div>
                           )}
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                            <FileText className="w-3 h-3 text-brand-light" />
                            Notas Técnicas de Fase
                          </label>
                          <textarea 
                            placeholder="Ingrese observaciones internas sobre esta fase..."
                            className="input-premium min-h-[150px] resize-none text-sm leading-relaxed"
                          />
                          <p className="text-[10px] text-white/20 italic text-right px-2 leading-relaxed">
                            Registro auditable por: <span className="font-bold text-brand-light/50">SISTEMA FSTD CERT</span>
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
