"use client";

import React, { useMemo } from 'react';
import { 
  Gamepad, 
  CheckCircle2, 
  AlertTriangle,
  Move,
  ChevronUp,
  RotateCcw,
  RefreshCw
} from 'lucide-react';
import { useTelemetry } from '../../hooks/useTelemetry';

export default function CalibracionPage() {
  const { data: tel } = useTelemetry(true);

  // Simulamos ejes basados en telemetría para demo
  const axes = useMemo(() => [
    { id: 'cyc-x', label: 'Cíclico Lateral (Roll)', val: (tel.ias % 40) - 20, min: -100, max: 100, unit: '°' },
    { id: 'cyc-y', label: 'Cíclico Long. (Pitch)', val: (tel.alt % 60) - 30, min: -100, max: 100, unit: '°' },
    { id: 'col', label: 'Colectivo (Pitch)', val: (tel.rpm / 2) + 20, min: 0, max: 100, unit: '%' },
    { id: 'ped', label: 'Pedales (Yaw)', val: (tel.ias % 30) - 15, min: -100, max: 100, unit: '°' },
  ], [tel]);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3 uppercase">
            Centro de Calibración de Mandos
            <span className="text-xs bg-brand/10 text-brand-light px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-brand/20">LIVE AXES</span>
          </h2>
          <p className="text-white/40 font-medium">Sincronización y monitoreo de los controles físicos del Robinson R44.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest">
            <RefreshCw className="w-4 h-4" /> Recargar Ejes
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand-light transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-brand/20">
            <CheckCircle2 className="w-4 h-4" /> Guardar Calibración
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual Axes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {axes.map(axis => (
            <div key={axis.id} className="glass p-8 rounded-[3rem] border-white/5 space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Move className="w-20 h-20 text-white" />
               </div>
               <div className="space-y-1 relative">
                  <p className="text-[10px] font-black text-brand-light uppercase tracking-widest">{axis.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{Math.round(axis.val)}</span>
                    <span className="text-sm font-bold text-white/20 uppercase">{axis.unit}</span>
                  </div>
               </div>

               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute inset-y-0 h-full bg-brand transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    style={{ 
                      left: axis.min < 0 ? '50%' : '0',
                      width: `${Math.abs((axis.val / (axis.max - axis.min)) * 100)}%`,
                      transform: axis.min < 0 && axis.val < 0 ? 'translateX(-100%)' : 'none'
                    }}
                  />
                  {axis.min < 0 && <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />}
               </div>

               <div className="flex justify-between items-center text-[9px] font-black text-white/20 uppercase tracking-widest">
                  <span>MIN: {axis.min}</span>
                  <span>MAX: {axis.max}</span>
               </div>
            </div>
          ))}
        </div>

        {/* Calibration Controls Details */}
        <div className="space-y-6">
          <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-brand-light" /> Ajustes de Sensibilidad
            </h3>
            
            <div className="space-y-8">
              {['Deadzone (Zona Muerta)', 'Sensibilidad (Curve)', 'Linealidad'].map(label => (
                <div key={label} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</span>
                    <span className="text-[10px] font-black text-brand-light uppercase tracking-widest bg-brand/10 px-2 py-1 rounded-lg">Default</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full relative">
                    <div className="absolute inset-y-0 left-0 w-1/4 bg-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 shadow-lg border-2 border-brand" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-4">
               <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
               <p className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest leading-relaxed">
                 Cualquier cambio en la linealidad de los mandos requiere una re-validación completa de las pruebas de Maniobrabilidad (Área 2) para asegurar la fidelidad del simulador.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
