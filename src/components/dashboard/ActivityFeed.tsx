"use client";

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Clock, Activity as ActivityIcon } from 'lucide-react';

export default function ActivityFeed() {
  const { activity } = useAppStore();

  return (
    <div className="glass p-8 rounded-[2rem] flex flex-col h-[320px]">
      <div className="flex items-center gap-3 mb-6">
        <ActivityIcon className="text-brand-light w-5 h-5" />
        <h3 className="text-lg font-display font-bold text-white/80 tracking-tight">Actividad Reciente</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {activity.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-white/20 ">
            <Clock className="w-8 h-8 opacity-20 mb-2" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-center">Sin actividad aún</p>
          </div>
        ) : (
          activity.map((item, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="flex flex-col items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full ring-4 ring-white/5 group-hover:ring-white/10 transition-all shrink-0" 
                  style={{ backgroundColor: item.color }} 
                />
                <div className="w-px h-full bg-white/5 group-last:hidden" />
              </div>
              <div className="pb-2">
                <p className="text-xs font-semibold text-white/60 tracking-tight leading-relaxed group-hover:text-white transition-colors">{item.text}</p>
                <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest mt-1 block">{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
