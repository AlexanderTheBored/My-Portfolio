/*
 * Particle background animation
 *
 * This script adds a subtle particle network to the page background.
 * Particles drift around the screen and connect to nearby neighbors with
 * faint lines. Colours are pulled from CSS variables `--accent` and
 * `--accent-2` so the animation stays in harmony with the rest of the site.
 *
 * The animation respects the user’s reduced‑motion preferences: if
 * `prefers-reduced-motion` is enabled, no animation runs.
 */

(() => {
  // If the browser prefers reduced motion, exit early.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReducedMotion) return;

  const canvas = document.getElementById('background-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrame;

  // Retrieve CSS colours from the root element. Fallback colours if not found.
  function getThemeColours() {
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue('--accent').trim() || '#38bdf8';
    const accent2 = styles.getPropertyValue('--accent-2').trim() || '#a855f7';
    return [accent, accent2];
  }

  class Particle {
    constructor(colours) {
      this.colours = colours;
      this.reset();
    }
    reset() {
      // Place the particle randomly across the canvas
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      // Size between 1 and 3 pixels
      this.size = 1 + Math.random() * 2;
      // Velocity – small random drift
      const speed = 0.5;
      this.vx = (Math.random() - 0.5) * speed;
      this.vy = (Math.random() - 0.5) * speed;
      // Pick a colour from the palette
      this.color = this.colours[Math.floor(Math.random() * this.colours.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Bounce at edges
      if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
      if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    const [c1, c2] = getThemeColours();
    particles = [];
    // The number of particles scales with the viewport area for consistent density.
    const count = Math.floor((canvas.width * canvas.height) / 20000);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle([c1, c2]));
    }
  }

  function connectParticles() {
    const threshold = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < threshold) {
          // Opacity decreases as particles get further apart
          const opacity = 1 - distance / threshold;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationFrame = requestAnimationFrame(animate);
  }

  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  // Initialize canvas and particles
  handleResize();
  window.addEventListener('resize', handleResize);
  animate();

  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrame);
  });
})();