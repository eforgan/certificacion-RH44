"use client";

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  Cpu, 
  Wifi, 
  RefreshCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function MonitorPage() {
  const [metrics, setMetrics] = useState({
    latency: 14.2,
    fps: 90,
    cpuLoad: 42,
    gpuLoad: 68,
    temp: 36,
    connection: 'stable'
  });

  // Simulamos fluctuación de telemetría hardware
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        latency: Number((13.5 + Math.random() * 2).toFixed(1)),
        fps: Math.round(88 + Math.random() * 4),
        cpuLoad: Math.round(40 + Math.random() * 10),
        gpuLoad: Math.round(65 + Math.random() * 8)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3 uppercase">
            Estatus del Sistema Hardware
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">Real-Time</span>
          </h2>
          <p className="text-white/40 font-medium">Monitoreo de latencia y performance Varjo XR4 Focal Edition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latencia Card */}
        <div className="glass rounded-[2rem] p-8 border-white/5 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full -mr-16 -mt-16 transition-colors ${metrics.latency < 20 ? 'bg-green-500/10' : 'bg-red-500/10'}`} />
          <div className="space-y-6 relative">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-brand/20 transition-colors">
                <Zap className="w-6 h-6 text-brand-light" />
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-[10px] font-black text-green-400 uppercase tracking-widest border border-green-500/20">Certificado RAAC</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Latencia Motion-to-Photon</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-5xl font-display font-black text-white">{metrics.latency}</h3>
                <span className="text-xl font-bold text-white/20">ms</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase">
                 <span>Performance</span>
                 <span>{metrics.latency < 20 ? 'Excelente' : 'Nominal'}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-light transition-all duration-1000" 
                  style={{ width: `${(metrics.latency / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FPS Card */}
        <div className="glass rounded-[2rem] p-8 border-white/5 relative overflow-hidden group">
          <div className="space-y-6 relative">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-brand/20 transition-colors">
                <RefreshCcw className="w-6 h-6 text-brand-light" />
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Locked</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Frecuencia de Actualización</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-5xl font-display font-black text-white">{metrics.fps}</h3>
                <span className="text-xl font-bold text-white/20">Hz</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
               <CheckCircle2 className="w-5 h-5 text-brand-light" />
               <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Sincronización Vertical Activa</p>
            </div>
          </div>
        </div>

        {/* CPU/GPU Card */}
        <div className="glass rounded-[2rem] p-8 border-white/5 relative overflow-hidden group">
          <div className="space-y-8 relative">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <div className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5" /> CPU Load</div>
                <span className="text-white/60">{metrics.cpuLoad}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand/60 transition-all duration-1000" style={{ width: `${metrics.cpuLoad}%` }} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5" /> GPU Load</div>
                <span className="text-white/60">{metrics.gpuLoad}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand-light transition-all duration-1000" style={{ width: `${metrics.gpuLoad}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3 uppercase tracking-tight">
            Conectividad Varjo Base
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Display Port 1.4', status: 'connected' },
              { label: 'USB-C Data Link', status: 'connected' },
              { label: 'Inside-out Tracking', status: 'stable' },
              { label: 'Foveated Rendering', status: 'active' }
            ].map(item => (
              <div key={item.label} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                <span className="text-sm font-bold text-white/60 uppercase tracking-widest">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-brand-light uppercase tracking-widest">{item.status}</span>
                  <CheckCircle2 className="w-5 h-5 text-brand-light" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border-white/5 flex flex-col justify-center items-center text-center space-y-6 bg-brand/5 relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
           <Wifi className="w-16 h-16 text-brand-light mb-4 animate-pulse relative" />
           <div className="space-y-2 relative">
             <h4 className="text-2xl font-black text-white uppercase tracking-tight">Sim Link Estable</h4>
             <p className="text-white/40 text-sm max-w-xs mx-auto italic">"Conectado a la suite 6XSIM. Transfiriendo telemetría de vuelo a 60Hz."</p>
           </div>
           <button className="px-8 py-4 rounded-2xl bg-brand-light text-slate-900 font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
             Reiniciar Conexión UDP
           </button>
        </div>
      </div>
    </div>
  );
}
