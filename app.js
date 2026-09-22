/* =========================================================================
   CONFIG — edit these to plug in real assets. Every image gracefully falls
   back to a glowing placeholder if the file is missing.
   ========================================================================= */
const ASSETS = {
  bossPhoto: './Aayan Al Hasib.png',
};

// Edit this array to reorder or update the Memories & Hall of Fame story
// reel. Each slide gracefully falls back to a stylized gold/dark card with
// the title + caption if its image fails to load.
const MEMORY_GALLERY = [
  {
    id: 1,
    src: './Birthday.png',
    title: 'Happy Birthday, Boss!',
    caption: 'Celebrating the visionary leader of GrowMinion',
  },
  {
    id: 2,
    src: './Thank you message.png',
    title: 'Thank You, Bigger Brother',
    caption: 'Not just a boss, the pillar behind all our wins',
  },
  {
    id: 3,
    src: './memories 5.jpeg',
    title: 'On Stage Together',
    caption: 'Team representing GrowMinion at the big event',
  },
  {
    id: 4,
    src: './memories 1.jpeg',
    title: 'Tea Garden Getaway',
    caption: 'A perfect team selfie amidst the greenery',
  },
  {
    id: 5,
    src: './memories 2.jpeg',
    title: 'Road Trip Moments',
    caption: 'Group selfie on the way to more memories',
  },
  {
    id: 6,
    src: './memories 3.jpeg',
    title: "GrowMinion's First Get-Together",
    caption: 'The whole squad, matching caps and big energy',
  },
  {
    id: 7,
    src: './memories 4.jpeg',
    title: 'Team Dinner Diaries',
    caption: 'Wrapping up the day with good food and better company',
  },
];

const GIFTS = [
  {
    icon: '🏖️',
    title: 'The Golden Pass',
    image: './The Golden Pass.png',
    desc: 'One No-Meetings Afternoon + a fully-paid Vacation Pass, redeemable whenever you like, Boss.',
  },
  {
    icon: '🍽️',
    title: 'Grand Team Treat',
    image: './Grand Team Treat.png',
    desc: 'A special surprise feast voucher for the whole team, on the house, in your honor.',
  },
  {
    icon: '🏆',
    title: 'Boss Appreciation Trophy',
    image: './Boss Appreciation trophy.png',
    desc: 'A custom certificate: "Most Inspiring Leader" — signed by every single one of us.',
  },
];

// Edit this array to add/update team testimonials. `photo` is optional —
// leave it blank ('') to show a glowing initials avatar instead.
const TEAM_MESSAGES = [
  {
    name: 'Abdul Kaiyum Sani',
    role: 'Lead Web Developer',
    photo: './Team Member/Sani.png',
    initials: 'AKS',
    lang: 'bn',
    spotlight: true,
    message: 'ভাই, আমার ক্যারিয়ারে আপনার অবদান অপরিসীম। আমি নিজেই উপলব্ধি করতে পারি আমি অতীতে কী ছিলাম আর আজ কোথায় এসে দাঁড়িয়েছি। আমার আত্মবিশ্বাস বাড়িয়ে দেওয়ার জন্য আপনার প্রতি আমি আজীবন কৃতজ্ঞ থাকব। সবসময় বড় ভাইয়ের মতো পাশে থেকেছেন, যেকোনো বিপদ-আপদে আপনাকে কাছে পেয়েছি। আপনার জন্য মন থেকে অনেক অনেক দোয়া রইল ভাই—আল্লাহ আপনাকে কবুল করুন। ইনশাআল্লাহ, আমাদের এই কোম্পানিকে আমরা একসাথে অনেক বড় করব। সবসময় আপনার সাথে আছি ভাই!',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Growth Strategist',
    photo: '',
    message: 'Boss Ayan never just gives orders — he teaches the "why" behind every decision. That\'s why the whole team thinks like owners now.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Content Lead',
    photo: '',
    message: 'Whenever I\'m stuck, he makes time — no matter how busy he is. That kind of patience is rare in a leader.',
  },
  {
    name: 'Rafiul Islam',
    role: 'Performance Marketer',
    photo: '',
    message: 'He pushed me to take on projects I thought were way above my level, and backed me the whole way. I grew more in a year than I expected in three.',
  },
  {
    name: 'Sadia Karim',
    role: 'Client Success',
    photo: '',
    message: 'Boss Ayan celebrates our wins louder than his own. That energy is contagious — it\'s why this team never stops trying.',
  },
  {
    name: 'Mehedi Hasan',
    role: 'Design Lead',
    photo: '',
    message: 'His vision for GrowMinion isn\'t just business — it\'s personal for him, and that passion is what makes us all show up and give our best.',
  },
  {
    name: 'Farhana Akter',
    role: 'Operations',
    photo: '',
    message: 'Calm under pressure, honest in feedback, and always fair. Boss Ayan sets the standard for what a great leader looks like.',
  },
];

const BIRTHDAY_MONTH = 8; // September (0-indexed)
const BIRTHDAY_DAY = 24;

/* =========================================================================
   UTILITIES
   ========================================================================= */
function nextBirthdayDate() {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
  if (now > target) {
    const endOfDay = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 23, 59, 59);
    if (now > endOfDay) {
      target = new Date(year + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
    }
  }
  return target;
}

function isBirthdayToday() {
  const now = new Date();
  return now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
}

function loadImageWithFallback(imgEl, fallbackEl, src) {
  if (!src) {
    imgEl.hidden = true;
    fallbackEl.hidden = false;
    return;
  }
  const testImg = new Image();
  testImg.onload = () => {
    imgEl.src = src;
    imgEl.hidden = false;
    fallbackEl.hidden = true;
  };
  testImg.onerror = () => {
    imgEl.hidden = true;
    fallbackEl.hidden = false;
  };
  testImg.src = src;
}

/* =========================================================================
   WEB AUDIO — synth engine (no external audio files)
   ========================================================================= */
const AudioEngine = (() => {
  let ctx = null;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, startTime, duration, opts = {}) {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(opts.vol || 0.25, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(gain).connect(ac.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  function chime(freq, delay = 0, dur = 0.5, vol = 0.2) {
    const ac = getCtx();
    tone(freq, ac.currentTime + delay, dur, { type: 'triangle', vol });
  }

  function eightBit(freq, delay = 0, dur = 0.12, vol = 0.18) {
    const ac = getCtx();
    tone(freq, ac.currentTime + delay, dur, { type: 'square', vol });
  }

  function whoosh() {
    const ac = getCtx();
    const bufferSize = ac.sampleRate * 0.7;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ac.createBufferSource();
    noise.buffer = buffer;
    const filter = ac.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, ac.currentTime);
    filter.frequency.exponentialRampToValueAtTime(120, ac.currentTime + 0.65);
    filter.Q.value = 0.8;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.5, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.7);
    noise.connect(filter).connect(gain).connect(ac.destination);
    noise.start();
  }

  // "Happy Birthday" melody — simple note sequence (Hz), rough rhythmic delays.
  const HBD_MELODY = [
    { n: 261.63, d: 0 }, { n: 261.63, d: 0.35 }, { n: 293.66, d: 0.7 },
    { n: 261.63, d: 1.05 }, { n: 349.23, d: 1.4 }, { n: 329.63, d: 1.9 },
    { n: 261.63, d: 2.6 }, { n: 261.63, d: 2.95 }, { n: 293.66, d: 3.3 },
    { n: 261.63, d: 3.65 }, { n: 392.0, d: 4.0 }, { n: 349.23, d: 4.5 },
    { n: 261.63, d: 5.2 }, { n: 261.63, d: 5.55 }, { n: 523.25, d: 5.9 },
    { n: 440.0, d: 6.25 }, { n: 349.23, d: 6.6 }, { n: 329.63, d: 6.95 },
    { n: 293.66, d: 7.3 }, { n: 466.16, d: 8.0 }, { n: 466.16, d: 8.35 },
    { n: 440.0, d: 8.7 }, { n: 349.23, d: 9.05 }, { n: 392.0, d: 9.4 },
    { n: 349.23, d: 9.75 },
  ];

  let musicPlaying = false;
  let musicLoopHandle = null;
  function scheduleMelodyOnce() {
    const ac = getCtx();
    HBD_MELODY.forEach(note => {
      const t = ac.currentTime + note.d;
      tone(note.n, t, 0.5, { type: 'triangle', vol: 0.16 });
    });
  }
  function toggleMusic() {
    if (musicPlaying) {
      musicPlaying = false;
      clearTimeout(musicLoopHandle);
      return false;
    }
    musicPlaying = true;
    const loop = () => {
      if (!musicPlaying) return;
      scheduleMelodyOnce();
      musicLoopHandle = setTimeout(loop, 10500);
    };
    loop();
    return true;
  }

  return { chime, eightBit, whoosh, toggleMusic, getCtx };
})();

/* =========================================================================
   CANVAS BACKGROUND — floating embers / starlight, mouse reactive
   ========================================================================= */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h;
  let mouse = { x: -9999, y: -9999 };
  let particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const glow = document.getElementById('cursorGlow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  const COUNT = 90;
  function makeParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      baseX: 0,
      baseY: 0,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      flicker: Math.random() * 0.02 + 0.005,
      amber: Math.random() > 0.6,
    };
  }
  for (let i = 0; i < COUNT; i++) particles.push(makeParticle());

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const force = (140 - dist) / 140;
        p.x -= (dx / dist) * force * 1.4;
        p.y -= (dy / dist) * force * 1.4;
      }

      p.alpha += (Math.random() - 0.5) * p.flicker;
      p.alpha = Math.max(0.1, Math.min(0.9, p.alpha));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.amber
        ? `rgba(245,158,11,${p.alpha})`
        : `rgba(255,255,255,${p.alpha * 0.7})`;
      ctx.shadowBlur = p.amber ? 8 : 3;
      ctx.shadowColor = p.amber ? 'rgba(245,158,11,0.8)' : 'rgba(255,255,255,0.6)';
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

/* =========================================================================
   HERO — countdown
   ========================================================================= */
(function initCountdown() {
  const wrap = document.getElementById('countdownWrap');
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMinutes = document.getElementById('cdMinutes');
  const cdSeconds = document.getElementById('cdSeconds');
  const countdown = document.getElementById('countdown');
  const caption = document.getElementById('countdownCaption');

  function render() {
    if (isBirthdayToday()) {
      wrap.innerHTML = '<div class="celebration-banner">🎉 It\'s Boss Ayan\'s Birthday Today! 🎂✨</div>';
      return;
    }
    const target = nextBirthdayDate();
    const diff = target - new Date();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMinutes.textContent = String(minutes).padStart(2, '0');
    cdSeconds.textContent = String(seconds).padStart(2, '0');
    if (days <= 3) countdown.classList.add('celebrating');
  }
  render();
  setInterval(render, 1000);
})();

/* Music toggle */
document.getElementById('musicToggle').addEventListener('click', function () {
  const playing = AudioEngine.toggleMusic();
  this.classList.toggle('playing', playing);
  this.querySelector('.music-label').textContent = playing ? 'Stop Tune' : 'Play Tune';
});

/* =========================================================================
   CAKE & CANDLES
   ========================================================================= */
(function initCake() {
  const cake3d = document.getElementById('cake3d');
  const candlesWrap = document.getElementById('candles');
  const smokeLayer = document.getElementById('smokeLayer');
  const blowBtn = document.getElementById('blowBtn');
  const sliceBtn = document.getElementById('sliceBtn');
  const cheerPopup = document.getElementById('cheerPopup');
  const cheerClose = document.getElementById('cheerClose');

  const candles = [...candlesWrap.querySelectorAll('.candle')];
  candles.forEach(c => c.addEventListener('click', () => snuffCandle(c)));

  function spawnSmoke(x) {
    for (let i = 0; i < 4; i++) {
      const puff = document.createElement('div');
      puff.className = 'smoke-puff';
      puff.style.left = x + 'px';
      puff.style.setProperty('--dx', (Math.random() * 30 - 15) + 'px');
      puff.style.animationDelay = (i * 0.12) + 's';
      smokeLayer.appendChild(puff);
      setTimeout(() => puff.remove(), 2000);
    }
  }

  function snuffCandle(c) {
    if (c.classList.contains('out')) return;
    c.classList.add('out');
    const rect = c.getBoundingClientRect();
    const smokeRect = smokeLayer.getBoundingClientRect();
    spawnSmoke(rect.left - smokeRect.left + rect.width / 2);
  }

  function blowAll() {
    candles.forEach((c, i) => {
      setTimeout(() => snuffCandle(c), i * 150);
    });
    AudioEngine.whoosh();
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 70,
        angle: 60,
        origin: { x: 0.15, y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#fcd34d', '#fff'],
      });
      confetti({
        particleCount: 90,
        spread: 70,
        angle: 120,
        origin: { x: 0.85, y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#fcd34d', '#fff'],
      });
    }, 500);
    setTimeout(() => {
      sliceBtn.disabled = false;
      blowBtn.disabled = true;
    }, 700);
  }

  blowBtn.addEventListener('click', blowAll);

  sliceBtn.addEventListener('click', () => {
    if (cake3d.classList.contains('sliced')) return;
    cake3d.classList.add('sliced');
    sliceBtn.disabled = true;
    AudioEngine.chime(392.0, 0, 0.12, 0.15);
    AudioEngine.chime(349.23, 0.1, 0.18, 0.15);

    setTimeout(() => {
      cheerPopup.classList.add('show');
      confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 } });
      AudioEngine.chime(523.25, 0, 0.4);
      AudioEngine.chime(659.25, 0.15, 0.4);
      AudioEngine.chime(783.99, 0.3, 0.5);
    }, 700);
  });

  cheerClose.addEventListener('click', () => {
    cheerPopup.classList.remove('show');
    document.getElementById('gifts').scrollIntoView({ behavior: 'smooth' });
  });
})();

/* =========================================================================
   GIFTS
   ========================================================================= */
(function initGifts() {
  const grid = document.getElementById('giftGrid');
  GIFTS.forEach((gift) => {
    const box = document.createElement('div');
    box.className = 'gift-box';
    box.tabIndex = 0;
    box.setAttribute('role', 'button');
    box.setAttribute('aria-pressed', 'false');
    box.setAttribute('aria-label', `Unwrap ${gift.title}`);
    box.innerHTML = `
      <div class="gift-card-inner">
        <div class="gift-face gift-face-front">
          <div class="gift-lid"></div>
          <div class="gift-ribbon"></div>
          <div class="gift-icon">🎁</div>
          <div class="gift-title">${gift.title}</div>
          <div class="gift-hint">Tap to unwrap</div>
        </div>
        <div class="gift-face gift-face-back">
          <div class="gift-img-wrap">
            <img class="gift-img" alt="${gift.title}" hidden />
            <div class="gift-img-fallback">${gift.icon}</div>
          </div>
          <div class="gift-back-body">
            <div class="gift-back-title">${gift.title}</div>
            <div class="gift-desc">${gift.desc}</div>
          </div>
        </div>
      </div>
    `;

    const imgEl = box.querySelector('.gift-img');
    const imgFallback = box.querySelector('.gift-img-fallback');
    loadImageWithFallback(imgEl, imgFallback, gift.image);

    function open() {
      if (box.classList.contains('opened')) return;
      box.classList.add('opened');
      box.setAttribute('aria-pressed', 'true');
      spawnSparkles(box);
      AudioEngine.chime(880, 0, 0.3, 0.2);
      AudioEngine.chime(1108.73, 0.12, 0.4, 0.2);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#FBBF24', '#fff'],
      });
    }

    box.addEventListener('click', open);
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
    grid.appendChild(box);
  });

  function spawnSparkles(box) {
    for (let i = 0; i < 10; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = '50%';
      s.style.top = '30%';
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 60;
      s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
      s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
      box.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
  }
})();

/* =========================================================================
   HERO VIDEO — graceful autoplay fallback
   ========================================================================= */
(function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  video.muted = true;
  const playPromise = video.play();
  if (playPromise && playPromise.catch) {
    playPromise.catch(() => {});
  }
})();

/* =========================================================================
   MEMORIES — sequential story showcase / interactive memory reel
   ========================================================================= */
(function initMemoryReel() {
  const frame = document.getElementById('reelFrame');
  const thumbsWrap = document.getElementById('reelThumbs');
  const captionTitle = document.getElementById('reelCaptionTitle');
  const captionText = document.getElementById('reelCaptionText');
  const prevBtn = document.getElementById('reelPrev');
  const nextBtn = document.getElementById('reelNext');
  const autoplayBtn = document.getElementById('reelAutoplay');
  const progressFill = document.getElementById('reelProgressFill');
  const stage = document.getElementById('reelStage');
  if (!frame) return;

  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  const AUTOPLAY_MS = 3000;
  let current = 0;
  let autoplay = true;
  let timerStart = 0;
  let rafId = null;

  // Build slides (image + fallback card, both present for crossfade).
  const slideEls = MEMORY_GALLERY.map((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'reel-slide';
    slide.dataset.index = i;

    const img = document.createElement('img');
    img.className = 'reel-img';
    img.alt = item.title;
    img.loading = 'eager';

    const fallback = document.createElement('div');
    fallback.className = 'reel-fallback';
    fallback.innerHTML = `
      <span class="reel-fallback-icon">✦</span>
      <h4>${item.title}</h4>
      <p>${item.caption}</p>
    `;
    fallback.hidden = true;

    img.onerror = () => {
      console.error(`[MemoryReel] Failed to load image: ${item.src}`);
      img.hidden = true;
      fallback.hidden = false;
    };
    img.src = item.src;

    slide.appendChild(img);
    slide.appendChild(fallback);
    frame.appendChild(slide);
    return slide;
  });

  // Thumbnail / story dots.
  const thumbEls = MEMORY_GALLERY.map((item, i) => {
    const t = document.createElement('button');
    t.className = 'reel-thumb';
    t.setAttribute('aria-label', `Jump to: ${item.title}`);
    t.innerHTML = `<span class="reel-thumb-dot"></span><span class="reel-thumb-label">${item.title}</span>`;
    t.addEventListener('click', () => goTo(i, true));
    thumbsWrap.appendChild(t);
    return t;
  });

  function render() {
    slideEls.forEach((slide, i) => slide.classList.toggle('active', i === current));
    thumbEls.forEach((t, i) => t.classList.toggle('active', i === current));
    const item = MEMORY_GALLERY[current];
    captionTitle.textContent = item.title;
    captionText.textContent = item.caption;
  }

  function goTo(index, userInitiated) {
    current = (index + MEMORY_GALLERY.length) % MEMORY_GALLERY.length;
    render();
    resetTimer();
    if (userInitiated) AudioEngine.chime(587.33, 0, 0.15, 0.12);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  autoplayBtn.addEventListener('click', () => {
    autoplay = !autoplay;
    autoplayBtn.classList.toggle('paused', !autoplay);
    autoplayBtn.setAttribute('aria-pressed', String(autoplay));
    autoplayBtn.querySelector('.reel-autoplay-icon').textContent = autoplay ? '⏸' : '▶';
    autoplayBtn.querySelector('.reel-autoplay-label').textContent = autoplay ? 'Auto-play' : 'Paused';
    resetTimer();
  });

  function resetTimer() {
    timerStart = performance.now();
  }

  // Pause autoplay while user hovers/focuses the stage.
  let hovering = false;
  stage.addEventListener('mouseenter', () => { hovering = true; });
  stage.addEventListener('mouseleave', () => { hovering = false; resetTimer(); });

  function loop(ts) {
    if (autoplay && !hovering) {
      const elapsed = ts - timerStart;
      const pct = Math.min(100, (elapsed / AUTOPLAY_MS) * 100);
      progressFill.style.width = pct + '%';
      if (elapsed >= AUTOPLAY_MS) next();
    }
    rafId = requestAnimationFrame(loop);
  }
  rafId = requestAnimationFrame(loop);

  // Lightbox / zoom on active image click.
  frame.addEventListener('click', (e) => {
    if (e.target.closest('.reel-nav')) return;
    const item = MEMORY_GALLERY[current];
    modalImg.src = item.src;
    modalImg.alt = item.title;
    modalCaption.textContent = `${item.title} — ${item.caption}`;
    modal.classList.add('show');
  });
  modalClose.addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  // Swipe support for touch devices.
  let touchStartX = 0;
  frame.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  frame.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
  }, { passive: true });

  render();
  resetTimer();
})();

/* =========================================================================
   TEAM MESSAGES — testimonial cards with photo + graceful initials fallback
   ========================================================================= */
(function initTeamMessages() {
  const grid = document.getElementById('teamGrid');
  if (!grid) return;

  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  function initials(name) {
    return name
      .split(' ')
      .map(w => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  const defaultSpotlight = TEAM_MESSAGES.findIndex(m => m.spotlight);
  let spotlightIndex = defaultSpotlight >= 0 ? defaultSpotlight : 0;

  function openPhoto(member) {
    modalImg.src = member.photo;
    modalImg.alt = member.name;
    modalCaption.textContent = `${member.name} — ${member.role}`;
    modal.classList.add('show');
  }

  function makeCard(member, isSpotlight) {
    const card = document.createElement('div');
    card.className = 'team-card' + (isSpotlight ? ' team-card-spotlight' : '');
    const messageClass = 'team-message' + (member.lang === 'bn' ? ' bn-text' : '');
    card.innerHTML = `
      <div class="team-quote-mark">“</div>
      <div class="team-avatar-wrap">
        <img class="team-avatar-img" alt="${member.name}" hidden />
        <div class="team-avatar-fallback">${member.initials || initials(member.name)}</div>
      </div>
      <p class="${messageClass}">${member.message}</p>
      <div class="team-name">${member.name}</div>
      <div class="team-role">${member.role}</div>
    `;
    const avatarWrap = card.querySelector('.team-avatar-wrap');
    const imgEl = card.querySelector('.team-avatar-img');
    const fallbackEl = card.querySelector('.team-avatar-fallback');
    loadImageWithFallback(imgEl, fallbackEl, member.photo);

    if (member.photo) {
      avatarWrap.classList.add('team-avatar-clickable');
      avatarWrap.setAttribute('role', 'button');
      avatarWrap.setAttribute('tabindex', '0');
      avatarWrap.setAttribute('aria-label', `View ${member.name}'s photo`);
      const triggerPhoto = (e) => {
        e.stopPropagation();
        if (imgEl.hidden) return;
        openPhoto(member);
      };
      avatarWrap.addEventListener('click', triggerPhoto);
      avatarWrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerPhoto(e);
        }
      });
    }

    if (!isSpotlight) {
      card.classList.add('team-card-clickable');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Feature ${member.name}'s message`);
      const promote = () => {
        const idx = TEAM_MESSAGES.indexOf(member);
        if (idx === -1 || idx === spotlightIndex) return;
        spotlightIndex = idx;
        render();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      card.addEventListener('click', promote);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          promote();
        }
      });
    }

    return card;
  }

  function render() {
    grid.innerHTML = '';
    const spotlightMember = TEAM_MESSAGES[spotlightIndex];
    grid.appendChild(makeCard(spotlightMember, true));
    TEAM_MESSAGES.forEach((member, i) => {
      if (i === spotlightIndex) return;
      grid.appendChild(makeCard(member, false));
    });
  }

  render();

  modalClose.addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
})();

/* =========================================================================
   MARRIAGE CAMPAIGN — orbiting benefit cards + animated connector lines
   ========================================================================= */
(function initMarriageCampaign() {
  const stage = document.getElementById('campaignStage');
  if (!stage) return;
  const svg = document.getElementById('campaignLines');
  const cardsWrap = document.getElementById('benefitCards');
  const cards = [...cardsWrap.querySelectorAll('.benefit-card')];
  const MOBILE_BREAKPOINT = 820;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(SVG_NS, 'defs');
  defs.innerHTML = `
    <linearGradient id="campaignLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#FBBF24" stop-opacity="0.3" />
    </linearGradient>
  `;
  svg.appendChild(defs);

  function layout() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      cards.forEach(c => {
        c.style.left = '';
        c.style.top = '';
        c.style.removeProperty('--reveal-delay');
      });
      while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);
      return;
    }

    const rect = stage.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2 - 95;

    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);

    cards.forEach((card, i) => {
      const angle = ((Math.PI * 2) / cards.length) * i - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      card.style.left = x + 'px';
      card.style.top = y + 'px';
      card.style.setProperty('--reveal-delay', (i * 0.13) + 's');

      const length = Math.hypot(x - cx, y - cy);
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', cx);
      line.setAttribute('y1', cy);
      line.setAttribute('x2', x);
      line.setAttribute('y2', y);
      line.setAttribute('class', 'campaign-line');
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = stage.classList.contains('reveal') ? 0 : length;
      line.style.transitionDelay = (i * 0.13) + 's';
      svg.appendChild(line);
    });
  }

  layout();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 150);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stage.classList.add('reveal');
        svg.querySelectorAll('.campaign-line').forEach(line => {
          line.style.strokeDashoffset = 0;
        });
        observer.unobserve(stage);
      }
    });
  }, { threshold: 0.25 });
  observer.observe(stage);

  const marriageBtn = document.getElementById('marriageBtn');
  const popup = document.getElementById('marriagePopup');
  const popupClose = document.getElementById('marriagePopupClose');

  marriageBtn.addEventListener('click', () => {
    popup.classList.add('show');
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#fff'],
    });
    AudioEngine.chime(659.25, 0, 0.25, 0.2);
    AudioEngine.chime(880, 0.12, 0.3, 0.2);
  });
  popupClose.addEventListener('click', () => popup.classList.remove('show'));
  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.classList.remove('show');
  });
})();

/* =========================================================================
   WISH WALL — localStorage persisted
   ========================================================================= */
(function initWishWall() {
  const STORAGE_KEY = 'ayan_birthday_wishwall';
  const form = document.getElementById('wishForm');
  const nameInput = document.getElementById('wishName');
  const msgInput = document.getElementById('wishMessage');
  const board = document.getElementById('corkboard');
  const colorPicker = document.getElementById('colorPicker');
  let selectedColor = 'amber';

  colorPicker.querySelectorAll('.color-dot').forEach((dot, i) => {
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      colorPicker.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      selectedColor = dot.dataset.color;
    });
  });

  function loadWishes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }
  function saveWishes(wishes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  }

  function renderNote(wish) {
    const note = document.createElement('div');
    note.className = `sticky-note note-${wish.color}`;
    note.style.setProperty('--rot', (Math.random() * 6 - 3) + 'deg');
    note.innerHTML = `
      <div class="pin"></div>
      <div class="note-name">${escapeHtml(wish.name)}</div>
      <div class="note-msg">${escapeHtml(wish.message)}</div>
    `;
    board.prepend(note);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderAll() {
    board.innerHTML = '';
    loadWishes().forEach(renderNote);
  }
  renderAll();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();
    if (!name || !message) return;
    const wish = { name, message, color: selectedColor, ts: Date.now() };
    const wishes = loadWishes();
    wishes.push(wish);
    saveWishes(wishes);
    renderNote(wish);
    form.reset();
    AudioEngine.chime(659.25, 0, 0.25, 0.18);
    confetti({ particleCount: 24, spread: 50, origin: { y: 0.8 }, colors: ['#F59E0B', '#FBBF24'] });
  });
})();

/* =========================================================================
   SOUNDBOARD & RESPECT COUNTER
   ========================================================================= */
(function initSoundboard() {
  const SOUNDS = {
    approve: [523.25, 659.25, 783.99],
    coffee: [392.0, 440.0],
    bonus: [523.25, 659.25, 830.61, 1046.5],
    deploy: [220.0, 277.18, 329.63, 392.0, 466.16],
  };
  document.querySelectorAll('.sound-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const notes = SOUNDS[btn.dataset.sound] || [440];
      notes.forEach((n, i) => AudioEngine.eightBit(n, i * 0.09));
      btn.style.transform = 'scale(0.92)';
      setTimeout(() => (btn.style.transform = ''), 140);
    });
  });
})();

(function initRespect() {
  const STORAGE_KEY = 'ayan_birthday_respect_count';
  const btn = document.getElementById('respectBtn');
  const countEl = document.getElementById('respectCount');
  const layer = document.getElementById('floatEmojiLayer');
  const EMOJIS = ['🙌', '👏', '❤️', '✨', '🎉'];

  let count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  countEl.textContent = count;

  btn.addEventListener('click', (e) => {
    count++;
    countEl.textContent = count;
    localStorage.setItem(STORAGE_KEY, String(count));
    AudioEngine.chime(880, 0, 0.2, 0.15);

    for (let i = 0; i < 3; i++) {
      const el = document.createElement('div');
      el.className = 'float-emoji';
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const rect = btn.getBoundingClientRect();
      el.style.left = (rect.left + rect.width / 2 + (Math.random() * 40 - 20)) + 'px';
      el.style.top = rect.top + 'px';
      el.style.setProperty('--fx', (Math.random() * 60 - 30) + 'px');
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }
  });
})();
