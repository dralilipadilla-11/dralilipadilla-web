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
| Foto de perfil recortada con `transform:scale(2.4)` sobre una foto de cuerpo entero | Archivo cuadrado dedicado `images/avatar-lili.jpg` (640×640) |

El detalle completo de tokens está en `docs/design-system.md`.

## 3. Resuelto en la ronda de diseño

Diseño recibido: `Links Papel Medico.dc.html` (Claude Design, proyecto
`ser-dra-lili-padilla-design-system`), ya implementado en `links.html`.

- **Jerarquía.** Cuatro secciones en vez de tres, con "Agenda tu consulta" concentrando el
  CTA y las dos modalidades de estudio. Estudios de Sueño se abrió en dos tarjetas
  (Polisomnografía en hotel Four Points · Poligrafía en casa), que es como la paciente
  realmente decide.
- **Nueva sección "Educación en sueño"**, encabezada por la invitación a colaborar
  (charlas, empresas, medios, escuelas) con su propia variante cálida de tarjeta.
- **Credenciales como firma** en vez de píldoras sueltas: filete teal, ubicación y cédula.
  Se añadió Hospital Galenia.
- **Iconos revisados** por producto: onda para polisomnografía, luna para poligrafía,
  círculos concéntricos para S·E·R, diana radiada para Entrena tu Respiración.
- **Área táctil** de 44px mínimo en cada enlace.

## 4. Lo que sigue pendiente

1. **El retrato sigue siendo un recorte** de la foto de consultorio: el fondo turquesa
   choca con la paleta crema. Se necesita un retrato dedicado — especificación en la sección 5.
2. **No hay imagen Open Graph propia.** Al compartir el link se usa la foto de consultorio,
   que se recorta mal en el preview. Hace falta una de 1200×630.
3. **La página es larga en móvil** (~4500px, 17 enlaces). Vale la pena revisar si conviene
   agrupar o priorizar más.

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
1. Agendar consulta — `/agendar` *(destacada, "Empieza aquí")*
2. Polisomnografía — `/estudios-de-sueno`
3. Poligrafía respiratoria — `/estudios-de-sueno`
4. WhatsApp — 998 151 6161

**Educación en sueño**
5. ¿Te interesa colaborar para educar en sueño? — WhatsApp con texto propio *(variante arena)*
6. Quiz del sueño
7. Blog de sueño y respiración — `/blog`
8. Comunidad Escuela de Sueño (grupo de WhatsApp)

**Programas y herramientas**
9. Protocolo S·E·R — `/protocolo-ser`
10. RespiraGym
11. Entrena tu Respiración
12. Riviera Sleep Program — `/riviera-sleep` *(en inglés)*
13. Sitio web principal — `/`

**Redes sociales**
14. Instagram · 15. TikTok · 16. YouTube · 17. Facebook — todos `@dra.lilipadilla`
