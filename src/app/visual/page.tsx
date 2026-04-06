"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Maximize2,
  Info,
  Cpu,
  Layout,
  Wind,
  Weight,
  Layers,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const visualCards = [
  {
    id: 'helicopter',
    title: 'Robinson R44 II — Exterior',
    desc: 'Helicóptero ligero con motor a pistón de alta performance seleccionado para el FSTD.',
    img: '/img/aw109e_exterior.jpg',
    type: 'Fotografía Real',
    tags: ['Aeronave', 'Diseño']
  },
  {
    id: 'cockpit-real',
    title: 'Cockpit Real Robinson R44 II',
    desc: 'Configuración original del fabricante Robinson Helicopter para referencia.',
    img: '/img/aw109e_cockpit.jpg',
    type: 'Fotografía Real',
    tags: ['Instrumental', 'Referencia']
  },
  {
    id: 'simulator',
    title: 'Réplica de Cabina 6XSIM',
    desc: 'Implementación del simulador con sistemas y aviónica integrados.',
    img: '/img/simulator_cockpit.png',
    type: 'Render / Foto',
    tags: ['Simulador', 'Hardware']
  }
];

const diagramCards = [
  {
    id: 'hv-curve',
    title: 'Curva Altura-Velocidad (H/V)',
    desc: 'Zonas de peligro para aterrizaje seguro en autorrotación.',
    longDesc: 'Este diagrama, fundamental para la certificación RAAC 60, mapea las combinaciones críticas de altitud y velocidad donde una falla de motor dejaría a la aeronave sin inercia suficiente para ejecutar una autorrotación segura. El FSTD demuestra precisión al replicar la caída de RPM del rotor y la respuesta aerodinámica dentro de estos márgenes para instruir al piloto.',
    img: '/img/h_v_curve.png',
    icon: Wind,
    href: '/hv-curve'
  },
  {
    id: 'cg-envelope',
    title: 'Envolvente de CG',
    desc: 'Límites de peso y centro de gravedad para el Robinson R44 II.',
    longDesc: 'La envolvente de Centro de Gravedad define el polígono de estabilidad longitudinal de la aeronave en relación a su MTOW. En el entorno simulado, exceder estos límites impacta en la autoridad del control cíclico y en los requerimientos de potencia. El modelo matemático del simulador es sometido a prueba cargando asimetrías extremas para validar su fidelidad técnica.',
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
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">Diagramas Técnicos</span>
          </h2>
          <p className="text-white/40 font-medium">Modelado y referencias del 6XSIM R44 II Raven II</p>
        </div>
      </div>

      {/* Main Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {visualCards.map((card) => (
          <div key={card.id} className="glass rounded-[2.5rem] border-white/5 overflow-hidden group hover:shadow-[0_32px_120px_rgba(0,0,0,0.6)] transition-all duration-500 flex flex-col">
            <div className="relative aspect-video w-full overflow-hidden bg-white/5 border-b border-white/5 shadow-inner">
               <Image 
                 src={card.img} 
                 alt={card.title} 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
               <button className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10">
                  <Maximize2 className="w-4 h-4" />
               </button>
            </div>
            
            <div className="p-8 space-y-6 flex-1">
                <div className="flex flex-wrap gap-2">
                   {card.tags.map(tag => (
                     <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/10">{tag}</span>
                   ))}
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-white tracking-tight leading-tight">{card.title}</h3>
                    <p className="text-sm text-white/40 font-medium leading-relaxed">{card.desc}</p>
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
      <div className="space-y-8">
        <div className="flex items-center gap-4">
            <Cpu className="text-brand-light w-6 h-6" />
            <h3 className="text-2xl font-display font-bold text-white tracking-tight">Diagramas de Ingeniería QTG</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diagramCards.map((diag) => (
              <div key={diag.id} className="glass rounded-[2.5rem] border-white/5 p-10 flex flex-col md:flex-row gap-10 items-center hover:bg-white/[0.02] transition-colors group">
                  <div className="relative w-full md:w-56 h-56 bg-white/5 rounded-[2rem] border border-white/5 p-6 shadow-inner group-hover:border-brand-light/20 transition-colors">
                      <Image 
                        src={diag.img} 
                        alt={diag.title} 
                        fill 
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
                      />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-brand-light mb-1">
                            <diag.icon className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Validación 6XSIM</span>
                        </div>
                        <h4 className="text-2xl font-display font-bold text-white tracking-tight leading-tight">{diag.title}</h4>
                        <p className="text-sm font-bold text-white/70 leading-relaxed mb-1">{diag.desc}</p>
                        <p className="text-sm text-white/40 font-medium leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 shadow-inner mt-2">{diag.longDesc}</p>
                      </div>

                      <div className="flex gap-4 pt-4">
                         <Link href={diag.href} className="btn-premium flex-1 py-3 group flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold">
                            Analizar Datos 
                            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                         </Link>
                         <button onClick={() => window.print()} className="flex-1 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-white/40 font-bold uppercase tracking-widest text-[10px] hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            Guardar PDF
                         </button>
                      </div>
                  </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

