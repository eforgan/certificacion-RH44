"use client";

import React from 'react';
import { 
  Library, 
  FileBox, 
  BookOpen, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function BibliotecaPage() {
  const manuals = [
    { id: 1, title: 'Robinson R44 II POH', date: 'Rev Dec 2023', size: '12.4 MB', type: 'Sustituto Oficial' },
    { id: 2, title: 'RAAC Parte 60 - FSTD', date: '2024 Argentina', size: '4.8 MB', type: 'Normativa' },
    { id: 3, title: '6XSIM R44 Master QTG', date: 'Versión 2.0', size: '2.1 MB', type: 'Certificación' },
    { id: 4, title: 'Manual Varjo XR4 Mixed Reality', date: 'Latest', size: '8.5 MB', type: 'Hardware' },
  ];

  const safetyNotices = [
    { id: 'SN-32', title: 'High Winds during Operation', severity: 'High' },
    { id: 'SN-44', title: 'Inadvertent IMC Avoidance', severity: 'Critical' },
    { id: 'SN-11', title: 'Low-G Hazards & Mast Bumping', severity: 'Critical' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3 uppercase">
            Recursos y Biblioteca Técnica
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">OFICIAL</span>
          </h2>
          <p className="text-white/40 font-medium">Material técnico para operación y certificación del simulador R44 II.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manuales Section */}
        <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
          <div className="flex items-center gap-3 text-white">
            <FileBox className="w-6 h-6 text-brand-light" />
            <h3 className="text-xl font-bold uppercase tracking-tight">Manuales de Vuelo y Operación</h3>
          </div>
          <div className="space-y-4">
            {manuals.map(man => (
              <div key={man.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                <div className="flex gap-4 items-center">
                   <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 group-hover:text-brand-light transition-all">
                      <BookOpen className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors uppercase tracking-widest leading-relaxed">{man.title}</h4>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{man.date} · {man.size}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[9px] font-black text-brand-light uppercase tracking-widest px-2 py-1 bg-brand/10 rounded-lg">{man.type}</span>
                   <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all">
                      <ExternalLink className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Notices Section */}
        <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
          <div className="flex items-center gap-3 text-white">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold uppercase tracking-tight">Robinson Safety Notices (SN)</h3>
          </div>
          <div className="space-y-4">
            {safetyNotices.map(sn => (
              <div key={sn.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                <div className="flex gap-4 items-center">
                   <div className={`p-3 rounded-xl border ${sn.severity === 'Critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                      <AlertTriangle className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors uppercase tracking-[0.05em]">{sn.id}: {sn.title}</h4>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.1em]">Prioridad de Seguridad: {sn.severity}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-2xl bg-brand/5 border border-brand/20">
             <p className="text-[10px] text-brand-light font-black uppercase tracking-[0.2em] leading-relaxed italic text-center">
               "Es responsabilidad del operador mantener vigentes las SN publicadas por Robinson Helicopter Co."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
