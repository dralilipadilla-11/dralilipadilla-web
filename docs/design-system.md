# Design System — Dra. Lili Padilla

Fuente de verdad: `styles.css` (sitio principal) y el bloque `<style>` de `links.html`.
Última actualización: agosto 2026 — al implementar el diseño `Links Papel Medico.dc.html`
(proyecto de Claude Design `ser-dra-lili-padilla-design-system`) sobre `/links`.

---

## 1. Paleta

Nombre interno: **Papel Médico**. Fondo blanco cálido, texto navy profundo, teal como
único color de acción y arena/terracota como acento cálido.

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#FAFAF8` | Fondo base (blanco cálido) |
| `--bg-2` | `#F0EDE6` | Crema suave — secciones alternas |
| `--bg-card` | `#FFFFFF` | Superficie de tarjeta |
| `--teal` | `#007272` | Color de acción: enlaces, iconos, botones |
| `--teal-deep` | `#005A5A` | Estado hover / presionado |
| `--accent` | `#B8936A` | Arena/terracota — acento cálido, destacados |
| `--navy` | `#071e30` | Texto principal |
| `--navy-2` | `#2A4A5A` | Texto secundario |
| `--navy-3` | `#6A8A9A` | Texto muted, etiquetas |
| `--line` | `rgba(7,30,48,.10)` | Bordes neutros |
| `--line-teal` | `rgba(0,114,114,.20)` | Bordes de acento |

**Regla de contraste:** el texto principal es navy sobre crema (ratio > 14:1). El teal
`#007272` sobre `#FAFAF8` pasa AA para texto normal. **Nunca** usar `--navy-3` para texto
menor a 14px sobre fondos con lavado de color.

**Prohibido:** el teal claro `#00a8a8` y el cian `#3cd2dd` del tema oscuro anterior. Sobre
fondo claro no alcanzan contraste. Si se necesita un teal más brillante, es solo decorativo
(fondos de icono al 10-16% de opacidad), nunca para texto ni bordes de foco.

## 2. Tipografía

| Rol | Familia | Peso | Notas |
|---|---|---|---|
| Títulos | `Lora`, Georgia, serif | 500–600 | `letter-spacing:-.015em`, `line-height:1.1` |
| Énfasis en título | `Lora` itálica | 500 | Solo para el apellido / palabra clave, en `--teal` |
| Cuerpo e interfaz | `Nunito` | 300–700 | `line-height:1.65` en párrafos |
| Etiquetas de sección | `Nunito` | 600 | `.66rem`, mayúsculas, `letter-spacing:.16em`, `--navy-3` |
| Frase de marca | `Lora` itálica | 400 | 1.15rem, `--navy-2` |

Google Fonts (una sola petición):
`Lora:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Nunito:wght@300;400;500;600;700`

## 3. Forma y profundidad

- **Radios:** 8px (sm), 12px (contenedores de icono), 16px (tarjetas), 24px (bloques grandes), 50% (avatar).
- **Sombras:** reposo `0 1px 2px rgba(7,30,48,.04)`; hover `0 12px 28px rgba(7,30,48,.10)`; avatar `0 10px 28px rgba(7,30,48,.14)`.
  Sombras siempre en navy con alpha, nunca en negro puro — el negro sobre crema se ve sucio.
- **Bordes:** 1px. Neutro `--line` en reposo, `--line-teal` en hover/foco.
- **Easing estándar:** `cubic-bezier(.16,1,.3,1)`. Duración 300ms en interacción, 700ms en animaciones ambientales.

## 4. Fondo orgánico

Tres lavados radiales difuminados (`blur(70px)`) que se desplazan lentamente, más una
textura de grano al 3% en `mix-blend-mode:multiply`.

- Lavado 1: teal `rgba(0,114,114,.16)` — arriba a la derecha.
- Lavado 2: arena `rgba(184,147,106,.20)` — abajo a la izquierda.
- Lavado 3: crema `rgba(255,253,247,.85)` — centro, para abrir espacio.
- Base del body: gradiente vertical `#FAFAF8 → #F7F3EA → #F2EDE2`, `background-attachment:fixed`.

Todas las animaciones ambientales se apagan bajo `prefers-reduced-motion:reduce`.

## 5. Componentes

### Tarjeta de enlace (`.card`)
Fila horizontal: contenedor de icono 42×42 (radio 12px) · bloque de texto (título 700 / .95rem + subtítulo `--navy-3` / .775rem) · flecha.
Padding `.95rem 1.15rem`, gap `.95rem`, separación vertical `.7rem`.
`min-height:44px`. Hover: eleva 2px, sombra a `0 12px 28px rgba(7,30,48,.10)`, borde a
`--line-teal` y la flecha se desplaza 4px al teal.

### Tarjeta destacada (`.card.hero`)
Igual, con fondo `linear-gradient(135deg, teal 10%, arena 10%)` y borde de acento.
Lleva `.badge`: pestaña superior derecha, teal sólido, texto blanco, .58rem, mayúsculas.
**Máximo una por página** — es el CTA principal.

### Contenedores de icono
42×42, radio 12px, `flex:0 0 42px`. Fondo del color de la marca al 7–14% de opacidad, ícono
al color sólido oscurecido para contraste sobre claro: WhatsApp `#128C7E` sobre `rgba(18,140,126,.10)`,
Instagram `#C13584` sobre `rgba(193,53,132,.10)`, YouTube `#CC0000` sobre `rgba(204,0,0,.09)`,
Facebook `#1877F2` sobre `rgba(24,119,242,.10)`, TikTok `--navy` sobre `rgba(7,30,48,.07)`,
teal propio sobre `rgba(0,114,114,.10)`, arena `#8A6A44` sobre `rgba(184,147,106,.14)`.

### Variante cálida (`.card.sand`)
Misma tarjeta con borde `rgba(184,147,106,.35)` (hover `.6`) e icono de arena. Reservada para
invitaciones y colaboración — nunca para servicios clínicos, que van siempre en teal.

### Avatar
112×112, circular, borde de 4px del color del fondo, anillo cónico giratorio
(teal → arena → teal) al 40% de opacidad, 18s por vuelta.

### Bloque de credenciales (`.cred`)
Sustituye a las píldoras sueltas. Columna centrada: filete teal de 28×1px al 45% de opacidad,
línea de ubicación (.78rem, peso 600, `--navy-2`) y línea de credencial (.72rem, `--navy-3`).
Se lee como una firma, no como etiquetas.

## 6. Especificación de imágenes

- **Avatar:** cuadrado 1:1, mínimo 640×640, JPG progresivo real con calidad ~88 y bajo 100 KB.
  Verificar el formato del archivo, no la extensión: un PNG renombrado a `.jpg` pesa diez veces más
  y el navegador lo carga igual, así que el problema pasa desapercibido.
  Encuadre: ojos al 38% de altura, cabeza ocupando ~45% del alto, hombros visibles.
  El archivo debe venir **ya recortado en cuadrado** — nada de recortar con `transform:scale()` en CSS.
- **Open Graph:** 1200×630, la cara en el tercio izquierdo o centrada, sin texto pequeño.
- Todo `<img>` lleva `width`, `height`, `alt` descriptivo y `decoding="async"`.

## 7. Accesibilidad

- Foco visible: `outline:2px solid var(--teal); outline-offset:3px`. No eliminar.
- Área táctil mínima de 44px de alto en cada enlace (`min-height:44px` en `.card`).
- El color nunca es el único portador de significado (los iconos siempre van con texto).
- `prefers-reduced-motion` desactiva aurora y anillo del avatar.
