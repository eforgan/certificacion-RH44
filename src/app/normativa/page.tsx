"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  BookOpen, 
  ExternalLink, 
  ChevronRight,
  Gavel,
  FileText,
  AlertCircle
} from 'lucide-react';
import { NORMATIVA_DATA } from '@/lib/data';
import FSTDLevelsTable from '@/components/normativa/FSTDLevelsTable';

export default function NormativaPage() {
  const [search, setSearch] = useState('');

  const filtered = NORMATIVA_DATA.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-black text-white tracking-tight flex items-center gap-3 uppercase">
            Marco Normativo RAAC 60
            <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/10">Ed. 2022</span>
          </h2>
          <p className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Requisitos técnicos para Helo-FSTD (Nivel B / C / D)</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors w-5 h-5" />
        <input 
          type="text" 
          placeholder="BUSCAR EN REGULACIONES, APÉNDICES O CRITERIOS DE EVALUACIÓN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/10 border-2 border-white/10 p-6 pl-16 rounded-[2rem] text-white font-bold placeholder:text-white/20 focus:border-white/40 outline-none transition-all uppercase text-lg tracking-widest shadow-2xl"
        />
      </div>

      {/* Categories Table Section */}
      {!search && (
        <section className="animate-in fade-in slide-in-from-bottom-5 duration-700">
           <FSTDLevelsTable />
        </section>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
           {filtered.length === 0 ? (
             <div className="glass p-20 flex flex-col items-center justify-center text-white/20 gap-4 rounded-[2rem]">
                <AlertCircle className="w-12 h-12 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">No se encontraron coincidencias</p>
             </div>
           ) : (
             filtered.map((item, i) => (
               <div key={i} className="glass p-8 rounded-[2rem] border-white/5 hover:border-brand-light/20 transition-all duration-300 space-y-4 group">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-brand-light uppercase tracking-widest bg-brand/5 px-2 py-1 rounded-md">{item.id}</span>
                     <Gavel className="w-4 h-4 text-white/10 group-hover:text-brand-light transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white tracking-tight">{item.title}</h3>
                  <div className="text-sm text-white/50 leading-relaxed font-medium">
                     {item.content.split('\n').map((line, idx) => (
                       <p key={idx} className="mb-3">{line}</p>
                     ))}
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                     <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">ANAC Argentina · RAAC 60</span>
                     <button 
                       onClick={() => {
                         navigator.clipboard.writeText(`${item.title} - ${item.ref}`);
                         alert('Referencia copiada al portapapeles');
                       }}
                       className="text-[10px] font-bold text-brand-light uppercase tracking-widest flex items-center gap-2 hover:underline focus:outline-none"
                     >
                        Explorar Referencia
                        <ChevronRight className="w-3.5 h-3.5" />
                     </button>
                  </div>
               </div>
             ))
           )}
        </div>

        {/* Sidebar help */}
        <div className="space-y-8">
           <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-brand-light/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light/10 blur-3xl rounded-full" />
              <ShieldCheck className="text-brand-light w-10 h-10 mb-6" />
              <h3 className="text-lg font-display font-bold text-white mb-3">Guía de Cumplimiento</h3>
              <p className="text-xs text-white/40 leading-relaxed mb-6 font-medium">
                Esta sección contiene extractos clave de la RAAC Parte 60. Para una auditoría completa, recurra siempre al texto oficial vigente publicado en el Boletín Oficial.
              </p>
              <a 
                href="https://www.argentina.gob.ar/anac/normativa/raac" 
                target="_blank" 
                rel="noreferrer"
                className="btn-premium w-full flex items-center justify-center gap-2 group py-3.5 text-xs text-center"
              >
                Sitio Oficial ANAC
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                 <BookOpen className="text-accent w-5 h-5" />
                 <h4 className="font-display font-bold text-white">Niveles FSTD-H</h4>
              </div>
              <ul className="space-y-4">
                 {[
                   { n: 'Nivel 1', desc: 'Sistemas básicos + cockpit' },
                   { n: 'Nivel 2', desc: 'Visual HUD + Aerodinámica' },
                   { n: 'Nivel 3', desc: 'Movimiento + Visual FOV' },
                   { n: 'Nivel 4', desc: 'Simulación Total (Full Motion)' },
                 ].map((lvl, idx) => (
                   <li key={idx} className="flex items-center justify-between group cursor-help">
                      <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{lvl.n}</span>
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{lvl.desc}</span>
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
