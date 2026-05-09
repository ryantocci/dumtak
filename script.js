// Dum Tak — shared interactions

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Audio button — synthesizes a "Dum… Tak" pattern via Web Audio
  const btn = document.querySelector('.audio-btn');
  if (btn) {
    let ctx = null, playing = false, timer = null;
    const label = btn.querySelector('.audio-label');
    const icon = btn.querySelector('.audio-icon');
    const reset = () => {
      playing = false;
      if (ctx) { try { ctx.close(); } catch(e){} ctx = null; }
      icon.textContent = '▶';
      label.textContent = 'Hear "Dum… Tak"';
    };
    btn.addEventListener('click', () => {
      if (playing) { clearTimeout(timer); reset(); return; }
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { return; }
      playing = true;
      icon.textContent = '■';
      label.textContent = 'Playing…';
      const t0 = ctx.currentTime;
      const dum = (t) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(82, t);
        o.frequency.exponentialRampToValueAtTime(46, t + 0.2);
        g.gain.setValueAtTime(0.55, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        o.connect(g); g.connect(ctx.destination);
        o.start(t); o.stop(t + 0.28);
      };
      const tak = (t) => {
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.8);
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const f = ctx.createBiquadFilter();
        f.type = 'highpass'; f.frequency.value = 2400;
        const g = ctx.createGain(); g.gain.value = 0.4;
        src.connect(f); f.connect(g); g.connect(ctx.destination);
        src.start(t);
      };
      const beat = 0.55;
      for (let i = 0; i < 4; i++) {
        dum(t0 + i * beat);
        tak(t0 + i * beat + beat / 2);
      }
      timer = setTimeout(reset, 4 * beat * 1000 + 200);
    });
  }
});
