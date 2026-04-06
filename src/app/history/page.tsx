"use client";

import React from 'react';
import { 
  History, 
  Trash2, 
  FileText, 
  CheckCircle, 
  XCircle,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function HistoryPage() {
  const { sessions, resetState } = useAppStore();

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3 uppercase">
            Historial de Certificaciones
            <span className="text-xs bg-white/10 text-white/40 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/5">
              {sessions.length} Registros
            </span>
          </h2>
          <p className="text-white/40 font-medium whitespace-pre-line">Registro histórico de todas las corridas QTG completadas para este dispositivo.</p>
        </div>
        <button 
          onClick={() => { if(confirm('¿Resetear todo el historial?')) resetState(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <Trash2 className="w-4 h-4" />
          Limpiar Bases
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="glass p-20 rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-6 rounded-full bg-white/5 border border-white/5">
             <History className="w-12 h-12 text-white/20" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white/40 uppercase tracking-tight">Sin Sesiones Registradas</h3>
            <p className="text-white/20 text-sm max-w-xs uppercase font-bold tracking-widest">Completa una QTG para archivar resultados.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((sess: any) => (
            <div key={sess.id} className="glass rounded-3xl p-8 border-white/10 hover:border-brand/40 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <FileText className="w-24 h-24 text-white" />
              </div>
              
              <div className="space-y-6 relative">
                <div className="flex items-center gap-3 text-brand-light">
                   <Calendar className="w-4 h-4" />
                   <span className="text-xs font-black uppercase tracking-widest">{sess.date}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">{sess.id}</h4>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Ejecución Completa RAAC 60</p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                  <div className="space-y-1 text-center">
                    <span className="text-2xl font-black text-green-400">{sess.stats.approved}</span>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Aprobadas</p>
                  </div>
                  <div className="space-y-1 text-center border-l border-white/5">
                    <span className="text-2xl font-black text-red-400">{sess.stats.rejected}</span>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Rechazadas</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {sess.stats.rejected === 0 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">
                      {sess.stats.rejected === 0 ? 'CALIFICADO' : 'PENDIENTE RE-TEST'}
                    </span>
                  </div>
                  <button className="text-[10px] font-black text-brand-light uppercase tracking-widest hover:underline">
                    Ver Detalle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
