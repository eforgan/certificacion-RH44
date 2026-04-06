import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QTGTest, Fase, Documento, User, Activity, Snapshot, Category } from '../types';
import { QTG_DATA, FASES_DATA, DOCS_DATA } from '../lib/data';

interface AppState {
  user: User | null;
  qtg: QTGTest[];
  reqs: Record<string, boolean>;
  reqNotes: Record<string, string>;
  docs: Documento[];
  activity: Activity[];
  snapshots: Snapshot[];
  checklist: Record<string, boolean>;
  
  // Actions
  setUser: (user: User | null) => void;
  updateQTG: (id: string, updates: Partial<QTGTest>) => void;
  toggleReq: (id: string) => void;
  saveReqNote: (id: string, note: string) => void;
  logActivity: (text: string, color?: string) => void;
  addDocument: (doc: Documento) => void;
  toggleChecklist: (id: string) => void;
  addSnapshot: (snapshot: Snapshot) => void;
  resetState: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      qtg: QTG_DATA,
      reqs: FASES_DATA.reduce((acc, f) => {
        f.requisitos.forEach(r => { acc[r.id] = r.done; });
        return acc;
      }, {} as Record<string, boolean>),
      reqNotes: {},
      docs: DOCS_DATA,
      activity: [],
      snapshots: [],
      checklist: {},

      setUser: (user) => set({ user }),
      
      updateQTG: (id, updates) => set((state) => ({
        qtg: state.qtg.map(q => q.id === id ? { ...q, ...updates } : q)
      })),

      toggleReq: (id) => set((state) => ({
        reqs: { ...state.reqs, [id]: !state.reqs[id] }
      })),

      saveReqNote: (id, note) => set((state) => ({
        reqNotes: { ...state.reqNotes, [id]: note }
      })),

      logActivity: (text, color = '#64748b') => set((state) => ({
        activity: [
          { text, color, time: new Date().toLocaleString('es-AR') },
          ...state.activity.slice(0, 49)
        ]
      })),

      addDocument: (doc) => set((state) => ({
        docs: [doc, ...state.docs]
      })),

      toggleChecklist: (id) => set((state) => ({
        checklist: { ...state.checklist, [id]: !state.checklist[id] }
      })),

      addSnapshot: (snapshot) => set((state) => {
        const last = state.snapshots[state.snapshots.length - 1];
        if (last && last.date === snapshot.date) {
            return { snapshots: [...state.snapshots.slice(0, -1), snapshot] };
        }
        return { snapshots: [...state.snapshots.slice(-59), snapshot] };
      }),

      resetState: () => set({
        qtg: QTG_DATA,
        reqs: FASES_DATA.reduce((acc, f) => {
          f.requisitos.forEach(r => { acc[r.id] = r.done; });
          return acc;
        }, {} as Record<string, boolean>),
        reqNotes: {},
        docs: DOCS_DATA,
        activity: [],
        snapshots: [],
        checklist: {},
      }),
    }),
    {
      name: 'fstd-aw109e-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
