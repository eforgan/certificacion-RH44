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
  // ─── ÁREA 1: PERFORMANCE ───
  { id:'QTG-01-001', cat:'performance', critical:false,
    name:'Estacionario IGE — Nivel del Mar', ref:'POH §5 / RAAC60 App.A §2',
    param:'MAP requerida en estacionario IGE (~5 ft AGL)', unit:'inHg',
    ref_val:'Según carta IGE del POH (ISA, MSL)', tol:'± 2 inHg',
    cond:'ISA, MSL, viento 0 kt, 2.200 lb', status:'pending',
    procedure:'Configurar el simulador en condiciones ISA a nivel del mar con 2.200 lb y viento 0 kt. Establecer estacionario IGE a aproximadamente 5 ft AGL. Registrar el MAP indicado (inHg) requerido para mantener el estacionario. Comparar con la carta de hover IGE del POH §5. Según RAAC 60 Apéndice A §2, la diferencia entre el valor simulado y el dato de referencia no debe exceder ±2 inHg.',
    rfm_params:[
      { label:'Peso', value:'2.200', unit:'lb' },
      { label:'Densidad Altitud', value:'MSL (0 ft)', unit:'ft DA' },
      { label:'Temperatura', value:'ISA (15°C a MSL)' },
      { label:'Viento', value:'0', unit:'kt' },
      { label:'MAP IGE referencia POH', value:'Ver Figura §5 POH', unit:'inHg' },
      { label:'Tolerancia RAAC 60', value:'± 2', unit:'inHg' },
    ]
  },

  { id:'QTG-01-002', cat:'performance', critical:false,
    name:'Estacionario OGE — Nivel del Mar', ref:'POH §5',
    param:'MAP requerida en estacionario OGE (≥20 ft AGL)', unit:'inHg',
    ref_val:'Según carta OGE del POH (ISA, MSL)', tol:'± 2 inHg',
    cond:'ISA, MSL, viento 0 kt, 2.200 lb', status:'pending',
    procedure:'Elevar a estacionario OGE a ≥ 20 ft AGL (≥ 2 diámetros de rotor) para eliminar el efecto suelo. Condiciones ISA, MSL, 2.200 lb y viento en calma. Registrar el MAP requerido para mantener el hover. Comparar con la carta de hover OGE del POH §5. La tolerancia admitida por RAAC 60 App. A §2 es ±2 inHg respecto al dato de vuelo de referencia certificado.',
    rfm_params:[
      { label:'Altura mínima OGE', value:'≥ 20', unit:'ft AGL' },
      { label:'Peso', value:'2.200', unit:'lb' },
      { label:'Densidad Altitud', value:'MSL (0 ft)', unit:'ft DA' },
      { label:'Temperatura', value:'ISA (15°C a MSL)' },
      { label:'Viento', value:'0', unit:'kt' },
      { label:'MAP OGE referencia POH', value:'Ver Figura §5 POH', unit:'inHg' },
      { label:'Tolerancia RAAC 60', value:'± 2', unit:'inHg' },
    ]
  },

  { id:'QTG-01-003', cat:'performance', critical:false,
    name:'Estacionario IGE a Altitud (5.000 ft DA)', ref:'POH §5',
    param:'MAP requerida a 5.000 ft densidad', unit:'inHg',
    ref_val:'Según diagrama de altitud del POH', tol:'± 2 inHg',
    cond:'2.200 lb, 5.000 ft DA, ISA', status:'pending',
    procedure:'Configurar el simulador a 5.000 ft de altitud densidad con condiciones ISA y 2.200 lb. Establecer estacionario IGE (~5 ft AGL). Registrar el MAP requerido. El modelo aerodinámico debe reflejar el incremento de demanda de potencia con la altitud. Según RAAC 60 App. A §2, el error absoluto del MAP no debe superar ±2 inHg respecto al dato de validación del POH §5.',
    rfm_params:[
      { label:'Peso operativo', value:'2.200', unit:'lb' },
      { label:'Altitud densidad', value:'5.000', unit:'ft DA' },
      { label:'Temperatura', value:'ISA (~5°C a 5.000 ft)' },
      { label:'MAP referencia a 5.000 ft DA', value:'Ver Tabla POH §5', unit:'inHg' },
      { label:'Tolerancia RAAC 60', value:'± 2', unit:'inHg' },
    ]
  },

  { id:'QTG-01-004', cat:'performance', critical:false,
    name:'Mejor Tasa de Ascenso (Vy)', ref:'POH §5',
    param:'ROC a 55 KIAS, potencia MCP', unit:'FPM',
    ref_val:'~1.000 FPM (ISA, MSL, 2.200 lb)', tol:'± 100 FPM',
    cond:'MCP (205 BHP), ISA, MSL, 2.200 lb', status:'pending',
    procedure:'Configurar el simulador en ascenso estabilizado a la velocidad de mejor tasa (Vy = 55 KIAS). Motor a potencia MCP (205 BHP / 102% RPM). Registrar la tasa de ascenso vertical (FPM) en condiciones ISA a nivel del mar con 2.200 lb. Según RAAC 60 App. A §2, la ROC simulada no debe diferir en más de ±100 FPM del dato de vuelo certificado. El POH del R44 II publica ~1.000 FPM en estas condiciones.',
    rfm_params:[
      { label:'Velocidad Vy', value:'55', unit:'KIAS' },
      { label:'Potencia', value:'MCP (205 BHP / 102% RPM)' },
      { label:'Peso operativo', value:'2.200', unit:'lb' },
      { label:'Altitud', value:'MSL', unit:'ft' },
      { label:'ROC referencia POH (Vy, MCP, ISA, MSL)', value:'~1.000', unit:'FPM' },
      { label:'Tolerancia RAAC 60', value:'± 100', unit:'FPM' },
    ]
  },

  { id:'QTG-01-005', cat:'performance', critical:false,
    name:'Velocidad Nunca Exceder (Vne) — Respuesta del Simulador', ref:'POH §2',
    param:'Activación de advertencia Vne en 130 KIAS', unit:'KIAS',
    ref_val:'Vne = 130 KIAS (peso ≤ 2.200 lb)', tol:'± 2 KIAS',
    cond:'Peso ≤ 2.200 lb, nivel del mar', status:'pending',
    procedure:'Acelerar gradualmente el simulador hasta 130 KIAS. Verificar que el sistema activa advertencias/limitaciones al alcanzar Vne. El POH §2 establece Vne = 130 KIAS para pesos ≤ 2.200 lb y 120 KIAS para pesos > 2.200 lb. RAAC 60 App. A §2 exige que el modelo aerodinámico sea representativo de los límites de velocidad del fabricante.',
    rfm_params:[
      { label:'Vne ≤ 2.200 lb', value:'130', unit:'KIAS' },
      { label:'Vne > 2.200 lb', value:'120', unit:'KIAS' },
      { label:'Vne en autorrotación', value:'100', unit:'KIAS' },
      { label:'Peso de prueba', value:'≤ 2.200', unit:'lb' },
      { label:'Tolerancia', value:'± 2', unit:'KIAS' },
    ]
  },

  { id:'QTG-01-006', cat:'performance', critical:false,
    name:'Performance de Crucero — Consumo de Combustible', ref:'POH §5',
    param:'Consumo horario a 75% MCP, 110 KIAS', unit:'GPH',
    ref_val:'Según tablas de crucero POH §5', tol:'± 1.0 GPH',
    cond:'75% MCP, 2.200 lb, nivel del mar, ISA', status:'pending',
    procedure:'Estabilizar el simulador en crucero recto y nivelado a 110 KIAS con 75% de la potencia MCP (≈154 BHP), altitud MSL y condiciones ISA. Registrar el flujo de combustible indicado. El consumo simulado debe corresponder al publicado en las tablas de performance del POH §5. RAAC 60 App. A §2 exige representatividad del sistema de combustible y su integración con el modelo de potencia.',
    rfm_params:[
      { label:'Velocidad de crucero', value:'110', unit:'KIAS' },
      { label:'Potencia', value:'75% MCP (~154 BHP)' },
      { label:'Peso operativo', value:'2.200', unit:'lb' },
      { label:'Altitud', value:'MSL', unit:'ft' },
      { label:'Consumo referencia POH §5', value:'Ver tabla crucero', unit:'GPH' },
      { label:'Tolerancia RAAC 60', value:'± 1.0', unit:'GPH' },
    ]
  },

  // ─── ÁREA 2: MANIOBRABILIDAD ───
  { id:'QTG-02-001', cat:'handling', critical:false,
    name:'Viraje Coordinado — 30° de Banco', ref:'POH §4 Normal',
    param:'Altitud, velocidad, coordinación (bola centrada)', unit:'ft / KIAS',
    ref_val:'Sin pérdida de altitud, bola centrada', tol:'± 100 ft / ± 5 KIAS / ½ bola',
    cond:'100 KIAS, 2.200 lb, ISA, MSL', status:'pending',
    procedure:'Estabilizar el simulador en vuelo nivelado a 100 KIAS, ISA, MSL y 2.200 lb. Iniciar un viraje coordinado con 30° de banco sostenido durante al menos 180°. Registrar variaciones de altitud, velocidad y el desvío del índice del inclinómetro (bola). El modelo aerodinámico debe reproducir la respuesta cíclica lateral del R44 II. Tolerancia RAAC 60 App. A §2: ±100 ft en altitud, ±5 KIAS en velocidad, bola ≤ ½ diámetro.',
    rfm_params:[
      { label:'Velocidad', value:'100', unit:'KIAS' },
      { label:'Banco', value:'30', unit:'°' },
      { label:'Peso operativo', value:'2.200', unit:'lb' },
      { label:'Altitud', value:'MSL', unit:'ft' },
      { label:'Tol. altitud', value:'± 100', unit:'ft' },
      { label:'Tol. velocidad', value:'± 5', unit:'KIAS' },
      { label:'Tol. coordinación', value:'≤ ½ bola' },
    ]
  },

  { id:'QTG-02-002', cat:'handling', critical:false,
    name:'Viraje Coordinado — 60° de Banco', ref:'POH §4 Normal',
    param:'Mantenimiento de altitud y velocidad en viraje profundo', unit:'ft / KIAS',
    ref_val:'Sin pérdida significativa de altitud', tol:'± 150 ft / ± 5 KIAS',
    cond:'80 KIAS, 2.200 lb, ISA', status:'pending',
    procedure:'Estabilizar a 80 KIAS y establecer un viraje coordinado sostenido con 60° de banco mínimo durante al menos 90°. Registrar la variación de altitud y velocidad durante el viraje. El incremento de carga (load factor ~2G a 60°) debe ser representado correctamente. RAAC 60 App. A §2 requiere que la respuesta aerodinámica en virajes profundos sea realista. Tolerancia: ±150 ft y ±5 KIAS.',
    rfm_params:[
      { label:'Velocidad', value:'80', unit:'KIAS' },
      { label:'Banco', value:'60', unit:'°' },
      { label:'Factor de carga', value:'~2.0', unit:'G' },
      { label:'Peso operativo', value:'2.200', unit:'lb' },
      { label:'Tol. altitud', value:'± 150', unit:'ft' },
      { label:'Tol. velocidad', value:'± 5', unit:'KIAS' },
    ]
  },

  { id:'QTG-02-003', cat:'handling', critical:false,
    name:'Transición Estacionario → Vuelo hacia Adelante', ref:'POH §4 Normal',
    param:'MAP aplicada durante transición ≤ MAP_IGE + 2 inHg', unit:'inHg',
    ref_val:'MAP transición ≤ MAP_IGE + 2 inHg', tol:'MAP ≤ MAP_IGE + 2 inHg',
    cond:'ISA, MSL, 0 kt, 2.200 lb', status:'pending',
    procedure:'Desde hover estabilizado IGE (0 kt), el piloto aplica cíclico adelante para iniciar la transición al vuelo adelante. Registrar el MAP máximo aplicado durante la aceleración desde 0 hasta 60 KIAS. El pico de MAP no debe superar la MAP de hover IGE más 2 inHg. Esta prueba valida el modelo de efecto suelo y la transición aerodinámica conforme a RAAC 60 App. A §2.',
    rfm_params:[
      { label:'Velocidad inicial', value:'0', unit:'kt' },
      { label:'Velocidad final referencia', value:'60', unit:'KIAS' },
      { label:'MAP IGE referencia', value:'Ver Carta IGE POH §5', unit:'inHg' },
      { label:'Límite MAP transición', value:'MAP_IGE + 2', unit:'inHg' },
      { label:'Peso operativo', value:'2.200', unit:'lb' },
    ]
  },

  { id:'QTG-02-004', cat:'handling', critical:false,
    name:'Aproximación y Aterrizaje Normal', ref:'POH §4 Normal',
    param:'Tasa de descenso al cruzar 30 KIAS', unit:'FPM',
    ref_val:'< 300 FPM (prevención Vortex Ring State)', tol:'< 300 FPM',
    cond:'ISA, 0 kt, 2.200 lb, 60 KIAS → estacionario', status:'pending',
    procedure:'Iniciar aproximación desde 500 ft AGL a 60 KIAS. Reducir progresivamente la velocidad y controlar la tasa de descenso. Al cruzar los 30 KIAS, la tasa de descenso vertical no debe superar 300 FPM para evitar la zona de peligro de Vortex Ring State (VRS). Esta limitación está publicada en el POH §4 y es validada en RAAC 60 App. A §2 como requisito de representación del VRS.',
    rfm_params:[
      { label:'Velocidad inicial aproximación', value:'60', unit:'KIAS' },
      { label:'Velocidad referencia VRS', value:'30', unit:'KIAS' },
      { label:'Tasa descenso máxima (<30 kt)', value:'< 300', unit:'FPM' },
      { label:'Peso operativo', value:'2.200', unit:'lb' },
      { label:'Ref. VRS POH', value:'POH §4 — zona de peligro descenso vertical' },
    ]
  },

  { id:'QTG-02-005', cat:'handling', critical:false,
    name:'Vuelo Lateral y Hacia Atrás (Rearward)', ref:'POH §4',
    param:'Control de guiñada, ausencia de oscilaciones PIO', unit:'°',
    ref_val:'Guiñada < ±5°, sin PIO', tol:'Guiñada < ± 5° / Sin PIO',
    cond:'Estacionario IGE, ≤5 kt', status:'pending',
    procedure:'Desde hover estabilizado IGE, aplicar cíclico lateral y luego cíclico hacia atrás manteniendo velocidad ≤5 kt en cada eje. Registrar la desviación de guiñada y la presencia de oscilaciones Pilot Induced Oscillations (PIO). La controlabilidad debe ser representativa del R44 II real. RAAC 60 App. A §2 requiere que la dinámica de rotor de cola sea realista en maniobras de baja velocidad.',
    rfm_params:[
      { label:'Velocidad máxima lateral/trasera', value:'≤ 5', unit:'kt' },
      { label:'Tol. guiñada', value:'< ± 5', unit:'°' },
      { label:'PIO', value:'No se admite' },
      { label:'Límite vel. hacia atrás (POH §4)', value:'5', unit:'kt max recom.' },
    ]
  },

  { id:'QTG-02-006', cat:'handling', critical:false,
    name:'Diagrama Altura-Velocidad (H/V Curve)', ref:'POH §5',
    param:'Coincidencia zonas H/V simulador vs. POH', unit:'ft AGL / KIAS',
    ref_val:'Perfil curva H/V del POH (2.500 lb, MSL)', tol:'± 50 ft / ± 5 KIAS',
    cond:'MTOW 2.500 lb, MSL, ISA', status:'pending',
    procedure:'Verificar que las regiones de altura-velocidad (Diagrama H/V) del simulador correspondan con exactitud al perfil publicado en el POH §5 para el R44 II. Documentar al menos 5 puntos del diagrama H/V en la zona de "evitar" (Avoid Region) y comparar con el gráfico del POH. La tolerancia admitida es ±50 ft en el eje vertical y ±5 KIAS en el eje horizontal.',
    rfm_params:[
      { label:'MTOW', value:'2.500', unit:'lb' },
      { label:'Altitud densidad', value:'MSL', unit:'ft' },
      { label:'Punto inferior "Avoid Region"', value:'0 kt / 0 ft', unit:'KIAS / ft AGL' },
      { label:'Punto superior "Avoid Region"', value:'~45 kt / ~500 ft', unit:'KIAS / ft AGL' },
      { label:'Tolerancia altura', value:'± 50', unit:'ft AGL' },
      { label:'Tolerancia velocidad', value:'± 5', unit:'KIAS' },
    ]
  },

  // ─── ÁREA 3: SISTEMAS ───
  { id:'QTG-03-001', cat:'systems', critical:false,
    name:'Arranque Motor — Secuencia Normal', ref:'POH §4 / Antes del Vuelo',
    param:'Tiempo hasta presión aceite mínima; indicaciones en verde', unit:'seg',
    ref_val:'Presión aceite verde en ≤ 30 seg | RPM estable 60–70%', tol:'± 5 seg',
    cond:'Temperatura ambiente, tierra, batería', status:'pending',
    procedure:'Con el simulador en configuración de tierra (motor apagado), ejecutar la secuencia normal de arranque del motor Lycoming IO-540 según el POH §4. Registrar el tiempo hasta que la presión de aceite entra en la zona verde (≥55 psi) y las RPM del motor se estabilizan en el rango de marcha mínima (60–70%). RAAC 60 App. A §2 exige que la secuencia de arranque simulada sea representativa incluyendo los parámetros del motor pistón.',
    rfm_params:[
      { label:'Presión aceite mínima en vuelo', value:'55', unit:'psi' },
      { label:'Tiempo máximo a presión verde', value:'30', unit:'seg' },
      { label:'RPM estable marcha mínima', value:'60–70', unit:'%' },
      { label:'CHT esperada en arranque', value:'Subida progresiva', unit:'°F' },
      { label:'Tolerancia tiempo', value:'± 5', unit:'seg' },
    ]
  },

  { id:'QTG-03-002', cat:'systems', critical:false,
    name:'Sistema Hidráulico — Operación Normal', ref:'POH §7',
    param:'Presión del sistema hidráulico en vuelo estabilizado', unit:'psi',
    ref_val:'450–500 psi en operación normal', tol:'± 20 psi',
    cond:'Vuelo crucero estabilizado, motor MCP', status:'pending',
    procedure:'Estabilizar el simulador en vuelo de crucero. Registrar la presión indicada en el manómetro hidráulico del panel de cabina. El sistema debe indicar 450–500 psi. Operar el interruptor HYD ON/OFF desde el cíclico y verificar el cambio en la retroalimentación de fuerzas. Según RAAC 60 App. A §2, el modelado del sistema hidráulico debe ser representativo.',
    rfm_params:[
      { label:'Fluido hidráulico', value:'MIL-H-5606' },
      { label:'Presión nominal (POH §7)', value:'450–500', unit:'psi' },
      { label:'Número de servos', value:'3 (cíclico lat., cíclico long., colectivo)' },
      { label:'Tolerancia presión', value:'± 20', unit:'psi' },
    ]
  },

  { id:'QTG-03-003', cat:'systems', critical:false,
    name:'Sistema Hidráulico — Simulación de Falla', ref:'POH §3 Emergencias',
    param:'Incremento de fuerzas en cíclico/colectivo al fallar el sistema', unit:'cualitativo',
    ref_val:'Endurecimiento notorio e inmediato en los mandos', tol:'Perceptible e inmediato',
    cond:'Vuelo nivelado, interruptor HYD OFF', status:'pending',
    procedure:'En vuelo nivelado estabilizado, inducir falla hidráulica apagando el interruptor HYD desde el cíclico. Verificar que el cíclico y el colectivo muestran un endurecimiento notorio e inmediato en las fuerzas, representativo del comportamiento del R44 II real sin asistencia hidráulica. RAAC 60 App. A §2 exige representatividad de la falla del sistema hidráulico en el FSTD.',
    rfm_params:[
      { label:'Efecto en cíclico', value:'Endurecimiento marcado inmediato' },
      { label:'Efecto en colectivo', value:'Endurecimiento marcado inmediato' },
      { label:'Controlabilidad restante', value:'Sí, con mayor esfuerzo físico' },
      { label:'Procedimiento POH', value:'§3 — Hydraulic Failure' },
    ]
  },

  { id:'QTG-03-004', cat:'systems', critical:false,
    name:'Sistema de Combustible — Indicación de Bajo Nivel', ref:'POH §7',
    param:'Nivel en galones al activarse la luz LOW FUEL', unit:'gal',
    ref_val:'≈ 3 galones utilizables (≈ 10 min vuelo)', tol:'± 0.5 gal',
    cond:'Consumo progresivo hasta activación de alarma', status:'pending',
    procedure:'Iniciar simulación con combustible suficiente para alcanzar el nivel de alarma por consumo normal. Con el motor a crucero, dejar que el combustible se consuma. Registrar el nivel exacto (galones) indicado al activarse la luz LOW FUEL. El POH §7 establece que la alarma LOW FUEL se activa a ~3 galones utilizables, equivalente a ~10 minutos de vuelo.',
    rfm_params:[
      { label:'Capacidad total utilizables', value:'29.5', unit:'gal' },
      { label:'Nivel activación LOW FUEL (POH)', value:'~3', unit:'gal' },
      { label:'Endurance remanente estimado', value:'~10', unit:'min' },
      { label:'Consumo típico crucero', value:'~15', unit:'GPH' },
      { label:'Tolerancia activación', value:'± 0.5', unit:'gal' },
    ]
  },

  { id:'QTG-03-005', cat:'systems', critical:false,
    name:'Sistema Eléctrico — Falla del Alternador', ref:'POH §3 Emergencias',
    param:'Tiempo de activación de la luz ALT en panel', unit:'seg',
    ref_val:'Luz ALT activa en ≤ 3 seg de la falla', tol:'≤ 3 seg',
    cond:'Vuelo crucero, alternador desactivado', status:'pending',
    procedure:'En crucero estabilizado, desactivar el alternador desde el panel IOS. Cronometrar el tiempo transcurrido hasta que la luz ALT se ilumina en el panel de advertencias de cabina. La batería debe asumir la carga eléctrica sin pérdida inmediata de equipos. RAAC 60 App. A §2 exige que el sistema eléctrico simulado sea representativo de la aeronave real en cuanto a tiempos de advertencia.',
    rfm_params:[
      { label:'Tiempo máx. activación ALT light', value:'≤ 3', unit:'seg' },
      { label:'Backup eléctrico', value:'Batería de aeronave' },
      { label:'Degradación prevista', value:'Equipos eléctricos gradual' },
      { label:'Procedimiento POH', value:'§3 — Alternator Failure' },
    ]
  },

  { id:'QTG-03-006', cat:'systems', critical:true,
    name:'⚠ Alarma Baja RPM del Rotor (LOW RPM)', ref:'POH §2 / SFAR 73',
    param:'Punto de activación bocina LOW RPM', unit:'% RPM',
    ref_val:'Alarma activa al alcanzar 97% RPM (≈ 388 RPM)', tol:'± 1% RPM',
    cond:'Descenso progresivo de RPM desde condición normal', status:'pending',
    procedure:'PRUEBA CRÍTICA. Reducir progresivamente las RPM del rotor principal desde la condición normal (101–102%) mediante reducción controlada del colectivo. Registrar con exactitud el valor de RPM (%) en el que se activa la bocina LOW RPM. El R44 II activa esta alarma al cruzar el 97% RPM (≈388 RPM) según POH §2. El SFAR 73 refuerza la criticidad de esta indicación en aeronaves Robinson. RAAC 60 exige plena representatividad de esta alarma crítica.',
    rfm_params:[
      { label:'RPM normal vuelo (Power On)', value:'101–102', unit:'%' },
      { label:'RPM alarma LOW RPM', value:'97', unit:'%' },
      { label:'RPM en RPM absolutos', value:'≈ 388', unit:'RPM' },
      { label:'RPM mínima autorrotación', value:'90', unit:'%' },
      { label:'RPM máxima autorrotación', value:'108', unit:'%' },
      { label:'Tolerancia activación bocina', value:'± 1', unit:'% RPM' },
      { label:'Tipo alarma', value:'Bocina sonora (distinctivo)' },
    ]
  },

  { id:'QTG-03-007', cat:'systems', critical:false,
    name:'Alarma Altas RPM — Tono Warble', ref:'POH §2',
    param:'Activación de tono warble aproximándose al 108% RPM', unit:'% RPM',
    ref_val:'Tono warble activo acercándose al 108% RPM', tol:'± 1% RPM',
    cond:'Incremento de RPM en autorrotación', status:'pending',
    procedure:'En autorrotación sin carga, incrementar las RPM del rotor principal acercándose al límite de 108% RPM (Power Off max). Verificar la activación del tono warble que advierte la proximidad al límite superior. El POH §2 establece 108% como RPM máxima en Power Off. La bocina warble debe activarse antes de alcanzar este límite.',
    rfm_params:[
      { label:'RPM máxima Power Off', value:'108', unit:'% (432 RPM)' },
      { label:'Tono warble', value:'Activación antes de 108%' },
      { label:'RPM mínima Power Off', value:'90', unit:'%' },
      { label:'Tolerancia', value:'± 1', unit:'% RPM' },
    ]
  },

  { id:'QTG-03-008', cat:'systems', critical:false,
    name:'Sistema de Embrague (CLUTCH)', ref:'POH §7',
    param:'Estado de la luz CLUTCH durante y después del arranque', unit:'cualitativo',
    ref_val:'Luz CLUTCH apagada antes de alcanzar RPM operacional (≥80%)', tol:'Luz OFF antes de 80% RPM',
    cond:'Secuencia de arranque normal', status:'pending',
    procedure:'Durante el arranque, verificar que la luz CLUTCH se enciende mientras el actuador trabaja durante el embrague progresivo del rotor. La luz debe apagarse automáticamente antes de que las RPM del rotor alcancen el rango operacional (≥80%). Si la luz permanece encendida, indica una falla del actuador de embrague. RAAC 60 App. A §2 requiere representatividad del sistema de embrague.',
    rfm_params:[
      { label:'Luz CLUTCH encendida', value:'Durante el proceso de embrague' },
      { label:'Luz CLUTCH apagada', value:'Antes de 80% RPM rotor' },
      { label:'Acción si permanece encendida', value:'Abortar el arranque' },
      { label:'Procedimiento POH', value:'§4 — Engine Starting' },
    ]
  },

  // ─── ÁREA 4: EMERGENCIAS ───
  { id:'QTG-04-001', cat:'emergency', critical:true,
    name:'⚠ Autorrotación — Máximo Alcance (Power-Off Glide)', ref:'POH §3 / §5',
    param:'Tasa de descenso y relación de planeo a 90 KIAS', unit:'FPM',
    ref_val:'~1.900 FPM | Planeo 4.7:1 (1 NM / 1.300 ft AGL)', tol:'± 200 FPM',
    cond:'2.200 lb, 1.000 ft AGL, ISA, MSL, motor OFF', status:'pending',
    procedure:'PRUEBA CRÍTICA. Cortar potencia del motor. Establecer autorrotación a 90 KIAS con RPM del rotor ≈90%. Medir la tasa de descenso estabilizada (FPM) y calcular la relación de planeo. El POH publica ~1.900 FPM y relación 4.7:1 (~1 NM por 1.300 ft AGL) en estas condiciones. RAAC 60 App. A §3 exige que el modelo de autorrotación del simulador sea representativo del dato de vuelo certificado.',
    rfm_params:[
      { label:'Velocidad máximo alcance', value:'90', unit:'KIAS' },
      { label:'RPM rotor autorrotación', value:'~90', unit:'% (360 RPM)' },
      { label:'Peso operativo', value:'2.200', unit:'lb' },
      { label:'Altitud inicial', value:'1.000', unit:'ft AGL' },
      { label:'Tasa descenso referencia POH', value:'~1.900', unit:'FPM' },
      { label:'Relación de planeo (POH §5)', value:'4.7:1' },
      { label:'Tolerancia RAAC 60', value:'± 200', unit:'FPM' },
    ]
  },

  { id:'QTG-04-002', cat:'emergency', critical:false,
    name:'Autorrotación — Mínima Tasa de Descenso', ref:'POH §3',
    param:'Tasa de descenso a 55 KIAS, motor OFF', unit:'FPM',
    ref_val:'~1.350 FPM a 55 KIAS (POH §5)', tol:'± 150 FPM',
    cond:'2.200 lb, 1.000 ft AGL, ISA, motor OFF', status:'pending',
    procedure:'Cortar potencia del motor. Establecer autorrotación a 55 KIAS (velocidad de mínima tasa de descenso), RPM del rotor ≈90%. Registrar la tasa de descenso estabilizada. Esta velocidad maximiza el tiempo disponible para maniobra antes del toque. El POH §5 publica ~1.350 FPM a 55 KIAS. Tolerancia RAAC 60: ±150 FPM.',
    rfm_params:[
      { label:'Velocidad mínima tasa descenso', value:'55', unit:'KIAS' },
      { label:'Altitud inicial', value:'1.000', unit:'ft AGL' },
      { label:'Peso operativo', value:'2.200', unit:'lb' },
      { label:'Tasa descenso referencia POH', value:'~1.350', unit:'FPM' },
      { label:'Tolerancia RAAC 60', value:'± 150', unit:'FPM' },
    ]
  },

  { id:'QTG-04-003', cat:'emergency', critical:true,
    name:'⚠ Autorrotación con Aterrizaje — Flare y Toque', ref:'POH §3 / SFAR 73',
    param:'Tasa de descenso al toque; RPM al toque; patines nivelados', unit:'FPM / % RPM',
    ref_val:'Toque < 300 FPM | RPM > 90% | Patines nivelados', tol:'< 300 FPM / > 90% RPM',
    cond:'2.200 lb, 1.000 ft AGL, ISA, ambos motores OFF', status:'pending',
    procedure:'PRUEBA CRÍTICA. Cortar potencia del motor. Autorrotación a 70–90 KIAS con RPM ~90%. A 40 ft AGL iniciar flare con cíclico atrás. A 8 ft nivelar la nariz y levantar colectivo para amortiguar el toque. Registrar: (1) tasa de descenso al toque (<300 FPM), (2) RPM al toque (>90%), (3) nivel de patines. El SFAR 73 refuerza la exigencia de representatividad del procedimiento de autorrotación con aterrizaje.',
    rfm_params:[
      { label:'Altitud inicial', value:'1.000', unit:'ft AGL' },
      { label:'Velocidad autorrotación', value:'70–90', unit:'KIAS' },
      { label:'Inicio de flare', value:'~40', unit:'ft AGL' },
      { label:'Nivelar nariz', value:'~8', unit:'ft AGL' },
      { label:'Tasa de descenso máxima al toque', value:'< 300', unit:'FPM' },
      { label:'RPM mínima al toque', value:'> 90', unit:'%' },
      { label:'Nivel patines', value:'Nivelados (sin inclinación > 5°)' },
    ]
  },

  { id:'QTG-04-004', cat:'emergency', critical:false,
    name:'Falla de Motor en Despegue (< 8 ft AGL)', ref:'POH §3',
    param:'Guiñada no controlada; contacto patines nivelados', unit:'° / cualitativo',
    ref_val:'Sin vuelco; guiñada < 20°; RPM no excede 108%', tol:'Guiñada < 20° / Sin vuelco',
    cond:'Despegue desde IGE, potencia ≈ MCP', status:'pending',
    procedure:'Inducir falla de motor entre 0 y 8 ft AGL durante el despegue. La respuesta correcta es: aplicar pedal derecho (para corregir guiñada a la izquierda por par motor), dejar descender, levantar colectivo antes del toque para amortiguar el contacto. Registrar la guiñada máxima y verificar que el contacto sea con patines nivelados sin vuelco. Las RPM del rotor no deben exceder 108%.',
    rfm_params:[
      { label:'Altura de falla', value:'0–8', unit:'ft AGL' },
      { label:'Guiñada máxima admisible', value:'< 20', unit:'°' },
      { label:'Dirección guiñada', value:'Izquierda (par motor)' },
      { label:'Respuesta correcta pedal', value:'Pedal derecho' },
      { label:'RPM rotor máximo', value:'108', unit:'%' },
    ]
  },

  { id:'QTG-04-005', cat:'emergency', critical:true,
    name:'⚠ Falla de Motor en Vuelo de Crucero', ref:'POH §3',
    param:'Bocina LOW RPM, guiñada inicial, recuperación RPM rotor', unit:'seg / °',
    ref_val:'Bocina activa en < 2 seg | Guiñada a la izquierda | RPM recuperada', tol:'Bocina < 2 seg',
    cond:'110 KIAS, 2.200 lb, 1.500 ft AGL', status:'pending',
    procedure:'PRUEBA CRÍTICA. En crucero estabilizado a 110 KIAS, inducir la falla completa del motor desde el IOS. Registrar: (1) tiempo hasta activación de bocina LOW RPM (<2 seg), (2) guiñada inicial hacia la izquierda (efecto par), (3) recuperación de RPM del rotor al bajar colectivo. El piloto debe entrar en autorrotación inmediatamente. El simulador debe reproducir la dinámica de falla del motor pistón Lycoming conforme al POH §3 y SFAR 73.',
    rfm_params:[
      { label:'Velocidad de prueba', value:'110', unit:'KIAS' },
      { label:'Altitud de prueba', value:'1.500', unit:'ft AGL' },
      { label:'Peso', value:'2.200', unit:'lb' },
      { label:'Tiempo activación bocina LOW RPM', value:'< 2', unit:'seg' },
      { label:'Dirección guiñada inicial', value:'Izquierda (efecto par)' },
      { label:'Acción inmediata', value:'Bajar colectivo → Autorrotación' },
    ]
  },

  { id:'QTG-04-006', cat:'emergency', critical:false,
    name:'Fuego en Motor Durante Arranque', ref:'POH §3 / Fuego',
    param:'Representación visual/sonora del fuego; respuesta de sistemas', unit:'cualitativo',
    ref_val:'Fuego visible en zona de motor; alarmas sonoras activas', tol:'Secuencia correcta con POH',
    cond:'Simulación fuego durante secuencia de arranque', status:'pending',
    procedure:'Simular fuego en motor durante arranque desde el IOS. Ejecutar procedimiento POH §3: continuar cranking → cortar mezcla → cerrar válvula combustible → batería OFF → freno rotor → abandono del helicóptero. Verificar representación visual del fuego en zona de motor y activación de alarmas sonoras. RAAC 60 App. A §2 requiere que los procedimientos de emergencia de fuego sean representativos.',
    rfm_params:[
      { label:'Representación visual fuego', value:'Requerida en zona motor' },
      { label:'Alarmas sonoras', value:'Activas' },
      { label:'Procedimiento POH', value:'§3 — Engine Fire During Starting' },
      { label:'Secuencia correcta', value:'Cranking → Mezcla OFF → Combustible OFF → Batería OFF' },
    ]
  },

  { id:'QTG-04-007', cat:'emergency', critical:false,
    name:'Fuego en Motor en Vuelo', ref:'POH §3',
    param:'Representación visual del fuego, secuencia de corte, autorrotación', unit:'cualitativo',
    ref_val:'Fuego visual + secuencia de corte coherente con POH', tol:'Secuencia correcta con POH',
    cond:'Vuelo de crucero a 100 KIAS', status:'pending',
    procedure:'En crucero a 100 KIAS, inducir fuego en vuelo desde el IOS. Verificar: (1) representación visual del fuego en sistema exterior, (2) activación de alarmas sonoras, (3) ejecución del procedimiento: autorrotación inmediata → corte válvula combustible → aterrizaje → corte batería → freno rotor → abandono. La secuencia debe ser coherente y con tiempo de respuesta realista.',
    rfm_params:[
      { label:'Representación visual fuego en vuelo', value:'Requerida' },
      { label:'Alarmas sonoras', value:'Activas' },
      { label:'Procedimiento POH', value:'§3 — Engine Fire In Flight' },
      { label:'Velocidad de prueba', value:'100', unit:'KIAS' },
    ]
  },

  { id:'QTG-04-008', cat:'emergency', critical:false,
    name:'Fuego Eléctrico en Vuelo', ref:'POH §3',
    param:'Degradación de instrumentos eléctricos al cortar batería', unit:'cualitativo',
    ref_val:'Todos los instrumentos eléctricos cesan al cortar batería', tol:'Todos cesan',
    cond:'Vuelo nivelado, inducción humo/fuego eléctrico', status:'pending',
    procedure:'Simular falla eléctrica con indicación de humo/fuego eléctrico. Ejecutar procedimiento: cortar batería y alternador. Verificar que al cortar la batería todos los instrumentos eléctricos cesan de funcionar. La aeronave debe continuar controlable a través de los instrumentos mecánicos (altímetro, velocímetro, tacómetro mecánico). RAAC 60 App. A §2 exige representatividad de las emergencias eléctricas.',
    rfm_params:[
      { label:'Acción principal', value:'Batería y alternador OFF' },
      { label:'Degradación esperada', value:'Todos los instrumentos eléctricos cesan' },
      { label:'Procedimiento POH', value:'§3 — Electrical Fire In Flight' },
      { label:'Instrumentos que permanecen', value:'Mecánicos (Alt, Vel, Tacómetro mec.)' },
    ]
  },

  { id:'QTG-04-009', cat:'emergency', critical:false,
    name:'Baja RPM del Rotor — Recuperación', ref:'POH §3 / SFAR 73',
    param:'Tiempo para recuperar RPM a zona verde (>101%) con acción correcta', unit:'seg',
    ref_val:'Recuperación a >101% RPM en < 5 seg con acción correcta', tol:'< 5 seg con acción correcta',
    cond:'Vuelo hacia adelante 80 KIAS, RPM reducida a <97%', status:'pending',
    procedure:'Con el simulador a 80 KIAS, reducir las RPM por debajo del umbral de alarma (97%) mediante reducción de potencia. Una vez activada la bocina LOW RPM, el piloto debe aplicar la acción correcta per SFAR 73: bajar colectivo + agregar acelerador + cíclico ligeramente atrás. Registrar el tiempo hasta que las RPM recuperan >101%. El simulador debe mostrar la dinámica real del rotor R44 en la recuperación.',
    rfm_params:[
      { label:'RPM de activación bocina', value:'97', unit:'%' },
      { label:'Velocidad de prueba', value:'80', unit:'KIAS' },
      { label:'RPM objetivo recuperación', value:'> 101', unit:'%' },
      { label:'Tiempo máximo recuperación', value:'< 5', unit:'seg' },
      { label:'Acción SFAR 73', value:'Colectivo abajo + Acelerador + Cíclico atrás' },
    ]
  },

  { id:'QTG-04-010', cat:'emergency', critical:false,
    name:'Maniobra Low-G — Pushover (SFAR 73)', ref:'POH §3 / SFAR 73',
    param:'Representación de inestabilidad del rotor asociada al Low-G', unit:'cualitativo',
    ref_val:'Inestabilidad lateral del rotor representada por datos de ingeniería RHC', tol:'Física RHC / SFAR 73',
    cond:'Vuelo cíclico adelante brusco desde vuelo nivelado', status:'pending',
    procedure:'Aplicar cíclico hacia adelante abruptamente desde vuelo nivelado (Low-G pushover). Verificar que el simulador reproduce correctamente el peligro del mast bumping (contacto del rotor con el mástil) por pérdida de carga sobre el disco. SFAR 73 es específico para aeronaves Robinson y hace obligatoria la representación de esta condición en el simulador. La física debe ser conforme a los datos de ingeniería certificados por RHC.',
    rfm_params:[
      { label:'Condición peligrosa', value:'Low-G pushover (cíclico adelante brusco)' },
      { label:'Efecto representado', value:'Inestabilidad lateral / Mast bumping risk' },
      { label:'Referencia normativa', value:'SFAR 73 / POH §3' },
      { label:'Restricción POH', value:'Low-G prohibido en R44 (maneuver prohibited)' },
    ]
  },

  // ─── ÁREA 5: VISUAL / ENTORNO ───
  { id:'QTG-05-001', cat:'visual', critical:false,
    name:'Campo Visual — Cobertura H × V', ref:'RAAC60 App.A / JAR-FSTD H',
    param:'Ángulo horizontal y vertical del sistema visual', unit:'grados',
    ref_val:'≥ 150° H × 40° V (FFS Nivel B)', tol:'± 5° en cada eje',
    cond:'Sistema de realidad mixta activo, cabina de vuelo', status:'pending',
    procedure:'Con el sistema visual XR4 activo y el simulador en tierra, verificar el campo de visión angular. Utilizando targets visuales de calibración colocados en posiciones conocidas, medir el ángulo horizontal total (≥150°) y el ángulo vertical (≥40°). RAAC 60 App. A y JAR-FSTD H establecen estos requisitos mínimos de campo visual para la categoría de calificación.',
    rfm_params:[
      { label:'Campo visual mínimo horizontal', value:'≥ 150', unit:'°' },
      { label:'Campo visual mínimo vertical', value:'≥ 40', unit:'°' },
      { label:'Tolerancia medición', value:'± 5', unit:'° por eje' },
      { label:'Sistema visual', value:'Varjo XR4 — Realidad Mixta' },
      { label:'Referencia normativa', value:'RAAC 60 App. A §5 / JAR-FSTD H' },
    ]
  },

  { id:'QTG-05-002', cat:'visual', critical:true,
    name:'⚠ Latencia del Sistema Visual (XR)', ref:'RAAC 60 / JAR-FSTD H',
    param:'Retardo entre movimiento del simulador y actualización visual', unit:'ms',
    ref_val:'≤ 150 ms (FFS Nivel B)', tol:'Debe ser ≤ 150 ms en todos los ejes',
    cond:'Plataforma 6-DoF en movimiento activo', status:'pending',
    procedure:'PRUEBA CRÍTICA. Con la plataforma de movimiento activa, medir el retardo (latencia) entre el movimiento físico del simulador y la actualización correspondiente de la imagen visual en los visores Varjo XR4. Utilizar equipamiento de medición de latencia certificado. El retardo máximo admitido es 150 ms en todos los ejes de movimiento. Cualquier valor superior requiere corrección antes de la certificación.',
    rfm_params:[
      { label:'Latencia máxima permitida', value:'≤ 150', unit:'ms' },
      { label:'Método de medición', value:'Acelerómetro + cámara alta velocidad' },
      { label:'Sistema visual', value:'Varjo XR4 Mixed Reality' },
      { label:'Ejes de prueba', value:'Pitch, Roll, Yaw, Heave, Surge, Sway' },
      { label:'Referencia normativa', value:'RAAC 60 / JAR-FSTD H §4' },
    ]
  },

  { id:'QTG-05-003', cat:'visual', critical:false,
    name:'Calidad Visual — Horizonte y Terreno', ref:'JAR-FSTD H',
    param:'Resolución, nitidez del horizonte, ausencia de artefactos visuales', unit:'cualitativo',
    ref_val:'Representación continua sin bandas de transición', tol:'Evaluación cualitativa Inspector ANAC',
    cond:'Vuelo VMC, hora día', status:'pending',
    procedure:'En condiciones VMC diurnas, evaluar cualitativamente la calidad del sistema visual XR4: nitidez del horizonte, resolución del terreno, ausencia de artefactos (pixelado, bandas de transición, tearing). El Inspector ANAC realiza la evaluación subjetiva comparando con estándares de referencia JAR-FSTD H. El sistema de realidad mixta debe proveer una imagen continua, estable y representativa del entorno.',
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
    procedure:'Desde el panel IOS, seleccionar y demostrar las siguientes condiciones meteorológicas: (1) VMC día, (2) VMC noche, (3) IMC/nubes, (4) lluvia con efectos en parabrisas, (5) niebla/visibilidad reducida, (6) polvo/brownout. Verificar que cada condición es seleccionable y produce efectos visuales realistas en los visores XR4. RAAC 60 exige que el sistema visual soporte condiciones adversas.',
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
    name:'Plataforma 6-DoF — Reproducción de Turbulencia', ref:'RAAC 60 / JAR-FSTD H',
    param:'Aceleraciones y frecuencias en turbulencia leve/moderada', unit:'g / Hz',
    ref_val:'Correlación cualitativa con datos de ingeniería del fabricante', tol:'Cualitativo — correlación aceptable',
    cond:'Vuelo en nivel con turbulencia activada desde IOS', status:'pending',
    procedure:'Con el simulador en vuelo nivelado y turbulencia leve/moderada activada desde el IOS, verificar que la plataforma de movimiento 6-DoF genera aceleraciones y frecuencias que correlacionan con los datos de ingeniería del fabricante del simulador. Medir con acelerómetro en cabina. RAAC 60 / JAR-FSTD H requieren que la plataforma reproduzca cualitativamente los efectos de turbulencia.',
    rfm_params:[
      { label:'Grados de libertad plataforma', value:'6-DoF' },
      { label:'Intensidad turbulencia', value:'Leve y Moderada' },
      { label:'Medición', value:'Acelerómetro en cabina' },
      { label:'Criterio', value:'Correlación cualitativa con datos fabricante' },
      { label:'Referencia', value:'JAR-FSTD H §4.4 — Motion System' },
    ]
  },

  { id:'QTG-05-006', cat:'visual', critical:false,
    name:'Sistema de Sonido — Motor, Rotor y Alarmas', ref:'RAAC 60',
    param:'Bocina LOW RPM ≥ 10 dB sobre ruido de fondo de cabina', unit:'dB',
    ref_val:'Bocina LOW RPM: ≥10 dB sobre fondo | Warble audible | CLUTCH audible', tol:'Bocina LOW RPM ≥ 10 dB sobre fondo',
    cond:'Cabina cerrada, motor en operación', status:'pending',
    procedure:'Con el simulador en funcionamiento y cabina cerrada, medir el nivel sonoro de la bocina LOW RPM y el ruido de fondo de la cabina con un sonómetro calibrado. La bocina debe superar en al menos 10 dB el nivel de fondo. Verificar también el tono warble (altas RPM), el ruido de embrague (CLUTCH) y los sonidos de motor en arranque, crucero y apagado. RAAC 60 requiere que las alarmas auditivas sean perceptibles en condiciones reales.',
    rfm_params:[
      { label:'Bocina LOW RPM nivel mínimo', value:'Fondo + 10', unit:'dB' },
      { label:'Tono Warble', value:'Audible antes de 108% RPM' },
      { label:'Método medición', value:'Sonómetro clase 1 calibrado' },
      { label:'Condición de medición', value:'Cabina cerrada, rotor en marcha' },
      { label:'Referencia normativa', value:'RAAC 60 App. A §6 — Sound' },
    ]
  },

  // ─── ÁREA 6: CABINA ───
  { id:'QTG-06-001', cat:'cabina', critical:false,
    name:'Panel de Instrumentos — Verificación General', ref:'POH §7',
    param:'Presencia y operatividad de todos los instrumentos (tacómetro, MAP, CHT, etc.)', unit:'%',
    ref_val:'100% instrumentos presentes y operativos', tol:'100% — sin excepción',
    cond:'Sistema activo, motor en marcha (simulado)', status:'pending',
    procedure:'Con el simulador en marcha y motor arrancado, realizar una verificación sistemática de todos los instrumentos de vuelo y de motor de la cabina réplica del R44 II. Incluir: tacómetro dual (motor/rotor), altímetro, VSI, VOR/ILS, indicador MAP, CHT, presión aceite, temperatura aceite, indicador de combustible, voltímetro, y luces de advertencia. Comparar contra el inventario del POH §7. Todos deben estar presentes y operativos.',
    rfm_params:[
      { label:'Tacómetro dual', value:'Motor + Rotor — operativo' },
      { label:'Indicador MAP', value:'Operativo — rango verde/rojo' },
      { label:'CHT (Temperatura cilindros)', value:'Operativo' },
      { label:'Instrumentos de vuelo', value:'Alt, VSI, Vel, Brújula' },
      { label:'Luces de alarma', value:'Todas operativas' },
      { label:'Criterio aprobación', value:'100% presentes y operativos' },
    ]
  },

  { id:'QTG-06-002', cat:'cabina', critical:true,
    name:'⚠ Tacómetro Dual Motor/Rotor — Exactitud', ref:'POH §2',
    param:'RPM motor y RPM rotor en vuelo estabilizado a MCP', unit:'% RPM',
    ref_val:'Motor: 102% (2.718 RPM) | Rotor: 101–102% en vuelo normal', tol:'± 1% RPM en ambas agujas',
    cond:'Motor a MCP, vuelo estabilizado', status:'pending',
    procedure:'PRUEBA CRÍTICA. Con el motor estabilizado a MCP (205 BHP / 2.718 RPM), registrar las indicaciones de la aguja de motor y la aguja de rotor del tacómetro dual. Ambas deben indicar 101–102% en vuelo normal con potencia. La aguja de motor debe mostrar 102% (2.718 RPM) y la aguja de rotor debe ser proporcional. La diferencia admitida es ±1% en cada aguja. Esta es una prueba crítica por su impacto en la seguridad.',
    rfm_params:[
      { label:'RPM motor (MCP)', value:'102% (2.718 RPM)' },
      { label:'RPM rotor (vuelo normal)', value:'101–102', unit:'%' },
      { label:'Tolerancia entre agujas', value:'≤ ± 1', unit:'% RPM' },
      { label:'RPM alarma LOW RPM', value:'97', unit:'%' },
      { label:'Clasificación RAAC 60', value:'Prueba Crítica' },
    ]
  },

  { id:'QTG-06-003', cat:'cabina', critical:false,
    name:'Indicador MAP — Exactitud', ref:'POH §5',
    param:'MAP en crucero a MCP (≈102% → ~23 inHg a nivel del mar)', unit:'inHg',
    ref_val:'MAP MCP a MSL ISA ≈ 23 inHg', tol:'± 0.5 inHg',
    cond:'Vuelo crucero estabilizado a MCP, MSL, ISA', status:'pending',
    procedure:'En vuelo crucero estabilizado a MCP (205 BHP, 102% RPM), nivel del mar y condiciones ISA, registrar la indicación del MAP (Manifold Absolute Pressure). El valor esperado es aproximadamente 23 inHg a MSL según las tablas de performance del POH §5. La indicación debe estar en la zona verde del instrumento. Tolerancia ±0.5 inHg.',
    rfm_params:[
      { label:'Potencia referencia', value:'MCP (205 BHP / 102%)' },
      { label:'MAP estimado MSL ISA', value:'~23', unit:'inHg' },
      { label:'Zona verde MAP', value:'15.0–23.3', unit:'inHg' },
      { label:'Límite rojo MAP', value:'26.1', unit:'inHg' },
      { label:'Tolerancia indicación', value:'± 0.5', unit:'inHg' },
    ]
  },

  { id:'QTG-06-004', cat:'cabina', critical:false,
    name:'Temperatura de Cabeza de Cilindro (CHT)', ref:'POH §2',
    param:'CHT en operación continua a MCP, MSL, ISA', unit:'°F',
    ref_val:'CHT normal: < 450°F | Límite máximo: 500°F', tol:'Indicación en rango verde (< 450°F) en ISA',
    cond:'Vuelo crucero a MCP, MSL, ISA estabilizado', status:'pending',
    procedure:'En vuelo crucero estabilizado a MCP y condiciones ISA, registrar la temperatura de cabeza de cilindro (CHT) indicada. El POH §2 establece 500°F como temperatura máxima. En condiciones ISA normales de crucero, la CHT debe mantenerse en la zona verde (<450°F). El modelo térmico del motor del simulador debe reflejar correctamente la dinámica de temperatura del Lycoming IO-540.',
    rfm_params:[
      { label:'CHT normal crucero ISA', value:'< 450', unit:'°F' },
      { label:'CHT máxima (POH §2)', value:'500', unit:'°F (260°C)' },
      { label:'Tolerancia indicación', value:'± 20', unit:'°F' },
      { label:'Zona verde', value:'< 450', unit:'°F' },
    ]
  },

  { id:'QTG-06-005', cat:'cabina', critical:false,
    name:'Controles de Vuelo — Rango de Movimiento', ref:'POH §7',
    param:'Deflexión máxima cíclico (lat/lon), colectivo y pedales', unit:'% rango',
    ref_val:'Rango completo en cada eje sin trabas', tol:'± 5% del rango total por eje',
    cond:'Sistema frío/neutro, verificación en tierra', status:'pending',
    procedure:'Con el simulador en tierra y sistema hidráulico activo, verificar el rango de movimiento completo de cada control: (1) cíclico longitudinal (adelante/atrás), (2) cíclico lateral (izquierda/derecha), (3) colectivo (mínimo/máximo), (4) pedales anti-torque (izquierda/derecha). No debe haber trabas físicas, fricciones excesivas ni áreas muertas. Comparar con los recorridos del RFM §7.',
    rfm_params:[
      { label:'Cíclico longitudinal', value:'Rango completo sin trabas' },
      { label:'Cíclico lateral', value:'Rango completo sin trabas' },
      { label:'Colectivo', value:'Mínimo a máximo sin trabas' },
      { label:'Pedales anti-torque', value:'Rango completo sin trabas' },
      { label:'Tolerancia rango', value:'± 5', unit:'% por eje' },
    ]
  },

  { id:'QTG-06-006', cat:'cabina', critical:false,
    name:'Luces de Advertencia — Verificación Individual', ref:'POH §3 y §7',
    param:'Activación individual de cada luz de alarma en panel', unit:'seg',
    ref_val:'LOW RPM ≤1s / ALT ≤3s / OIL ≤2s / CLUTCH durante arranque / LOW FUEL ≤2s', tol:'Ver tiempos individuales',
    cond:'Inducción individual de cada condición de alarma', status:'pending',
    procedure:'Para cada una de las cinco alarmas, inducir la condición correspondiente y cronometrar el tiempo hasta la iluminación de la luz en el panel. Verificar la correcta ubicación, color y tipo sonoro asociado a cada luz en la cabina réplica del R44 II. Los tiempos deben cumplir los valores del POH §7.',
    rfm_params:[
      { label:'LOW RPM (bocina sonora)', value:'≤ 1', unit:'seg' },
      { label:'ALT (luz ámbar)', value:'≤ 3', unit:'seg' },
      { label:'OIL (luz roja)', value:'≤ 2', unit:'seg' },
      { label:'CLUTCH (luz roja)', value:'Durante proceso arranque' },
      { label:'LOW FUEL (luz amarilla)', value:'≤ 2', unit:'seg' },
    ]
  },

  { id:'QTG-06-007', cat:'cabina', critical:false,
    name:'Interruptor Hidráulico (HYD) en Cíclico', ref:'POH §7',
    param:'Cambio en fuerzas de control al operar interruptor HYD ON/OFF', unit:'cualitativo',
    ref_val:'Cambio de fuerzas perceptible e inmediato (< 1 seg)', tol:'Cambio perceptible < 1 seg',
    cond:'Vuelo estabilizado, operación interruptor HYD en cíclico', status:'pending',
    procedure:'En vuelo estabilizado, operar el interruptor HYD (ON→OFF) ubicado en el cíclico. Verificar que se produce un cambio perceptible e inmediato (<1 segundo) en las fuerzas de los mandos de vuelo al desactivar el sistema hidráulico. El cambio debe ser notorio para el piloto. Al activar nuevamente (OFF→ON), las fuerzas deben reducirse inmediatamente. RAAC 60 App. A §2 requiere representatividad del interruptor HYD del R44.',
    rfm_params:[
      { label:'Ubicación interruptor HYD', value:'Cíclico (punta)' },
      { label:'Tiempo cambio fuerza (HYD OFF)', value:'< 1', unit:'seg' },
      { label:'Efecto esperado', value:'Endurecimiento de cíclico y colectivo' },
      { label:'Criterio', value:'Perceptible por el piloto (cualitativo)' },
    ]
  }
];

export const FASES_DATA: Fase[] = [
  {
    n: 1, color: '#3b82f6',
    title: 'Fase 1 — Preparación y Solicitud Formal',
    desc: 'Presentación de documentación inicial ante ANAC',
    status: 'in-progress',
    requisitos: [
      { id:'F1-01', text:'Carta de solicitud formal de calificación FSTD dirigida al Director de Habilitaciones ANAC', done: true },
      { id:'F1-02', text:'Identificación del dispositivo: tipo, fabricante, número de serie, nivel de calificación solicitado', done: true },
      { id:'F1-03', text:'Descriptivo técnico del simulador (motion 6-DoF, visual XR4, aviónica, aeronave de referencia Robinson R44 II Raven II)', done: true },
      { id:'F1-04', text:'Declaración de Cumplimiento firmada por el representante legal del operador', done: false },
      { id:'F1-05', text:'Identificación de la aeronave de referencia (Robinson R44 II Raven II) y datos POH/RFM vigente', done: true },
      { id:'F1-06', text:'Cronograma propuesto de evaluación y contactos técnicos designados', done: false },
    ]
  },
  {
    n: 2, color: '#10b981',
    title: 'Fase 2 — Entrega de la QTG Maestra',
    desc: 'Presentación de la Guía de Pruebas de Calificación completa',
    status: 'in-progress',
    requisitos: [
      { id:'F2-01', text:'QTG Maestra firmada (43 pruebas en 6 áreas) con datos de referencia del POH R44 II Raven II', done: true },
      { id:'F2-02', text:'Tolerancias por parámetro conformes a RAAC Parte 60 / JAR-FSTD H', done: true },
      { id:'F2-03', text:'Identificación de pruebas críticas (6 marcadas con ⚠)', done: true },
      { id:'F2-04', text:'Datos de validación del fabricante del simulador (datos aerodinámicos base R44 II)', done: false },
      { id:'F2-05', text:'Matriz de trazabilidad: QTG ↔ Sección del POH ↔ Requisito RAAC 60', done: false },
      { id:'F2-06', text:'Procedimientos de configuración del simulador para cada prueba', done: false },
    ]
  },
  {
    n: 3, color: '#f59e0b',
    title: 'Fase 3 — Evaluación Inicial (Sin Inspector)',
    desc: 'Ejecución interna de todas las pruebas QTG y registro de resultados',
    status: 'pending',
    requisitos: [
      { id:'F3-01', text:'Ejecución de las 43 pruebas QTG según procedimientos establecidos', done: false },
      { id:'F3-02', text:'Registro de resultados en software Qualification Test Studio', done: false },
      { id:'F3-03', text:'Validación interna de tolerancias — detección de no-conformidades', done: false },
      { id:'F3-04', text:'Corrección de desviaciones y re-prueba de ítems fallidos', done: false },
      { id:'F3-05', text:'Generación del Informe de Evaluación Interna (IEI) firmado por Jefe de Instrucción', done: false },
      { id:'F3-06', text:'Verificación del sistema de sonido (bocina LOW RPM, warble, CLUTCH) contra grabaciones de referencia', done: false },
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
      { id:'F4-03', text:'Demostración de procedimientos de autorrotación y emergencia (Área 4 completa)', done: false },
      { id:'F4-04', text:'Evaluación del sistema visual XR4 y plataforma de movimiento por inspector (Área 5)', done: false },
      { id:'F4-05', text:'Revisión de la cabina réplica R44 II vs. aeronave real (Área 6)', done: false },
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
  { id:'POH-0', icon:'📖', name:'R44 II POH — Introducción y Datos Generales', cat:'manuales', date:'Ed. vigente', size:'1.2 MB', status:'✅ Cargado', url:'/Manuales/R44II_POH_Intro.pdf' },
  { id:'POH-1', icon:'⚠', name:'Sección 1 — Limitaciones de Operación', cat:'manuales', date:'Ed. vigente', size:'980 KB', status:'✅ Cargado', url:'/Manuales/R44II_POH_Sec1_Limitaciones.pdf' },
  { id:'POH-2', icon:'⚙', name:'Sección 2 — Procedimientos Normales', cat:'manuales', date:'Ed. vigente', size:'1.4 MB', status:'✅ Cargado', url:'/Manuales/R44II_POH_Sec2_ProcNormales.pdf' },
  { id:'POH-3', icon:'🔥', name:'Sección 3 — Procedimientos de Emergencia', cat:'manuales', date:'Ed. vigente', size:'640 KB', status:'✅ Crítico', url:'/Manuales/R44II_POH_Sec3_Emergencias.pdf' },
  { id:'POH-4', icon:'✈', name:'Sección 4 — Operación Normal de Vuelo', cat:'manuales', date:'Ed. vigente', size:'750 KB', status:'✅ Cargado', url:'/Manuales/R44II_POH_Sec4_OperacionNormal.pdf' },
  { id:'POH-5', icon:'📈', name:'Sección 5 — Datos de Performance', cat:'manuales', date:'Ed. vigente', size:'1.1 MB', status:'✅ QTG Ref', url:'/Manuales/R44II_POH_Sec5_Performance.pdf' },
  { id:'POH-6', icon:'⚖', name:'Sección 6 — Peso y Balanceo', cat:'manuales', date:'Ed. vigente', size:'520 KB', status:'✅ Cargado', url:'/Manuales/R44II_POH_Sec6_PesoBalance.pdf' },
  { id:'POH-7', icon:'🛠', name:'Sección 7 — Descripción de Sistemas', cat:'manuales', date:'Ed. vigente', size:'1.8 MB', status:'✅ Cargado', url:'/Manuales/R44II_POH_Sec7_Sistemas.pdf' },
  { id:'D01', icon:'📄', name:'RAAC Parte 60 — Texto completo', cat:'solicitudes', date:'2022', size:'2.1 MB', status:'✅ Referencia', url:'https://www.argentina.gob.ar/sites/default/files/anexo-parte-60.pdf' },
  { id:'D02', icon:'📑', name:'JAR-FSTD H — Ed. completa EASA', cat:'validacion', date:'EASA', size:'4.7 MB', status:'📤 Pendiente', url:'https://www.easa.europa.eu/en/domains/aircrew-and-medical/flight-simulation-training-devices-fstd' },
  { id:'D03', icon:'🔖', name:'SFAR 73 — Robinson Helicopter Training', cat:'solicitudes', date:'FAA', size:'180 KB', status:'✅ Referencia', url:'/Manuales/SFAR73.pdf' },
  { id:'D04', icon:'📋', name:'QTG R44 II Rev.01 — Guía Maestra de Pruebas', cat:'solicitudes', date:'Marzo 2026', size:'420 KB', status:'✅ Validado', url:'/Manuales/QTG_R44II_RAAC60_Rev01.pdf' },
];

export const NORMATIVA_DATA: NormativaItem[] = [
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
  },
  {
    id: 'sfar73',
    section: 'SFAR 73',
    title: 'Special Training Requirements — Robinson R22/R44',
    ref: 'SFAR 73 / FAA / Robinson Helicopter',
    content: `
      <h3>SFAR 73 — Requisitos Especiales de Entrenamiento Robinson</h3>
      <p class="norm-ref">Referencia: FAA · Applicability: R22, R44 operators worldwide</p>
      <p>El SFAR 73 establece requisitos específicos de entrenamiento obligatorio para aeronaves Robinson R22 y R44, incluyendo la obligatoriedad de demostrar en simulador las condiciones de <strong>baja RPM del rotor</strong>, <strong>Low-G pushover</strong> (riesgo de mast bumping) y <strong>autorrotación con aterrizaje</strong>. Estos requisitos refuerzan las pruebas críticas QTG-03-006, QTG-04-009 y QTG-04-010.</p>
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
      { id:'CL-01-4', text:'Monitores de cabina (instrumentos y paneles) — imagen correcta', ref:'SOP §2.3' },
      { id:'CL-01-5', text:'Iluminación cabina réplica R44 II — funcional', ref:'SOP §2.4' },
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
    title: 'Sistema Visual / Realidad Mixta (Varjo XR4)', icon: '👁', color: '#8b5cf6',
    items: [
      { id:'CL-03-1', text:'Computadoras gráficas — encendidas y sin errores', ref:'VIS §4.1' },
      { id:'CL-03-2', text:'Latencia visual verificada — ≤ 150 ms', ref:'RAAC60 / JAR-FSTD H' },
      { id:'CL-03-3', text:'Calidad de imagen (horizonte, terreno) — sin artefactos', ref:'VIS §4.3' },
      { id:'CL-03-4', text:'Visores Varjo XR4 — calibrados y funcionales', ref:'VIS §4.4' },
      { id:'CL-03-5', text:'Selección de escenario y condición meteorológica — OK', ref:'VIS §4.5' },
    ]
  },
  {
    title: 'Cabina Réplica Robinson R44 II', icon: '🎮', color: '#10b981',
    items: [
      { id:'CL-04-1', text:'Cíclico, colectivo y pedales — rango completo sin trabas', ref:'POH §7' },
      { id:'CL-04-2', text:'Sistema hidráulico — presión nominal (450–500 psi)', ref:'POH §7' },
      { id:'CL-04-3', text:'Tacómetro dual (motor + rotor) — calibrado y operativo', ref:'POH §2' },
      { id:'CL-04-4', text:'Indicador MAP — en zona verde a marcha mínima', ref:'POH §5' },
      { id:'CL-04-5', text:'Bocina LOW RPM — verificada (activa en 97%)', ref:'POH §2 / SFAR 73' },
      { id:'CL-04-6', text:'Luces ALT, OIL, CLUTCH, LOW FUEL — verificadas en prueba funcional', ref:'POH §3' },
      { id:'CL-04-7', text:'Sistema de sonido (motor pistón, rotor, bocina alarma) — nivel correcto', ref:'RAAC60' },
    ]
  }
];

export const PRE_FLIGHT_DATA = [
  { id: 'PF-01', cat: 'Energía', task: 'UPS y Estabilizadores de tensión ON' },
  { id: 'PF-02', cat: 'Hardware', task: 'Varjo XR4: Lentes limpios y tracking calibrado' },
  { id: 'PF-03', cat: 'Software', task: 'Simulador cargado en Aeropuerto Base (SADM)' },
  { id: 'PF-04', cat: 'Controles', task: 'Pedales, Cíclico y Colectivo en posición neutral' },
  { id: 'PF-05', cat: 'Audio', task: 'Intercomunicadores y Audio ambiente habilitados' },
  { id: 'PF-06', cat: 'Vibración', task: 'Bass Shakers / Active Seats activos' },
];
