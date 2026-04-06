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
  // PERFORMANCE
  { id:'QTG-01-001', cat:'performance', critical:false,
    name:'Vuelo Estacionario IGE', ref:'POH §5 / RAAC60 App.A',
    param:'MAP en estacionario IGE (≈5 ft AGL)', unit:'inHg',
    ref_val:'Según carta IGE', tol:'± 2 inHg',
    cond:'ISA, MSL, 0 kt, 2.200 lb', status:'pending',
    procedure:'Establecer estacionario IGE a ~5 ft AGL en condiciones ISA MSL con peso de 2.200 lb. Tomar lectura de la Presión de Múltiple (MAP) y comparar con tabla IGE POH.',
    rfm_params:[{label:'Peso', value:'2.200 lb'}, {label:'Viento', value:'0 kt'}, {label:'Tolerancia', value:'± 2 inHg'}]
  },
  { id:'QTG-01-002', cat:'performance', critical:false,
    name:'Vuelo Estacionario OGE', ref:'POH §5',
    param:'MAP en estacionario OGE (≥20 ft AGL)', unit:'inHg',
    ref_val:'Según carta OGE', tol:'± 2 inHg',
    cond:'ISA, MSL, 0 kt, 2.200 lb', status:'pending',
    procedure:'Establecer vuelo estacionario OGE (Fuera del efecto suelo) a ≥20 ft AGL. Registrar demanda MAP comprobando similitud con la curva teórica OGE.',
    rfm_params:[{label:'Altura mínima', value:'≥20 ft AGL'}, {label:'Tolerancia', value:'± 2 inHg'}]
  },
  { id:'QTG-01-004', cat:'performance', critical:false,
    name:'Mejor Tasa de Ascenso (Vy)', ref:'POH §5',
    param:'Tasa de ascenso a 55 KIAS', unit:'FPM',
    ref_val:'~1.000 FPM', tol:'± 100 FPM',
    cond:'MCP, ISA, MSL, 2.200 lb', status:'pending',
    procedure:'Acelerar en ascenso estabilizado a Vy (55 KIAS). Aplicar potencia MCP (205 BHP). Constatar que la tasa vertical alcance aproximadamente 1.000 FPM.',
    rfm_params:[{label:'Velocidad (Vy)', value:'55 KIAS'}, {label:'Potencia', value:'MCP'}, {label:'Valor Referencia', value:'~1.000 FPM'}]
  },
  { id:'QTG-01-005', cat:'performance', critical:false,
    name:'Velocidad Nunca Exceder (Vne)', ref:'POH §2',
    param:'Activación advertencia Vne', unit:'KIAS',
    ref_val:'130 KIAS (≤2.200 lb)', tol:'± 2 KIAS',
    cond:'Peso <2.200 lb, MSL', status:'pending',
    procedure:'Volar gradualmente hasta Vne de 130 KIAS. El simulador debe representar el límite y los consecuentes efectos aerodinámicos (ej: vibraciones).',
    rfm_params:[{label:'Límite Vne', value:'130 KIAS'}]
  },
  { id:'QTG-01-007', cat:'performance', critical:false,
    name:'Diagrama H/V', ref:'POH §5',
    param:'Coincidencia zonas riesgo H/V', unit:'ft AGL / KIAS',
    ref_val:'Perfil H/V (2.500 lb, MSL)', tol:'± 50 ft / ± 5 KIAS',
    cond:'MTOW 2.500 lb, MSL', status:'pending',
    procedure:'Verificar límites de la Avoid Region H/V del R44 coincidiendo los márgenes de Altura y Velocidad donde es inviable la autorrotación.',
    rfm_params:[{label:'MTOW', value:'2.500 lb'}, {label:'Tolerancia Alt', value:'± 50 ft'}, {label:'Tolerancia Vel', value:'± 5 KIAS'}]
  },
  // HANDLING
  { id:'QTG-02-001', cat:'handling', critical:false,
    name:'Viraje Coordinado 30°', ref:'POH §4',
    param:'Alt, vel, bola', unit:'ft / KIAS',
    ref_val:'Cero desvío', tol:'± 100 ft / ± 5 KIAS / ½ bola',
    cond:'100 KIAS, 2.200 lb, ISA', status:'pending',
    procedure:'Virar con 30° de alabeo coordinado durante 360 grados. Los márgenes de error altimétricos/velocidad no deben superar restricciones RAAC.',
    rfm_params:[{label:'Velocidad', value:'100 KIAS'}, {label:'Alabeo', value:'30°'}]
  },
  { id:'QTG-02-004', cat:'handling', critical:false,
    name:'Aproximación y Aterrizaje Normal', ref:'POH §4',
    param:'Tasa descenso <30 KIAS', unit:'FPM',
    ref_val:'< 300 FPM', tol:'< 300 FPM',
    cond:'ISA, 0 kt, 60 KIAS → estacionario', status:'pending',
    procedure:'Establecer descenso normal. Al pasar la barrera técnica de 30 KIAS, no exceder de 300 FPM para prevenir anillos de vórtice (VRS).',
    rfm_params:[{label:'Transición final', value:'30 KIAS'}, {label:'VRS límite', value:'<300 FPM'}]
  },
  { id:'QTG-02-007', cat:'handling', critical:false,
    name:'Peso y Balance — Límites CG', ref:'POH §6',
    param:'Restricciones arm (in)', unit:'in',
    ref_val:'93.0–98.0 in (2.500 lb)', tol:'CG Envelope',
    cond:'Cálculo W&B', status:'pending',
    procedure:'Ingresar valores fronterizos en FMS/Computadora (o validar aerodinámica) en límites delantero y trasero. Verificar advertencias fuera del CG envelope.',
    rfm_params:[{label:'Lím. Delantero Max', value:'93.0 in. (MTOW)'}, {label:'Lím. Trasero Min', value:'102.5 in. (Min Weight)'}]
  },
  // SYSTEMS
  { id:'QTG-03-002', cat:'systems', critical:false,
    name:'Sistema Hidráulico', ref:'POH §7',
    param:'Presión sys en crucero', unit:'psi',
    ref_val:'450–500 psi', tol:'± 20 psi',
    cond:'Crucero normal', status:'pending',
    procedure:'Monitorear instrumentación en vuelo normal de la presión hidráulica auxiliar operando en la caja del MGB. Indice esperado: 450-500psi.',
    rfm_params:[{label:'Presión POH', value:'450 - 500 psi'}]
  },
  { id:'QTG-03-006', cat:'systems', critical:true,
    name:'⚠ Alarma LOW RPM', ref:'POH §2 / SFAR 73',
    param:'Bocina/Luz activa', unit:'% RPM',
    ref_val:'97% RPM', tol:'± 1% RPM',
    cond:'Descenso progresivo RPM', status:'pending',
    procedure:'CRÍTICA: Someter rotor principal a pérdida de RPM gradual con el colectivo. Constatar de inmediato la bocina sónica LOW RPM al cruce por el límite del 97%.',
    rfm_params:[{label:'Límite inferior normal', value:'101%'}, {label:'Sensor de Bocina', value:'97% (388 RPM)'}]
  },
  { id:'QTG-03-008', cat:'systems', critical:false,
    name:'Clutch Actuación', ref:'POH §7',
    param:'Luz apagada en enganche completo', unit:'cualitativo',
    ref_val:'Se apaga pre-operacional', tol:'< 80% RPM rotor',
    cond:'Secuencia post-arranque', status:'pending',
    procedure:'Durante la tracción de las correas por el actuador de clutch electromecánico post start, medir que la luz de advertencia claudique luego del empate y tesón de giro total del mastil.',
    rfm_params:[{label:'Apagado luz', value:'> 80% RPM'}]
  },
  // EMERGENCIES
  { id:'QTG-04-001', cat:'emergency', critical:true,
    name:'⚠ Autorrotación — Glide', ref:'POH §3',
    param:'Descenso estabilizado 90 KIAS', unit:'FPM',
    ref_val:'~1.900 FPM', tol:'± 200 FPM',
    cond:'2.200 lb, ISA', status:'pending',
    procedure:'Cortar acelerador/throttle roll-off absoluto y picar a 90 KIAS para Glide alcance máximo. Cuantificar el régimen de descenso vertical nominal.',
    rfm_params:[{label:'Planéo MAX Alcance', value:'90 KIAS'}, {label:'Sink teórico', value:'1.900 FPM'}]
  },
  { id:'QTG-04-003', cat:'emergency', critical:true,
    name:'⚠ Toque Autorrotación', ref:'POH §3',
    param:'Tasa de impacto <300 FPM / RPM >90%', unit:'Toque',
    ref_val:'Positivo', tol:'< 300 FPM',
    cond:'Flare a 40 ft', status:'pending',
    procedure:'Culminar el perfil OEI (sin engine) de planeo con Flare enérgico en 40ft amortiguando en 8ft levantando colectivo. Resultar en tasa blanda de toque en simulación.',
    rfm_params:[{label:'Toque FPM', value:'<300 FPM'}, {label:'Toque RPM', value:'>90%'}]
  },
  { id:'QTG-04-010', cat:'emergency', critical:false,
    name:'Low-G Pushover', ref:'SFAR 73',
    param:'Inestabilidad inducida Low-G', unit:'Lateral',
    ref_val:'Efectos representados (mast bumping risk)', tol:'Según física RHC',
    cond:'Vuelo cíclico fw brusco', status:'pending',
    procedure:'Generar picado acentuado G-Cero que provoca giro violento dextrógiro por empuje de rotor de cola. El modelo matemático DEBE representar esta amenaza de aeronaves con rotor Semirrígido.',
    rfm_params:[{label:'Restricción POH', value:'Zero-G y Low G Pushovers prohibidos'}]
  },
  // VISUAL & CABIN
  { id:'QTG-05-002', cat:'visual', critical:true,
    name:'⚠ Latencia Visual', ref:'RAAC 60 App B',
    param:'Retardo Motion-Visión', unit:'ms',
    ref_val:'≤ 150 ms', tol:'± 0 ms sobre el máx',
    cond:'Verificación hardware', status:'pending',
    procedure:'Disparo de comando brusco pitch y tabulación cronométrica contra la actualización de frame del render visual. No mayor a 150 milisegundos.',
    rfm_params:[{label:'FFS Nivel B standard', value:'< 150 ms'}]
  },
  { id:'QTG-06-002', cat:'cabina', critical:true,
    name:'⚠ Tacómetro Dual Motor/Rotor', ref:'POH §2',
    param:'RPM agujas sobrepuestas operando', unit:'% RPM',
    ref_val:'102% motor, 102% rotor', tol:'± 1%',
    cond:'Potencia MCP en Gobernador On', status:'pending',
    procedure:'Bajo gobernador de encendido "On", el correlador debería mantener las agujas conjuntas N1/NR al tope verde de 102%. Observar su separación en Auto.',
    rfm_params:[{label:'Límite Gobernor', value:'102%'}]
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
