"use client";

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  AlertCircle, 
  FileCheck, 
  Layers,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { FASES_DATA } from '@/lib/data';

export default function SummaryCards() {
  const { qtg, docs, reqs } = useAppStore();

  const approved = qtg.filter(q => q.status === 'approved').length;
  const rejected = qtg.filter(q => q.status === 'rejected').length;
  const docsOk = docs.filter(d => d.status.includes('✅')).length;
  
  let currentFase = 1;
  FASES_DATA.forEach((f, i) => {
    const done = f.requisitos.filter(r => reqs[r.id]).length;
    if (done === f.requisitos.length) currentFase = Math.min(i + 2, 6);
  });

  const cards = [
    { 
      label: 'Pruebas QTG', 
      value: `${approved}/${qtg.length}`, 
      sub: `${Math.round((approved/qtg.length)*100)}% Completado`,
      icon: CheckCircle, 
      color: 'text-success',
      bg: 'bg-success/10',
      trend: '+12%',
      href: '/qtg'
    },
    { 
      label: 'Documentos', 
      value: docsOk.toString(), 
      sub: 'Archivos Verificados',
      icon: FileCheck, 
      color: 'text-brand-light',
      bg: 'bg-brand-light/10',
      trend: 'ESTABLE',
      href: '/biblioteca'
    },
    { 
      label: 'Fase de Certificación', 
      value: `Fase ${currentFase}`, 
      sub: FASES_DATA[currentFase-1]?.title.split('—')[1]?.trim() || 'Completado',
      icon: Layers, 
      color: 'text-accent',
      bg: 'bg-accent/10',
      trend: `${currentFase}/6`,
      href: '/fases'
    },
    { 
      label: 'Observaciones', 
      value: rejected.toString(), 
      sub: 'Requieren Acción',
      icon: AlertCircle, 
      color: rejected > 0 ? 'text-danger' : 'text-white/20',
      bg: rejected > 0 ? 'bg-danger/10' : 'bg-white/5',
      trend: rejected > 0 ? 'CRITICO' : '0',
      href: '/qtg'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <Link 
          key={i} 
          href={card.href}
          className="glass p-6 rounded-3xl group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden block"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start justify-between">
            <div className={`p-4 rounded-2xl ${card.bg} ${card.color} shadow-lg shadow-black/20`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-white/20 tracking-widest bg-white/5 px-2 py-1 rounded-md uppercase">{card.trend}</span>
                <TrendingUp className="w-3 h-3 text-white/10 mt-1" />
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider">{card.label}</h4>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-display font-bold text-white leading-none">{card.value}</span>
            </div>
            <p className="text-xs text-white/30 mt-3 font-medium flex items-center gap-1">
               {card.sub}
               <ArrowUpRight className="w-3 h-3 opacity-50" />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
