import { QTGTest, Fase, Documento, NormativaItem, Category } from '../types';

export const R44_SPECS = {
  poh: {
    weights: {
      mtow_lb: 2500, mtow_kg: 1134,
      min_lb: 1600, min_kg: 726,
      seat_max_lb: 300, baggage_max_lb: 50,
      pilot_min_lb: 150
    },
    cg: {
      datum: '100 in. adelante de mástil rotor principal',
      limits: [
        { weight_lb: 1600, fwd_in: 92.0, aft_in: 102.5, lat_in: 3.0 },
        { weight_lb: 2100, fwd_in: 92.0, aft_in: 102.5, lat_in: 3.0 },
        { weight_lb: 2300, fwd_in: 92.0, aft_in: 100.25, lat_in: 1.5 },
        { weight_lb: 2500, fwd_in: 93.0, aft_in: 98.0, lat_in: 0 }
      ]
    },
    speeds: {
      vne_lt2200: 130, vne_gt2200: 120, vne_autorot: 100,
      vy: 55, climb: 60, cruise_rec: 110, cruise_range: 100,
      turb: '60–70', autorot_range: 90, autorot_min_sink: 55
    },
    engine: {
      model: 'Lycoming IO-540-AE1A5',
      type: '6 cil, enfriado por aire, inyección combustible',
      displacement_in3: 541.5,
      mcp_bhp: 205, mcp_rpm: 2718, mcp_pct: 102,
      top_bhp: 245, top_rpm: 2718, top_limit_min: 5,
      cht_max_f: 500, cht_max_c: 260,
      oil_temp_max_f: 245, oil_temp_max_c: 118,
      oil_press_min_psi: 55, oil_press_max_psi: 95,
      map_green_in: '15.0–23.3', map_red_in: 26.1,
      top_map_offset_in: 2.8
    },
    rotor: {
      power_on_max_pct: 102, power_on_min_pct: 101,
      power_off_max_pct: 108, power_off_min_pct: 90,
      low_rpm_alarm_pct: 97,
      max_rpm: 400, min_rpm_po: 404, max_rpm_poff: 432, min_rpm_poff: 360,
    },
    altitude: {
      density_max_ft: 14000, agl_max_ft: 9000,
      ige_hover_da_ft: 9800, ige_wind_kt: 17
    },
    hydraulics: {
      press_min_psi: 450, press_max_psi: 500,
      fluid: 'MIL-H-5606', servos: 3
    },
    fuel: {
      main_total_gal: 30.5, main_usable_gal: 29.5,
      aux_total_gal: 17.2, aux_usable_gal: 17.0,
      low_fuel_gal: 3, low_fuel_time_min: 10,
      consumption_gph: 15, fuel_type: '100LL'
    },
    autorot: {
      speed_max_range_kias: 90, speed_min_sink_kias: 55,
      glide_ratio: '4.7:1',
      range_per_1000ft_nm: '1 NM / 1,300 ft',
      sink_max_range_fpm: 1900, sink_min_rate_fpm: 1350
    }
  }
};

export const QTG_DATA: QTGTest[] = [
  // AREA 1 — PERFORMANCE Y VUELO ESTACIONARIO
  { id:'QTG-01-001', cat:'performance', critical:false,
    name:'Vuelo Estacionario IGE', ref:'POH §5 / RAAC60',
    param:'MAP en estacionario IGE (~5 ft AGL)', unit:'inHg',
    ref_val:'Según carta IGE (POH §5)', tol:'± 2 inHg',
    cond:'ISA, MSL, 0 kt, 2.200 lb', status:'pending',
    procedure:'Elevar a estacionario IGE (~5 ft) y estabilizar 30 seg. Medir MAP requerida.',
    rfm_params:[{label:'Peso', value:'2.200 lb'}, {label:'Viento', value:'0 kt'}, {label:'Tolerancia', value:'± 2 inHg'}]
  },
  { id:'QTG-01-002', cat:'performance', critical:false,
    name:'Vuelo Estacionario OGE', ref:'POH §5',
    param:'MAP en estacionario OGE (≥20 ft AGL)', unit:'inHg',
    ref_val:'Según carta OGE (POH §5)', tol:'± 2 inHg',
    cond:'ISA, MSL, 0 kt, 2.200 lb', status:'pending',
    procedure:'Elevar a ≥ 20 ft AGL, estabilizar 30 seg. Medir MAP requerida.',
    rfm_params:[{label:'Altura mínima', value:'≥20 ft AGL'}, {label:'Tolerancia', value:'± 2 inHg'}]
  },
  { id:'QTG-01-004', cat:'performance', critical:false,
    name:'Mejor Tasa de Ascenso (Vy)', ref:'POH §5',
    param:'Tasa de ascenso a 55 KIAS', unit:'FPM',
    ref_val:'~1.000 FPM', tol:'± 100 FPM',
    cond:'MCP (205 BHP), ISA, MSL, 2.200 lb', status:'pending',
    procedure:'Acelerar a 55 KIAS con potencia MCP. Medir tasa vertical (FPM).',
    rfm_params:[{label:'Velocidad (Vy)', value:'55 KIAS'}, {label:'Potencia', value:'MCP'}, {label:'Referencia', value:'~1.000 FPM'}]
  },
  { id:'QTG-01-005', cat:'performance', critical:false,
    name:'Velocidad Nunca Exceder (Vne)', ref:'POH §2',
    param:'Activación advertencia Vne', unit:'KIAS',
    ref_val:'130 KIAS (≤2.200 lb)', tol:'± 2 KIAS',
    cond:'Peso ≤ 2.200 lb, MSL', status:'pending',
    procedure:'Acelerar gradualmente hasta 130 KIAS. Verificar activación de advertencias.',
    rfm_params:[{label:'Límite Vne', value:'130 KIAS'}]
  },

  // AREA 2 — MANIOBRABILIDAD EN VUELO
  { id:'QTG-02-001', cat:'handling', critical:false,
    name:'Viraje Coordinado 30°', ref:'POH §4',
    param:'Altitud / Vel / Bola', unit:'ft / KIAS',
    ref_val:'Cero desvío', tol:'± 100 ft / ± 5 KIAS / ½ bola',
    cond:'100 KIAS, 2.200 lb, ISA', status:'pending',
    procedure:'Viraje coordinado con 30° de alabeo durante 360°. Medir variaciones.',
    rfm_params:[{label:'Velocidad', value:'100 KIAS'}, {label:'Alabeo', value:'30°'}]
  },
  { id:'QTG-02-004', cat:'handling', critical:false,
    name:'Aproximación y Aterrizaje Normal', ref:'POH §4',
    param:'Tasa descenso <30 KIAS', unit:'FPM',
    ref_val:'< 300 FPM', tol:'< 300 FPM',
    cond:'ISA, 0 kt, 60 KIAS → Estacionario', status:'pending',
    procedure:'Reducir velocidad a 30 KIAS. Verificar que la tasa de descenso sea < 300 FPM (Evitar VRS).',
    rfm_params:[{label:'VRS límite', value:'<300 FPM'}, {label:'Ref. Vel', value:'< 30 KIAS'}]
  },
  { id:'QTG-02-006', cat:'handling', critical:false,
    name:'Diagrama Altura-Velocidad (H/V)', ref:'POH §5',
    param:'Coincidencia zonas riesgo H/V', unit:'ft AGL / KIAS',
    ref_val:'Perfil H/V (2.500 lb, MSL)', tol:'± 50 ft / ± 5 KIAS',
    cond:'MTOW 2.500 lb, MSL', status:'pending',
    procedure:'Verificar límites de la Avoid Region H/V del R44 II según POH Sección 5.',
    rfm_params:[{label:'MTOW', value:'2.500 lb'}, {label:'Tolerancia Alt', value:'± 50 ft'}]
  },

  // AREA 3 — SISTEMAS DE AERONAVE
  { id:'QTG-03-002', cat:'systems', critical:false,
    name:'Sistema Hidráulico — Operación', ref:'POH §7',
    param:'Presión sys en crucero', unit:'psi',
    ref_val:'450–500 psi', tol:'± 20 psi',
    cond:'Crucero normal', status:'pending',
    procedure:'Monitorear presión hidráulica en vuelo normal. Operar interruptor HYD ON/OFF.',
    rfm_params:[{label:'Presión POH', value:'450 - 500 psi'}]
  },
  { id:'QTG-03-006', cat:'systems', critical:true,
    name:'⚠ Alarma LOW RPM', ref:'POH §2 / SFAR 73',
    param:'Activación bocina', unit:'% RPM',
    ref_val:'97% RPM', tol:'± 1% RPM',
    cond:'Descenso progresivo RPM', status:'pending',
    procedure:'CRÍTICA: Reducir RPM rotor hasta activación de bocina al cruzar el 97%.',
    rfm_params:[{label:'Límite activación', value:'97% (388 RPM)'}]
  },
  { id:'QTG-03-007', cat:'systems', critical:false,
    name:'Alarma High RPM (Warble)', ref:'POH §2',
    param:'Activación tono warble', unit:'% RPM',
    ref_val:'108% RPM', tol:'± 1% RPM',
    cond:'Incremento RPM en Autorrotación', status:'pending',
    procedure:'Incrementar RPM hasta proximidad de 108%. Verificar tono warble.',
    rfm_params:[{label:'Límite superior', value:'108% (432 RPM)'}]
  },
  { id:'QTG-03-008', cat:'systems', critical:false,
    name:'Sistema Embrague (CLUTCH)', ref:'POH §7',
    param:'Luz apagada en enganche', unit:'cualitativo',
    ref_val:'Luz OFF ≥ 80% RPM', tol:'< 80% RPM',
    cond:'Secuencia post-arranque', status:'pending',
    procedure:'Verificar que la luz CLUTCH se apague antes de alcanzar RPM operacional.',
    rfm_params:[{label:'Apagado luz', value:'> 80% RPM'}]
  },

  // AREA 4 — PROCEDIMIENTOS DE EMERGENCIA
  { id:'QTG-04-001', cat:'emergency', critical:true,
    name:'⚠ Autorrotación — Máximo Alcance', ref:'POH §3',
    param:'Descenso a 90 KIAS', unit:'FPM',
    ref_val:'~1.900 FPM', tol:'± 200 FPM',
    cond:'2.200 lb, ISA, 90 KIAS', status:'pending',
    procedure:'Power-off glide a 90 KIAS. Medir tasa de descenso vertical (Glide ratio 4.7:1).',
    rfm_params:[{label:'Velocidad Glide', value:'90 KIAS'}, {label:'Sink teórico', value:'~1.900 FPM'}]
  },
  { id:'QTG-04-002', cat:'emergency', critical:false,
    name:'Autorrotación — Mínima Tasa Descenso', ref:'POH §3',
    param:'Descenso a 55 KIAS', unit:'FPM',
    ref_val:'~1.350 FPM', tol:'± 150 FPM',
    cond:'2.200 lb, ISA, 55 KIAS', status:'pending',
    procedure:'Establecer autorrotación a 55 KIAS. Medir tasa vertical mínima.',
    rfm_params:[{label:'Velocidad Mín Sink', value:'55 KIAS'}, {label:'Sink teórico', value:'~1.350 FPM'}]
  },
  { id:'QTG-04-003', cat:'emergency', critical:true,
    name:'⚠ Autorrotación — Flare y Toque', ref:'POH §3',
    param:'Tasa de impacto / RPM toque', unit:'FPM / %',
    ref_val:'< 300 FPM / > 90% RPM', tol:'± 0',
    cond:'Flare a 40 ft', status:'pending',
    procedure:'Ejecutar Flare en 40 ft y nivelar en 8 ft. Lograr toque amortiguado.',
    rfm_params:[{label:'Toque FPM', value:'< 300 FPM'}, {label:'RPM al toque', value:'> 90%'}]
  },
  { id:'QTG-04-010', cat:'emergency', critical:false,
    name:'Maniobra Low-G Pushover', ref:'SFAR 73 / POH §3',
    param:'Inestabilidad inducida', unit:'Cualitativo',
    ref_val:'Mast bumping risk represented', tol:'Física RHC',
    cond:'Vuelo cíclico fw brusco', status:'pending',
    procedure:'Inducir condición de Low-G. Verificar representación de inestabilidad lateral.',
    rfm_params:[{label:'Restricción POH', value:'Low-G prohibido'}]
  },

  // AREA 5 — ENTORNO VISUAL Y MOVIMIENTO
  { id:'QTG-05-001', cat:'visual', critical:false,
    name:'Campo Visual — Cobertura MR', ref:'RAAC 60 / 6XSIM',
    param:'Ángulo Horizontal / Vertical', unit:'°',
    ref_val:'150°H x 40°V (Mín)', tol:'± 5°',
    cond:'Sistema Varjo XR4', status:'pending',
    procedure:'Medir el campo visual activo del sistema de realidad mixta.',
    rfm_params:[{label:'Estándar Nivel B', value:'≥ 150°H'}]
  },
  { id:'QTG-05-002', cat:'visual', critical:true,
    name:'⚠ Latencia Sistema Visual (XR)', ref:'RAAC 60',
    param:'Retardo Motion-Visión', unit:'ms',
    ref_val:'≤ 150 ms', tol:'± 0 ms',
    cond:'Verificación Hardware', status:'pending',
    procedure:'Medir latencia entre comando físico y actualización de imagen en visor XR4.',
    rfm_params:[{label:'Límite RAAC 60', value:'≤ 150 ms'}]
  },

  // AREA 6 — CABINA E INSTRUMENTACIÓN
  { id:'QTG-06-002', cat:'cabina', critical:true,
    name:'⚠ Tacómetro Dual Motor/Rotor', ref:'POH §2',
    param:'Precisión de agujas', unit:'% RPM',
    ref_val:'102% Motor / 102% Rotor', tol:'± 1%',
    cond:'Vuelo estabilizado', status:'pending',
    procedure:'Verificar exactitud del tacómetro dual contra modelo aerodinámico.',
    rfm_params:[{label:'Límite Operativo', value:'101% – 102% RPM'}]
  }
];

export const FASES_DATA: Fase[] = [
  {
    n: 1, color: '#3b82f6',
    title: 'Fase 1 — Preparación y Solicitud',
    desc: 'Presentación documental Mínima Válida',
    status: 'in-progress',
    requisitos: [
      { id:'F1-01', text:'Carta al Director de Habilitaciones', done: true },
      { id:'F1-02', text:'Descriptivo técnico R44 del FSTD', done: false }
    ]
  },
  {
    n: 2, color: '#10b981',
    title: 'Fase 2 — Entrega de QTG Maestra',
    desc: 'Validación de listado oficial de test',
    status: 'in-progress',
    requisitos: [
      { id:'F2-01', text:'Manual QTG 47 ítems alineados POH', done: true },
      { id:'F2-02', text:'Matriz normativa explícita para el R44', done: false }
    ]
  },
  {
    n: 3, color: '#f59e0b',
    title: 'Fase 3 — OGE Evaluación',
    desc: 'Toma de datos internamente para corrección',
    status: 'pending',
    requisitos: [
      { id:'F3-01', text:'Software de métricas conectando en vivo', done: false },
      { id:'F3-02', text:'Rechazos subsanados antes del arribo ANAC', done: false }
    ]
  },
  {
    n: 4, color: '#8b5cf6',
    title: 'Fase 4 — Inspección ANAC En Sitio',
    desc: 'Visita oficial certificante del Inspector y QTG Correlator',
    status: 'pending',
    requisitos: [
      { id:'F4-01', text:'Pruebas crícas supervisadas exitosas', done: false },
      { id:'F4-02', text:'Firmado de libretos de ensayo', done: false }
    ]
  },
  {
    n: 5, color: '#ef4444',
    title: 'Fase 5 — Observaciones',
    desc: 'Mitigación de anomalías no vitales detectadas',
    status: 'pending',
    requisitos: [
      { id:'F5-01', text:'Re-patch de sim code', done: false },
      { id:'F5-02', text:'Envio de constancias parche', done: false }
    ]
  },
  {
    n: 6, color: '#06b6d4',
    title: 'Fase 6 — Certificado Oficial',
    desc: 'Emisión y mantención anual (PVP)',
    status: 'pending',
    requisitos: [
      { id:'F6-01', text:'Recibir el diploma FSTD nivel y agregar LOGs', done: false }
    ]
  }
];

export const NORMATIVA_DATA: NormativaItem[] = [
  {
    id: 'raac60', section: 'RAAC Parte 60', title: 'Reglas FSTD', ref: 'RAAC 60 Nivel 7 Helicóptero',
    content: '<p>Referencia troncal para Calificación Integral del R44 ante A.N.A.C.</p>'
  },
  {
    id: 'sfar73', section: 'SFAR 73', title: 'SFAR 73', ref: 'Robinson Specific Training',
    content: '<p>Requisitos de Entrenamiento especial que hacen obligatoria la simulación de baja G (mast bumping) y emergencias low RPM en simulador.</p>'
  }
];

export const DOCS_DATA: Documento[] = [
  { id:'D1', icon:'📋', name:'QTG R44 II Rev.01', cat:'Guías', date:'2026', size:'100 KB', status:'✅ Validado' },
  { id:'D2', icon:'📖', name:'RFM/POH R44 Raven II', cat:'Manuales', date:'Current', size:'3 MB', status:'✅ Validado' }
];

export const CHECKLIST_DATA = [
  {
    title: 'Encendido y Sistemas', icon: '⚡', color: '#f59e0b',
    items: [
      { id:'CL-1', text:'UPS y Módulos FSTD - ON' },
      { id:'CL-2', text:'Reinicio P3D/X-Plane y Data Link' }
    ]
  }
];
