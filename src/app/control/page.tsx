"use client";

import React, { useState } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Moon, 
  Eye, 
  Navigation,
  Thermometer,
  MoreVertical,
  Activity,
  Zap
} from 'lucide-react';

export default function MissionControlPage() {
  const [time, setTime] = useState(12);
  const [visibility, setVisibility] = useState(10);
  const [weather, setWeather] = useState('VFR');

  const weatherOptions = [
    { id: 'VFR', icon: <Sun />, label: 'Despejado' },
    { id: 'Partly', icon: <Cloud />, label: 'Nublado' },
    { id: 'Rain', icon: <CloudRain />, label: 'Lluvia' },
    { id: 'Storm', icon: <Zap />, label: 'Tormenta' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3 uppercase">
            Mission Control & Escenarios
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">LIVE COMMAND</span>
          </h2>
          <p className="text-white/40 font-medium">Gestión remota del entorno táctico para la certificación QTG.</p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 shadow-xl shadow-white/5 animate-pulse">
           <Activity className="w-4 h-4 text-brand-light" />
           <span className="text-[10px] font-black text-brand-light uppercase tracking-widest leading-none">CONECTADO AL SIMULADOR</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Environment Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Weather Selector */}
          <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
              <Cloud className="w-5 h-5 text-brand-light" /> Condiciones Meteorológicas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
               {weatherOptions.map(opt => (
                 <button 
                  key={opt.id}
                  onClick={() => setWeather(opt.id)}
                  className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] border transition-all duration-300 ${
                    weather === opt.id 
                    ? 'bg-brand border-brand text-white shadow-2xl shadow-brand/20 scale-105' 
                    : 'bg-white/5 border-white/5 text-white/30 hover:border-white/20'
                  }`}
                 >
                    <div className={weather === opt.id ? 'text-white' : 'text-brand-light'}>
                      {React.cloneElement(opt.icon as React.ReactElement<any>, { className: 'w-8 h-8' })}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">{opt.label}</span>
                 </button>
               ))}
            </div>
          </div>

          {/* Sliders Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
                    <Sun className="w-5 h-5 text-brand-light" /> Hora Local
                  </h3>
                  <span className="text-2xl font-black text-white italic">{time}:00</span>
                </div>
                <div className="space-y-4">
                  <input 
                    type="range" min="0" max="23" value={time} onChange={(e) => setTime(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand"
                  />
                  <div className="flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Moon className="w-3 h-3" /> NOCHE</span>
                    <span className="flex items-center gap-1">DÍA <Sun className="w-3 h-3" /></span>
                  </div>
                </div>
             </div>

             <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
                    <Eye className="w-5 h-5 text-brand-light" /> Visibilidad
                  </h3>
                  <span className="text-2xl font-black text-white italic">{visibility} NM</span>
                </div>
                <div className="space-y-4">
                  <input 
                    type="range" min="0" max="50" value={visibility} onChange={(e) => setVisibility(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand"
                  />
                  <div className="flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest">
                    <span>IMC (CAT III)</span>
                    <span>CAVOK</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="glass p-8 rounded-[3rem] border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
                <Navigation className="w-5 h-5 text-brand-light" /> Quick Presets
              </h3>
              <div className="space-y-3">
                 {['SADM (Base)', 'SABE (Aeroparque)', 'SAEZ (Ezeiza)', 'Toque y Motor'].map(preset => (
                   <button key={preset} className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-xs font-black text-white/40 uppercase tracking-widest hover:bg-brand/10 hover:text-brand-light hover:border-brand/30 transition-all text-left flex justify-between items-center group">
                      {preset}
                      <MoreVertical className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </button>
                 ))}
              </div>
              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Tempeatuta (ISA)</span>
                  <span className="text-xs font-black text-white flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-red-500" /> 15°C
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Viento (Surface)</span>
                  <span className="text-xs font-black text-white flex items-center gap-1">
                    <Wind className="w-3 h-3 text-blue-400" /> 240 / 08 KT
                  </span>
                </div>
              </div>
           </div>

           <button className="w-full p-6 rounded-[2rem] bg-amber-500 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-amber-500/20 active:scale-95 transition-all">
             Resetear Entorno Original
           </button>
        </div>
      </div>
    </div>
  );
}
