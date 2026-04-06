"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ScatterController,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { AW109E_SPECS } from '@/lib/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ScatterController,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  currentWeight: number;
  currentCG: number;
}

export default function WBChart({ currentWeight, currentCG }: Props) {
  const limits = AW109E_SPECS.rfm.cg.limits;
  
  const fwdLimit = limits.map(l => ({ x: l.fwd_mm, y: l.weight_kg }));
  const aftLimit = limits.map(l => ({ x: l.aft_mm, y: l.weight_kg }));

  const data = {
    datasets: [
      {
        label: 'Límite Delantero (STA)',
        data: fwdLimit,
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.2,
      },
      {
        label: 'Límite Trasero (STA)',
        data: aftLimit,
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 2,
        pointRadius: 0,
        fill: '+1',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        tension: 0.2,
      },
      {
        label: 'CG Actual',
        data: [{ x: currentCG, y: currentWeight }],
        backgroundColor: currentCG > 0 && currentWeight > 0 ? (currentWeight <= 3000 ? '#10b981' : '#ef4444') : 'transparent',
        borderColor: '#fff',
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
        type: 'scatter' as const,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        min: 2800,
        max: 3800,
        title: { display: true, text: 'Brazo Longitudinal (mm)', color: 'rgba(255,255,255,0.4)', font: { size: 10, weight: 'bold' } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
      },
      y: {
        min: 1500,
        max: 3200,
        title: { display: true, text: 'Masa Total (kg)', color: 'rgba(255,255,255,0.4)', font: { size: 10, weight: 'bold' } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => ` Peso: ${context.parsed.y} kg, CG: ${context.parsed.x} mm`
        }
      }
    }
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <Chart type="line" data={data as any} options={options} />
    </div>
  );
}
