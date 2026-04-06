"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  ScatterController,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { R44_SPECS } from '@/lib/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
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
  const limits = R44_SPECS.poh.cg.limits;
  
  const fwdLimit = limits.map(l => ({ x: l.fwd_in, y: l.weight_lb }));
  const aftLimit = limits.map(l => ({ x: l.aft_in, y: l.weight_lb }));

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
        backgroundColor: currentCG > 0 && currentWeight > 0 ? (currentWeight <= 2500 ? '#10b981' : '#ef4444') : 'transparent',
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
        min: 88,
        max: 108,
        title: { display: true, text: 'Brazo Longitudinal (in)', color: 'rgba(255,255,255,0.4)', font: { size: 10, weight: 'bold' } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
      },
      y: {
        min: 1400,
        max: 2600,
        title: { display: true, text: 'Masa Total (lb)', color: 'rgba(255,255,255,0.4)', font: { size: 10, weight: 'bold' } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10 } }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => ` Peso: ${context.parsed.y} lb, CG: ${context.parsed.x} in`
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
