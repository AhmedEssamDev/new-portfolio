/**
 * MAIN.JS: THE MAMLUK CODEX INTERACTIVE CORE ENGINE
 * Orchestrates:
 * 1. Custom Pen Nib Cursor & Hardware-Accelerated Golden Dust Canvas Trail.
 * 2. 5-Second Archway Double Gate Splash Entrance.
 * 3. Heavy Page-Turn Manuscript Folding transitions between snap-scrolling sections.
 * 4. Zero-Reload Translation Swap with Cairo/Amiri dynamic font metrics.
 * 5. Glass Lantern Theme Switcher (Obsidian Vault <=> Alabaster Court).
 * 6. Interactive old map project overlays populating item specifics.
 * 7. Long scroll testimonial sliding track transitions.
 */

/* -----------------------------------------------------------------------
   SAFE STORAGE HELPERS (Prevents crash on file:// protocol)
   ----------------------------------------------------------------------- */
function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Silent ignore if localstorage fails
  }
}

/* -----------------------------------------------------------------------
   PROJECT MAP OVERLAY DATA DICTIONARY
   ----------------------------------------------------------------------- */
const projectDetails = {
  todo: {
    en: `
      <h2 style="font-family: var(--font-header); color: var(--accent-gold); font-size: 2.2rem; margin-bottom: 20px;">Todo App: The Productivity Codex</h2>
      <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 20px; color: var(--text-primary);">An advanced personal productivity sanctuary. Engineered using clean, reactive architectural paradigms that store schedules and tasks securely on localized device storage.</p>
      <h4 style="color: var(--accent-gold); margin-bottom: 10px;">Technical Conquests:</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 30px;">
        <li>Implemented secure offline SQLite caching engine.</li>
        <li>Created beautiful hand-drawn pixel custom canvas graphics.</li>
        <li>Decoupled business logical layers utilizing BLoC pattern structures.</li>
      </ul>
      <a href="https://github.com/AhmedEssamDev/Todo-app" target="_blank" rel="noopener noreferrer" class="royal-seal-btn" style="display: inline-block;">Forge Repository Link</a>
    `,
    ar: `
      <h2 style="font-family: var(--font-header); color: var(--accent-gold); font-size: 2.2rem; margin-bottom: 20px;">تطبيق المهام: مدونة الإنتاجية</h2>
      <p style="font-size: 1.25rem; line-height: 1.8; margin-bottom: 20px; color: var(--text-primary);">مساحة برمجية متطورة لتنظيم وتتبع المهام اليومية والخطط المستقبلية بدقة فائقة. يعتمد كلياً على التخزين المحلي التفاعلي الآمن والمستقر.</p>
      <h4 style="color: var(--accent-gold); margin-bottom: 10px;">الفتوحات والتقنيات المستخدمة:</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); line-height: 1.9; margin-bottom: 30px;">
        <li>بناء نظام تخزين محلي تفاعلي فائق السرعة والأمان.</li>
        <li>تصميم رسوم حركية تفاعلية جذابة تحسن من تجربة المستخدم اليومية.</li>
        <li>فصل كامل لمنطق الأعمال عن طبقة العرض باستخدام بنية BLoC المعمارية.</li>
      </ul>
      <a href="https://github.com/AhmedEssamDev/Todo-app" target="_blank" rel="noopener noreferrer" class="royal-seal-btn" style="display: inline-block;">زيارة مستودع الكود</a>
    `
  },
  news: {
    en: `
      <h2 style="font-family: var(--font-header); color: var(--accent-gold); font-size: 2.2rem; margin-bottom: 20px;">News App: The Chronicle Aggregator</h2>
      <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 20px; color: var(--text-primary);">A real-time worldwide news feed aggregator. Consumes remote REST APIs dynamically to present global affairs, categorized across specialized panels.</p>
      <h4 style="color: var(--accent-gold); margin-bottom: 10px;">Technical Conquests:</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 30px;">
        <li>Designed robust JSON parsing and dynamic model mapping algorithms.</li>
        <li>Engineered localized offline database queries for unbroken reading.</li>
        <li>Implemented adaptive grid layouts supporting all compact and tablet screens.</li>
      </ul>
      <a href="https://github.com/AhmedEssamDev/news-app" target="_blank" rel="noopener noreferrer" class="royal-seal-btn" style="display: inline-block;">Forge Repository Link</a>
    `,
    ar: `
      <h2 style="font-family: var(--font-header); color: var(--accent-gold); font-size: 2.2rem; margin-bottom: 20px;">التطبيق الإخباري: السجل العالمي الفوري</h2>
      <p style="font-size: 1.25rem; line-height: 1.8; margin-bottom: 20px; color: var(--text-primary);">مجمع إخباري فوري للصحافة العالمية. يستقبل ويفهرس الأخبار المحلية والدولية من مختلف المصادر العالمية بدقة متناهية.</p>
      <h4 style="color: var(--accent-gold); margin-bottom: 10px;">الفتوحات والتقنيات المستخدمة:</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); line-height: 1.9; margin-bottom: 30px;">
        <li>كتابة خوارزميات معالجة وتحليل حزم JSON الواردة من الخوادم بمرونة.</li>
        <li>برمجة نظام الحفظ التلقائي غير المتزامن لقراءة المقالات دون اتصال بالإنترنت.</li>
        <li>تصميم شبكي تفاعلي متجاوب تماماً مع الشاشات اللوحية والمحمولة.</li>
      </ul>
      <a href="https://github.com/AhmedEssamDev/news-app" target="_blank" rel="noopener noreferrer" class="royal-seal-btn" style="display: inline-block;">زيارة مستودع الكود</a>
    `
  },
  ecommerce: {
    en: `
      <h2 style="font-family: var(--font-header); color: var(--accent-gold); font-size: 2.2rem; margin-bottom: 20px;">E-Commerce: The Grand Digital Bazaar</h2>
      <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 20px; color: var(--text-primary);">An enterprise marketplace application. Integrated with geolocalized routing systems, live marker tracking, and encrypted checkout APIs.</p>
      <h4 style="color: var(--accent-gold); margin-bottom: 10px;">Technical Conquests:</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 30px;">
        <li>Integrated secure Stripe, PayPal, and Google Maps API workflows.</li>
        <li>Structured dynamic cart storage using state-decoupled repositories.</li>
        <li>Optimized memory leaks and render frames for smooth infinite scrolling.</li>
      </ul>
      <a href="https://github.com/AhmedEssamDev/E-commerce-app" target="_blank" rel="noopener noreferrer" class="royal-seal-btn" style="display: inline-block;">Forge Repository Link</a>
    `,
    ar: `
      <h2 style="font-family: var(--font-header); color: var(--accent-gold); font-size: 2.2rem; margin-bottom: 20px;">تطبيق التسوق: البازار الرقمي الكبير</h2>
      <p style="font-size: 1.25rem; line-height: 1.8; margin-bottom: 20px; color: var(--text-primary);">منصة تسوق تجارية رائدة للشركات. تدمج بين خوارزميات تحديد المواقع الجغرافية الدقيقة وبوابات الدفع الإلكترونية المشفرة بالكامل.</p>
      <h4 style="color: var(--accent-gold); margin-bottom: 10px;">الفتوحات والتقنيات المستخدمة:</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); line-height: 1.9; margin-bottom: 30px;">
        <li>ربط بوابات الدفع Stripe و PayPal بسيرفرات خلفية للتحقق الآمن.</li>
        <li>بناء واجهة تفاعلية مرنة لإضافة المنتجات للحقيبة وحساب الضرائب فورياً.</li>
        <li>تحسين استهلاك ذاكرة الأجهزة المحمولة وضمان سلاسة التصفح اللانهائي.</li>
      </ul>
      <a href="https://github.com/AhmedEssamDev/E-commerce-app" target="_blank" rel="noopener noreferrer" class="royal-seal-btn" style="display: inline-block;">زيارة مستودع الكود</a>
    `
  },
  bookly: {
    en: `
      <h2 style="font-family: var(--font-header); color: var(--accent-gold); font-size: 2.2rem; margin-bottom: 20px;">Bookly: The Scribe Library Sanctuary</h2>
      <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 20px; color: var(--text-primary);">An immersive digital sanctuary designed to search, browse, and bookmark literature artifacts. Focuses on premium custom viewport physics.</p>
      <h4 style="color: var(--accent-gold); margin-bottom: 10px;">Technical Conquests:</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 30px;">
        <li>Engineered elegant custom viewports and physical page transitions.</li>
        <li>Configured scalable Clean Architecture structures utilizing Git.</li>
        <li>Designed micro-animations that respond organically to swipe speeds.</li>
      </ul>
      <a href="https://github.com/AhmedEssamDev/bookly" target="_blank" rel="noopener noreferrer" class="royal-seal-btn" style="display: inline-block;">Forge Repository Link</a>
    `,
    ar: `
      <h2 style="font-family: var(--font-header); color: var(--accent-gold); font-size: 2.2rem; margin-bottom: 20px;">تطبيق بوكلي: مكتبة المخطوطات الفاخرة</h2>
      <p style="font-size: 1.25rem; line-height: 1.8; margin-bottom: 20px; color: var(--text-primary);">مساحة استكشاف معرفية تتيح تصفح، وقراءة وحفظ الكتب والمخطوطات الإلكترونية بانتقالات فيزيائية تحاكي صفحات الكتب الواقعية.</p>
      <h4 style="color: var(--accent-gold); margin-bottom: 10px;">الفتوحات والتقنيات المستخدمة:</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); line-height: 1.9; margin-bottom: 30px;">
        <li>برمجة وتطوير انتقالات فيزيائية تفاعلية تحاكي طي صفحات الكتب الحقيقية.</li>
        <li>اتباع معايير Clean Architecture الصارمة لضمان مرونة وجودة الكود.</li>
        <li>صياغة مؤثرات حركية فائقة الاستجابة لسرعة سحب وتصفح الواجهات.</li>
      </ul>
      <a href="https://github.com/AhmedEssamDev/bookly" target="_blank" rel="noopener noreferrer" class="royal-seal-btn" style="display: inline-block;">زيارة مستودع الكود</a>
    `
  }
};

/* -----------------------------------------------------------------------
   MAIN APPLICATION BOOT
   ----------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. CORE DOM REFERENCES
  // --------------------------------------------------------------------------
  const body = document.body;
  const html = document.documentElement;
  const splashContainer = document.getElementById("splash-screen");
  const splashTitle = document.getElementById("splash-title");
  const langToggleBtn = document.getElementById("lang-toggle");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const pageTurnOverlay = document.getElementById("page-turn-overlay");
  const testimonialTrack = document.getElementById("testimonial-track");
  const sliderDots = document.querySelectorAll(".slider-dot-btn");

  let currentLang = safeGetItem("portfolio_lang") || "en";
  let currentTheme = safeGetItem("portfolio_theme") || "dark"; // Default to Obsidian Sultanate
  let slideIndex = 0;
  let slideInterval = null;

  // Global overlay handlers (make them available to HTML clicks)
  window.openProjectOverlay = function(projKey) {
    const overlay = document.getElementById("project-details-overlay");
    const container = document.getElementById("overlay-dynamic-content");
    if (!overlay || !container || !projectDetails[projKey]) return;

    container.innerHTML = projectDetails[projKey][currentLang];
    overlay.classList.add("active");
    body.style.overflow = "hidden"; // Prevent scrolling when overlay open
  };

  window.closeProjectOverlay = function() {
    const overlay = document.getElementById("project-details-overlay");
    if (overlay) {
      overlay.classList.remove("active");
    }
    body.style.overflow = ""; // Restore snap scroll
  };

  // --------------------------------------------------------------------------
  // 2. THEME CONFIGURATION
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    }
    safeSetItem("portfolio_theme", theme);
    currentTheme = theme;
  }

  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const targetTheme = body.classList.contains("dark-theme") ? "light" : "dark";
      applyTheme(targetTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 3. ZERO-RELOAD TRANSLATION MECHANICS
  // --------------------------------------------------------------------------
  function translatePage(lang) {
    currentLang = lang;
    safeSetItem("portfolio_lang", lang);

    if (lang === "ar") {
      body.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      if (langToggleBtn) langToggleBtn.textContent = "EN";
    } else {
      body.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      if (langToggleBtn) langToggleBtn.textContent = "ع";
    }

    // Translate marked UI elements
    const transElements = document.querySelectorAll("[data-trans]");
    transElements.forEach(element => {
      const key = element.getAttribute("data-trans");
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Update splash title
    if (splashTitle && translations[lang]["splash-text"]) {
      splashTitle.textContent = translations[lang]["splash-text"];
    }

    // Refresh slides layout
    goToSlide(slideIndex);
  }

  translatePage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const targetLang = currentLang === "en" ? "ar" : "en";
      translatePage(targetLang);
    });
  }

  // --------------------------------------------------------------------------
  // 4. HARDWARE-ACCELERATED COMPASS DUST CANVAS TRAIL & nib TRACKER
  // --------------------------------------------------------------------------
  const canvas = document.getElementById("cursor-canvas");
  const nib = document.getElementById("custom-cursor-nib");
  let ctx = null;
  let particles = [];
  let mouse = { x: -100, y: -100 };

  if (canvas) {
    ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class DustParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.5; // Slight floating upward motion
        this.alpha = 1;
        this.fade = Math.random() * 0.015 + 0.008;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.fade;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "#C5A059"; // Golden dust color
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#C5A059";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw trails
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Track metal pen nib coordinate
      if (nib) {
        nib.style.left = mouse.x + "px";
        nib.style.top = mouse.y + "px";
      }

      // Add golden dust particles on movement
      if (Math.random() < 0.35) {
        particles.push(new DustParticle(mouse.x, mouse.y));
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. CINEMATIC DOUBLE GATE LOADING TIMERS
  // --------------------------------------------------------------------------
  body.style.overflow = "hidden"; // Keep snap scrolling frozen initially

  // Animate text reveal slightly on load
  setTimeout(() => {
    if (splashTitle) splashTitle.classList.add("reveal");
  }, 300);

  // Trigger wing door swing open (At 4.0s)
  setTimeout(() => {
    if (splashContainer) {
      splashContainer.classList.add("gate-open");
    }
  }, 4000);

  // Fully remove splash screen layout flow, reveal HERO section elements (At 5.0s)
  setTimeout(() => {
    if (splashContainer) {
      splashContainer.style.display = "none";
    }
    body.style.overflow = ""; // Restore snap scroll
    triggerHeroReveals();
  }, 5000);

  // --------------------------------------------------------------------------
  // 6. SCROLL snapped MANUSCRIPT PAGE TURNS & INTERSECTIONS
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal-fade-up, .reveal-fade-in, .reveal-slide-left, .reveal-slide-right");
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  function triggerHeroReveals() {
    document.querySelectorAll("#home .reveal-slide-left, #home .reveal-slide-right").forEach(el => {
      el.classList.add("visible");
    });
  }

  // Manuscript page turn cover animation trigger
  let lastSection = "";
  const pageSections = document.querySelectorAll("section");

  const pageTurnObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nextSecId = entry.target.getAttribute("id");
        if (lastSection !== "" && lastSection !== nextSecId) {
          // Trigger the skew paper turn curtain
          if (pageTurnOverlay) {
            pageTurnOverlay.classList.remove("page-turn-active");
            // Force redraw layout
            void pageTurnOverlay.offsetWidth;
            pageTurnOverlay.classList.add("page-turn-active");
          }
        }
        lastSection = nextSecId;
      }
    });
  }, {
    threshold: 0.5
  });

  pageSections.forEach(sec => pageTurnObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 7. ACTIVE NAVIGATION LINKS HIGHLIGHTS
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    let activeSecId = "";

    pageSections.forEach(sec => {
      const topOffset = sec.offsetTop - 120;
      if (scrollTop >= topOffset && scrollTop < topOffset + sec.offsetHeight) {
        activeSecId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeSecId}`);
    });
  });

  // --------------------------------------------------------------------------
  // 8. MOBILE HAMBURGER DRAWER MENU
  // --------------------------------------------------------------------------
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.className = navMenu.classList.contains("active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });

    // Close menu when navigation anchors clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        const icon = hamburger.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });

    // Close menu clicking on body
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("active");
        const icon = hamburger.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. FEEDBACK LONG SCROLL CAROUSEL MECHANICS
  // --------------------------------------------------------------------------
  function goToSlide(index) {
    if (!testimonialTrack) return;
    const cards = document.querySelectorAll(".testimonial-parchment");
    if (cards.length === 0) return;

    if (index >= cards.length) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = cards.length - 1;
    } else {
      slideIndex = index;
    }

    const isRtl = body.getAttribute("dir") === "rtl";
    testimonialTrack.style.transform = `translateX(${slideIndex * (isRtl ? 1 : -1) * 100}%)`;

    sliderDots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === slideIndex);
    });
  }

  function startAutoRotation() {
    stopAutoRotation();
    slideInterval = setInterval(() => {
      goToSlide(slideIndex + 1);
    }, 7000);
  }

  function stopAutoRotation() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  sliderDots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToSlide(idx);
      startAutoRotation(); // Reset autoplay timer
    });
  });

  startAutoRotation();
});
