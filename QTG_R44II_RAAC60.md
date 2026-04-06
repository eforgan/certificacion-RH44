# GUÍA MAESTRA DE PRUEBAS DE CALIFICACIÓN (QTG)
## Calificación de Dispositivo de Entrenamiento de Vuelo (FTD/FFS)
### Helicóptero: Robinson R44 II Raven II
### Normativa: RAAC Parte 60 — ANAC Argentina

---

> [!IMPORTANT]
> **DOCUMENTO CONTROLADO**
> Organización: MODENA Air Service / CEAC
> Proyecto: Simulador Robinson R44 II — Sistema 6XSIM
> Revisión: 01 | Fecha: Marzo 2026
> Referencia Regulatoria: RAAC Parte 60, JAR-FSTD H Nivel B / FTD Nivel 3+

---

## ÍNDICE GENERAL

1. [Portada y Datos del Operador](#1-portada-y-datos-del-operador)
2. [Introducción y Propósito](#2-introducción-y-propósito)
3. [Descripción del Dispositivo](#3-descripción-del-dispositivo)
4. [Datos de la Aeronave de Referencia](#4-datos-de-la-aeronave-de-referencia)
5. [Estructura de las Pruebas QTG](#5-estructura-de-las-pruebas-qtg)
6. [ÁREA 1 — Pruebas de Performance y Vuelo Estacionario](#6-área-1--pruebas-de-performance-y-vuelo-estacionario)
7. [ÁREA 2 — Pruebas de Maniobrabilidad en Vuelo](#7-área-2--pruebas-de-maniobrabilidad-en-vuelo)
8. [ÁREA 3 — Pruebas de Sistemas de Aeronave](#8-área-3--pruebas-de-sistemas-de-aeronave)
9. [ÁREA 4 — Pruebas de Procedimientos de Emergencia](#9-área-4--pruebas-de-procedimientos-de-emergencia)
10. [ÁREA 5 — Pruebas de Entorno y Visual](#10-área-5--pruebas-de-entorno-y-visual)
11. [ÁREA 6 — Pruebas de Cabina e Instrumentación](#11-área-6--pruebas-de-cabina-e-instrumentación)
12. [Criterios Generales de Aceptación](#12-criterios-generales-de-aceptación)
13. [Registro de Resultados y Firma](#13-registro-de-resultados-y-firma)
14. [Referencias y Bibliografía](#14-referencias-y-bibliografía)

---

## 1. PORTADA Y DATOS DEL OPERADOR

| Campo | Valor |
|---|---|
| **Operador** | MODENA Air Service S.A. / CEAC |
| **Aeronave de Referencia** | Robinson R44 II Raven II |
| **Tipo de Dispositivo** | FTD (Flight Training Device) |
| **Nivel de Calificación Solicitada** | FTD Nivel 3 / FFS Nivel B (RAAC Parte 60) |
| **Fabricante del Simulador** | 6XSIM — Delta 3 / Modena Air Service |
| **Número de Serie** | [Por asignar por ANAC] |
| **Ubicación** | Argentina |
| **Autoridad Certificante** | ANAC — Administración Nacional de Aviación Civil |
| **Fecha de Elaboración** | Marzo 2026 |
| **Revisión** | Rev. 01 |

---

## 2. INTRODUCCIÓN Y PROPÓSITO

### 2.1 Propósito del Documento

Esta **Guía de Pruebas de Calificación (QTG — Qualification Test Guide)** establece el conjunto completo de pruebas técnicas y funcionales requeridas para evaluar y certificar que el dispositivo de simulación de vuelo para el helicóptero **Robinson R44 II Raven II** cumple con los estándares de fidelidad, exactitud y seguridad operacional exigidos por la **RAAC Parte 60** de la República Argentina.

### 2.2 Base Regulatoria

- **RAAC Parte 60** — Calificación de Dispositivos de Entrenamiento de Vuelo (ANAC Argentina)
- **Resolución ANAC N.º 122/2022** — Procedimientos de certificación de FTD/FFS
- **JAR-FSTD H** — Estándares europeos de referencia para FTD de helicópteros
- **FAA AC 120-63** — Advisory Circular de referencia para helicópteros
- **Robinson R44 II Pilot's Operating Handbook (POH)** — Ed. vigente
- **Robinson R44 II Maintenance Manual** — Ed. vigente
- **SFAR 73** — Special Federal Aviation Regulation aplicable al R22/R44

### 2.3 Alcance

La QTG cubre las siguientes áreas funcionales:
1. Performance y vuelo estacionario
2. Maniobrabilidad en vuelo (normal y límites)
3. Sistemas de aeronave (motor, hidráulico, eléctrico, combustible)
4. Procedimientos de emergencia
5. Entorno visual y de movimiento
6. Cabina e instrumentación

### 2.4 Instrucciones para la Ejecución de Pruebas

- Cada prueba debe ejecutarse con el simulador en **condición estabilizada** (mínimo 30 segundos de estabilización previa).
- Los datos de referencia provienen del **POH oficial del R44 II** y datos validados por RHC.
- Las pruebas deben registrarse usando el software **Qualification Test Studio** o equivalente aprobado por ANAC.
- Los resultados deben ser firmados por el **Inspector de Vuelo ANAC** y el **Jefe de Instrucción** de la organización operadora.

---

## 3. DESCRIPCIÓN DEL DISPOSITIVO

### 3.1 Características Generales del Simulador

| Parámetro | Descripción |
|---|---|
| **Plataforma de movimiento** | 6 grados de libertad (6-DoF) |
| **Sistema visual** | Realidad Mixta (MR) — campo visual ≥ 150°H × 40°V |
| **Modelo de vuelo** | Aerodinámico de alta fidelidad validado contra datos POH |
| **Cabina** | Réplica fiel del R44 II Raven II |
| **Sistema de sonido** | Multicanal con reproducción de rotor, motor, alarmas |
| **Software base** | [Denominación del fabricante] |
| **Interfaces** | ARINC 429 / RS-232 / Ethernet según aplique |

### 3.2 Configuración de Aeronave Simulada

| Parámetro | Valor |
|---|---|
| **Variante** | R44 II Raven II |
| **Motor** | Lycoming IO-540-AE1A5 (inyección de combustible) |
| **Control** | Cíclico, colectivo con asistencia hidráulica |
| **Aviónica** | VHF COM, VOR/ILS, GPS (según configuración base) |

---

## 4. DATOS DE LA AERONAVE DE REFERENCIA

### 4.1 Datos de Pesos y Balance

| Parámetro | Valor |
|---|---|
| **Peso Bruto Máximo (MTOW)** | 2,500 lb (1,134 kg) |
| **Peso Bruto Mínimo** | 1,600 lb (726 kg) |
| **Límite de peso por asiento** | 300 lb (136 kg) |
| **Carga máxima compartimento equipaje** | 50 lb (23 kg) |

### 4.2 Velocidades de Referencia

| Parámetro | Valor |
|---|---|
| **Vne (≤ 2,200 lb)** | 130 KIAS |
| **Vne (> 2,200 lb)** | 120 KIAS |
| **Vne en autorrotación** | 100 KIAS |
| **Vy — Mejor tasa de ascenso** | 55 KIAS |
| **Velocidad despegue / ascenso / aproximación** | 60 KIAS |
| **Velocidad crucero recomendada** | 110 KIAS (normal) / 100 KIAS (alcance máximo) |
| **Velocidad máx. en turbulencia** | 60–70 KIAS |
| **Velocidad de planeo máximo (autorrotación)** | ~90 KIAS |
| **Velocidad mínima tasa de descenso (autorrotación)** | ~55 KIAS |

### 4.3 Especificaciones del Motor

| Parámetro | Valor |
|---|---|
| **Modelo** | Lycoming IO-540-AE1A5 |
| **Tipo** | 6 cilindros, enfriado por aire, inyección de combustible |
| **Desplazamiento** | 541.5 pulgadas cúbicas |
| **Potencia Máxima Continua (MCP)** | 205 BHP a 2,718 RPM (102% tacómetro) |
| **Potencia Máxima de Despegue (TOP — 5 min.)** | 245 BHP a 2,718 RPM |
| **CHT máxima** | 500°F (260°C) |
| **Temperatura aceite máxima** | 245°F (118°C) |
| **Presión aceite (vuelo normal)** | 55 – 95 psi |

### 4.4 Límites Operacionales del Rotor

| Condición | Límite |
|---|---|
| **RPM máxima — Power On** | 102% (408 RPM) |
| **RPM mínima — Power On** | 101% (404 RPM) |
| **RPM máxima — Power Off** | 108% (432 RPM) |
| **RPM mínima — Power Off** | 90% (360 RPM) |
| **Alarma LOW RPM activación** | Por debajo de 97% |

### 4.5 Límites de Altitud y Entorno

| Parámetro | Valor |
|---|---|
| **Densidad de altitud máxima** | 14,000 pies |
| **Altitud máxima AGL** | 9,000 pies |
| **Control IGE garantizado** | Hasta 9,800 pies densidad, viento ≤ 17 kt cualquier dirección |

### 4.6 Sistema Hidráulico

| Parámetro | Valor |
|---|---|
| **Presión de operación** | 450 – 500 psi |
| **Fluido hidráulico** | MIL-H-5606 |
| **Servos** | 3 (cíclico lat., cíclico long., colectivo) |
| **Bomba** | Accionada por caja de transmisión principal |
| **Interruptor** | Válvula solenoide — apagado desde cíclico |

---

## 5. ESTRUCTURA DE LAS PRUEBAS QTG

### 5.1 Identificación de Pruebas

Cada prueba QTG tiene la siguiente estructura:

```
QTG-[ÁREA]-[NÚMERO]: [Nombre de la prueba]
```

| Campo | Descripción |
|---|---|
| **Ref. POH/Manual** | Sección del manual de referencia |
| **Condiciones iniciales** | Configuración del simulador al inicio |
| **Procedimiento** | Pasos a ejecutar |
| **Parámetro a medir** | Variable de interés |
| **Dato de referencia** | Valor extraído del POH |
| **Tolerancia RAAC 60** | Margen de error aceptable |
| **Resultado obtenido** | A completar durante la prueba |
| **Estado** | APROBADO / RECHAZADO |

### 5.2 Niveles de Calificación y Requisitos Mínimos

| Nivel RAAC 60 | Descripción | Pruebas Mínimas |
|---|---|---|
| **FTD Nivel 1** | Procedimientos básicos, sin movimiento | Áreas 3, 6 |
| **FTD Nivel 2** | + Aerodinámica básica | Áreas 1, 3, 6 |
| **FTD Nivel 3** | + Maniobrabilidad completa | Áreas 1, 2, 3, 6 |
| **FFS Nivel A** | + Movimiento de corto alcance | Áreas 1–4, 6 |
| **FFS Nivel B** | + Sistema visual completo | Áreas 1–6 (completo) |

---

## 6. ÁREA 1 — PRUEBAS DE PERFORMANCE Y VUELO ESTACIONARIO

### QTG-01-001: Vuelo Estacionario IGE (In Ground Effect)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 5 — Performance / Diagrama IGE |
| **Condición** | ISA, nivel del mar, viento 0 kt, peso = 2,200 lb |
| **Procedimiento** | Elevar el helicóptero a estacionario IGE (~1 diámetro de rotor / ~5 ft) y estabilizar 30 seg |
| **Parámetro a medir** | MAP requerida (pulgadas Hg) para mantener estacionario |
| **Dato de referencia** | Según carta de performance IGE del POH R44 II |
| **Tolerancia** | ± 2 pulgadas MAP |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-01-002: Vuelo Estacionario OGE (Out of Ground Effect)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 5 — Performance / Diagrama OGE |
| **Condición** | ISA, nivel del mar, viento 0 kt, peso = 2,200 lb |
| **Procedimiento** | Elevar a ≥ 2 diámetros de rotor (~20 ft AGL), estabilizar 30 seg |
| **Parámetro a medir** | MAP requerida vs. diagrama OGE del POH |
| **Tolerancia** | ± 2 pulgadas MAP |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-01-003: Techo de Vuelo Estacionario IGE — Densidad de Altitud

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 5 — Performance a altitud |
| **Condición** | Peso 2,200 lb, densidad de altitud 5,000 ft, ISA |
| **Procedimiento** | Elevar a estacionario IGE, estabilizar, medir MAP |
| **Parámetro a medir** | MAP requerida para sostener estacionario a 5,000 ft DA |
| **Dato de referencia** | Diagrama de performance de POH |
| **Tolerancia** | ± 2 pulgadas MAP |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-01-004: Mejor Tasa de Ascenso (Vy)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 5 |
| **Condición** | MCP (205 BHP), ISA, nivel del mar, peso = 2,200 lb |
| **Procedimiento** | Acelerar a 55 KIAS, potencia MCP, medir tasa de ascenso (FPM) |
| **Parámetro a medir** | Tasa de ascenso en FPM |
| **Dato de referencia** | ~1,000 FPM (según POH, ISA, nivel del mar) |
| **Tolerancia** | ± 100 FPM |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-01-005: Velocidad de Nunca Exceder (Vne) — Respuesta del Simulador

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 2 — Límites |
| **Condición** | Peso ≤ 2,200 lb, nivel del mar |
| **Procedimiento** | Acelerar gradualmente hasta 130 KIAS; verificar que el simulador active advertencias/limitaciones |
| **Parámetro a medir** | Activación de advertencia Vne en 130 KIAS |
| **Dato de referencia** | Vne = 130 KIAS (POH Sección 2) |
| **Tolerancia** | ± 2 KIAS |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-01-006: Performance de Crucero — Consumo de Combustible

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 5 — Tablas de crucero |
| **Condición** | 75% MCP, 2,200 lb, nivel del mar, ISA |
| **Procedimiento** | Estabilizar en crucero 110 KIAS, registrar consumo horario de combustible |
| **Parámetro a medir** | Consumo en GPH (galones por hora) |
| **Dato de referencia** | Según tabla de crucero POH |
| **Tolerancia** | ± 1.0 GPH |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

## 7. ÁREA 2 — PRUEBAS DE MANIOBRABILIDAD EN VUELO

### QTG-02-001: Viraje Coordinado — 30° de Banco

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 4 — Operaciones normales |
| **Condición** | 100 KIAS, 2,200 lb, ISA, nivel del mar |
| **Procedimiento** | Establecer viraje a 30° de banco, estabilizar, medir altitud, velocidad, RPM |
| **Parámetro a medir** | Pérdida de altitud, variación de velocidad, coordinación bola |
| **Tolerancia** | ± 100 ft altitud, ± 5 KIAS, bola dentro de 1/2 bola |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-02-002: Viraje Coordinado — 60° de Banco

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 4 |
| **Condición** | 80 KIAS, 2,200 lb, ISA |
| **Procedimiento** | Viraje estabilizado a 60°, medir variaciones |
| **Parámetro a medir** | Mantenimiento de altitud, velocidad, coordinación |
| **Tolerancia** | ± 150 ft altitud, ± 5 KIAS |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-02-003: Transición Estacionario a Vuelo hacia Adelante

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 4 — Despegue normal |
| **Condición** | ISA, nivel del mar, viento 0 kt, peso = 2,200 lb |
| **Procedimiento** | Desde estacionario IGE, acelerar a 60 KIAS siguiendo perfil del diagrama H/V |
| **Parámetro a medir** | MAP aplicada (≤ MAP estacionario + 2 inHg) |
| **Tolerancia** | MAP no debe exceder en más de 2 inHg la MAP de estacionario |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-02-004: Aproximación y Aterrizaje Normal

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 4 — Aproximación y aterrizaje |
| **Condición** | ISA, viento en calma, peso = 2,200 lb |
| **Procedimiento** | Aproximación final a 60 KIAS, reducir a estacionario, descender a tierra. Verificar tasa de descenso < 300 FPM antes de 30 KIAS |
| **Parámetro a medir** | Tasa de descenso en la fase crítica (< 30 KIAS) |
| **Tolerancia** | Tasa de descenso < 300 FPM al cruzar 30 KIAS (prevención Vortex Ring State) |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-02-005: Vuelo Lateral y Rearward (Hacia Atrás)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 4 |
| **Condición** | Estacionario IGE, viento ≤ 5 kt |
| **Procedimiento** | Mover cíclico suavemente hacia un lado (lateral lento) y hacia atrás, verificar respuesta y control del guiñado |
| **Parámetro a medir** | Estabilidad, control del guiñado, ausencia de oscilaciones PIO |
| **Tolerancia** | Sin oscilaciones PIO, guiñada < ±5° |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-02-006: Diagrama Altura-Velocidad (H/V Curve)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 5 — Diagrama H/V |
| **Condición** | 2,500 lb MTOW, nivel del mar |
| **Procedimiento** | Verificar que la representación del diagrama H/V coincide con POH; simular falla de motor en 3 puntos: zona de riesgo alto, zona segura y punto crítico |
| **Parámetro a medir** | Coincidencia de zonas de riesgo vs. POH |
| **Tolerancia** | Las zonas de peligro deben coincidir dentro de ± 50 ft AGL / ± 5 KIAS |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

## 8. ÁREA 3 — PRUEBAS DE SISTEMAS DE AERONAVE

### QTG-03-001: Arranque del Motor — Procedimiento Normal

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 4 — Antes del vuelo / Arranque |
| **Procedimiento** | Ejecutar secuencia completa de arranque del motor Lycoming IO-540 |
| **Parámetro a medir** | Tiempo hasta RPM estable, indicaciones de presión/temperatura aceite |
| **Dato de referencia** | RPM estable: 60–70%; presión aceite verde dentro de 30 seg |
| **Tolerancia** | ± 5 seg para alcanzar presión de aceite mínima |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-03-002: Sistema Hidráulico — Operación Normal

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 7 — Sistemas |
| **Procedimiento** | Verificar presión hidráulica en vuelo estabilizado (450–500 psi), operar interruptor HYD ON/OFF, verificar cambio en la retroalimentación de fuerzas |
| **Parámetro a medir** | Presión hidráulica, respuesta táctil de controles |
| **Tolerancia** | Presión: 450–500 psi ± 20 psi; cambio de fuerzas perceptible |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-03-003: Sistema Hidráulico — Simulación de Falla

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 — Emergencias |
| **Procedimiento** | Inducir falla hidráulica en vuelo; verificar endurecimiento de controles cíclico/colectivo |
| **Parámetro a medir** | Incremento de fuerzas en controles posterior a la falla |
| **Tolerancia** | Fuerzas deben aumentar de forma notoria y consistente con comportamiento real del R44 II |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-03-004: Sistema de Combustible — Indicación de Bajo Nivel

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 7 — Combustible |
| **Procedimiento** | Reducir combustible al nivel de alarma; verificar activación de luz LOW FUEL |
| **Parámetro a medir** | Nivel en galones al momento de activación de alarma |
| **Dato de referencia** | Alarma LOW FUEL ≈ 3 galones utilizables (≈ 10 min de vuelo) |
| **Tolerancia** | ± 0.5 galones |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-03-005: Sistema Eléctrico — Falla del Alternador

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 — Emergencias eléctricas |
| **Procedimiento** | Inducir falla de alternador en vuelo; verificar iluminación de luz ALT |
| **Parámetro a medir** | Tiempo de activación de alarma ALT; degradación de equipos eléctricos |
| **Tolerancia** | Luz ALT debe encenderse dentro de ± 3 segundos de la falla |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-03-006: Sistema de RPM del Rotor — Alarma LOW RPM ⚠️ CRÍTICA

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 2 — Límites de RPM |
| **Procedimiento** | Reducir RPM del rotor mediante reducción del colectivo hasta cruzar el 97% |
| **Parámetro a medir** | Punto exacto de activación de bocina LOW RPM |
| **Dato de referencia** | 97% de RPM (≈ 388 RPM) |
| **Tolerancia** | ± 1% RPM (≈ ± 4 RPM) |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-03-007: Sistema de RPM — Alarma de Altas RPM (Warble)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 2 — Límites de RPM |
| **Procedimiento** | Incrementar RPM del rotor (en autorrotación) hasta acercarse al 108% |
| **Parámetro a medir** | Activación de tono warble aproximándose al 108% |
| **Tolerancia** | ± 1% RPM |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-03-008: Sistema de Embrague (CLUTCH)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 7 — Sistemas de transmisión |
| **Procedimiento** | Durante el arranque, verificar que la luz CLUTCH se enciende mientras el actuador trabaja y se apaga al completar el embrague |
| **Parámetro a medir** | Estado de la luz CLUTCH durante y después del arranque |
| **Tolerancia** | La luz debe apagarse antes de alcanzar RPM operacional (≥ 80%) |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

## 9. ÁREA 4 — PRUEBAS DE PROCEDIMIENTOS DE EMERGENCIA

### QTG-04-001: Autorrotación — Máximo Alcance (Power-Off Glide) ⚠️ CRÍTICA

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 / Sección 5 — Autorrotación |
| **Condición** | 2,200 lb, 1,000 ft AGL, ISA, nivel del mar |
| **Procedimiento** | Cortar potencia del motor; establecer autorrotación a 90 KIAS, RPM rotor ≈ 90%; medir tasa de descenso y relación de planeo |
| **Parámetros a medir** | Tasa de descenso (FPM), relación de planeo |
| **Dato de referencia** | Planeo 4.7:1 (~1 NM por cada 1,300 ft AGL); descenso ≈ 1,900 FPM a 90 KIAS |
| **Tolerancia** | ± 200 FPM en tasa de descenso |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-002: Autorrotación — Mínima Tasa de Descenso

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 |
| **Condición** | 2,200 lb, 1,000 ft AGL, ISA |
| **Procedimiento** | Cortar potencia; establecer autorrotación a 55 KIAS, 90% RPM rotor |
| **Parámetro a medir** | Tasa de descenso (FPM) |
| **Dato de referencia** | ~1,350 FPM a 55 KIAS |
| **Tolerancia** | ± 150 FPM |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-003: Autorrotación con Aterrizaje — Flare y Toque ⚠️ CRÍTICA

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 — Emergencias / Autorrotación |
| **Condición** | 2,200 lb, 1,000 ft AGL, ISA |
| **Procedimiento** | Cortar potencia; autorrotación a 70–90 KIAS. A 40 ft AGL iniciar flare con cíclico. A 8 ft nivelar y levantar colectivo para amortiguar toque |
| **Parámetros a medir** | Tasa de descenso al toque (< 300 FPM), RPM al toque (> 90%), patines nivelados |
| **Tolerancia** | Tasa de toque < 300 FPM; RPM rotor > 90% al toque |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-004: Falla de Motor en Despegue (< 8 ft AGL)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 |
| **Condición** | Despegue desde IGE, potencia ≈ MCP |
| **Procedimiento** | Inducir falla de motor entre 0 y 8 ft AGL durante el despegue |
| **Respuesta correcta** | Aplicar pedal derecho, dejar descender, levantar colectivo antes del toque |
| **Parámetro a medir** | Guiñada no controlada (< 20°), contacto con patines nivelados |
| **Tolerancia** | Sin vuelco; guiñada < 20°; RPM rotor no excede 108% |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-005: Falla de Motor en Vuelo de Crucero ⚠️ CRÍTICA

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 |
| **Condición** | 110 KIAS, 2,200 lb, 1,500 ft AGL |
| **Procedimiento** | Inducir falla de motor; verificar bocina LOW RPM, bajar colectivo, entrar en autorrotación; verificar guiñada a la izquierda |
| **Parámetros a medir** | Tiempo de activación bocina (< 2 seg), guiñada inicial a la izquierda, recuperación RPM rotor |
| **Tolerancia** | Bocina activa en < 2 seg; guiñada simulada hacia izquierda (comportamiento de par) |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-006: Fuego en Motor Durante Arranque

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 — Emergencias / Fuego |
| **Procedimiento** | Simular fuego en motor durante arranque; ejecutar procedimiento: continuar cranking → cortar mezcla → cerrar válvula combustible → batería OFF → freno rotor → abandono |
| **Parámetro a medir** | Representación visual/sonora del fuego; respuesta de sistemas |
| **Tolerancia** | Fuego visible en zona de motor; alarmas sonoras activas |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-007: Fuego en Motor en Vuelo

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 |
| **Condición** | Vuelo de crucero a 100 KIAS |
| **Procedimiento** | Inducir fuego en vuelo; verificar: autorrotación inmediata → corte válvula combustible → aterrizaje → corte batería → freno rotor → abandono |
| **Parámetro a medir** | Representación visual del fuego, secuencia de indicaciones |
| **Tolerancia** | Representación coherente y consistente con tiempo de respuesta real |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-008: Fuego Eléctrico en Vuelo

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 |
| **Procedimiento** | Simular falla eléctrica con indicación de humo/fuego; cortar batería y alternador; verificar pérdida de sistemas eléctricos |
| **Parámetro a medir** | Degradación de instrumentos eléctricos al cortar batería |
| **Tolerancia** | Todos los instrumentos eléctricos deben cesar al cortar la batería |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-009: Baja RPM del Rotor — Recuperación

| Campo | Detalle |
|---|---|
| **Ref. POH / SFAR 73** | Sección 3 — Baja RPM |
| **Condición** | Vuelo hacia adelante, 80 KIAS |
| **Procedimiento** | Reducir RPM rotor hasta activación de alarma (< 97%); ejecutar: bajar colectivo + agregar acelerador + cíclico atrás |
| **Parámetro a medir** | Tiempo para recuperar RPM a zona verde, efectividad de la acción |
| **Tolerancia** | RPM debe recuperarse a > 101% en < 5 seg con acción correcta |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-04-010: Maniobra Low-G — Respuesta del Simulador (SFAR 73)

| Campo | Detalle |
|---|---|
| **Ref. POH / SFAR 73** | Sección 3 — Maniobras peligrosas |
| **Propósito** | Verificar que el simulador reproduce correctamente el peligro del Low-G pushover (riesgo de mast bumping) |
| **Procedimiento** | Aplicar cíclico hacia adelante abruptamente desde vuelo nivelado (Low-G); verificar comportamiento del rotor (pérdida de carga sobre el disco) |
| **Parámetro a medir** | Representación de inestabilidad del rotor asociada al Low-G |
| **Tolerancia** | El simulador debe representar la inestabilidad conforme a datos de ingeniería de RHC / SFAR 73 |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

## 10. ÁREA 5 — PRUEBAS DE ENTORNO Y VISUAL

### QTG-05-001: Campo Visual — Cobertura Horizontal y Vertical

| Campo | Detalle |
|---|---|
| **Ref.** | JAR-FSTD H, RAAC Parte 60 Apéndice A |
| **Procedimiento** | Medir el campo visual activo del sistema de realidad mixta |
| **Parámetro a medir** | Ángulo horizontal (°) y vertical (°) |
| **Dato de referencia** | Mínimo: 150° horizontal × 40° vertical (FFS Nivel B) |
| **Tolerancia** | ± 5° en cada eje |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-05-002: Latencia del Sistema Visual ⚠️ CRÍTICA

| Campo | Detalle |
|---|---|
| **Ref.** | RAAC Parte 60 |
| **Procedimiento** | Medir el retardo (latencia) entre movimiento físico del simulador y actualización de imagen visual |
| **Parámetro a medir** | Latencia en milisegundos (ms) |
| **Dato de referencia** | Máxima latencia aceptable: ≤ 150 ms (FFS Nivel B) |
| **Tolerancia** | Debe ser ≤ 150 ms en todos los ejes |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-05-003: Calidad Visual — Representación del Horizonte y Terreno

| Campo | Detalle |
|---|---|
| **Ref.** | JAR-FSTD H |
| **Procedimiento** | Verificar resolución, nitidez del horizonte, ausencia de bandas de transición visibles, representación del terreno |
| **Parámetro a medir** | Evaluación cualitativa por Inspector ANAC |
| **Tolerancia** | Sin artefactos visuales; representación continua del horizonte |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-05-004: Representación de Condiciones Meteorológicas

| Campo | Detalle |
|---|---|
| **Ref.** | RAAC Parte 60 |
| **Procedimiento** | Verificar representación de: VMC clara, IMC (nubes), lluvia, niebla, visibilidad restringida, condición nocturna |
| **Parámetro a medir** | Representación visual de cada condición |
| **Tolerancia** | Todas las condiciones deben ser seleccionables y representadas de forma realista |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-05-005: Sistema de Movimiento — Reproducción de Turbulencia

| Campo | Detalle |
|---|---|
| **Ref.** | RAAC Parte 60 / JAR-FSTD H Nivel B |
| **Procedimiento** | Activar turbulencia leve / moderada; verificar que la plataforma 6-DoF reproduce los impulsos y vibraciones correspondientes |
| **Parámetro a medir** | Aceleraciones (g) y frecuencias generadas por la plataforma |
| **Tolerancia** | Correlación cualitativa con datos de referencia de ingeniería del fabricante |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-05-006: Sistema de Sonido — Motor, Rotor y Alarmas

| Campo | Detalle |
|---|---|
| **Ref.** | RAAC Parte 60 |
| **Procedimiento** | Verificar reproducción de: arranque motor, crucero, apagado; rotor a diferentes RPM; bocina LOW RPM; warble altas RPM; alarma CLUTCH |
| **Parámetro a medir** | Activación y nivel sonoro de cada evento |
| **Tolerancia** | Bocina LOW RPM: mínimo 10 dB sobre ruido de fondo de cabina |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

## 11. ÁREA 6 — PRUEBAS DE CABINA E INSTRUMENTACIÓN

### QTG-06-001: Panel de Instrumentos — Verificación General

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 7 y planos de cabina |
| **Procedimiento** | Verificar que todos los instrumentos del panel réplica están presentes, operativos y correctamente etiquetados |
| **Instrumentos a verificar** | Tacómetro dual (motor/rotor), altímetro, VSI, VOR, horizonte artificial, indicador de combustible, CHT, aceite, MAP, voltímetro |
| **Tolerancia** | 100% de instrumentos presentes y operativos |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-06-002: Tacómetro Dual — Exactitud de Indicación ⚠️ CRÍTICA

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 2 — Límites RPM |
| **Procedimiento** | Verificar indicación de RPM motor (102% MCP) y RPM rotor (101–102%) en vuelo estabilizado |
| **Parámetro a medir** | % RPM en tacómetro vs. valor calculado del modelo aerodinámico |
| **Tolerancia** | ± 1% RPM en ambas agujas |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-06-003: Indicador MAP (Manifold Absolute Pressure)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 5 |
| **Procedimiento** | Verificar indicación MAP en crucero a MCP (≈ 102% → ~24 inHg a nivel del mar) |
| **Tolerancia** | ± 0.5 inHg |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-06-004: Temperatura de Cabeza de Cilindro (CHT)

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 2 — Límites motor |
| **Procedimiento** | Verificar indicación CHT en operación continua a MCP, nivel del mar, ISA |
| **Parámetro a medir** | Temperatura CHT (°F) |
| **Dato de referencia** | CHT normal: < 450°F; límite máximo: 500°F |
| **Tolerancia** | Indicación dentro de rango verde (< 450°F) en condiciones normales ISA |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-06-005: Controles de Vuelo — Cíclico, Colectivo y Pedales

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 7 |
| **Procedimiento** | Verificar rango de movimiento completo de cíclico (±), colectivo (mín–máx) y pedales (izq–der); verificar correlación con posición de servos simulados |
| **Parámetro a medir** | Deflexión máxima en cada eje y correlación con respuesta del simulador |
| **Tolerancia** | ± 5% del rango total por eje |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-06-006: Luces de Advertencia — Verificación Individual

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 3 y 7 |
| **Procedimiento** | Activar individualmente cada condición de alarma y verificar iluminación correcta |

| Luz | Condición de activación | Tolerancia de tiempo |
|---|---|---|
| **LOW RPM** | RPM rotor < 97% | Activa en ≤ 1 seg |
| **ALT** | Falla alternador | Activa en ≤ 3 seg |
| **OIL** | Presión aceite < 55 psi | Activa en ≤ 2 seg |
| **CLUTCH** | Actuador trabajando durante arranque | Activa durante proceso |
| **LOW FUEL** | Combustible < 3 gal utilizables | Activa en ≤ 2 seg |

| **Resultado** | _______ |
|---|---|
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

### QTG-06-007: Interruptor Hidráulico (HYD) en Cíclico

| Campo | Detalle |
|---|---|
| **Ref. POH** | Sección 7 |
| **Procedimiento** | Operar interruptor HYD (ON/OFF) desde el cíclico; verificar respuesta del sistema hidráulico y cambio en retroalimentación de fuerzas |
| **Parámetro a medir** | Cambio en fuerzas de control al cambiar posición del interruptor |
| **Tolerancia** | Cambio de fuerzas perceptible e inmediato (< 1 seg) |
| **Resultado** | _______ |
| **Estado** | [ ] Aprobado [ ] Rechazado |

---

## 12. CRITERIOS GENERALES DE ACEPTACIÓN

### 12.1 Criterio de Aprobación Global

Para que el dispositivo sea **APROBADO** para la calificación solicitada:

| Nivel | Criterio mínimo |
|---|---|
| **FTD Nivel 3** | ≥ 85% de pruebas APROBADAS y **NINGUNA** prueba crítica rechazada |
| **FFS Nivel A** | ≥ 90% de pruebas APROBADAS y **NINGUNA** prueba crítica rechazada |
| **FFS Nivel B** | ≥ 95% de pruebas APROBADAS y **NINGUNA** prueba crítica rechazada |

### 12.2 Pruebas Críticas (⚠️ — Rechazo Directo si Fallan)

| Prueba | Descripción |
|---|---|
| QTG-03-006 | Alarma LOW RPM — activación en 97% |
| QTG-04-001 | Autorrotación — máximo alcance/planeo |
| QTG-04-003 | Autorrotación con aterrizaje — flare y toque |
| QTG-04-005 | Falla de motor en vuelo de crucero |
| QTG-05-002 | Latencia del sistema visual ≤ 150 ms |
| QTG-06-002 | Tacómetro dual — exactitud ± 1% RPM |

### 12.3 Tabla de Tolerancias Generales RAAC 60

| Parámetro | Tolerancia Estándar |
|---|---|
| Velocidades (KIAS) | ± 3 KIAS |
| Altitud | ± 100–150 ft |
| Tasa de ascenso/descenso | ± 100–200 FPM |
| RPM rotor/motor | ± 1% |
| MAP / Presión de múltiple | ± 0.5–2 inHg |
| Latencia visual | ≤ 150 ms |
| Temperaturas motor (CHT) | ± 20°F |
| Presión hidráulica | ± 20 psi |
| Presión aceite | ± 5 psi |
| Activación alarmas | ≤ 1–3 seg (según sistema) |

---

## 13. REGISTRO DE RESULTADOS Y FIRMA

### 13.1 Resumen Ejecutivo de Resultados

| Área | Total Pruebas | Aprobadas | Rechazadas | % Aprobación |
|---|---|---|---|---|
| Área 1 — Performance y Estacionario | 6 | | | |
| Área 2 — Maniobrabilidad | 6 | | | |
| Área 3 — Sistemas de Aeronave | 8 | | | |
| Área 4 — Procedimientos Emergencia | 10 | | | |
| Área 5 — Visual y Entorno | 6 | | | |
| Área 6 — Cabina e Instrumentación | 7 | | | |
| **TOTAL GENERAL** | **43** | | | |

### 13.2 Nivel de Calificación Obtenido

```
[ ] FTD Nivel 1
[ ] FTD Nivel 2
[ ] FTD Nivel 3
[ ] FFS Nivel A
[ ] FFS Nivel B
[ ] NO CALIFICADO — Requiere correcciones (ver Área / QTG rechazadas)
```

**Observaciones / Correcciones Requeridas:**

```
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________
```

### 13.3 Firmas Autorizantes

| Rol | Nombre y Apellido | Firma | Fecha |
|---|---|---|---|
| Inspector ANAC certificante | | | |
| Jefe de Instrucción | | | |
| Responsable técnico del simulador | | | |
| Director de Operaciones | | | |

### 13.4 Validez de la Calificación

> [!NOTE]
> Conforme a **RAAC Parte 60**, la calificación otorgada tiene validez de **12 meses** a partir de la fecha de aprobación. La renovación requiere una **evaluación anual con Pruebas de Verificación Periódica (PVP)**, que debe incluir como mínimo todas las pruebas marcadas como ⚠️ CRÍTICAS en la Sección 12.2.

---

## 14. REFERENCIAS Y BIBLIOGRAFÍA

| N° | Documento | Fuente |
|---|---|---|
| 1 | Robinson R44 II Raven II Pilot's Operating Handbook (POH) | Robinson Helicopter Company (RHC), Torrance, CA — Ed. vigente |
| 2 | Robinson R44 II Maintenance Manual | Robinson Helicopter Company (RHC) — Ed. vigente |
| 3 | RAAC Parte 60 — Calificación de Dispositivos de Entrenamiento de Vuelo | ANAC — Administración Nacional de Aviación Civil, Argentina |
| 4 | Resolución ANAC N.º 122/2022 | ANAC Argentina |
| 5 | SFAR 73 — Special Federal Aviation Regulation (R22/R44) | FAA — Federal Aviation Administration, EE.UU. |
| 6 | JAR-FSTD H — Helicopter Flight Simulation Training Devices | EASA / JAA — Ed. vigente |
| 7 | FAA AC 120-63 — Helicopter Simulator Qualification | FAA Advisory Circular |
| 8 | Lycoming IO-540-AE1A5 Operator's Manual | Lycoming Engines — Williamsport, PA |
| 9 | 6XSIM Technical Reference Manual | Modena Air Service / Delta 3 — Argentina |
| 10 | Robinson Safety Notices (varios) | Robinson Helicopter Company — www.robinsonheli.com |

---

*Fin del Documento QTG — Robinson R44 II Raven II — RAAC Parte 60 — Rev. 01 — Marzo 2026*

*MODENA Air Service / CEAC — Todos los derechos reservados*
*Documento sujeto a revisión periódica conforme a actualizaciones regulatorias de ANAC Argentina*
