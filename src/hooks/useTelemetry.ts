import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

interface TelemetryData {
  alt: number;      // ft
  ias: number;      // kt
  rpm: number;      // %
  map: number;      // inHg
  vsi: number;      // fpm
  timestamp: number;
}

export const useTelemetry = (active: boolean) => {
  const [data, setData] = useState<TelemetryData>({
    alt: 2000,
    ias: 0,
    rpm: 101.5,
    map: 15.2,
    vsi: 0,
    timestamp: Date.now()
  });

  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        alt: Math.round(1980 + Math.random() * 40),
        ias: Math.round(52 + Math.random() * 6),
        rpm: Number((101.2 + Math.random() * 0.6).toFixed(1)),
        map: Number((22.1 + Math.random() * 0.4).toFixed(1)),
        vsi: Math.round(-100 + Math.random() * 200),
        timestamp: Date.now()
      }));
    }, 500);

    return () => clearInterval(interval);
  }, [active]);

  const toggleCapture = () => setIsCapturing(!isCapturing);

  return { data, isCapturing, toggleCapture };
};

export const checkTolerance = (val: number, ref: number, tol: number) => {
  return Math.abs(val - ref) <= tol;
};
