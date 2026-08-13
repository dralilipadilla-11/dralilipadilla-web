# Brief de diseño — página /links

**Para:** equipo de diseño
**De:** Dra. Lili Padilla
**URL en vivo:** https://dralilipadilla.com/links
**Archivo a intervenir:** `links.html` — página autocontenida (HTML + CSS en línea, sin build, sin dependencias). Se puede abrir en el navegador tal cual y editar directo.

---

## 1. Qué es esta página

Es el "link in bio" de la Dra. Lili: el destino de Instagram, TikTok, YouTube y Facebook.
Es la primera impresión de marca para alguien que la acaba de descubrir en redes.

**Objetivo #1:** que la persona agende consulta (tarjeta destacada + WhatsApp).
**Objetivo #2:** que entre a los recursos gratuitos (quiz, blog, comunidad, RespiraGym).

Audiencia: adultos 30–60, mayoría móvil, muchos llegando de noche con problemas de sueño.
Tono de marca: médico serio pero cálido y humano. Nada de estridencia ni de "clínica fría".

## 2. Qué se acaba de cambiar (estado actual)

La página estaba en tema oscuro (fondo navy `#071e30`) y no coincidía con el sitio principal.
Se migró a la paleta clara **"Papel Médico"** del sitio principal:

| Antes | Ahora |
|---|---|
| Fondo navy `#071e30` | Crema `#FAFAF8 → #F2EDE2` |
| Teal brillante `#00a8a8` / cian `#3cd2dd` | Teal profundo `#007272` + arena `#B8936A` |
| Tipografías Outfit + Cormorant Garamond | Lora + Nunito (las del sitio principal) |
| Tarjetas de vidrio translúcido sobre oscuro | Tarjetas blancas con borde y sombra suave |
| Foto de perfil recortada con `transform:scale(2.4)` sobre una foto de cuerpo entero | Archivo cuadrado dedicado `images/perfil.jpg` (640×640) |

El detalle completo de tokens está en `docs/design-system.md`.

## 3. Problemas que seguimos queriendo resolver

1. **La foto de perfil sigue siendo un recorte.** El original (`images/about.jpg`) es una
   foto de consultorio de cuerpo entero; el fondo turquesa del consultorio choca con la
   paleta crema. **Se necesita un retrato dedicado**: fondo neutro claro o desenfocado,
   luz suave, encuadre de cabeza y hombros. Ver especificación en la sección 5.
2. **Jerarquía visual plana.** Hay 14 enlaces con casi el mismo peso. Las secciones se
   separan solo con una etiqueta pequeña. Falta un ritmo que empuje la vista al CTA.
3. **Los iconos son genéricos.** Son trazos SVG estándar. No hay lenguaje visual propio
   para Protocolo S·E·R, RespiraGym ni Escuela de Sueño, que son productos de la marca.
4. **La página es larga en móvil** (~4000px). Puede que convenga agrupar, colapsar o
   priorizar.
5. **No hay imagen Open Graph propia.** Al compartir el link se usa la foto de consultorio,
   que se recorta mal en el preview.

## 4. Lo que pedimos

- Propuesta visual de la página completa en móvil (430px de ancho) respetando los tokens
  del design system. Si algo del sistema estorba, decirlo y proponer el cambio — el sistema
  también se puede actualizar.
- Set de iconos propios para los 4 productos de marca (Protocolo S·E·R, RespiraGym,
  Entrena tu Respiración, Escuela de Sueño), en trazo de 1.7px sobre grid de 24px, para
  que encajen con los existentes.
- Propuesta de jerarquía: cómo hacer que "Agendar" gane sin gritar.
- Imagen Open Graph 1200×630.

**Entregable ideal:** el mismo `links.html` editado, o Figma + specs. La página no usa
framework alguno, así que cualquier cambio de CSS se aplica directo.

## 5. Especificación del retrato

- Cuadrado 1:1, mínimo 640×640 px (idealmente 1200×1200 para tener margen).
- JPG progresivo, calidad ~88, bajo 100 KB.
- Encuadre: ojos a ~38% de la altura, cabeza ocupando ~45% del alto, hombros visibles.
- Fondo neutro claro, crema o desenfocado. **Evitar el turquesa del consultorio.**
- Se muestra en un círculo de 112px con borde crema de 4px — todo lo que quede en las
  esquinas se pierde. Dejar aire alrededor de la cabeza.

## 6. Restricciones técnicas (no negociables)

- Sin frameworks, sin build, sin npm. HTML + CSS en línea en un solo archivo.
- Se alojan en Netlify; `/links` sirve `links.html` vía `_redirects`.
- Google Tag Manager (`GTM-N4T5R7VT`) y el evento `contacto_click` deben permanecer intactos.
- El botón flotante de WhatsApp (`wa-flotante.js`) es global del sitio: si el diseño pone
  algo abajo a la derecha, va a chocar.
- Foco visible y `prefers-reduced-motion` deben respetarse.
- Rendimiento: una sola petición a Google Fonts, imágenes con `width`/`height` declarados.

## 7. Inventario de enlaces actual

**Agenda tu consulta**
1. Agendar con la Dra. Lili — `/agendar` *(destacada, "Empieza aquí")*
2. WhatsApp — 998 151 6161

**Programas y servicios**
3. Estudios de Sueño — `/estudios-de-sueno`
4. Protocolo S·E·R — `/protocolo-ser`
5. Riviera Sleep Program — `/riviera-sleep` *(en inglés)*
6. Sitio web principal — `/`

**Escuela de Sueño · gratis**
7. Quiz del sueño
8. Blog de sueño y respiración — `/blog`
9. Comunidad Escuela de Sueño (grupo de WhatsApp)
10. RespiraGym
11. Entrena tu Respiración

**Redes sociales**
12. Instagram · 13. TikTok · 14. YouTube · 15. Facebook — todos `@dra.lilipadilla`
