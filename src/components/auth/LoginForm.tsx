"use client";

import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const USERS = {
  'director@fstd.com':         { pass: 'demo123', name: 'Claudio San Pedro',   role: 'Director',        abbr: 'CSP', color: '#10b981' },
  'tecnico@fstd.com':          { pass: 'demo123', name: 'Ing. Laura Méndez',  role: 'Técnico FSTD',    abbr: 'TEC', color: '#3b82f6' },
  'operador@fstd.com':         { pass: 'demo123', name: 'Eduardo Forgan',     role: 'Operador',        abbr: 'FOR', color: '#f59e0b' },
  'inspector@anac.gob.ar':     { pass: 'demo123', name: 'Insp. Pablo Moreno', role: 'Inspector ANAC',  abbr: 'ANA', color: '#8b5cf6' },
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, logActivity } = useAppStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const u = USERS[email as keyof typeof USERS];
      if (u && u.pass === password) {
        const userData = { email, ...u };
        setUser(userData);
        logActivity(`Inicio de sesión: ${u.name} (${u.role})`, '#3b82f6');
      } else {
        setError('Credenciales inválidas. Revisá tus datos.');
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleDemoLogin = (mail: string) => {
    setEmail(mail);
    setPassword('demo123');
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="glass p-8 rounded-[2rem] border-white/10 hover:border-white/20 transition-all duration-500 shadow-[20px_40px_100px_rgba(0,0,0,0.5)] bg-[#1577c4]/40 backdrop-blur-xl">
        {/* Header with Logos */}
        <div className="text-center mb-6">
          <div className="flex flex-col gap-3 mb-6">
            <div className="aspect-[16/9] w-full bg-white/10 rounded-xl overflow-hidden shadow-inner border border-white/5">
              <img src="/img/logo_modena_ceac.png" alt="Modena CEAC" className="w-full h-full object-cover brightness-110" />
            </div>
            <div className="aspect-[16/9] w-full bg-white/10 rounded-xl overflow-hidden shadow-inner border border-white/5">
              <img src="/img/logo_6xsim.png" alt="6XSIM" className="w-full h-full object-cover brightness-110" />
            </div>
          </div>
          
          <div className="inline-flex w-12 h-12 rounded-2xl bg-white/20 items-center justify-center shadow-lg mb-4">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-black text-white mb-1 leading-tight tracking-tight uppercase italic">Acceso Seguro</h2>
          <p className="text-white/60 font-black uppercase text-[9px] tracking-[0.2em]">FSTD Certification Platform</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <div className="relative group">
              <Mail className="absolute left-4 top-4 text-white/20 group-focus-within:text-brand-light transition-colors w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email de usuario"
                className="input-premium pl-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <Lock className="absolute left-4 top-4 text-white/20 group-focus-within:text-brand-light transition-colors w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="input-premium pl-12"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-danger bg-danger/10 border border-danger/20 p-4 rounded-xl text-sm font-medium animate-shake">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-premium w-full py-4 text-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:translate-y-0"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Ingresar al Sistema
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Demo Users */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/20 mb-6 text-center leading-relaxed">Perfiles de demostración</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(USERS).map(([mail, u]) => (
              <button
                key={mail}
                onClick={() => handleDemoLogin(mail)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 text-left group"
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full ring-4 ring-white/5 group-hover:ring-white/10 transition-all"
                  style={{ backgroundColor: u.color }}
                />
                <span className="text-[11px] font-bold text-white/60 group-hover:text-white transition-colors">{u.abbr}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-center mt-10 text-white/20 text-xs font-medium tracking-wide">
        &copy; 2026 Modena CEAC · FSTD Certification Platform
      </p>
    </div>
  );
}
