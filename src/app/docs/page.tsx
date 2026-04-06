"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Eye,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function DocsPage() {
  const { docs } = useAppStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredDocs = docs.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || d.cat === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', ...new Set(docs.map(d => d.cat))];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Módulo de Documentación
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">Audit-Ready</span>
          </h2>
          <p className="text-white/40 font-medium">Expediente técnico y manuales de vuelo AW109E</p>
        </div>
        
        <button className="btn-premium flex items-center gap-2 group py-3">
           <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
           Cargar Documento
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-light transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nombre de archivo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium pl-12"
          />
        </div>
        <div className="flex gap-2 p-1.5 glass rounded-2xl border-white/5">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                 filter === cat 
                   ? "bg-brand text-white shadow-lg" 
                   : "text-white/30 hover:text-white/60 hover:bg-white/5"
               }`}
             >
               {cat === 'all' ? 'Todos' : cat}
             </button>
           ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div 
            key={doc.id} 
            className="glass p-6 rounded-[2rem] border-white/5 group hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-brand/10 group-hover:text-brand-light transition-all duration-500 shadow-inner">
                {doc.icon}
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest block mb-1">Status</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                   doc.status.includes('✅') ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
                }`}>
                  {doc.status.replace('✅ ', '').replace('📤 ', '')}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <h3 className="text-xl font-display font-black text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors uppercase">{doc.name}</h3>
              <div className="flex flex-wrap gap-3 text-[10px] font-black text-white/50 uppercase tracking-[0.1em]">
                <span className="bg-white/10 px-2 py-0.5 rounded">{doc.cat}</span>
                <span className="px-2 py-0.5 rounded">{doc.size}</span>
                <span className="bg-blue-400/20 text-blue-200 px-2 py-0.5 rounded">{doc.date}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-3">
              <a 
                href={doc.url || '#'} 
                target="_blank" 
                rel="noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${
                  doc.url 
                    ? "bg-brand text-white shadow-lg shadow-brand/20 hover:shadow-brand/40" 
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                {doc.url?.startsWith('http') ? <ExternalLink className="w-3 h-3" /> : <Eye className="w-3.5 h-3.5" />}
                {doc.url?.startsWith('http') ? 'Abrir Link' : 'Ver PDF'}
              </a>
              <button 
                className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all"
                title="Descargar metadata"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
