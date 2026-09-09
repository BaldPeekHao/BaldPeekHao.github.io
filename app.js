(() => {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // ---------- Config binding ----------
  $$('[data-config]').forEach((el) => {
    const key = el.dataset.config;
    if (cfg[key]) el.textContent = cfg[key];
  });
  $$('.github-link').forEach((el) => {
    if (cfg.github) el.href = cfg.github;
  });
  $$('[data-config-link]').forEach((el) => {
    const key = el.dataset.configLink;
    const value = cfg[key];
    if (!value) return;
    el.classList.remove('hidden-by-config');
    el.href = key === 'email' ? `mailto:${value}` : value;
  });
  $$('[data-current-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  // ---------- Cursor spotlight + page progress ----------
  const glow = $('.cursor-glow');
  let mouseX = innerWidth / 2, mouseY = innerHeight / 2, glowX = mouseX, glowY = mouseY;
  window.addEventListener('pointermove', (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
  const animateGlow = () => {
    glowX += (mouseX - glowX) * .12;
    glowY += (mouseY - glowY) * .12;
    if (glow) glow.style.transform = `translate(${glowX - 240}px,${glowY - 240}px)`;
    requestAnimationFrame(animateGlow);
  };
  if (matchMedia('(pointer:fine)').matches) animateGlow();

  const progress = $('.scroll-progress span');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ---------- Scroll reveals ----------
  const revealTargets = $$('.case-block,.tech-row,.architecture,.demo-stage,.scope-matrix,.security-callout,.principles article');
  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .65s ease, transform .65s ease';
  });
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12 });
  revealTargets.forEach((el) => revealObserver.observe(el));

  // ---------- Project rail + accent-aware cursor ----------
  const railMap = {
    milly: $('[data-rail="milly"]'),
    aladin: $('[data-rail="aladin"]'),
    southern: $('[data-rail="southern"]')
  };
  const accentColors = {
    milly: 'rgba(140,124,246,.09)',
    aladin: 'rgba(255,122,34,.08)',
    southern: 'rgba(217,45,32,.08)'
  };
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const key = entry.target.id;
      Object.values(railMap).forEach((a) => a && a.classList.remove('is-active'));
      railMap[key]?.classList.add('is-active');
      if (glow && accentColors[key]) {
        glow.style.background = `radial-gradient(circle,${accentColors[key]},transparent 68%)`;
      }
    });
  }, { threshold: .35 });
  $$('.project[id]').forEach((s) => projectObserver.observe(s));

  // ---------- Magnetic CTA ----------
  $$('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .08;
      const y = (e.clientY - r.top - r.height / 2) * .12;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });

  // ---------- Jump nodes ----------
  $$('[data-scroll-to]').forEach((btn) => btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
  }));

  // ---------- Toast ----------
  let toastTimer;
  const toast = (message) => {
    const el = $('.toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2100);
  };

  // ---------- AI Milly simulation ----------
  const screens = $$('[data-milly-screen]');
  const showMilly = (name) => screens.forEach((screen) => screen.classList.toggle('is-active', screen.dataset.millyScreen === name));
  $$('[data-milly-next]').forEach((btn) => btn.addEventListener('click', () => showMilly(btn.dataset.millyNext)));

  let selectedLanguage = '';
  let selectedPatientPhrase = '';
  const clinicianTranslations = {
    Mandarin: '疼痛是什么时候开始的？',
    Cantonese: '幾時開始痛㗎？',
    Spanish: '¿Cuándo comenzó el dolor?',
    Hindi: 'दर्द कब शुरू हुआ?'
  };
  const recordButton = $('[data-milly-record]');
  $$('[data-lang]').forEach((btn) => btn.addEventListener('click', () => {
    $$('[data-lang]').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    selectedLanguage = btn.dataset.lang;
    selectedPatientPhrase = btn.dataset.phrase;
    recordButton.disabled = false;
  }));
  recordButton?.addEventListener('click', () => {
    recordButton.disabled = true;
    toast('Simulating realtime speech → translation → voice output…');
    setTimeout(() => {
      $('[data-milly-lang]').textContent = selectedLanguage;
      $('[data-patient-original]').textContent = selectedPatientPhrase;
      $('[data-clinician-translation]').textContent = clinicianTranslations[selectedLanguage] || '';
      showMilly('live');
      recordButton.disabled = false;
    }, 900);
  });

  // ---------- Aladin role switching ----------
  $$('[data-role]').forEach((btn) => btn.addEventListener('click', () => {
    $$('[data-role]').forEach((b) => b.classList.toggle('is-active', b === btn));
    $$('[data-role-view]').forEach((view) => view.classList.toggle('is-active', view.dataset.roleView === btn.dataset.role));
  }));

  let cartCount = 0;
  $$('[data-add-cart]').forEach((btn) => btn.addEventListener('click', () => {
    cartCount += 1;
    $('[data-cart-count]').textContent = cartCount;
    const old = btn.textContent;
    btn.textContent = 'Added ✓';
    toast(`Cart updated · ${cartCount} item${cartCount === 1 ? '' : 's'}`);
    setTimeout(() => (btn.textContent = old), 900);
  }));

  $$('[data-delivery]').forEach((btn) => btn.addEventListener('click', () => {
    btn.classList.toggle('done');
    btn.textContent = btn.classList.contains('done') ? 'Delivered ✓' : 'Mark delivered';
  }));

  // ---------- Restaurant tabs + richer booking + menu filtering ----------
  $$('.rest-tab').forEach((btn) => btn.addEventListener('click', () => {
    $$('.rest-tab').forEach((b) => b.classList.toggle('is-active', b === btn));
    $$('[data-rest-view]').forEach((view) => view.classList.toggle('is-active', view.dataset.restView === btn.dataset.restTab));
  }));

  const booking = {
    step: 1,
    table: 'Bàn thường',
    date: 'Tối nay',
    time: '19:30',
    guests: 4,
    occasion: 'Bữa tối gia đình'
  };

  const updateBookingUI = () => {
    $$('[data-booking-step]').forEach((panel) => panel.classList.toggle('is-active', Number(panel.dataset.bookingStep) === booking.step));
    $$('[data-step-dot]').forEach((dot) => {
      const n = Number(dot.dataset.stepDot);
      dot.classList.toggle('is-active', n === booking.step);
      dot.classList.toggle('is-complete', n < booking.step);
    });
    const back = $('[data-booking-back]');
    const next = $('[data-booking-next]');
    if (back) back.disabled = booking.step === 1;
    if (next) {
      next.style.display = booking.step === 4 ? 'none' : '';
      next.textContent = booking.step === 3 ? 'Xem lại →' : 'Tiếp tục →';
    }
    $('[data-booking-selection]').textContent = `${booking.table} · ${booking.date} · ${booking.time} · ${booking.guests} khách`;
    $('[data-summary-table]').textContent = booking.table;
    $('[data-summary-time]').textContent = `${booking.date} · ${booking.time}`;
    $('[data-summary-guests]').textContent = `${booking.guests} khách`;
    $('[data-summary-occasion]').textContent = booking.occasion;
  };

  $$('[data-table-type]').forEach((btn) => btn.addEventListener('click', () => {
    $$('[data-table-type]').forEach((b) => b.classList.toggle('is-active', b === btn));
    booking.table = btn.dataset.tableType === 'vip' ? 'Phòng VIP' : 'Bàn thường';
    updateBookingUI();
  }));

  $$('[data-booking-date]').forEach((btn) => btn.addEventListener('click', () => {
    $$('[data-booking-date]').forEach((b) => b.classList.toggle('is-active', b === btn));
    booking.date = btn.dataset.bookingDate;
    updateBookingUI();
  }));

  $$('[data-booking-time]').forEach((btn) => btn.addEventListener('click', () => {
    $$('[data-booking-time]').forEach((b) => b.classList.toggle('is-active', b === btn));
    booking.time = btn.dataset.bookingTime;
    updateBookingUI();
  }));

  $$('[data-booking-occasion]').forEach((btn) => btn.addEventListener('click', () => {
    $$('[data-booking-occasion]').forEach((b) => b.classList.toggle('is-active', b === btn));
    booking.occasion = btn.dataset.bookingOccasion;
    updateBookingUI();
  }));

  $('[data-guest-minus]')?.addEventListener('click', () => {
    booking.guests = Math.max(1, booking.guests - 1);
    $('[data-guest-count]').textContent = booking.guests;
    updateBookingUI();
  });
  $('[data-guest-plus]')?.addEventListener('click', () => {
    booking.guests = Math.min(20, booking.guests + 1);
    $('[data-guest-count]').textContent = booking.guests;
    updateBookingUI();
  });

  $('[data-booking-next]')?.addEventListener('click', () => {
    booking.step = Math.min(4, booking.step + 1);
    updateBookingUI();
  });
  $('[data-booking-back]')?.addEventListener('click', () => {
    booking.step = Math.max(1, booking.step - 1);
    updateBookingUI();
  });
  $('[data-booking-confirm]')?.addEventListener('click', () => {
    toast(`Reservation demo confirmed · ${booking.table} · ${booking.guests} guests`);
    const btn = $('[data-booking-confirm]');
    const old = btn.innerHTML;
    btn.innerHTML = 'Đã ghi nhận yêu cầu ✓';
    setTimeout(() => (btn.innerHTML = old), 1500);
  });
  updateBookingUI();

  const menuCards = $$('[data-menu-cat]');
  const menuCount = $('[data-menu-count]');
  $$('[data-menu-filter]').forEach((btn) => btn.addEventListener('click', () => {
    $$('[data-menu-filter]').forEach((b) => b.classList.toggle('is-active', b === btn));
    const filter = btn.dataset.menuFilter;
    let visible = 0;
    menuCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.menuCat === filter;
      card.classList.toggle('is-filtered-out', !show);
      if (show) visible += 1;
    });
    if (menuCount) menuCount.textContent = `${String(visible).padStart(2, '0')} món đang hiển thị`;
  }));
  menuCards.forEach((card) => card.addEventListener('click', () => {
    const dish = $('b', card)?.textContent || 'Menu item';
    toast(`${dish} · interactive menu preview`);
  }));

  // ---------- Lightweight parallax for project headers ----------
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const titles = $$('.project-title-wrap h2');
    const parallax = () => {
      titles.forEach((title) => {
        const r = title.getBoundingClientRect();
        const offset = Math.max(-15, Math.min(15, (innerHeight / 2 - r.top) * .015));
        title.style.transform = `translateX(${offset}px)`;
      });
    };
    addEventListener('scroll', parallax, { passive: true });
    parallax();
  }
})();
