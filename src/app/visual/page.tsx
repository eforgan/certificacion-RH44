"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Maximize2,
  Cpu,
  Layout,
  Wind,
  Weight,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const visualCards = [
  {
    id: 'helicopter',
    title: 'Robinson R44 II — Exterior',
    desc: 'Perfil aerodinámico del Raven II con motor Lycoming de inyección. Diseño optimizado para alta visibilidad y maniobrabilidad.',
    img: '/img/r44_exterior.png',
    type: 'Fotografía Real',
    tags: ['Aeronave', 'RHC', 'Raven II']
  },
  {
    id: 'cockpit-real',
    title: 'Cockpit Real Robinson R44 II',
    desc: 'Configuración de cabina estándar con cíclico tipo T-bar e instrumentación para certificación.',
    img: '/img/r44_cockpit.png',
    type: 'Fotografía Real',
    tags: ['Referencia', 'POH', 'Cabina']
  },
  {
    id: 'simulator',
    title: 'Réplica de Cabina 6XSIM — XR4',
    desc: 'Réplica física 1:1 equipada con visores Varjo XR4 de Realidad Mixta (XR). Integración perfecta de mandos físicos y entorno virtual.',
    img: '/img/r44_varjo_xr4.png',
    type: 'Mixed Reality',
    tags: ['Simulador', 'MR', 'Varjo XR4']
  }
];

const diagramCards = [
  {
    id: 'hv-curve',
    title: 'Curva Altura-Velocidad (H/V)',
    desc: 'Zonas de peligro para aterrizaje seguro en autorrotación.',
    longDesc: 'Este diagrama mapea las combinaciones críticas donde una falla de motor requiere una ejecución perfecta de autorrotación. El 6XSIM replica la caída de RPM y respuesta aerodinámica exacta del R44 II.',
    img: '/img/h_v_curve.png',
    icon: Wind,
    href: '/hv-curve'
  },
  {
    id: 'cg-envelope',
    title: 'Envolvente de CG',
    desc: 'Límites de peso y centro de gravedad para el Robinson R44 II.',
    longDesc: 'Define el polígono de estabilidad longitudinal. En el FSTD, exceder estos límites impacta en la autoridad del cíclico y requerimientos de potencia, validando la fidelidad del modelo matemático.',
    img: '/img/cg_envelope.png',
    icon: Weight,
    href: '/wb'
  }
];

export default function VisualPage() {
  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Recursos Visuales
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">6XSIM R44 II</span>
          </h2>
          <p className="text-white/40 font-medium">Sistema de Realidad Mixta (XR) y Especificaciones Técnicas</p>
        </div>
      </div>

      {/* Main Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {visualCards.map((card) => (
          <div key={card.id} className="glass rounded-[2.5rem] border-white/5 overflow-hidden group hover:shadow-[0_32px_120px_rgba(0,0,0,0.6)] transition-all duration-500 flex flex-col">
            <div className="relative aspect-video w-full overflow-hidden bg-white/5 border-b border-white/5 shadow-inner">
               <img 
                 src={card.img} 
                 alt={card.title} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            
            <div className="p-8 space-y-6 flex-1">
                <div className="flex flex-wrap gap-2">
                   {card.tags.map(tag => (
                     <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/10">{tag}</span>
                   ))}
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-white tracking-tight leading-tight">{card.title}</h3>
                    <p className="text-sm text-white/40 font-medium leading-relaxed italic">"{card.desc}"</p>
                </div>
                
                <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Layout className="w-4 h-4 text-brand-light" />
                      <span className="text-[10px] font-bold text-brand-light/60 uppercase tracking-widest leading-none">{card.type}</span>
                   </div>
                   <button className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
                      Detalles 
                      <ChevronRight className="w-3.5 h-3.5" />
                   </button>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Diagrams Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
          <div className="flex items-center gap-4">
              <Cpu className="text-brand-light w-6 h-6" />
              <h3 className="text-2xl font-display font-bold text-white tracking-tight">Ingeniería QTG</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
              {diagramCards.map((diag) => (
                <div key={diag.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative w-full md:w-40 h-40 bg-white/5 rounded-2xl border border-white/5 p-4 overflow-hidden">
                        <img 
                          src={diag.img} 
                          alt={diag.title} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                        />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                        <h4 className="text-xl font-display font-bold text-white tracking-tight">{diag.title}</h4>
                        <p className="text-xs text-white/40 leading-relaxed">{diag.longDesc}</p>
                        <div className="flex gap-3 pt-2">
                           <Link href={diag.href} className="text-[10px] font-bold text-brand-light uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                              Analizar Datos <ExternalLink className="w-3 h-3" />
                           </Link>
                        </div>
                    </div>
                </div>
              ))}
          </div>
        </div>

        {/* Visual System Specs */}
        <div className="flex flex-col gap-10">
          <div className="glass p-10 rounded-[3rem] border-white/5 flex-1 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full -mr-20 -mt-20" />
             <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-white">Sistemas Visuales XR</h3>
                <p className="text-white/30 text-sm italic">Integración de Realidad Mixta de última generación</p>
             </div>
             
             <div className="space-y-6">
                {[
                  { t: 'Varjo XR4 Vision', d: 'Resolución de 51 ppd que iguala la visión humana en el área de enfoque.' },
                  { t: 'Mixed Reality', d: 'Fusión perfecta de latencia ultra-baja entre el cockpit físico y mundo virtual.' },
                  { t: 'Certificación RAAC', d: 'Cumplimiento de requisitos de fidelidad visual para FTD Nivel 3 y superior.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-light mt-2" />
                    <div>
                      <h4 className="font-bold text-white/90 text-sm leading-none">{item.t}</h4>
                      <p className="text-xs text-white/40 leading-relaxed mt-1.5">{item.d}</p>
                    </div>
                  </div>
                ))}
             </div>

             <div className="pt-6 border-t border-white/5">
                <div className="p-6 rounded-3xl bg-brand/5 border border-brand/20 flex items-center justify-between">
                   <div>
                      <p className="text-[9px] font-black text-brand-light uppercase tracking-widest mb-1">Hardware Principal</p>
                      <p className="text-lg font-bold text-white">Varjo XR4 Focal Edition</p>
                   </div>
                   <ShieldCheck className="w-8 h-8 text-brand-light/40" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
