"use client";

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import LoginForm from '@/components/auth/LoginForm';
import DashboardView from '@/components/dashboard/DashboardView';

export default function Home() {
  const { user } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Solucionar hidratación para Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <DashboardView />;
}
