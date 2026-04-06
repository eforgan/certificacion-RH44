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

  return (
    <>
      {!user ? (
        <div className="fixed inset-0 z-[100] bg-bg-deep overflow-y-auto overflow-x-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="fixed -top-[20%] -left-[10%] w-[50%] h-[60%] bg-brand/10 blur-[120px] rounded-full" />
            <div className="fixed -bottom-[20%] -right-[10%] w-[50%] h-[60%] bg-accent/10 blur-[120px] rounded-full" />
          </div>
          <div className="min-h-full w-full flex items-center justify-center py-12 px-4 relative z-10">
            <LoginForm />
          </div>
        </div>
      ) : (
        <DashboardView />
      )}
    </>
  );
}
