/* ============================
   script.js - global behaviors
   - theme toggle (localStorage)
   - mobile menu
   - countdown to 10 Oct 2025
   - banner parallax overlay
   ============================ */

/* THEME toggle */
(function themeInit(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;
  const saved = localStorage.getItem('theme-mode');
  if(saved === 'dark') {
    document.body.classList.add('dark');
    btn.textContent = '☀️';
  } else {
    btn.textContent = '🌙';
  }
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme-mode', mode);
    btn.textContent = mode === 'dark' ? '☀️' : '🌙';
  });
})();

/* MOBILE menu toggle */
(function menuInit(){
  const mBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if(!mBtn || !nav) return;
  mBtn.addEventListener('click', () => nav.classList.toggle('show'));
})();

/* COUNTDOWN */
(function countdownInit(){
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');
  const container = document.getElementById('countdown-timer');

  // target: Oct 10, 2025 00:00:00 local time
  const target = new Date('Oct 10, 2025 00:00:00').getTime();

  function update() {
    const now = Date.now();
    let diff = target - now;

    if(diff <= 0) {
      if(container) container.innerHTML = '<div style="color:#fff;padding:12px 18px;font-weight:700">🎉 Chúc mừng Ngày Giải phóng Thủ đô!</div>';
      clearInterval(tick);
      return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const minutes = Math.floor(diff / (1000*60));
    diff -= minutes * (1000*60);
    const seconds = Math.floor(diff / 1000);

    if(elDays) elDays.textContent = days;
    if(elHours) elHours.textContent = String(hours).padStart(2,'0');
    if(elMinutes) elMinutes.textContent = String(minutes).padStart(2,'0');
    if(elSeconds) elSeconds.textContent = String(seconds).padStart(2,'0');
  }

  update();
  const tick = setInterval(update, 1000);
})();

/* BANNER parallax overlay - light weight */
(function bannerParallax(){
  const banner = document.querySelector('.banner');
  if(!banner) return;
  const layer = banner.querySelector('.parallax-layer');
  if(!layer) return;

  let ticking = false;
  function onScroll(){
    if(ticking) return;
    window.requestAnimationFrame(() => {
      const rect = banner.getBoundingClientRect();
      const winH = window.innerHeight;
      // progress -1..1
      const progress = (rect.top + rect.height/2 - winH/2) / (winH/2);
      const move = Math.max(-18, Math.min(18, -progress * 12));
      layer.style.transform = `translateY(${move}px)`;
      ticking = false;
    });
    ticking = true;
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
