# 01 · PRD — Landing Demo "Magnetica Beauty Bar"

## 1. Resumen

Landing page **demo** de una sola página para un salón de uñas con servicios de manicura, nail art y cabello. Objetivo: mostrar una presencia digital profesional con estética **oscura/glamurosa** (inspirada en la referencia de Instagram `.docs/tmp/image.png`), con **agente IA de reservas** y **comunicación directa por WhatsApp**.

> **Nombre demo:** `Magnetica Beauty Bar` (ficticio, tomado de la referencia). `TODO`: reemplazar por marca definitiva.

## 2. Objetivos

| # | Objetivo | Métrica demo |
|---|----------|--------------|
| O1 | Transmitir marca premium/glamour en 5 s (hero con `fluid-orb`) | LCP < 2.5 s, sin CLS |
| O2 | Convertir: reserva vía agente IA o WhatsApp | CTA visible en hero + sticky móvil |
| O3 | Demostrar capacidad técnica (WebGL, Motion, chat agent) | — |

## 3. Público

- Mujeres 18–40, segmento C/D, urbanas (Santiago, Chile).
- Consumidoras de Instagram/Pinterest; valoran nail art, tendencias Y2K/coquette, chrome, francesas con detalles.
- Dispositivo principal: **móvil Android/iOS** (>80 % del tráfico esperado).

## 4. Referencia de diseño (Instagram)

Extraído de `.docs/tmp/image.png` (nota: verificado por descripción textual del screenshot):

- **@magnetica.beautybar** — "Alisados y BTX | Manicure | San Bernardo, CL" · Home studio en San Bernardo, Santiago.
- Identidad: logo "M" en **blackletter gótico** magenta sobre negro con glow.
- Historias destacadas: Catálogo · Insumos · Información · **Nail Art** · Cabello · Manicure.
- Feed: uñas rojas lacadas, francesas con estrellas doradas, chrome verde/azul con mariposas, uñas Y2K; neones rosa/magenta; destellos ✦ y estrellas de 4 puntas; textura flash/noir.
- **Palabras clave de marca:** magnética, imán, glamour nocturno, Y2K, nail art audaz, destellos cromados.

## 5. Contenido (español, textos definitivos de la demo)

### 5.1 Marca y datos (placeholders)

| Dato | Valor demo | TODO |
|------|-----------|------|
| Nombre | Magnetica Beauty Bar | ✔ |
| Tagline | "Uñas que hipnotizan" | |
| WhatsApp | `+56 9 XXXX XXXX` → `wa.me/569XXXXXXXX` | ✔ |
| Dirección | San Bernardo, Santiago, Chile (referencia) | ✔ |
| Horario | Lun–Vie 10–20 h · Sáb 10–18 h | ✔ |
| Instagram | @magnetica.beautybar (referencia) | ✔ |

### 5.2 Servicios y precios (CLP, referencia)

| Servicio | Precio | Duración |
|----------|--------|----------|
| Manicure clásica + esmalte tradicional | $12.000 | 45 min |
| Semipermanente | $18.000 | 1 h |
| Soft gel / esculpido | $30.000 | 1.5 h |
| Nail art (por unidad / set) | $2.000 / $12.000 | 15 min |
| Retiro + cuidado | $8.000 | 30 min |
| Alisados / BTX cabello | desde $40.000 | 2–3 h |

### 5.3 Testimonios (ficticios para demo)

> "El nail art con estrellas cromadas que me hizo es de otro planeta. Todos preguntan." — **Vale, 24**
> "Reservé por WhatsApp en 2 minutos y salí hipnotizada." — **Cata, 31**
> "Mi primera vez con semipermanente y duró 3 semanas intacto." — **Jime, 27**

### 5.4 Copy hero

- H1: **Uñas que hipnotizan.**
- Sub: Manicure, soft gel y nail art de autor en San Bernardo. Diseñamos la versión más magnética de ti.
- CTA1: `Reservar ahora` (agente IA) · CTA2: `Escribir por WhatsApp` (wa.me)

## 6. Funcionalidades

| ID | Funcionalidad | Prioridad |
|----|---------------|-----------|
| F1 | Hero con orbe fluido animado (`fluid-orb` rare-ui) | P0 |
| F2 | Grid de servicios con precios | P0 |
| F3 | Galería de nail art (placeholders estilizados) | P0 |
| F4 | Testimonios (carrusel accesible) | P1 |
| F5 | **Agente IA de reservas**: chat guiado servicio → fecha → datos → handoff WhatsApp | P0 |
| F6 | Botón CTA WhatsApp flotante + enlazado `wa.me` con mensaje prellenado | P0 |
| F7 | Sección contacto: horario, ubicación, Instagram | P1 |
| F8 | Footer legal + redes | P1 |
| F9 | Responsive 375/768/1024/1440 y `prefers-reduced-motion` | P0 |
| F10 | SEO básico: metadata Open Graph, `lang="es"`, sitemap | P2 |

## 7. Fuera de alcance (demo)

- Pagos online, calendario real con disponibilidad, CRM, autenticación.
- Backend de IA con LLM (el agente demo es client-side; se documenta upgrade path en 05).

## 8. Criterios de aceptación

1. Landing 100 % en español carga en < 2.5 s (Lighthouse móvil ≥ 90 Performance/A11y/Best Practices/SEO).
2. `fluid-orb` visible en hero con paleta de marca; no rompe en móviles sin WebGL.
3. El flujo del agente IA produce un enlace `wa.me` con mensaje prellenado correcto (servicio, fecha, nombre).
4. Cumple checklist de UI/UX (ver 02-design-system.md §8).
