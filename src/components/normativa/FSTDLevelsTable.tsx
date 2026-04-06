"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Play, Zap, Monitor, Activity } from 'lucide-react';

const LEVELS = [
  { 
    cat: 'FTD Nivel 7', 
    type: 'Flight Training Device (Max Helo)',
    visual: 'Obligatorio (Visual Externo)', 
    motion: 'Base Fija / Vibración obligatoria', 
    fidelity: 'Modelo aerodinámico específico, alta fidelidad de sistemas' 
  },
  { 
    cat: 'FFS Nivel D', 
    type: 'Full Flight Simulator',
    visual: '150° Horiz / 40° Vert (Colimado)', 
    motion: '6 DOF (Ejes)', 
    fidelity: 'Máxima fidelidad, sonidos y efectos especiales' 
  },
  { 
    cat: 'FFS Nivel C', 
    type: 'Full Flight Simulator',
    visual: '75° H / 30° V', 
    motion: '6 DOF', 
    fidelity: 'Alta fidelidad' 
  },
  { 
    cat: 'FFS Nivel B', 
    type: 'Full Flight Simulator',
    visual: '75° H / 30° V', 
    motion: '3 DOF (Mínimo)', 
    fidelity: 'Fidelidad media/alta' 
  },
  { 
    cat: 'FTD Nivel 3', 
    type: 'Flight Training Device',
    visual: 'Variable', 
    motion: 'Base Fija', 
    fidelity: 'Sistemas específicos de aeronave' 
  },
  { 
    cat: 'FNPT II / III', 
    type: 'Flight & Navigation Procedures',
    visual: 'FOV Amplio', 
    motion: 'Base Fija', 
    fidelity: 'Procedimientos y navegación (MCC)' 
  }
];

export default function FSTDLevelsTable() {
  return (
    <div className="glass rounded-[2rem] overflow-hidden border-white/20 shadow-2xl">
      <div className="bg-white/10 p-8 border-b border-white/10">
        <h3 className="text-xl font-display font-black text-white uppercase tracking-tight flex items-center gap-3">
          <Activity className="text-blue-400" />
          Categorías FSTD y Características Técnicas
        </h3>
        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-2">Especificaciones de Calificación RAAC Parte 60</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest">
              <th className="px-8 py-6">Nivel / Categoría</th>
              <th className="px-6 py-6 border-l border-white/5">Sistema Visual</th>
              <th className="px-6 py-6 border-l border-white/5">Plataforma Mov.</th>
              <th className="px-6 py-6 border-l border-white/5">Fidelidad Técnica</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {LEVELS.map((lvl, i) => (
              <motion.tr 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-8 py-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">{lvl.cat}</span>
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">{lvl.type}</span>
                  </div>
                </td>
                <td className="px-6 py-8 border-l border-white/5">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold text-white/80">{lvl.visual}</span>
                  </div>
                </td>
                <td className="px-6 py-8 border-l border-white/5">
                  <div className="flex items-center gap-3">
                    <Box className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-bold text-white/80">{lvl.motion}</span>
                  </div>
                </td>
                <td className="px-6 py-8 border-l border-white/5">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-white/60 italic leading-relaxed">{lvl.fidelity}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-blue-500/10 p-6 flex items-center justify-center gap-4 border-t border-white/5">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest text-center">
          El simulador 6XSIM R44 II cumple con especificaciones de Nivel B con hardware certificado.
        </p>
      </div>
    </div>
  );
}
