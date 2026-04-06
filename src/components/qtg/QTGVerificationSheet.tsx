"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Calendar, Clock, User, FileText } from 'lucide-react';
import { QTGTest } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface Props {
  test: QTGTest;
  onClose: () => void;
  currentIndex?: number;
  totalCount?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function QTGVerificationSheet({ test, onClose, currentIndex, totalCount, hasPrev, hasNext, onPrev, onNext }: Props) {
  const { user } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [evaluator, setEvaluator] = useState('');
  const [operator, setOperator] = useState(user?.name || '');
  const [comments, setComments] = useState('');
  const [date] = useState(new Date().toLocaleDateString('es-AR'));
  const [time] = useState(new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (isReady) onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* Backdrop */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 20, 50, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
        onClick={(e) => {
          if (isReady && e.target === e.currentTarget) handleClose();
        }} 
      />
      
      {/* Sheet Content — Optimized for 10" Tablet */}
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        style={{ position: 'relative', borderRadius: '8px', zIndex: 10000 }}
        className="bg-white text-slate-800 w-full max-w-4xl h-[90vh] overflow-hidden shadow-2xl flex flex-col border-[8px] border-white"
      >
        {/* Header */}
        <div className="bg-slate-100 p-6 border-b-2 border-slate-200 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="aspect-[16/9] w-28 bg-white/10 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                <img src="/img/logo_modena_ceac.png" alt="Modena CEAC" className="w-full h-full object-cover brightness-110" />
              </div>
              <div className="aspect-[16/9] w-28 bg-white/10 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                <img src="/img/logo_6xsim.png" alt="6XSIM" className="w-full h-full object-cover brightness-110" />
              </div>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Planilla de Verificación QTG</h1>
            <p className="text-sm font-bold text-blue-700 uppercase tracking-widest">Documento de Certificación RAAC 60 — Robinson R44 II</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            {/* Navegación entre planillas */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { if (hasPrev && onPrev) onPrev(); }}
                disabled={!hasPrev}
                className="w-12 h-12 rounded-xl bg-blue-600 disabled:bg-slate-200 text-white disabled:text-slate-400 font-black text-xl flex items-center justify-center transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed shadow"
                title="QTG Anterior"
              >
                ‹
              </button>
              {currentIndex != null && totalCount != null && (
                <span className="px-3 py-1 bg-slate-200 rounded-lg text-slate-700 font-black text-sm min-w-[64px] text-center">
                  {currentIndex} / {totalCount}
                </span>
              )}
              <button
                onClick={() => { if (hasNext && onNext) onNext(); }}
                disabled={!hasNext}
                className="w-12 h-12 rounded-xl bg-blue-600 disabled:bg-slate-200 text-white disabled:text-slate-400 font-black text-xl flex items-center justify-center transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed shadow"
                title="QTG Siguiente"
              >
                ›
              </button>
            </div>
            <button 
              onClick={handleClose}
              className="p-3 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-900"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* ID / Fecha / Hora */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-blue-600 block">ID Ensayo</label>
              <div className="text-lg font-mono font-bold text-slate-900">{test.id}</div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-blue-600 block">Categoría</label>
              <div className="text-lg font-bold text-slate-900 uppercase italic">{test.cat}</div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-blue-600 block">Fecha</label>
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Calendar size={18} className="text-blue-500" />{date}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-blue-600 block">Hora Registro</label>
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Clock size={18} className="text-blue-500" />{time}
              </div>
            </div>
          </div>

          {/* Operador / Evaluador */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-500 flex items-center gap-2">
                <User size={14} /> Nombre del Operador
              </label>
              <input 
                type="text" 
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                placeholder="Ingrese nombre del operador"
                className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-xl text-xl font-bold focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-500 flex items-center gap-2">
                <User size={14} /> Nombre del Evaluador / Inspector
              </label>
              <input 
                type="text" 
                value={evaluator}
                onChange={(e) => setEvaluator(e.target.value)}
                placeholder="Ingrese nombre del evaluador"
                className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-xl text-xl font-bold focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Maniobra y Parámetros */}
          <div className="space-y-6">
            <div className="border-l-8 border-blue-600 pl-6 space-y-2">
              <h3 className="text-xs font-black uppercase text-blue-600">Nombre de la Prueba / Maniobra</h3>
              <p className="text-2xl font-black text-slate-900 leading-tight">{test.name}</p>
            </div>

            {/* Procedimiento de Verificación — RAAC 60 */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h4 className="text-[11px] font-black uppercase text-blue-700 mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                Procedimiento de Verificación — {test.ref}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {test.procedure || 
                  `Ejecutar la maniobra "${test.name}" según las condiciones iniciales especificadas: ${test.cond}. Registrar el parámetro "${test.param}" expresado en ${test.unit}. El resultado debe ser comparado con el dato de vuelo de referencia del fabricante consignado en el QTG. Referencia normativa: ${test.ref}.`
                }
              </p>
            </div>

            {/* Parámetros del Manual de Operación (RFM) */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <h4 className="text-[11px] font-black uppercase text-amber-700 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                Parámetros del Manual de Operación — Robinson R44 II RFM
              </h4>
              {test.rfm_params && test.rfm_params.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {test.rfm_params.map((p, i) => (
                    <div key={i} className="bg-white rounded-xl border border-amber-100 p-3">
                      <span className="text-[9px] font-black uppercase text-amber-600 block mb-1">{p.label}</span>
                      <span className="text-base font-black text-slate-900">{p.value}</span>
                      {p.unit && <span className="text-[10px] font-bold text-slate-400 ml-1">{p.unit}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl border border-amber-100 p-3">
                    <span className="text-[9px] font-black uppercase text-amber-600 block mb-1">Parámetro a Medir</span>
                    <span className="text-sm font-black text-slate-900">{test.param}</span>
                    <span className="text-[10px] font-bold text-slate-400 ml-1">{test.unit}</span>
                  </div>
                  <div className="bg-white rounded-xl border border-amber-100 p-3">
                    <span className="text-[9px] font-black uppercase text-amber-600 block mb-1">Valor de Referencia RFM</span>
                    <span className="text-sm font-black text-slate-900">{test.ref_val}</span>
                  </div>
                  <div className="bg-white rounded-xl border border-amber-100 p-3">
                    <span className="text-[9px] font-black uppercase text-amber-600 block mb-1">Tolerancia RAAC 60</span>
                    <span className="text-sm font-black text-amber-700">{test.tol}</span>
                  </div>
                  <div className="bg-white rounded-xl border border-amber-100 p-3 col-span-2 md:col-span-3">
                    <span className="text-[9px] font-black uppercase text-amber-600 block mb-1">Condiciones Iniciales</span>
                    <span className="text-sm font-medium text-slate-700 italic">{test.cond}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Observaciones */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-slate-500 flex items-center gap-2">
              <FileText size={14} /> Observaciones del Inspector
            </label>
            <textarea 
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Describa cualquier desviación o comentario técnico aquí..."
              className="w-full bg-slate-50 border-2 border-slate-200 p-6 rounded-2xl text-lg font-medium focus:border-blue-500 outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-8 border-t-2 border-slate-200 flex gap-6">
          <button 
            onClick={handleClose}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg shadow-green-900/20 transition-all active:scale-95"
          >
            <CheckCircle2 size={28} />
            CUMPLE QTG
          </button>
          <button 
            onClick={handleClose}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border-2 border-red-200 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            <AlertCircle size={28} />
            NO CUMPLE
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
