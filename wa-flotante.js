/* ============================================================
   Boton flotante de WhatsApp — solo movil
   ------------------------------------------------------------
   Va en archivo compartido y no repetido en cada pagina porque
   son 10 archivos y el numero de telefono no puede quedar en 10
   lugares distintos: el dia que cambie, se olvida uno.

   Se inyecta con JS en vez de pegar el HTML en cada pagina por
   la misma razon — un solo lugar que mantener.

   MEDICION: este script NO empuja el evento contacto_click a
   proposito. Todas las paginas del sitio ya tienen un listener
   delegado en document que dispara contacto_click para cualquier
   enlace wa.me, y este boton es un enlace wa.me, asi que ya queda
   cubierto. Si empujara aqui tambien, cada clic contaria doble y
   la conversion de Ads quedaria inflada.
   ============================================================ */
(function () {
  'use strict';

  var TEL = '529981516161';
  var TEXTO = 'Hola Dra. Lili, me gustaría agendar una consulta';

  if (document.querySelector('.wa-flotante')) return;

  var css = [
    '.wa-flotante{',
      'position:fixed;',
      'right:1rem;',
      /* env() respeta la barra de gestos del iPhone; el fallback de 1rem
         aplica en navegadores que no la soportan. */
      'bottom:calc(1rem + env(safe-area-inset-bottom, 0px));',
      'z-index:90;',                 /* debajo del nav (100), encima de todo lo demas */
      'width:56px;height:56px;',
      'border-radius:50%;',
      'background:#25d366;',
      'display:none;',               /* se enciende solo en movil, abajo */
      'align-items:center;justify-content:center;',
      'box-shadow:0 6px 20px rgba(0,0,0,.28);',
      'transition:transform .25s ease;',
      '-webkit-tap-highlight-color:transparent;',
    '}',
    '.wa-flotante:active{transform:scale(.92);}',
    '.wa-flotante svg{width:30px;height:30px;fill:#fff;display:block;}',
    /* Mismo punto de corte que usa el nav para ocultar los enlaces:
       arriba de 1024px hay menu completo y CTA visible, y el boton
       flotante solo estorbaria. */
    '@media(max-width:1024px){.wa-flotante{display:flex;}}',
    '@media(prefers-reduced-motion:reduce){.wa-flotante{transition:none;}}',
    /* Impresion: no tiene sentido en papel. */
    '@media print{.wa-flotante{display:none!important;}}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var a = document.createElement('a');
  a.className = 'wa-flotante';
  a.href = 'https://wa.me/' + TEL + '?text=' + encodeURIComponent(TEXTO);
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'Escribir por WhatsApp a la Dra. Lili Padilla');
  a.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
    '</svg>';

  (document.body || document.documentElement).appendChild(a);
})();
