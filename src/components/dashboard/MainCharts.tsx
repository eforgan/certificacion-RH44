"use client";

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useAppStore } from '@/store/useAppStore';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler
);

export default function MainCharts() {
  const { qtg } = useAppStore();

  const approved = qtg.filter(q => q.status === 'approved').length;
  const rejected = qtg.filter(q => q.status === 'rejected').length;
  const pending = qtg.filter(q => q.status === 'pending').length;

  const donutData = {
    labels: ['Aprobadas', 'Rechazadas', 'Pendientes'],
    datasets: [{
      data: [approved, rejected, pending],
      backgroundColor: ['rgba(16, 185, 129, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(255, 255, 255, 0.1)'],
      borderColor: ['#10b981', '#ef4444', 'rgba(255, 255, 255, 0.1)'],
      borderWidth: 2,
    }],
  };

  const categories = ['performance', 'handling', 'systems', 'emergency', 'visual', 'cabina'];
  const catNames = ['Performance', 'Maniobrabilidad', 'Sistemas', 'Emergencias', 'Visual', 'Cabina'];
  
  const barData = {
    labels: catNames,
    datasets: [
      {
        label: 'Aprobadas',
        data: categories.map(cat => qtg.filter(q => q.cat === cat && q.status === 'approved').length),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 8,
      },
      {
        label: 'Total',
        data: categories.map(cat => qtg.filter(q => q.cat === cat).length),
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 8,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: { size: 10, weight: 'bold' as const },
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 12 },
        cornerRadius: 12,
        displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <div className="glass p-8 rounded-[2rem] flex flex-col items-center">
        <h3 className="text-lg font-display font-bold text-white/80 self-start mb-8 tracking-tight">Estado de Aprobación QTG</h3>
        <div className="flex-1 w-full flex items-center justify-center relative scale-110">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-bold text-white">{Math.round((approved/qtg.length)*100)}%</span>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Auditado</span>
            </div>
            <Doughnut data={donutData} options={{ ...chartOptions, cutout: '75%', plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
        </div>
        <div className="mt-4 flex gap-4 text-[10px] font-bold text-white/30 uppercase tracking-wider">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> Aprobadas ({approved})</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-danger" /> Rechazadas ({rejected})</div>
        </div>
      </div>

      <div className="glass p-8 rounded-[2rem]">
        <h3 className="text-lg font-display font-bold text-white/80 mb-8 tracking-tight">Progreso por Categoría</h3>
        <div className="h-[280px]">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
