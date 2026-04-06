import { QTGTest, Fase, Documento, NormativaItem, Category } from '../types';

export const AW109E_SPECS = {
  rfm: {
    weights: {
      mtow_kg: 3000, mtow_lb: 6614,
      min_kg: 1800, min_lb: 3968,
      pilot_min_kg: 75
    },
    cg: {
      datum: 'STA 0 — punta del fuselaje (referencia)',
      limits: [
        { weight_kg: 1800, fwd_mm: 3000, aft_mm: 3620 },
        { weight_kg: 2200, fwd_mm: 3050, aft_mm: 3600 },
        { weight_kg: 2600, fwd_mm: 3100, aft_mm: 3560 },
        { weight_kg: 3000, fwd_mm: 3150, aft_mm: 3520 }
      ]
    },
    speeds: {
      vne_low_kt: 168, vne_high_kt: 155,
      vy_dual_kt: 90, vy_oei_kt: 80,
      cruise_kt: 150, autorot_range_kt: 80, autorot_min_sink_kt: 65,
      vno_catb_kt: 150
    },
    engines: {
      model: 'Pratt & Whitney Canada PW206C',
      count: 2,
      type: 'Turboshaft, turbina libre',
      mcp_shp: 563, oei_25min_shp: 623, oei_cont_shp: 580,
      tot_cont_c: 780, tot_takeoff_c: 840, tot_start_max_c: 900,
      ng_min_pct: 60, ng_max_pct: 104, ng_abs_max_pct: 105,
      oil_press_min_psi: 40, oil_press_max_psi: 90,
      oil_temp_max_c: 120
    },
    rotor: {
      nr_max_pct: 107, nr_min_pct: 100,
      nr_low_alarm_pct: 95,
      nr_autorot_max_pct: 112, nr_autorot_min_pct: 90,
      blade_count_main: 4, blade_count_tail: 2
    },
    altitude: {
      service_ceiling_ft: 20000,
      hover_ige_da_ft: 10200,
      hover_oge_da_ft: 6600,
      oei_ceiling_ft: 14500
    },
    hydraulics: {
      systems: 2,
      press_nominal_psi: 3000,
      fluid: 'MIL-H-5606 / AEROSHELL 41'
    },
    fuel: {
      main_total_L: 680, density_kg_L: 0.8,
      main_total_kg: 544,
      consumption_L_h: 180,
      fuel_type: 'Jet A-1 / Jet A / JP-4 / JP-8',
      low_fuel_L: 50
    },
    autorot: {
      speed_max_range_kt: 80, speed_min_sink_kt: 65,
      glide_ratio: '5.2:1',
      sink_max_range_fpm: 1800, sink_min_rate_fpm: 1300
    },
    performance: {
      roc_dual_fpm: 1800, roc_oei_fpm: 1200
    }
  }
};

export const QTG_DATA: QTGTest[] = [
  // ─── ÁREA 1: PERFORMANCE ───
  { id:'QTG-01-001', cat:'performance', critical:false,
    name:'Estacionario IGE — Nivel del Mar', ref:'RFM §4 / RAAC60 App.A §2',
    param:'Tq (%) requerido en estacionario IGE (≈5 ft AGL)', unit:'% Tq',
    ref_val:'Según carta IGE del RFM (ISA, MSL)', tol:'± 2% Tq',
    cond:'ISA, MSL, viento 0 kt, 3.000 kg', status:'pending',
    procedure:'Configurar el simulador en condiciones ISA a nivel del mar con MTOW de 3.000 kg y viento 0 kt. Establecer estacionario IGE a aproximadamente 5 ft AGL. Registrar el torque indicado (% Tq) requerido para mantener el estacionario. Comparar el valor obtenido con la carta de hover IGE del RFM §4 Figura 4.X para las condiciones especificadas. Según RAAC 60 Apéndice A §2, la diferencia entre el valor simulado y el dato de vuelo de referencia no debe exceder la tolerancia establecida. La prueba se considera aprobada si el torque requerido está dentro de ±2% Tq del dato del fabricante.',
    rfm_params:[
      { label:'MTOW', value:'3.000', unit:'kg' },
      { label:'Densidad Altitud', value:'MSL (0 ft)', unit:'ft DA' },
      { label:'Temperatura', value:'ISA (15°C a MSL)' },
      { label:'Viento', value:'0', unit:'kt' },
      { label:'Tq IGE referencia RFM (ISA, MSL)', value:'Ver Figura §4 RFM', unit:'% Tq' },
      { label:'Tolerancia según RAAC 60', value:'± 2', unit:'% Tq' },
    ]
  },

  { id:'QTG-01-002', cat:'performance', critical:false,
    name:'Estacionario OGE — Nivel del Mar', ref:'RFM §4',
    param:'Tq (%) requerido en estacionario OGE (≥20 ft AGL)', unit:'% Tq',
    ref_val:'Según carta OGE del RFM (ISA, MSL)', tol:'± 2% Tq',
    cond:'ISA, MSL, viento 0 kt, 3.000 kg', status:'pending',
    procedure:'Establecer el simulador en vuelo estacionario OGE a una altura no inferior a 20 ft AGL para eliminar el efecto suelo. Condiciones ISA estándar, MSL, MTOW 3.000 kg y viento en calma. Registrar el torque (% Tq) requerido para mantener el hover. El valor obtenido se compara con la Carta de Hover OGE del RFM §4. Conforme a RAAC 60 App. A §2, el simulador debe reproducir la demanda de potencia del vuelo OGE dentro de ±2% Tq del dato de vuelo de referencia certificado por el fabricante.',
    rfm_params:[
      { label:'Altura mínima OGE', value:'≥ 20', unit:'ft AGL' },
      { label:'MTOW', value:'3.000', unit:'kg' },
      { label:'Densidad Altitud', value:'MSL (0 ft)', unit:'ft DA' },
      { label:'Temperatura', value:'ISA (15°C a MSL)' },
      { label:'Viento', value:'0', unit:'kt' },
      { label:'Tq OGE referencia RFM (ISA, MSL)', value:'Ver Figura §4 RFM', unit:'% Tq' },
      { label:'Tolerancia RAAC 60', value:'± 2', unit:'% Tq' },
    ]
  },

  { id:'QTG-01-003', cat:'performance', critical:false,
    name:'Estacionario IGE a Altitud (4.000 ft DA)', ref:'RFM §4',
    param:'Tq requerida a 4.000 ft densidad', unit:'% Tq',
    ref_val:'Según diagrama de altitud del RFM', tol:'± 2% Tq',
    cond:'2.600 kg, 4.000 ft DA, ISA', status:'pending',
    procedure:'Configurar el simulador a 4.000 ft de altitud densidad con condiciones ISA y peso operativo de 2.600 kg. Establecer estacionario IGE (≈5 ft AGL). Registrar el torque requerido. El modelo aerodinámico del simulador debe reflejar correctamente el incremento de demanda de potencia con la altitud. Según RAAC 60 App. A §2, el error absoluto del torque no debe superar ±2% Tq respecto al dato de validación.',
    rfm_params:[
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Altitud densidad', value:'4.000', unit:'ft DA' },
      { label:'Temperatura', value:'ISA (7°C a 4.000 ft)' },
      { label:'Tq referencia a 4.000 ft DA', value:'~96–100 (ver RFM §4)', unit:'% Tq' },
      { label:'Tolerancia RAAC 60', value:'± 2', unit:'% Tq' },
    ]
  },

  { id:'QTG-01-004', cat:'performance', critical:false,
    name:'Techo Hover OEI (Categoría A)', ref:'RFM §4 Cat A',
    param:'Altitud máxima de estacionario OGE con un motor (OEI)', unit:'ft DA',
    ref_val:'~14.500 ft DA (ISA, 2.600 kg)', tol:'± 300 ft DA',
    cond:'OEI (un motor a MCP OEI), ISA, 2.600 kg', status:'pending',
    procedure:'Inducir la falla de un motor en condiciones de hover OGE. Incrementar progresivamente la altitud con el motor remanente a potencia MCP OEI (≤623 SHP / 25 min) hasta detectar la incapacidad de mantener el hover. Registrar la altitud densidad máxima donde el simulador mantiene el estacionario OGE. RAAC 60 App. A §2 y §4 exige que el techo hover OEI del simulador refleje el dato de Categoría A del fabricante. El valor de referencia es ~14.500 ft DA según el RFM.',
    rfm_params:[
      { label:'Motor remanente', value:'MCP OEI (25 min)', unit:'SHP≤623' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Temperatura', value:'ISA' },
      { label:'Techo Hover OGE Cat A (RFM §4)', value:'~14.500', unit:'ft DA' },
      { label:'Tolerancia RAAC 60', value:'± 300', unit:'ft DA' },
    ]
  },

  { id:'QTG-01-005', cat:'performance', critical:false,
    name:'Mejor Tasa de Ascenso — Bimotor (Vy)', ref:'RFM §4',
    param:'ROC a 90 KIAS, ambos motores MCP', unit:'FPM',
    ref_val:'~1.800 FPM (ISA, MSL, 2.600 kg)', tol:'± 150 FPM',
    cond:'Ambos motores MCP, ISA, MSL, 2.600 kg', status:'pending',
    procedure:'Configurar el simulador en ascenso estabilizado a la velocidad de mejor tasa (Vy = 90 KIAS). Ambos motores a potencia MCP continua. Registrar la tasa de ascenso vertical (FPM) en condiciones ISA a nivel del mar con peso de 2.600 kg. Según RAAC 60 App. A §2, la ROC simulada no debe diferir en más de ±150 FPM del dato de vuelo certificado consignado en el QTG. El RFM del AW109E publica ~1.800 FPM en estas condiciones.',
    rfm_params:[
      { label:'Velocidad Vy', value:'90', unit:'KIAS' },
      { label:'Potencia', value:'MCP (ambos motores)' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Altitud', value:'MSL', unit:'ft' },
      { label:'ROC referencia RFM (Vy, MCP, ISA, MSL)', value:'~1.800', unit:'FPM' },
      { label:'Tolerancia RAAC 60', value:'± 150', unit:'FPM' },
    ]
  },

  { id:'QTG-01-006', cat:'performance', critical:false,
    name:'Mejor Tasa de Ascenso OEI (Vy OEI)', ref:'RFM §4 Cat A',
    param:'ROC a 80 KIAS, un motor a MCP OEI', unit:'FPM',
    ref_val:'~1.200 FPM (ISA, MSL, 2.600 kg)', tol:'± 150 FPM',
    cond:'OEI (un motor MCP), ISA, MSL, 2.600 kg', status:'pending',
    procedure:'Simular la falla de un motor e iniciar ascenso con el motor remanente a MCP OEI (25 min). Estabilizar a Vy OEI = 80 KIAS. Registrar la ROC obtenida. Condiciones ISA, MSL, 2.600 kg. El simulador debe modelar correctamente la reducción de potencia disponible y la consecuente reducción en tasa de ascenso. RAAC 60 App. A §4 (Categoría A) exige fidelidad en el modelado OEI. El RFM publica ~1.200 FPM OEI en estas condiciones.',
    rfm_params:[
      { label:'Velocidad Vy OEI', value:'80', unit:'KIAS' },
      { label:'Motor remanente', value:'MCP OEI (25 min, ≤623 SHP)' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Altitud', value:'MSL', unit:'ft' },
      { label:'ROC OEI referencia RFM', value:'~1.200', unit:'FPM' },
      { label:'Tolerancia RAAC 60', value:'± 150', unit:'FPM' },
    ]
  },

  { id:'QTG-01-007', cat:'performance', critical:false,
    name:'Diagrama H/V — Zona de Riesgo', ref:'RFM §4',
    param:'Coincidencia zonas H/V simulador vs. RFM', unit:'ft AGL / KIAS',
    ref_val:'Perfil curva H/V del RFM (3.000 kg, MSL)', tol:'± 50 ft / ± 5 KIAS',
    cond:'MTOW 3.000 kg, MSL, ISA', status:'pending',
    procedure:'Verificar que las regiones de altura-velocidad (Diagrama H/V) del simulador correspondan con exactitud al perfil publicado en el RFM §4 para el AW109E Power. Documentar al menos 5 puntos del diagrama H/V en la zona de "evitar" (Avoid Region) y comparar con el gráfico del RFM. RAAC 60 App. A §2 requiere que el diagrama H/V del simulador sea representativo. La tolerancia admitida es ±50 ft en el eje vertical y ±5 KIAS en el eje horizontal.',
    rfm_params:[
      { label:'MTOW', value:'3.000', unit:'kg' },
      { label:'Altitud densidad', value:'MSL', unit:'ft' },
      { label:'Punto inferior "Avoid Region"', value:'0 kt / 0 ft', unit:'KIAS / ft AGL' },
      { label:'Punto superior "Avoid Region"', value:'~45 kt / ~800 ft', unit:'KIAS / ft AGL' },
      { label:'Tolerancia altura', value:'± 50', unit:'ft AGL' },
      { label:'Tolerancia velocidad', value:'± 5', unit:'KIAS' },
    ]
  },

  { id:'QTG-01-008', cat:'performance', critical:false,
    name:'Consumo de Combustible en Crucero', ref:'RFM §4',
    param:'Consumo horario a MCP crucero 150 KIAS', unit:'L/h',
    ref_val:'~180 L/h (ambos motores, 150 KIAS, MSL)', tol:'± 10 L/h',
    cond:'Ambos motores MCP, 150 KIAS, MSL, ISA', status:'pending',
    procedure:'Estabilizar el simulador en vuelo de crucero recto y nivelado a 150 KIAS con ambos motores a MCP continuo, altitud MSL y condiciones ISA. Registrar el flujo de combustible indicado en el panel de instrumentos del simulador. El consumo simulado debe corresponder al publicado en las tablas de performance del RFM §4. RAAC 60 App. A §2 exige representatividad de los sistemas de combustible y su integración con el modelo de potencia.',
    rfm_params:[
      { label:'Velocidad de crucero', value:'150', unit:'KIAS' },
      { label:'Potencia', value:'MCP ambos motores' },
      { label:'Altitud', value:'MSL', unit:'ft' },
      { label:'Capacidad total combustible', value:'680', unit:'L' },
      { label:'Consumo referencia RFM §4', value:'~180', unit:'L/h' },
      { label:'Autonomía aproximada', value:'~3.4 h a crucero MCP' },
      { label:'Tolerancia RAAC 60', value:'± 10', unit:'L/h' },
    ]
  },

  // ─── ÁREA 2: MANIOBRABILIDAD ───
  { id:'QTG-02-001', cat:'handling', critical:false,
    name:'Viraje Coordinado 30° de Banco', ref:'RFM §3 Normal',
    param:'Altitud, velocidad, coordinación (bola centrada)', unit:'ft / KIAS',
    ref_val:'Sin pérdida de altitud, bola centrada', tol:'± 100 ft / ± 5 KIAS / ½ bola',
    cond:'120 KIAS, 2.600 kg, ISA, MSL', status:'pending',
    procedure:'Estabilizar el simulador en vuelo nivelado a 120 KIAS, ISA, MSL y 2.600 kg. Iniciar un viraje coordinado con 30° de banco sostenido durante al menos 180°. Registrar variaciones de altitud, velocidad y el desvío del índice del inclinómetro (bola). El modelo aerodinámico del simulador debe reproducir el comportamiento de la respuesta cíclica lateral del AW109E. Según RAAC 60 App. A §2, la tolerancia es ±100 ft en altitud, ±5 KIAS en velocidad y el índice (bola) no debe superar ½ diámetro de su posición centrada.',
    rfm_params:[
      { label:'Velocidad', value:'120', unit:'KIAS' },
      { label:'Banco', value:'30', unit:'°' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Altitud', value:'MSL', unit:'ft' },
      { label:'Tol. altitud', value:'± 100', unit:'ft' },
      { label:'Tol. velocidad', value:'± 5', unit:'KIAS' },
      { label:'Tol. coordinación', value:'≤ ½ bola' },
    ]
  },

  { id:'QTG-02-002', cat:'handling', critical:false,
    name:'Viraje Coordinado 60° de Banco', ref:'RFM §3 Normal',
    param:'Mantenimiento de altitud y velocidad en viraje profundo', unit:'ft / KIAS',
    ref_val:'Sin pérdida significativa de altitud', tol:'± 150 ft / ± 5 KIAS',
    cond:'100 KIAS, 2.600 kg, ISA', status:'pending',
    procedure:'Estabilizar a 100 KIAS y establecer un viraje coordinado sostenido con 60° de banco mínimo durante al menos 90°. Registrar la variación de altitud y velocidad durante el viraje. El incremento de carga (load factor ~2G a 60°) debe ser representado correctamente. RAAC 60 App. A §2 requiere que la respuesta aerodinámica en virajes profundos sea realista. Tolerancia: ±150 ft en altitud y ±5 KIAS.',
    rfm_params:[
      { label:'Velocidad', value:'100', unit:'KIAS' },
      { label:'Banco', value:'60', unit:'°' },
      { label:'Factor de carga', value:'~2.0', unit:'G' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Tol. altitud', value:'± 150', unit:'ft' },
      { label:'Tol. velocidad', value:'± 5', unit:'KIAS' },
    ]
  },

  { id:'QTG-02-003', cat:'handling', critical:false,
    name:'Transición Estacionario → Vuelo Adelante', ref:'RFM §3 Normal',
    param:'Tq aplicada durante la transición', unit:'% Tq',
    ref_val:'No superar Tq_IGE + 3% durante transición', tol:'Tq ≤ Tq_IGE + 3%',
    cond:'ISA, MSL, 0 kt, 2.600 kg', status:'pending',
    procedure:'Desde hover estabilizado IGE (0 kt), el piloto aplica cíclico adelante para iniciar la transición al vuelo adelante. Registrar el torque máximo aplicado durante la aceleración desde 0 hasta 60 KIAS. El pico de torque no debe superar el torque de hover IGE más 3%. Esta prueba valida el modelo de efecto suelo y la transición aerodinámica conforme a RAAC 60 App. A §2.',
    rfm_params:[
      { label:'Velocidad inicial', value:'0', unit:'kt' },
      { label:'Velocidad final referencia', value:'60', unit:'KIAS' },
      { label:'Tq IGE referencia', value:'Ver Carta IGE RFM §4', unit:'% Tq' },
      { label:'Límite Tq transición', value:'Tq_IGE + 3', unit:'% Tq' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
    ]
  },

  { id:'QTG-02-004', cat:'handling', critical:false,
    name:'Aproximación y Aterrizaje Normal', ref:'RFM §3 Normal',
    param:'Tasa de descenso al cruzar 30 KIAS', unit:'FPM',
    ref_val:'< 300 FPM (prevención Vortex Ring State)', tol:'< 300 FPM',
    cond:'ISA, 0 kt, 2.600 kg, 70 KIAS → estacionario', status:'pending',
    procedure:'Iniciar aproximación desde 500 ft AGL a 70 KIAS. Reducir progresivamente la velocidad y aumentar la tasa de descenso controlada. Al cruzar los 30 KIAS, la tasa de descenso vertical no debe superar 300 FPM para evitar la zona de peligro de Vortex Ring State (VRS). Esta limitación está publicada en el RFM §3 y es validada en RAAC 60 App. A §2 como requisito de representación del VRS.',
    rfm_params:[
      { label:'Velocidad inicial aproximación', value:'70', unit:'KIAS' },
      { label:'Velocidad referencia VRS', value:'30', unit:'KIAS' },
      { label:'Tasa descenso máxima (<30 kt)', value:'< 300', unit:'FPM' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Ref. VRS RFM', value:'RFM §3 — zona de peligro descenso vertical' },
    ]
  },

  { id:'QTG-02-005', cat:'handling', critical:false,
    name:'Vuelo Lateral y Hacia Atrás (Rearward)', ref:'RFM §3 Normal',
    param:'Control de guiñada, ausencia de oscilaciones PIO', unit:'°',
    ref_val:'Guiñada < ±5°, sin PIO', tol:'Guiñada < ± 5° / Sin PIO',
    cond:'Estacionario IGE, ≤5 kt', status:'pending',
    procedure:'Desde hover estabilizado IGE, aplicar cíclico lateral y luego cíclico hacia atrás manteniendo velocidad ≤5 kt en cada eje. Registrar la desviación de guiñada y la presencia de oscilaciones Pilot Induced Oscillations (PIO). La controlabilidad debe ser representativa del AW109E real. RAAC 60 App. A §2 requiere que la dinámica de rotor de cola sea realista en maniobras de baja velocidad.',
    rfm_params:[
      { label:'Velocidad máxima lateral/trasera', value:'≤ 5', unit:'kt' },
      { label:'Tol. guiñada', value:'< ± 5', unit:'°' },
      { label:'PIO', value:'No se admite' },
      { label:'Límite vel. hacia atrás (RFM §3)', value:'5', unit:'kt max recom.' },
    ]
  },

  { id:'QTG-02-006', cat:'handling', critical:false,
    name:'Efecto del Viento en Estacionario', ref:'RFM §4',
    param:'Controlabilidad IGE con viento cruzado hasta 25 kt', unit:'kt',
    ref_val:'Controlable hasta 25 kt desde cualquier dirección', tol:'Sin pérdida de control',
    cond:'ISA, DA variable, 2.600 kg', status:'pending',
    procedure:'Con el simulador en hover IGE, incrementar la intensidad del viento desde 0 hasta 25 kt variando la dirección (proa, cruzado y popa). Verificar que los límites de control de pedal y cíclico no sean excedidos y que el simulador permanezca controlable. El RFM §4 establece el límite operativo de viento cruzado. RAAC 60 App. A §2 exige representatividad del efecto de viento en maniobras de baja velocidad.',
    rfm_params:[
      { label:'Viento máx. operacional (RFM)', value:'25', unit:'kt' },
      { label:'Dirección', value:'Omni-direccional' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Criterio aprobación', value:'Sin pérdida de control en todo el rango' },
    ]
  },

  { id:'QTG-02-007', cat:'handling', critical:false,
    name:'Peso y Balance — Límites CG', ref:'RFM §6',
    param:'Verificación CG dentro de envolvente en todos los pesos', unit:'mm',
    ref_val:'3.150–3.520 mm (MTOW 3.000 kg) | 3.000–3.620 mm (1.800 kg)', tol:'Por envoltura del CG',
    cond:'Cálculo de W&B para vuelo típico', status:'pending',
    procedure:'Configurar cargas representativas en el simulador correspondientes a diferentes combinaciones de peso: MTOW 3.000 kg y peso mínimo 1.800 kg. Verificar que la posición del CG calculada cae dentro de la envolvente del diagrama W&B del RFM §6. El simulador debe replicar los cambios en el comportamiento de mandos ante variaciones de CG. RAAC 60 requiere representatividad de la dinámica de estabilidad ante variaciones de CG.',
    rfm_params:[
      { label:'Límite CG adelante a MTOW', value:'3.150', unit:'mm' },
      { label:'Límite CG atrás a MTOW', value:'3.520', unit:'mm' },
      { label:'Límite CG adelante a peso mín.', value:'3.000', unit:'mm' },
      { label:'Límite CG atrás a peso mín.', value:'3.620', unit:'mm' },
      { label:'Peso mínimo (RFM §6)', value:'1.800', unit:'kg' },
      { label:'MTOW (RFM §6)', value:'3.000', unit:'kg' },
    ]
  },

  { id:'QTG-02-008', cat:'handling', critical:false,
    name:'AFCS/SAS — Retención de Actitud', ref:'RFM §7',
    param:'Desviación de actitud con SAS activo en vuelo nivelado', unit:'°',
    ref_val:'Desviación pitch/roll < ±2° con SAS activo', tol:'± 2° en pitch y roll',
    cond:'120 KIAS, 2.600 kg, ISA, MSL, SAS ON', status:'pending',
    procedure:'Estabilizar el simulador en vuelo nivelado a 120 KIAS con SAS activado. Aplicar una perturbación de control (entrada escalón breve en cíclico) y liberar los mandos. Registrar la desviación máxima de actitud en pitch y roll durante los 10 segundos siguientes. El SAS del AW109E debe amortiguar la oscilación y restablecer la actitud. RAAC 60 App. A §2 exige representatividad del AFCS en corrección de actitud.',
    rfm_params:[
      { label:'Velocidad', value:'120', unit:'KIAS' },
      { label:'SAS', value:'ON (activado)' },
      { label:'Tol. pitch con SAS', value:'< ± 2', unit:'°' },
      { label:'Tol. roll con SAS', value:'< ± 2', unit:'°' },
      { label:'Sistema AFCS AW109E', value:'Doppel SAS + Autopiloto (RFM §7)' },
    ]
  },

  { id:'QTG-02-009', cat:'handling', critical:false,
    name:'Viraje Pedal 360° en Estacionario', ref:'RFM §3 Normal',
    param:'Guiñada controlada 360° en estacionario IGE', unit:'seg',
    ref_val:'360° completado sin cambio de altitud >3 ft', tol:'Altitud ± 3 ft / Velocidad ≤ 5 kt',
    cond:'Estacionario IGE ~3 ft AGL, 2.600 kg', status:'pending',
    procedure:'Desde hover estacionario IGE a ~3 ft AGL con 2.600 kg, aplicar pedal para iniciar y sostener rotación en guiñada a tasa moderada hasta completar 360°. Registrar la variación de altitud y la velocidad de traslación durante la rotación. El AW109E debe mostrar acoplamiento mínimo entre guiñada y traslación. RAAC 60 App. A §2 valida la representación del control de rotor de cola en maniobras de guiñada de eje vertical.',
    rfm_params:[
      { label:'Altura hover IGE', value:'~3', unit:'ft AGL' },
      { label:'Peso operativo', value:'2.600', unit:'kg' },
      { label:'Tol. altitud', value:'± 3', unit:'ft' },
      { label:'Tol. velocidad traslación', value:'≤ 5', unit:'kt' },
      { label:'Rotación completa', value:'360', unit:'°' },
    ]
  },

  // ─── ÁREA 3: SISTEMAS ───
  { id:'QTG-03-001', cat:'systems', critical:false,
    name:'Arranque Motor — Secuencia Normal (Ambos)', ref:'RFM §3 Normal',
    param:'TOT de arranque y tiempo hasta Ng estable', unit:'°C / seg',
    ref_val:'TOT < 900°C durante arranque | Ng estable en < 60 seg', tol:'TOT < 900°C / ± 5 seg',
    cond:'Temperatura ambiente, tierra, batería/GPU', status:'pending',
    procedure:'Con el simulador en configuración de tierra (motores apagados), ejecutar la secuencia normal de arranque de ambos motores PW206C según el RFM §3. Registrar el TOT máximo alcanzado durante el arranque (no debe superar 900°C) y el tiempo transcurrido hasta que el Ng se estabiliza en marcha al ralentí. RAAC 60 App. A §2 exige que la secuencia de arranque simulada sea representativa de la aeronave real incluyendo los parámetros del motor.',
    rfm_params:[
      { label:'TOT máximo de arranque', value:'< 900', unit:'°C' },
      { label:'TOT máximo de partida (momento)', value:'900', unit:'°C (abs. max)' },
      { label:'Tiempo a Ng estable', value:'< 60', unit:'seg' },
      { label:'Ng mínima marcha mínima', value:'≥ 60', unit:'%' },
      { label:'Fuente energía arranque', value:'Batería o GPU' },
      { label:'Tolerancia tiempo', value:'± 5', unit:'seg' },
    ]
  },

  { id:'QTG-03-002', cat:'systems', critical:false,
    name:'Sistema Hidráulico — Operación Normal (Sys 1 y 2)', ref:'RFM §7',
    param:'Presión hidráulica sistemas 1 y 2 en vuelo estabilizado', unit:'psi',
    ref_val:'~3.000 psi en ambos sistemas en operación normal', tol:'± 100 psi',
    cond:'Vuelo crucero estabilizado, ambos motores MCP', status:'pending',
    procedure:'Estabilizar el simulador en vuelo de crucero con ambos motores a MCP. Registrar la presión indicada en los manómetros de los sistemas hidráulicos 1 y 2 en el panel de cabina. Ambos sistemas deben indicar ~3.000 psi. Según RAAC 60 App. A §2, el modelado de los sistemas de aeronave debe ser representativo. El AW109E tiene dos sistemas hidráulicos independientes que operan en paralelo a 3.000 psi nominales.',
    rfm_params:[
      { label:'Fluido hidráulico', value:'MIL-H-5606 / AeroShell 41' },
      { label:'Presión nominal (RFM §7)', value:'3.000', unit:'psi' },
      { label:'Número de sistemas', value:'2 (independientes)' },
      { label:'Tolerancia presión', value:'± 100', unit:'psi' },
      { label:'Indicación en cabina', value:'Manómetros HYD 1 y HYD 2' },
    ]
  },

  { id:'QTG-03-003', cat:'systems', critical:false,
    name:'Falla Sistema Hidráulico — Un Sistema', ref:'RFM §3 Emerg.',
    param:'Detección y continuación con sistema hidráulico remanente', unit:'cualitativo',
    ref_val:'Advertencia activa < 3 seg; sistema remanente a 3.000 psi', tol:'Advertencia < 3 seg / Sist. OK',
    cond:'Vuelo nivelado, HYD SYS 1 o 2 desactivado', status:'pending',
    procedure:'En vuelo nivelado estabilizado, simular la falla de uno de los dos sistemas hidráulicos desactivándolo desde el panel IOS. Verificar la activación de la advertencia HYD en cabina en un tiempo ≤3 segundos. El sistema remanente debe mantener 3.000 psi y permitir el control completo de la aeronave. El RFM §3 establece el procedimiento de emergencia para falla hidráulica parcial.',
    rfm_params:[
      { label:'Tiempo activación advertencia', value:'< 3', unit:'seg' },
      { label:'Presión sistema remanente', value:'3.000', unit:'psi' },
      { label:'Controlabilidad restante', value:'Total con sistema remanente' },
      { label:'Procedimiento RFM', value:'§3 Emerg. — HYD SYS FAIL' },
    ]
  },

  { id:'QTG-03-004', cat:'systems', critical:false,
    name:'Sistema Combustible — Alarma LOW FUEL', ref:'RFM §7',
    param:'Nivel en litros al activarse la alarma de bajo combustible', unit:'L',
    ref_val:'~50 L (≈20 min endurance a potencia de crucero)', tol:'± 5 L',
    cond:'Consumo progresivo hasta activación de alarma', status:'pending',
    procedure:'Iniciar simulación con combustible suficiente para alcanzar el nivel de alarma por consumo normal. Con ambos motores a potencia de crucero, dejar que el combustible se consuma de forma continua. Registrar el nivel exacto (litros) que indica el panel cuando se activa la luz LOW FUEL. El AW109E tiene una alarma de bajo combustible que se activa aproximadamente a 50L remanentes (~20 min de vuelo a MCP crucero según RFM §7).',
    rfm_params:[
      { label:'Capacidad total combustible', value:'680', unit:'L' },
      { label:'Nivel activación LOW FUEL (RFM)', value:'~50', unit:'L' },
      { label:'Endurance remanente estimado', value:'~20', unit:'min (crucero MCP)' },
      { label:'Consumo crucero MCP', value:'~180', unit:'L/h' },
      { label:'Tolerancia activación', value:'± 5', unit:'L' },
    ]
  },

  { id:'QTG-03-005', cat:'systems', critical:false,
    name:'Sistema Eléctrico — Falla Generador (Un Motor)', ref:'RFM §3 Emerg.',
    param:'Tiempo de activación luz GEN FAIL en panel', unit:'seg',
    ref_val:'Luz GEN FAIL activa en ≤3 seg de la falla', tol:'≤ 3 seg',
    cond:'Vuelo crucero, generador de un motor desactivado', status:'pending',
    procedure:'En crucero estabilizado, desactivar el generador de uno de los motores desde el panel IOS. Cronometrar el tiempo transcurrido hasta que la luz GEN FAIL se ilumina en el panel de advertencias de cabina. El generador remanente debe asumir la carga eléctrica sin pérdida de suministro. RAAC 60 App. A §2 exige que el sistema eléctrico simulado sea representativo de la aeronave real en cuanto a tiempos de advertencia.',
    rfm_params:[
      { label:'Tiempo máx. activación GEN FAIL', value:'≤ 3', unit:'seg' },
      { label:'Sistemas backup', value:'Batería de emergencia' },
      { label:'Generador remanente', value:'Asume carga completa' },
      { label:'Procedimiento RFM', value:'§3 Emerg. — GEN FAIL' },
    ]
  },

  { id:'QTG-03-006', cat:'systems', critical:true,
    name:'⚠ Alarma Baja Nr del Rotor', ref:'RFM §1 / §3 Emerg.',
    param:'Punto de activación alarma visual y sonora LOW NR', unit:'% Nr',
    ref_val:'Alarma activa al alcanzar 95% Nr', tol:'± 1% Nr',
    cond:'Descenso progresivo de Nr desde condición normal', status:'pending',
    procedure:'Esta es una PRUEBA CRÍTICA. Reducir progresivamente la velocidad del rotor principal (Nr) desde la condición normal (100–107%) mediante una reducción controlada de potencia. Registrar con exactitud el valor de Nr (%) en el que se activa simultáneamente la luz de advertencia LOW NR y la alarma sonora en cabina. El AW109E activa esta alarma a 95% Nr según RFM §1. RAAC 60 exige plena representatividad de todas las alarmas críticas de vuelo.',
    rfm_params:[
      { label:'Nr normal vuelo', value:'100–107', unit:'%' },
      { label:'Nr alarma LOW NR', value:'95', unit:'%' },
      { label:'Nr mínima autorrotación', value:'90', unit:'%' },
      { label:'Nr máxima autorrotación', value:'112', unit:'%' },
      { label:'Tolerancia activación alarma', value:'± 1', unit:'% Nr' },
      { label:'Tipo alarma', value:'Luz + bocina (audio)' },
    ]
  },

  { id:'QTG-03-007', cat:'systems', critical:false,
    name:'Límites TOT — MCP y Despegue OEI', ref:'RFM §1',
    param:'TOT en MCP continuo y en modo Despegue OEI (2.5 min)', unit:'°C',
    ref_val:'MCP: ≤780°C continuo | Despegue: ≤840°C por 2.5 min', tol:'± 5°C',
    cond:'Ambos motores, ISA, MSL, potencia variable', status:'pending',
    procedure:'Aplicar potencia MCP continua en ambos motores y registrar el TOT indicado una vez estabilizado. El TOT no debe superar 780°C en régimen continuo. A continuación, simular condición OEI con el motor remanente a potencia máxima de despegue (2.5 min) y registrar el TOT máximo alcanzado, que no debe exceder 840°C. Ambos límites están publicados en el RFM §1 y son requerimientos de validez técnica del simulador bajo RAAC 60.',
    rfm_params:[
      { label:'TOT MCP continuo máximo', value:'780', unit:'°C' },
      { label:'TOT despegue (2.5 min) máximo', value:'840', unit:'°C' },
      { label:'TOT máximo de partida', value:'900', unit:'°C' },
      { label:'TOT Ng al 100%', value:'~730–760', unit:'°C (referencia típica)' },
      { label:'Tolerancia indicación TOT', value:'± 5', unit:'°C' },
    ]
  },

  { id:'QTG-03-008', cat:'systems', critical:false,
    name:'Límites Ng — Velocidad Máxima Gas Producer', ref:'RFM §1',
    param:'Ng máxima en despegue e indicación en panel', unit:'% Ng',
    ref_val:'Ng ≤104% continuo | ≤105% momentáneo (≤5 seg)', tol:'± 0.5% Ng',
    cond:'Ambos motores a potencia máxima, MSL ISA', status:'pending',
    procedure:'Con ambos motores a potencia máxima de despegue, registrar el valor de Ng indicado en el panel de cabina del simulador. El Ng máximo en régimen continuo no debe superar 104%, y el límite momentáneo (hasta 5 segundos) no debe superar 105%. Las indicaciones del panel deben ser exactas. RAAC 60 App. A §2 exige que los límites de motor simulados sean representativos del RFM del fabricante.',
    rfm_params:[
      { label:'Ng mínima marcha mínima', value:'60', unit:'%' },
      { label:'Ng máxima continua', value:'104', unit:'%' },
      { label:'Ng máxima momentánea (≤5 seg)', value:'105', unit:'%' },
      { label:'Tolerancia indicación Ng', value:'± 0.5', unit:'% Ng' },
    ]
  },

  { id:'QTG-03-009', cat:'systems', critical:false,
    name:'Balance de Torque — ΔTq entre Motores', ref:'RFM §7',
    param:'Diferencia de torque entre motor 1 y 2 en crucero estabilizado', unit:'% Tq',
    ref_val:'ΔTq ≤ 5% en condición normal de MCP', tol:'ΔTq ≤ 5%',
    cond:'Crucero 150 KIAS estabilizado, ambos MCP, 2.600 kg', status:'pending',
    procedure:'Estabilizar el simulador en crucero a 150 KIAS con ambos motores a MCP y 2.600 kg. Registrar el torque individual de los motores 1 y 2 indicado en el VEMD (Vehicle and Engine Monitoring Display). Calcular la diferencia absoluta (ΔTq). En condiciones normales de crucero estabilizado, el balance de torque entre motores no debe diferir en más de 5%. Valores superiores indicarían un problema en el modelo de motor del simulador.',
    rfm_params:[
      { label:'Velocidad crucero', value:'150', unit:'KIAS' },
      { label:'Potencia', value:'MCP ambos motores' },
      { label:'Peso', value:'2.600', unit:'kg' },
      { label:'ΔTq máximo admitido', value:'≤ 5', unit:'% Tq' },
      { label:'Indicación', value:'VEMD — Tq Motor 1 vs Motor 2' },
    ]
  },

  { id:'QTG-03-010', cat:'systems', critical:false,
    name:'AFCS/SAS — Desconexión y Cambio de Fuerzas', ref:'RFM §7',
    param:'Cambio perceptible en fuerzas de control al desconectar SAS', unit:'cualitativo',
    ref_val:'Cambio perceptible e inmediato en fuerzas de mandos (<1 seg)', tol:'Perceptible < 1 seg',
    cond:'Vuelo nivelado estabilizado, SAS ON → OFF', status:'pending',
    procedure:'Con el simulador estabilizado en vuelo nivelado a 120 KIAS y SAS activo, desconectar el SAS manualmente desde el panel AFCS. Verificar que se produce un cambio perceptible e inmediato (< 1 segundo) en las fuerzas de los mandos de vuelo. El piloto debe notar el cambio mediante la columna de fuerza de los controles. RAAC 60 App. A §2 requiere representatividad del AFCS incluyendo las fuerzas de control.',
    rfm_params:[
      { label:'Velocidad prueba', value:'120', unit:'KIAS' },
      { label:'Tiempo cambio fuerza (SAS OFF)', value:'< 1', unit:'seg' },
      { label:'Sistema AFCS', value:'SAS Doppel — 2 canales' },
      { label:'Criterio', value:'Perceptible por el piloto (cualitativo)' },
    ]
  },

  { id:'QTG-03-011', cat:'systems', critical:false,
    name:'Antihielo Motor — Activación y Efecto', ref:'RFM §3 Normal',
    param:'Incremento de TOT y caída de Ng al activar antihielo', unit:'°C / % Ng',
    ref_val:'TOT +10 a +30°C | Ng -1 a -3% al activar antihielo', tol:'Dentro de rango publicado RFM',
    cond:'Vuelo crucero 120 KIAS, activación antihielo', status:'pending',
    procedure:'Con el simulador en crucero estabilizado a 120 KIAS, activar el sistema antihielo de motor desde el panel. Registrar el incremento en TOT y la caída en Ng que se producen al derivar aire caliente del compresor. El RFM §3 publica el rango esperado de variación: TOT +10 a +30°C y Ng -1 a -3%. El simulador debe reproducir estos efectos para ser representativo de la aeronave en condiciones de activación de sistemas.',
    rfm_params:[
      { label:'Incremento TOT esperado', value:'+10 a +30', unit:'°C' },
      { label:'Caída Ng esperada', value:'-1 a -3', unit:'%' },
      { label:'Velocidad prueba', value:'120', unit:'KIAS' },
      { label:'Criterio', value:'Dentro del rango publicado en RFM §3' },
    ]
  },

  { id:'QTG-03-012', cat:'systems', critical:false,
    name:'Detección Chip en Transmisión Principal', ref:'RFM §3 Emerg.',
    param:'Activación y persistencia de luz CHIP MAIN XMSN', unit:'cualitativo',
    ref_val:'Luz CHIP activa, persistente, procedimiento iniciado', tol:'Activa dentro de 2 seg',
    cond:'Inducción de señal chip en transmisión principal', status:'pending',
    procedure:'Desde el panel IOS, inducir la señal de detección de partícula metálica (chip) en la transmisión principal. Verificar que la luz CHIP MAIN XMSN se ilumina en cabina en no más de 2 segundos y permanece activa. El procedimiento de emergencia del RFM §3 debe ser iniciado. RAAC 60 App. A §2 requiere que todas las advertencias de sistema crítico de la aeronave sean representadas fielmente en el simulador.',
    rfm_params:[
      { label:'Tiempo activación luz CHIP', value:'≤ 2', unit:'seg' },
      { label:'Persistencia', value:'Continua hasta acción' },
      { label:'Procedimiento RFM', value:'§3 Emerg. — CHIP MAIN XMSN' },
      { label:'Acción requerida equipaje', value:'Inspección y aterrizaje precautorio' },
    ]
  },

  // ─── ÁREA 4: EMERGENCIAS ───
  { id:'QTG-04-001', cat:'emergency', critical:true,
    name:'⚠ Falla Motor en Hover — Cat A RTO (Aterrizaje)', ref:'RFM §3 Emerg. / Cat A',
    param:'Aterrizaje controlado en zona de despegue con un motor', unit:'FPM / ft',
    ref_val:'Aterrizaje < 300 FPM | Sin deriva > 3 ft lateral', tol:'< 300 FPM aterrizaje / < 3 ft deriva',
    cond:'Cat A, hover IGE 10 ft AGL, 3.000 kg, ISA, MSL', status:'pending',
    procedure:'PRUEBA CRÍTICA Cat A — RTO. Con el simulador en hover estabilizado IGE a 10 ft AGL, MTOW 3.000 kg, ISA y MSL, inducir la falla del motor crítico (motor 1 o 2). El piloto debe ejecutar el procedimiento de Rejected Takeoff (RTO) de Categoría A: reducir colectivo y aterrizar en la zona de despegue. Registrar la tasa de descenso al toque y la deriva lateral. El RFM §3 Cat A define los límites de performance OEI en hover. Prueba requerida por RAAC 60 como crítica.',
    rfm_params:[
      { label:'Altura hover IGE', value:'10', unit:'ft AGL' },
      { label:'Peso', value:'3.000 (MTOW)', unit:'kg' },
      { label:'Tasa aterrizaje máxima', value:'< 300', unit:'FPM' },
      { label:'Deriva lateral máxima', value:'< 3', unit:'ft' },
      { label:'Procedimiento RFM', value:'§3 Emerg. — Cat A RTO Hover' },
      { label:'Clasificación RAAC 60', value:'Prueba Crítica' },
    ]
  },

  { id:'QTG-04-002', cat:'emergency', critical:true,
    name:'⚠ Falla Motor Despegue — Cat A Continuado', ref:'RFM §3 Emerg. / Cat A',
    param:'Continuación del despegue OEI, superar obstáculo 35 ft AGL', unit:'ft / KIAS',
    ref_val:'≥35 ft AGL superado | ROC positivo OEI', tol:'≥35 ft AGL / ROC positivo',
    cond:'Cat A, post-TDP, 3.000 kg, ISA, MSL', status:'pending',
    procedure:'PRUEBA CRÍTICA Cat A — Despegue Continuado. Con el simulador en el perfil de despegue Cat A, después del punto de decisión de despegue (TDP), inducir la falla de un motor. El piloto debe continuar el despegue OEI y demostrar que la aeronave supera el obstáculo de 35 ft AGL con ROC positivo con el motor remanente a MCP OEI. La trayectoria debe ser representativa del perfil Cat A del AW109E publicado en el RFM §3.',
    rfm_params:[
      { label:'Obstáculo a superar', value:'35', unit:'ft AGL' },
      { label:'Motor remanente', value:'MCP OEI (25 min)' },
      { label:'Peso', value:'3.000 (MTOW)', unit:'kg' },
      { label:'ROC requerida', value:'Positiva (> 0 FPM)' },
      { label:'Perfil Cat A referencia', value:'RFM §3 — Cat A Takeoff Profile' },
      { label:'Clasificación RAAC 60', value:'Prueba Crítica' },
    ]
  },

  { id:'QTG-04-003', cat:'emergency', critical:true,
    name:'⚠ Falla de Motor en Crucero (OEI)', ref:'RFM §3 Emerg.',
    param:'Guiñada, tiempo alarma NR, recuperación con motor remanente', unit:'° / seg',
    ref_val:'Guiñada < 10° | Alarma NR < 2 seg | Estabilización OEI < 5 seg', tol:'< 10° / < 2 seg',
    cond:'150 KIAS, 2.600 kg, 1.500 ft AGL, ISA', status:'pending',
    procedure:'PRUEBA CRÍTICA. En crucero estabilizado a 150 KIAS, 2.600 kg, 1.500 ft AGL, inducir la falla completa de un motor desde el IOS. Registrar: (1) guiñada máxima hacia el lado del motor fallado, (2) tiempo hasta la activación de la alarma LOW NR, y (3) tiempo hasta que el piloto estabiliza la aeronave en vuelo OEI. El simulador debe reproducir la dinámica de falla motor del AW109E incluyendo el par de guiñada resultante del desequilibrio de empuje.',
    rfm_params:[
      { label:'Velocidad prueba', value:'150', unit:'KIAS' },
      { label:'Altitud prueba', value:'1.500', unit:'ft AGL' },
      { label:'Peso', value:'2.600', unit:'kg' },
      { label:'Guiñada máxima', value:'< 10', unit:'°' },
      { label:'Tiempo alarma NR', value:'< 2', unit:'seg' },
      { label:'Tiempo estabilización OEI', value:'< 5', unit:'seg' },
    ]
  },

  { id:'QTG-04-004', cat:'emergency', critical:false,
    name:'Autorrotación OEI — Máximo Alcance', ref:'RFM §3 Emerg.',
    param:'Tasa de descenso a 80 KIAS con un motor apagado', unit:'FPM',
    ref_val:'~1.800 FPM (datos RFM AW109E)', tol:'± 200 FPM',
    cond:'2.600 kg, 1.000 ft AGL, ISA, MSL, OEI', status:'pending',
    procedure:'Con el simulador a 1.000 ft AGL, 2.600 kg y un motor apagado (OEI sin potencia), establecer vuelo de autorrotación a 80 KIAS (velocidad de máximo alcance planados). Registrar la tasa de descenso en pies por minuto una vez estabilizada la autorrotación. El simulador debe reproducir fielmente la curva de performance de descenso en autorrotación del AW109E publicada en el RFM §3 (sección de procedimientos de emergencia).',
    rfm_params:[
      { label:'Velocidad máx. alcance autorrotación', value:'80', unit:'KIAS' },
      { label:'Altitud inicial', value:'1.000', unit:'ft AGL' },
      { label:'Peso', value:'2.600', unit:'kg' },
      { label:'Tasa descenso referencia RFM', value:'~1.800', unit:'FPM' },
      { label:'Tolerancia RAAC 60', value:'± 200', unit:'FPM' },
    ]
  },

  { id:'QTG-04-005', cat:'emergency', critical:false,
    name:'Autorrotación OEI — Mínima Tasa de Descenso', ref:'RFM §3 Emerg.',
    param:'Tasa de descenso a 65 KIAS, OEI', unit:'FPM',
    ref_val:'~1.300 FPM (datos RFM AW109E)', tol:'± 150 FPM',
    cond:'2.600 kg, 1.000 ft AGL, ISA, OEI', status:'pending',
    procedure:'Con el simulador a 1.000 ft AGL, 2.600 kg y motor(es) fuera de operación, establecer autorrotación a 65 KIAS (velocidad de mínima tasa de descenso). Registrar la tasa de descenso estabilizada. Esta velocidad minimiza el tiempo disponible para maniobra antes del toque. El RFM §3 publica ~1.300 FPM a esta velocidad. El simulador debe superar la prueba en ±150 FPM según RAAC 60.',
    rfm_params:[
      { label:'Velocidad mín. tasa descenso', value:'65', unit:'KIAS' },
      { label:'Altitud inicial', value:'1.000', unit:'ft AGL' },
      { label:'Peso', value:'2.600', unit:'kg' },
      { label:'Tasa descenso referencia RFM', value:'~1.300', unit:'FPM' },
      { label:'Tolerancia RAAC 60', value:'± 150', unit:'FPM' },
    ]
  },

  { id:'QTG-04-006', cat:'emergency', critical:true,
    name:'⚠ Falla Bimotor — Autorrotación hasta Tierra', ref:'RFM §3 Emerg.',
    param:'Tasa de descenso al toque; Nr al toque; patines nivelados', unit:'FPM / % Nr',
    ref_val:'Toque < 300 FPM | Nr > 90% | Patines nivelados', tol:'< 300 FPM / > 90% Nr',
    cond:'2.600 kg, 1.000 ft AGL, ISA, ambos motores OFF', status:'pending',
    procedure:'PRUEBA CRÍTICA. Con el simulador a 1.000 ft AGL y ambos motores apagados, ejecutar autorrotación completa hasta el toque en tierra. El piloto debe administrar la energía del rotor (Nr) y ejecutar el flare final para reducir la tasa de descenso. Registrar: (1) tasa de descenso al toque, (2) Nr al momento del toque, y (3) nivel lateral de los patines. El RFM §3 es la referencia para este procedimiento de emergencia bimotor.',
    rfm_params:[
      { label:'Altitud inicial', value:'1.000', unit:'ft AGL' },
      { label:'Peso', value:'2.600', unit:'kg' },
      { label:'Tasa descenso máxima al toque', value:'< 300', unit:'FPM' },
      { label:'Nr mínima al toque', value:'> 90', unit:'%' },
      { label:'Nr máxima autorrotación', value:'112', unit:'%' },
      { label:'Nivel patines', value:'Nivelados (sin inclinación > 5°)' },
    ]
  },

  { id:'QTG-04-007', cat:'emergency', critical:false,
    name:'Fuego de Motor en Vuelo', ref:'RFM §3 Emerg.',
    param:'Representación visual/sonora del fuego; secuencia de corte', unit:'cualitativo',
    ref_val:'Fuego visual + alarma FIRE + secuencia de corte coherente', tol:'Secuencia correcta con RFM',
    cond:'Crucero 120 KIAS, fuego inducido en motor 1', status:'pending',
    procedure:'En crucero estabilizado a 120 KIAS, inducir fuego de motor 1 desde el IOS. Verificar: (1) activación de luz FIRE ENG 1 en panel en ≤1 seg, (2) alarma sonora FIRE activa, (3) representación visual del fuego en el sistema visual exterior. Ejecutar el procedimiento de emergencia de fuego de motor del RFM §3 y verificar que la secuencia de corte de combustible y agente extintor sea coherente con el procedimiento publicado.',
    rfm_params:[
      { label:'Tiempo activación FIRE light', value:'≤ 1', unit:'seg' },
      { label:'Representación visual fuego', value:'Requerida en sistema exterior' },
      { label:'Alarma sonora FIRE', value:'Activa inmediatamente' },
      { label:'Procedimiento RFM', value:'§3 Emerg. — ENGINE FIRE IN FLIGHT' },
    ]
  },

  { id:'QTG-04-008', cat:'emergency', critical:false,
    name:'Falla Anti-Torque (Rotor de Cola)', ref:'RFM §3 Emerg.',
    param:'Respuesta en guiñada no controlada y velocidad segura', unit:'kt / °',
    ref_val:'Guiñada derecha; Velocidad segura > 50 KIAS lograda', tol:'Comportamiento coherente RFM',
    cond:'Crucero 120 KIAS, falla rotor de cola inducida', status:'pending',
    procedure:'En crucero a 120 KIAS, inducir la falla del sistema anti-torque (rotor de cola = 0 rendimiento). El AW109E con rotor principal girando en sentido anti-horario (visto desde arriba) sufrirá guiñada a la derecha. El piloto debe lograr la velocidad segura de control (>50 KIAS) para controlar la guiñada mediante velocidad aerodinámica. Verificar que el comportamiento del simulador es coherente con el publicado por el fabricante.',
    rfm_params:[
      { label:'Velocidad segura control guiñada', value:'> 50', unit:'KIAS' },
      { label:'Dirección guiñada', value:'Derecha (con rotor PCH)' },
      { label:'Velocidad inicial prueba', value:'120', unit:'KIAS' },
      { label:'Procedimiento RFM', value:'§3 Emerg. — TAIL ROTOR FAILURE' },
    ]
  },

  { id:'QTG-04-009', cat:'emergency', critical:true,
    name:'⚠ Falla Total Hidráulica (Sys 1 y 2)', ref:'RFM §3 Emerg.',
    param:'Incremento de fuerzas en cíclico y colectivo al fallar ambos sistemas', unit:'cualitativo',
    ref_val:'Endurecimiento marcado e inmediato en todos los mandos', tol:'Perceptible e inmediato',
    cond:'Vuelo nivelado, HYD SYS 1 y 2 desactivados', status:'pending',
    procedure:'PRUEBA CRÍTICA. En vuelo nivelado estabilizado, desactivar simultáneamente ambos sistemas hidráulicos desde el IOS. Verificar que los mandos de vuelo (cíclico y colectivo) muestran un endurecimiento marcado e inmediato, representativo de la aeronave real sin asistencia hidráulica. Las fuerzas en los mandos deben incrementarse perceptiblemente. RAAC 60 exige que la falla hipotética de ambos sistemas sea representada correctamente.',
    rfm_params:[
      { label:'Sistemas desactivados', value:'HYD SYS 1 y 2' },
      { label:'Efecto en mandos', value:'Endurecimiento marcado e inmediato' },
      { label:'Aeronave controlable', value:'Sí, con mayor esfuerzo' },
      { label:'Procedimiento RFM', value:'§3 Emerg. — DUAL HYD FAILURE' },
    ]
  },

  { id:'QTG-04-010', cat:'emergency', critical:false,
    name:'Recuperación de Baja Nr del Rotor', ref:'RFM §3 Emerg.',
    param:'Tiempo para recuperar Nr a >100% con acción correcta', unit:'seg',
    ref_val:'Recuperación a >100% Nr en < 5 seg con acción', tol:'< 5 seg con acción correcta',
    cond:'80 KIAS, Nr reducida a <95%', status:'pending',
    procedure:'Con el simulador a 80 KIAS, reducir la Nr por debajo del umbral de alarma (95%) mediante reducción de potencia controlada. Una vez activada la alarma LOW NR, el piloto debe aplicar la acción correcta (reducir colectivo y/o incrementar potencia). Registrar el tiempo desde la acción hasta que la Nr recupera >100%. El simulador debe mostrar la dinámica real del rotor AW109E en la recuperación de Nr.',
    rfm_params:[
      { label:'Nr de activación alarma', value:'95', unit:'%' },
      { label:'Velocidad prueba', value:'80', unit:'KIAS' },
      { label:'Nr objetivo recuperación', value:'> 100', unit:'%' },
      { label:'Tiempo máximo recuperación', value:'< 5', unit:'seg' },
      { label:'Acción correcta', value:'Reducir colectivo / Incrementar potencia' },
    ]
  },

  { id:'QTG-04-011', cat:'emergency', critical:false,
    name:'Indicación Vortex Ring State (VRS)', ref:'RFM §3 Emerg.',
    param:'Representación VRS y advertencia visual/sonora activa', unit:'cualitativo',
    ref_val:'Tasa descenso > 800 FPM + Tq >70% activa advertencia VRS', tol:'Advertencia activa en condición VRS',
    cond:'Descenso veloz, bajo avance, alto Tq inducido', status:'pending',
    procedure:'Generar las condiciones de entrada al Vortex Ring State: baja velocidad de avance (<30 KIAS), alta tasa de descenso (>800 FPM) y alta demanda de torque (>70% Tq). Verificar que el simulador activa la advertencia de VRS (visual y/o sonora) en estas condiciones. El AW109E tiene un sistema de advertencia de VRS incorporado. RAAC 60 App. A §2 requiere que el modelo aerodinámico incluya la representación del VRS.',
    rfm_params:[
      { label:'Velocidad máx. entrada VRS', value:'< 30', unit:'KIAS' },
      { label:'Tasa descenso entrada VRS', value:'> 800', unit:'FPM' },
      { label:'Torque entrada VRS', value:'> 70', unit:'% Tq' },
      { label:'Advertencia VRS', value:'Visual + sonora en cabina' },
    ]
  },

  { id:'QTG-04-012', cat:'emergency', critical:false,
    name:'Aproximación y Aterrizaje OEI', ref:'RFM §3 Emerg.',
    param:'Aproximación OEI, motor operativo a MCP, aterrizaje suave', unit:'FPM',
    ref_val:'Aterrizaje < 200 FPM | Control guiñada < ±5°', tol:'< 200 FPM / ±5° guiñada',
    cond:'2.600 kg, un motor MCP, ISA, MSL', status:'pending',
    procedure:'Con el simulador en vuelo OEI (un motor al MCP y el otro apagado), ejecutar una aproximación y aterrizaje completo. Gestionar la asimetría de empuje con pedal para mantener la guiñada dentro de ±5°. El aterrizaje debe ser suave con tasa de descenso <200 FPM al toque. Comparar la performance de aproximación OEI con los datos publicados en el RFM §3 para verificar la representatividad del simulador.',
    rfm_params:[
      { label:'Motor operativo', value:'MCP (≤623 SHP, 25 min)' },
      { label:'Peso', value:'2.600', unit:'kg' },
      { label:'Tasa descenso máxima al toque', value:'< 200', unit:'FPM' },
      { label:'Control guiñada', value:'< ± 5', unit:'°' },
      { label:'Procedimiento RFM', value:'§3 Emerg. — OEI Approach & Landing' },
    ]
  },

  // ─── ÁREA 5: VISUAL / ENTORNO ───
  { id:'QTG-05-001', cat:'visual', critical:false,
    name:'Campo Visual — Cobertura H × V', ref:'RAAC60 App.A / JAR-FSTD H',
    param:'Ángulo horizontal y vertical del sistema visual', unit:'grados',
    ref_val:'≥ 150° H × 40° V (FFS Nivel B)', tol:'± 5° en cada eje',
    cond:'Sistema de realidad mixta activo, cabina de vuelo', status:'pending',
    procedure:'Con el sistema visual activo y el simulador en tierra, verificar el campo de visión angular del sistema de realidad mixta. Utilizando targets visuales de calibración colocados en posiciones conocidas, medir el ángulo horizontal total (debe ser ≥150°) y el ángulo vertical (debe ser ≥40°). RAAC 60 App. A y JAR-FSTD H establecen estos requisitos mínimos de campo visual para la categoría de calificación.',
    rfm_params:[
      { label:'Campo visual mínimo horizontal', value:'≥ 150', unit:'°' },
      { label:'Campo visual mínimo vertical', value:'≥ 40', unit:'°' },
      { label:'Tolerancia medición', value:'± 5', unit:'° por eje' },
      { label:'Referencia normativa', value:'RAAC 60 App. A §5 / JAR-FSTD H' },
    ]
  },

  { id:'QTG-05-002', cat:'visual', critical:true,
    name:'⚠ Latencia del Sistema Visual', ref:'RAAC 60 / JAR-FSTD H',
    param:'Retardo entre movimiento del simulador y actualización visual', unit:'ms',
    ref_val:'≤ 150 ms (FFS Nivel B)', tol:'Debe ser ≤ 150 ms en todos los ejes',
    cond:'Plataforma 6-DoF en movimiento activo', status:'pending',
    procedure:'PRUEBA CRÍTICA. Con la plataforma de movimiento activa, medir el retardo (latencia) entre el movimiento físico del simulador y la actualización correspondiente de la imagen visual. Utilizar equipamiento de medición de latencia certificado (acelerómetro + cámara de alta velocidad o sistema equivalente). El retardo máximo admitido es 150 ms. Cualquier valor superior requiere corrección del sistema antes de la certificación.',
    rfm_params:[
      { label:'Latencia máxima permitida', value:'≤ 150', unit:'ms' },
      { label:'Método de medición', value:'Acelerómetro + cámara alta velocidad' },
      { label:'Ejes de prueba', value:'Pitch, Roll, Yaw, Heave, Surge, Sway' },
      { label:'Referencia normativa', value:'RAAC 60 / JAR-FSTD H §4' },
      { label:'Clasificación RAAC 60', value:'Prueba Crítica' },
    ]
  },

  { id:'QTG-05-003', cat:'visual', critical:false,
    name:'Calidad Visual — Horizonte y Terreno', ref:'JAR-FSTD H',
    param:'Resolución, nitidez del horizonte, ausencia de artefactos visuales', unit:'cualitativo',
    ref_val:'Representación continua sin bandas de transición', tol:'Evaluación cualitativa Inspector ANAC',
    cond:'Vuelo VMC, hora día', status:'pending',
    procedure:'En condiciones VMC diurnas, evaluar cualitativamente la calidad del sistema visual: nitidez del horizonte, resolución del terreno, ausencia de artefactos (pixelado, bandas de transición, tearing). El Inspector ANAC realiza la evaluación subjetiva comparando con estándares de referencia JAR-FSTD H. El sistema de realidad mixta debe proveer una imagen continua, estable y representativa del entorno visual helicóptero.',
    rfm_params:[
      { label:'Condición meteorológica', value:'VMC' },
      { label:'Hora del día', value:'Diurna' },
      { label:'Evaluación', value:'Cualitativa — Inspector ANAC' },
      { label:'Criterio', value:'Sin artefactos / Horizonte nítido' },
      { label:'Referencia', value:'JAR-FSTD H Apéndice B §3' },
    ]
  },

  { id:'QTG-05-004', cat:'visual', critical:false,
    name:'Representación Meteorológica', ref:'RAAC 60',
    param:'VMC, IMC, lluvia, niebla, visibilidad restringida, noche', unit:'cualitativo',
    ref_val:'Todas las condiciones seleccionables y realistas', tol:'6/6 condiciones representadas',
    cond:'Cambios de condición meteorológica desde IOS', status:'pending',
    procedure:'Desde el panel IOS, seleccionar y demostrar las siguientes condiciones meteorológicas: (1) VMC día, (2) VMC noche, (3) IMC nubes, (4) lluvia con efectos en parabrisas, (5) niebla/visibilidad reducida, (6) polvo/brownout. Verificar que cada condición es seleccionable y produce efectos visuales realistas. RAAC 60 exige que el sistema visual soporte condiciones adversas para el entrenamiento IFR y de emergencia.',
    rfm_params:[
      { label:'Condición 1', value:'VMC Día' },
      { label:'Condición 2', value:'VMC Noche' },
      { label:'Condición 3', value:'IMC / Nubes' },
      { label:'Condición 4', value:'Lluvia (efectos parabrisas)' },
      { label:'Condición 5', value:'Niebla / Visibilidad < 1.000 m' },
      { label:'Condición 6', value:'Polvo / Brownout' },
      { label:'Criterio', value:'6/6 condiciones representadas' },
    ]
  },

  { id:'QTG-05-005', cat:'visual', critical:false,
    name:'Plataforma 6-DoF — Turbulencia', ref:'RAAC 60 / JAR-FSTD H',
    param:'Aceleraciones y frecuencias en turbulencia leve/moderada', unit:'g / Hz',
    ref_val:'Correlación cualitativa con datos de ingeniería del fabricante', tol:'Cualitativo — correlación aceptable',
    cond:'Vuelo en nivel con turbulencia activada desde IOS', status:'pending',
    procedure:'Con el simulador en vuelo nivelado y turbulencia leve/moderada activada desde el IOS, verificar que la plataforma de movimiento 6-DoF genera aceleraciones y frecuencias de movimiento que correlacionan con los datos de ingeniería del fabricante del simulador. Medir con acelerómetro en cabina. RAAC 60 / JAR-FSTD H requieren que la plataforma reproduzca cualitativamente los efectos de turbulencia en vuelo.',
    rfm_params:[
      { label:'Grados de libertad plataforma', value:'6-DoF' },
      { label:'Intensidad turbulencia', value:'Leve y Moderada' },
      { label:'Medición', value:'Acelerómetro en cabina' },
      { label:'Criterio', value:'Correlación cualitativa con datos fabricante' },
      { label:'Referencia', value:'JAR-FSTD H §4.4 — Motion System' },
    ]
  },

  { id:'QTG-05-006', cat:'visual', critical:false,
    name:'Sistema de Sonido — Motores, Rotor y Alarmas', ref:'RAAC 60',
    param:'Alarma LOW NR ≥10 dB sobre ruido de fondo de cabina', unit:'dB',
    ref_val:'Alarma NR: ≥10 dB sobre fondo | FIRE audible con auriculares', tol:'Alarma NR ≥ 10 dB sobre fondo',
    cond:'Cabina cerrada, motores en operación', status:'pending',
    procedure:'Con el simulador en funcionamiento y cabina cerrada, medir el nivel sonoro de la alarma LOW NR y el ruido de fondo de la cabina con un sonómetro calibrado. La alarma debe superar en al menos 10 dB el nivel de fondo. Verificar también que la alarma FIRE es audible con auriculares de vuelo puestos. RAAC 60 requiere que las alarmas auditivas sean perceptibles en condiciones operativas reales.',
    rfm_params:[
      { label:'Alarma LOW NR nivel mínimo', value:'Fondo + 10', unit:'dB' },
      { label:'Alarma FIRE', value:'Audible con auriculares ANR' },
      { label:'Método medición', value:'Sonómetro clase 1 calibrado' },
      { label:'Condición de medición', value:'Cabina cerrada, rotores en marcha' },
      { label:'Referencia normativa', value:'RAAC 60 App. A §6 — Sound' },
    ]
  },

  // ─── ÁREA 6: CABINA ───
  { id:'QTG-06-001', cat:'cabina', critical:false,
    name:'Panel de Instrumentos — Verificación General', ref:'RFM §7',
    param:'Presencia y operatividad de todos los instrumentos (EFIS + analógicos)', unit:'%',
    ref_val:'100% instrumentos presentes y operativos', tol:'100% — sin excepción',
    cond:'Sistema activo, motores en marcha (simulado)', status:'pending',
    procedure:'Con el simulador en marcha y ambos motores arrancados, realizar una verificación sistemática de todos los instrumentos de vuelo y de motor de la cabina réplica del AW109E. Incluir: VEMD (Vehicle & Engine Monitoring Display), VSI, altímetro, horizonte artificial, velocímetro, indicadores de sistemas (HYD, FUEL, ELEC) y todos los displays EFIS. Comparar instrumentación contra el inventario del RFM §7 (sección equipamiento). Todos deben estar presentes y operativos.',
    rfm_params:[
      { label:'VEMD (Display motor)', value:'Operativo — 2 canales' },
      { label:'Display navegación / actitud', value:'EFIS operativo' },
      { label:'Instrumentos analógicos backup', value:'VSI, Alt, Vel, Compass' },
      { label:'Alarmas panel', value:'Todas operativas' },
      { label:'Criterio aprobación', value:'100% presentes y operativos' },
    ]
  },

  { id:'QTG-06-002', cat:'cabina', critical:true,
    name:'⚠ Indicadores TOT — Exactitud Ambos Canales', ref:'RFM §1',
    param:'TOT en MCP continuo (ambos motores), ISA, MSL', unit:'°C',
    ref_val:'TOT ≤ 780°C en MCP | Indicación exacta en ambos canales', tol:'± 5°C en cada canal',
    cond:'Ambos motores MCP, MSL, ISA estabilizado', status:'pending',
    procedure:'PRUEBA CRÍTICA. Con ambos motores estabilizados a MCP continuo, ISA, MSL, registrar la temperatura de gases de turbina (TOT) indicada en los dos canales del VEMD. La indicación de cada canal debe ser ≤780°C (límite MCP según RFM §1) y los dos canales no deben diferir en más de ±5°C. Esta prueba verifica la exactitud del modelado del motor térmico y del sistema de indicación de temperatura.',
    rfm_params:[
      { label:'TOT límite MCP continuo', value:'780', unit:'°C' },
      { label:'Canales de indicación', value:'2 (Canal 1 y Canal 2 VEMD)' },
      { label:'Tolerancia entre canales', value:'≤ ± 5', unit:'°C' },
      { label:'Motor referencia', value:'Rolls-Royce 250-C20R/4C (PW206C)' },
      { label:'Clasificación RAAC 60', value:'Prueba Crítica' },
    ]
  },

  { id:'QTG-06-003', cat:'cabina', critical:false,
    name:'Indicadores Nr/Nf — Exactitud', ref:'RFM §1',
    param:'Nr y Nf en vuelo estabilizado a MCP', unit:'% Nr',
    ref_val:'Nr: 100–107% | Nf proporcional a Nr en ambos canales', tol:'± 1% Nr',
    cond:'Vuelo estabilizado, ambos motores MCP', status:'pending',
    procedure:'En vuelo estabilizado con ambos motores a MCP, registrar la velocidad del rotor principal (Nr) y la velocidad de turbina libre (Nf) indicadas en el VEMD. La Nr debe estar en el rango 100–107% en vuelo normal. El Nf debe ser proporcional a Nr (el AW109E tiene rotor síncrono con turbina libre). Verificar exactitud de ±1% en ambos indicadores. El RFM §1 define los rangos operativos normales.',
    rfm_params:[
      { label:'Nr rango normal vuelo', value:'100–107', unit:'%' },
      { label:'Nf relación con Nr', value:'Proporcional (turbina libre)' },
      { label:'Tolerancia indicación', value:'± 1', unit:'% Nr' },
      { label:'Nr límite superior (transiente)', value:'112', unit:'%' },
      { label:'Nr mínima vuelo', value:'95', unit:'% (alarma)' },
    ]
  },

  { id:'QTG-06-004', cat:'cabina', critical:false,
    name:'Controles de Vuelo — Rango de Movimiento', ref:'RFM §7',
    param:'Deflexión máxima cíclico (lat/lon), colectivo y pedales', unit:'% rango',
    ref_val:'Rango completo en cada eje sin trabas', tol:'± 5% del rango total por eje',
    cond:'Sistema frío/neutro, verificación en tierra', status:'pending',
    procedure:'Con el simulador en tierra y sistema hidráulico activo, verificar el rango de movimiento completo de cada control: (1) cíclico longitudinal (adelante/atrás), (2) cíclico lateral (izquierda/derecha), (3) colectivo (mínimo/máximo), (4) pedales anti-torque (izquierda/derecha). No debe haber trabas físicas, fricciones excesivas ni áreas muertas. Comparar con los recorridos del RFM §7 (datos de cabina réplica).',
    rfm_params:[
      { label:'Cíclico longitudinal', value:'Rango completo sin trabas' },
      { label:'Cíclico lateral', value:'Rango completo sin trabas' },
      { label:'Colectivo', value:'Mínimo a máximo sin trabas' },
      { label:'Pedales anti-torque', value:'Rango completo sin trabas' },
      { label:'Tolerancia rango', value:'± 5', unit:'% por eje' },
    ]
  },

  { id:'QTG-06-005', cat:'cabina', critical:false,
    name:'Luces de Advertencia — LOW NR, GEN, FIRE, CHIP, LOW FUEL', ref:'RFM §3 y §7',
    param:'Activación individual de cada luz de alarma en panel', unit:'seg',
    ref_val:'LOW NR ≤1s / GEN ≤3s / FIRE ≤1s / CHIP ≤2s / LOW FUEL ≤2s', tol:'Ver tiempos individuales',
    cond:'Inducción individual de cada condición de alarma', status:'pending',
    procedure:'Para cada una de las cinco alarmas, inducir la condición correspondiente desde el IOS y cronometrar el tiempo hasta la iluminación de la luz en el panel de cabina. Verificar la correcta ubicación de cada luz en el panel réplica AW109E y que el color sea el correcto (rojo para FIRE y LOW NR, ámbar para GEN y CHIP, amarillo para LOW FUEL). Los tiempos deben cumplir los valores del RFM §7.',
    rfm_params:[
      { label:'LOW NR (color rojo)', value:'≤ 1', unit:'seg' },
      { label:'GEN FAIL (color ámbar)', value:'≤ 3', unit:'seg' },
      { label:'FIRE (color rojo)', value:'≤ 1', unit:'seg' },
      { label:'CHIP XMSN (color ámbar)', value:'≤ 2', unit:'seg' },
      { label:'LOW FUEL (color amarillo)', value:'≤ 2', unit:'seg' },
    ]
  },

  { id:'QTG-06-006', cat:'cabina', critical:false,
    name:'Panel AFCS — Operación y Modos', ref:'RFM §7',
    param:'Selección y activación de modos SAS, AP, ALT HOLD, HDG', unit:'cualitativo',
    ref_val:'Cada modo actúa correctamente y es perceptible en mandos', tol:'< 1 seg activación / Perceptible',
    cond:'Vuelo estabilizado, operación panel AFCS', status:'pending',
    procedure:'En vuelo estabilizado a 120 KIAS, activar y desactivar secuencialmente los modos del AFCS: (1) SAS ON/OFF — verificar efecto en estabilidad, (2) Autopiloto (AP) — verificar retención automática de actitud, (3) ALT HOLD — verificar mantenimiento de altitud, (4) HDG HOLD — verificar mantenimiento de rumbo. Cada modo debe activarse en <1 segundo y su efecto debe ser perceptible en los mandos o en los parámetros de vuelo según el RFM §7.',
    rfm_params:[
      { label:'Modo SAS', value:'ON/OFF — efecto inmediato en estabilidad' },
      { label:'Modo AP (Autopiloto)', value:'Retención actitud automática' },
      { label:'Modo ALT HOLD', value:'Altitud mantenida ± 50 ft' },
      { label:'Modo HDG HOLD', value:'Rumbo mantenido ± 2°' },
      { label:'Tiempo activación modo', value:'< 1', unit:'seg' },
    ]
  }
];

export const FASES_DATA: Fase[] = [
  /* ... contenido de fases portado ... */
  {
    n: 1, color: '#3b82f6',
    title: 'Fase 1 — Preparación y Solicitud Formal',
    desc: 'Presentación de documentación inicial ante ANAC',
    status: 'in-progress',
    requisitos: [
      { id:'F1-01', text:'Carta de solicitud formal de calificación FSTD dirigida al Director de Habilitaciones ANAC', done: true },
      { id:'F1-02', text:'Identificación del dispositivo: tipo, fabricante, número de serie, nivel de calificación solicitado', done: true },
      { id:'F1-03', text:'Descriptivo técnico del simulador (motion, visual, aviónica, aeronave de referencia AW109E Power)', done: true },
      { id:'F1-04', text:'Declaración de Cumplimiento firmada por el representante legal del operador', done: false },
      { id:'F1-05', text:'Identificación de la aeronave de referencia (AgustaWestland AW109E Power) y datos RFM vigente', done: true },
      { id:'F1-06', text:'Cronograma propuesto de evaluación y contactos técnicos designados', done: false },
    ]
  },
  {
    n: 2, color: '#10b981',
    title: 'Fase 2 — Entrega de la QTG Maestra',
    desc: 'Presentación de la Guía de Pruebas de Calificación completa',
    status: 'in-progress',
    requisitos: [
      { id:'F2-01', text:'QTG Maestra firmada (53 pruebas en 6 áreas) con datos de referencia del RFM AW109E Power', done: true },
      { id:'F2-02', text:'Tolerancias por parámetro conformes a RAAC Parte 60 / JAR-FSTD H', done: true },
      { id:'F2-03', text:'Identificación de pruebas críticas (7 marcadas con ⚠)', done: true },
      { id:'F2-04', text:'Datos de validación del fabricante del simulador (datos aerodinámicos base AW109E)', done: false },
      { id:'F2-05', text:'Matriz de trazabilidad: QTG ↔ Sección del RFM ↔ Requisito RAAC 60', done: false },
      { id:'F2-06', text:'Procedimientos de configuración del simulador para cada prueba', done: false },
    ]
  },
  {
    n: 3, color: '#f59e0b',
    title: 'Fase 3 — Evaluación Inicial (Sin Inspector)',
    desc: 'Ejecución interna de todas las pruebas QTG y registro de resultados',
    status: 'pending',
    requisitos: [
      { id:'F3-01', text:'Ejecución de las 53 pruebas QTG según procedimientos establecidos', done: false },
      { id:'F3-02', text:'Registro de resultados en software Qualification Test Studio', done: false },
      { id:'F3-03', text:'Validación interna de tolerancias — detección de no-conformidades', done: false },
      { id:'F3-04', text:'Corrección de desviaciones y re-prueba de ítems fallidos', done: false },
      { id:'F3-05', text:'Generación del Informe de Evaluación Interna (IEI) firmado por Jefe de Instrucción', done: false },
      { id:'F3-06', text:'Verificación del sistema de sonido (alarmas NR, FIRE, CHIP) contra grabaciones de referencia', done: false },
    ]
  },
  {
    n: 4, color: '#8b5cf6',
    title: 'Fase 4 — Inspección ANAC en Sitio',
    desc: 'Presencia del inspector ANAC para evaluación oficial en el simulador',
    status: 'pending',
    requisitos: [
      { id:'F4-01', text:'Coordinación de fecha y logística de la inspección ANAC', done: false },
      { id:'F4-02', text:'Repetición de pruebas críticas (⚠ QTGs) en presencia del inspector', done: false },
      { id:'F4-03', text:'Demostración de procedimientos OEI y emergencia bimotor (Área 4 completa)', done: false },
      { id:'F4-04', text:'Evaluación del sistema visual y plataforma de movimiento por inspector (Área 5)', done: false },
      { id:'F4-05', text:'Revisión de la cabina réplica AW109E vs. aeronave real (Área 6)', done: false },
      { id:'F4-06', text:'Firma del acta de inspección por inspector ANAC y representante del operador', done: false },
    ]
  },
  {
    n: 5, color: '#ef4444',
    title: 'Fase 5 — Atención de Observaciones',
    desc: 'Resolución de no-conformidades detectadas por ANAC',
    status: 'pending',
    requisitos: [
      { id:'F5-01', text:'Recepción del acta de inspección con observaciones formales', done: false },
      { id:'F5-02', text:'Plan de acción para cada observación (responsable + plazo)', done: false },
      { id:'F5-03', text:'Ejecución de correcciones técnicas y re-prueba de ítems objetados', done: false },
      { id:'F5-04', text:'Presentación del Informe de Cierre de Observaciones ante ANAC', done: false },
      { id:'F5-05', text:'Re-inspección parcial si las observaciones afectan pruebas críticas', done: false },
    ]
  },
  {
    n: 6, color: '#06b6d4',
    title: 'Fase 6 — Emisión del Certificado ANAC',
    desc: 'Obtención del certificado de calificación FSTD y normas de mantenimiento',
    status: 'pending',
    requisitos: [
      { id:'F6-01', text:'Emisión del Certificado de Calificación FSTD por ANAC (nivel otorgado)', done: false },
      { id:'F6-02', text:'Registro del simulador en el sistema de habilitaciones ANAC', done: false },
      { id:'F6-03', text:'Implementación del Programa de Pruebas de Verificación Periódica (PVP — anual)', done: false },
      { id:'F6-04', text:'Capacitación del personal técnico en los procedimientos de mantenimiento del certificado', done: false },
      { id:'F6-05', text:'Implementación del sistema de registro de anomalías y NOTAM del simulador', done: false },
      { id:'F6-06', text:'Establecimiento del calendario de renovación anual (12 meses desde emisión)', done: false },
    ]
  }
];

export const DOCS_DATA: Documento[] = [
  { id:'RFM-0', icon:'📖', name:'AW109E RFM INTRO — Generalidades', cat:'manuales', date:'Ed. 2026', size:'265 KB', status:'✅ Cargado', url:'/Manuales/AW109E RFM INTRO.pdf' },
  { id:'RFM-1', icon:'⚠', name:'Sección 1 — Limitaciones de Operación', cat:'manuales', date:'Ed. 2026', size:'2.4 MB', status:'✅ Cargado', url:'/Manuales/AW109E RFM PARTE 1 SECCION 1 LIMITACIONES.pdf' },
  { id:'RFM-2', icon:'⚙', name:'Sección 2 — Procedimientos Normales', cat:'manuales', date:'Ed. 2026', size:'1.9 MB', status:'✅ Cargado', url:'/Manuales/AW109E RFM PARTE 1 SECCION 2 PROCEDIMIENTOS NORMALES.pdf' },
  { id:'RFM-3', icon:'🔥', name:'Sección 3 — Procedimientos de Emergencia', cat:'manuales', date:'Ed. 2026', size:'398 KB', status:'✅ Crítico', url:'/Manuales/AW109E RFM PARTE 1 SECCION 3 PROCEDIMIENTOS DE EMERGENCIA.pdf' },
  { id:'RFM-4', icon:'📈', name:'Sección 4 — Datos de Performance', cat:'manuales', date:'Ed. 2026', size:'820 KB', status:'✅ QTG Ref', url:'/Manuales/AW109E RFM PARTE 1 SECCION 4 PERFORMANCE.pdf' },
  { id:'RFM-5', icon:'📑', name:'Sección 5 — Suplementos de Vuelo', cat:'manuales', date:'Ed. 2026', size:'6.1 MB', status:'✅ Cargado', url:'/Manuales/AW109E RFM PARTE 1 SECCION 5 SUPLEMENTOS.pdf' },
  { id:'RFM-6', icon:'⚖', name:'Sección 6 — Peso y Balanceo', cat:'manuales', date:'Ed. 2026', size:'409 KB', status:'✅ Cargado', url:'/Manuales/AW109E RFM PARTE 2 SECCION 6 PESO Y BALANCEO.pdf' },
  { id:'RFM-7', icon:'🛠', name:'Sección 7 — Descripción de Sistemas', cat:'manuales', date:'Ed. 2026', size:'689 KB', status:'✅ Cargado', url:'/Manuales/AW109E RFM PARTE 2 SECCION 7 SISTEMAS.pdf' },
  { id:'RFM-8', icon:'🚛', name:'Sección 8 — Remolque y Servicios', cat:'manuales', date:'Ed. 2026', size:'333 KB', status:'✅ Cargado', url:'/Manuales/AW109E RFM PARTE 2 SECCION 8 REMOLQUE Y SERVICIOS.pdf' },
  { id:'RFM-9', icon:'ℹ', name:'Sección 9 — Info Suplementaria', cat:'manuales', date:'Ed. 2026', size:'334 KB', status:'✅ Cargado', url:'/Manuales/AW109E RFM PARTE 2 SECCION 9 INFORMACION SUPLEMENTARIA.pdf' },
  { id:'D03', icon:'📄', name:'RAAC Parte 60 — Texto completo', cat:'solicitudes', date:'2022', size:'2.1 MB', status:'✅ Referencia', url:'https://www.argentina.gob.ar/sites/default/files/anexo-parte-60.pdf' },
  { id:'D05', icon:'📑', name:'JAR-FSTD H — Ed. completa EASA', cat:'validacion', date:'EASA', size:'4.7 MB', status:'📤 Pendiente', url:'https://www.easa.europa.eu/en/domains/aircrew-and-medical/flight-simulation-training-devices-fstd' },
];

export const NORMATIVA_DATA: NormativaItem[] = [
  /* ... normativa portado ... */
  {
    id: 'raac60-gral',
    section: 'RAAC Parte 60',
    title: 'Generalidades RAAC Parte 60',
    ref: 'RAAC Parte 60 §60.1 – §60.17',
    content: `
      <h3>RAAC Parte 60 — Calificación de Dispositivos de Entrenamiento de Vuelo</h3>
      <p class="norm-ref">Referencia: ANAC Argentina · Resolución ANAC N.º 122/2022</p>
      <p>La RAAC Parte 60 establece los requisitos para la <strong>calificación, uso y mantenimiento de los Dispositivos de Entrenamiento de Vuelo (FTD/FFS)</strong> en la República Argentina, alineada con los estándares internacionales de la OACI y los requisitos JAR-FSTD H.</p>
    `
  }
];

export const CHECKLIST_DATA = [
  {
    title: 'Encendido y Sistema Eléctrico', icon: '⚡', color: '#f59e0b',
    items: [
      { id:'CL-01-1', text:'UPS y alimentación principal del simulador — ON', ref:'SOP §2.1' },
      { id:'CL-01-2', text:'Sistema de distribución eléctrica 220V — verificado', ref:'SOP §2.1' },
      { id:'CL-01-3', text:'Panel de control IOS — encendido y operativo', ref:'SOP §2.2' },
      { id:'CL-01-4', text:'Monitores de cabina (EFIS y paneles) — imagen correcta', ref:'SOP §2.3' },
      { id:'CL-01-5', text:'Iluminación cabina réplica AW109E — funcional', ref:'SOP §2.4' },
    ]
  },
  {
    title: 'Plataforma de Movimiento 6-DoF', icon: '🔧', color: '#3b82f6',
    items: [
      { id:'CL-02-1', text:'Actuadores hidráulicos / eléctricos — presión nominal', ref:'MOM §3.1' },
      { id:'CL-02-2', text:'Plataforma en posición neutra (home position)', ref:'MOM §3.2' },
      { id:'CL-02-3', text:'Límites de carrera en todos los ejes — sin alarmas', ref:'MOM §3.3' },
      { id:'CL-02-4', text:'Sistema de seguridad y parada de emergencia — operativo', ref:'MOM §3.4' },
      { id:'CL-02-5', text:'Área perimetral despejada — acceso restringido', ref:'SOP §1.2' },
    ]
  },
  {
    title: 'Sistema Visual / Realidad Mixta', icon: '👁', color: '#8b5cf6',
    items: [
      { id:'CL-03-1', text:'Computadoras gráficas — encendidas y sin errores', ref:'VIS §4.1' },
      { id:'CL-03-2', text:'Latencia visual verificada — ≤ 150 ms', ref:'RAAC60 / JAR-FSTD H' },
      { id:'CL-03-3', text:'Calidad de imagen (horizonte, terreno) — sin artefactos', ref:'VIS §4.3' },
      { id:'CL-03-4', text:'Dispositivos HMD/MR — calibrados y funcionales', ref:'VIS §4.4' },
      { id:'CL-03-5', text:'Selección de escenario y condición meteorológica — OK', ref:'VIS §4.5' },
    ]
  },
  {
    title: 'Cabina Réplica AW109E Power', icon: '🎮', color: '#10b981',
    items: [
      { id:'CL-04-1', text:'Cíclico, colectivo y pedales — rango completo sin trabas', ref:'RFM §7' },
      { id:'CL-04-2', text:'Sistemas hidráulicos Sys 1 y 2 — presión nominal (~3.000 psi)', ref:'RFM §7' },
      { id:'CL-04-3', text:'Indicadores TOT y Nr/Nf (ambos canales) — calibrados', ref:'RFM §1' },
      { id:'CL-04-4', text:'Alarmas LOW NR, GEN FAIL, FIRE, CHIP, LOW FUEL — verificadas', ref:'RFM §3' },
      { id:'CL-04-5', text:'Panel EFIS completo — sin luces de falla del sistema', ref:'RFM §7' },
      { id:'CL-04-6', text:'Sistema de sonido (motores turbina, rotor, alarmas) — nivel correcto', ref:'RAAC60' },
      { id:'CL-04-7', text:'Panel AFCS/SAS — operativo, modos disponibles verificados', ref:'RFM §7' },
    ]
  }
];
