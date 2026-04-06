"use client";

import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Trash2, 
  HardDrive, 
  Activity, 
  AlertTriangle,
  History,
  Terminal,
  Save
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function MantenimientoPage() {
  const { maintenanceLogs, addMaintenanceLog, resetState } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Correctivo');
  const [tech, setTech] = useState('F. MADERO');

  const handleSave = () => {
    if (!task) return;
    addMaintenanceLog({ task, category, technician: tech });
    setTask('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3 uppercase">
            Libro de Novedades Técnicas
            <span className="text-xs bg-white/10 text-white/40 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/5">
              {maintenanceLogs.length} LOGS
            </span>
          </h2>
          <p className="text-white/40 font-medium">Registro histórico de mantenimiento y actualizaciones del Simulador R44.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand text-white hover:bg-brand-light transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-brand/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Registrar Novedad
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Logs List */}
        <div className="lg:col-span-8 space-y-4">
          {maintenanceLogs.length === 0 ? (
             <div className="glass p-20 rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center space-y-4">
               <Terminal className="w-12 h-12 text-white/20" />
               <p className="text-white/20 text-sm font-bold uppercase tracking-[0.2em]">Sin entradas registradas en el log técnico.</p>
             </div>
          ) : (
            <div className="space-y-4">
              {maintenanceLogs.map((log: any) => (
                <div key={log.id} className="glass rounded-3xl p-6 border-white/5 flex items-start gap-4 group hover:border-brand/30 transition-all">
                  <div className={`p-4 rounded-2xl border ${
                    log.category === 'Crítico' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/5 border-white/10 text-white/40'
                  }`}>
                    {log.category === 'Crítico' ? <AlertTriangle className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black text-brand-light uppercase tracking-widest">{log.category}</span>
                         <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{log.time}</span>
                      </div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">TECO: {log.technician}</span>
                    </div>
                    <p className="text-white font-bold tracking-tight leading-relaxed">{log.task}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-8 rounded-[3rem] border-white/5 space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
              <Activity className="w-5 h-5 text-brand-light" /> Status de Mantenimiento
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">MTW (Mean Time)</span>
                <span className="text-sm font-black text-white italic tracking-widest">48.2 hrs</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Próxima Rev.</span>
                <span className="text-sm font-black text-amber-400 italic tracking-widest">15/05/2026</span>
              </div>
            </div>
            <button 
              onClick={() => { if(confirm('¿Limpiar histórico?')) resetState(); }}
              className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Resetear Logs
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
           <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setShowAdd(false)} />
           <div className="glass rounded-[3rem] p-10 border-white/10 w-full max-w-xl relative space-y-8 animate-scale-in">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight">Registar Novedad Técnica</h3>
                 <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Entrada formal para inspección de mantenimiento.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
                    <Wrench className="w-3 h-3 text-brand-light" /> Categoría de Entrada
                  </label>
                  <div className="flex gap-2">
                    {['Preventivo', 'Correctivo', 'Crítico', 'Update'].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`flex-1 p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                          category === cat ? 'bg-brand border-brand text-white shadow-lg shadow-brand/20' : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
                    <HardDrive className="w-3 h-3 text-brand-light" /> Descripción de la tarea
                   </label>
                   <textarea 
                     rows={5}
                     value={task}
                     onChange={(e) => setTask(e.target.value)}
                     placeholder="Ej: Calibración de sensor de presión en colectivo y actualización de firmware Varjo."
                     className="w-full bg-white/5 border border-white/5 p-6 rounded-3xl text-white font-medium focus:border-brand outline-none transition-all resize-none"
                   />
                </div>
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={() => setShowAdd(false)}
                   className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                 >
                   Cancelar
                 </button>
                 <button 
                   onClick={handleSave}
                   className="flex-1 p-4 rounded-2xl bg-brand text-white font-black text-[10px] uppercase tracking-widest hover:bg-brand-light transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand/20"
                 >
                   <Save className="w-4 h-4" /> Guardar Entrada
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
