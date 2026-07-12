(function () {
  "use strict";

  /* ── helpers ─────────────────────────────────────────────── */
  const $ = (sel, sc) => (sc || document).querySelector(sel);
  const $$ = (sel, sc) => Array.from((sc || document).querySelectorAll(sel));
  const reduced   = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ── Splash ──────────────────────────────────────────────── */
  function initSplash() {
    const el = $("[data-splash]");
    if (!el) return;
    const hide = () => el.classList.add("is-out");
    if (document.readyState === "complete") {
      setTimeout(hide, 600);
    } else {
      window.addEventListener("load", () => setTimeout(hide, 400));
    }
    setTimeout(hide, 3800); // safety
  }

  /* ── Nav scroll state ────────────────────────────────────── */
  function initNav() {
    const nav = $(".nav");
    if (!nav) return;
    const toggle    = $("#nav-toggle");
    const mobileNav = $("#nav-mobile");
    let isOpen = false;

    // Scroll solidify
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    if (toggle && mobileNav) {
      toggle.addEventListener("click", () => {
        isOpen = !isOpen;
        toggle.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", isOpen);
        mobileNav.classList.toggle("is-open", isOpen);
        mobileNav.setAttribute("aria-hidden", !isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      // Close on link click
      $$(".nav-mobile-link, .nav-mobile-cta, .nav-mobile-wa", mobileNav)
        .forEach(a => a.addEventListener("click", () => {
          isOpen = false;
          toggle.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", false);
          mobileNav.classList.remove("is-open");
          mobileNav.setAttribute("aria-hidden", true);
          document.body.style.overflow = "";
        }));

      // Close on Escape
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && isOpen) toggle.click();
      });
    }

    // Smooth anchor scroll
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.getBoundingClientRect().height : 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + scrollY - navH - 8,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ── Scroll reveals ──────────────────────────────────────── */
  function initReveals() {
    const els = $$("[data-reveal]");
    if (!els.length) return;

    els.forEach(el => {
      const delay = parseFloat(el.dataset.delay || 0);
      if (delay) el.style.transitionDelay = delay + "s";
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.02, rootMargin: "0px 0px -2% 0px" });

    els.forEach(el => io.observe(el));

    // Safety: force-reveal after 6s
    setTimeout(() => {
      $$("[data-reveal]:not(.is-visible)").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.1) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ── Count-up numbers ────────────────────────────────────── */
  function initCountUp() {
    const els = $$("[data-count-to]");
    if (!els.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const target = parseInt(e.target.dataset.countTo, 10);
        const duration = 1600;
        const start = performance.now();
        const step = now => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          e.target.textContent = Math.round(eased * target);
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 });

    els.forEach(el => io.observe(el));
  }

  /* ── Card tilt (subtle 3D hover) ─────────────────────────── */
  function initTilt() {
    if (!fineHover) return;

    const cards = $$("[data-tilt]");
    cards.forEach(card => {
      const MAX = 6; // max degrees

      card.addEventListener("mouseover", e => {
        if (!card.contains(e.relatedTarget)) onEnter(card);
      });
      card.addEventListener("mousemove", e => onMove(card, e, MAX));
      card.addEventListener("mouseout", e => {
        if (!card.contains(e.relatedTarget)) onLeave(card);
      });
    });

    function onEnter(el) {
      el.style.transition = "transform .15s, box-shadow .15s";
    }
    function onMove(el, e, max) {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - .5) * 2;
      const y = ((e.clientY - rect.top)  / rect.height - .5) * 2;
      el.style.transform = `
        perspective(600px)
        rotateY(${x * max}deg)
        rotateX(${-y * max}deg)
        translateZ(4px)
      `;
    }
    function onLeave(el) {
      el.style.transition = "transform .4s var(--ease-out)";
      el.style.transform = "perspective(600px) rotateY(0) rotateX(0) translateZ(0)";
    }
  }

  /* ── Custom cursor ───────────────────────────────────────── */
  function initCursor() {
    if (!fineHover) return;

    // Create elements
    const dot  = document.createElement("div");
    const ring = document.createElement("div");
    dot.className  = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    let firstMove = false;
    let animId;

    window.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";

      if (!firstMove) {
        firstMove = true;
        rx = mx; ry = my;
        ring.style.left = rx + "px";
        ring.style.top  = ry + "px";
        dot.classList.add("is-ready");
        ring.classList.add("is-ready");
      }
    });

    // Smooth ring lerp
    function lerp(a, b, t) { return a + (b - a) * t; }
    function tick() {
      rx = lerp(rx, mx, 0.14);
      ry = lerp(ry, my, 0.14);
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      animId = requestAnimationFrame(tick);
    }
    animId = requestAnimationFrame(tick);

    // Hover enlarge
    const HOVERABLE = "a, button, [data-tilt], .servicio-card, .audiencia-card, .btn";
    document.addEventListener("mouseover", e => {
      const t = e.target.closest(HOVERABLE);
      if (t && t.contains(e.relatedTarget ? e.relatedTarget : null) === false) {
        dot.classList.add("is-hovered");
        ring.classList.add("is-hovered");
      }
    });
    document.addEventListener("mouseout", e => {
      const t = e.target.closest(HOVERABLE);
      if (t) {
        dot.classList.remove("is-hovered");
        ring.classList.remove("is-hovered");
      }
    });
  }

  /* ── GSAP ScrollTrigger — hero parallax ─────────────────── */
  function initHeroParallax() {
    if (!window.gsap || !window.ScrollTrigger) return;
    const img = $(".hero-img");
    if (!img) return;
    gsap.to(img, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  /* ── Image fallback if not loaded ───────────────────────── */
  function initImgFallbacks() {
    $$("img[src]").forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        img.addEventListener("error", () => {
          img.style.display = "none";
          const wrap = img.closest(".hero-img-wrap, .sobre-mi-img-frame, .equipo-photo, .equipo-surgery-img, .escuela-logo-wrap");
          if (wrap) {
            wrap.style.background = "rgba(10,37,64,.6)";
            wrap.style.minHeight  = "200px";
          }
        });
      }
    });
  }

  /* ── Boot ────────────────────────────────────────────────── */
  function boot() {
    safe(initSplash,       "initSplash");
    safe(initNav,          "initNav");
    safe(initReveals,      "initReveals");
    safe(initCountUp,      "initCountUp");
    safe(initTilt,         "initTilt");
    safe(initCursor,       "initCursor");
    safe(initImgFallbacks, "initImgFallbacks");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initHeroParallax, "initHeroParallax");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
