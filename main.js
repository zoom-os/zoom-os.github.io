document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-btn');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const htmlEl = document.documentElement;

  // Retrieve saved preference or default to 'light'
  const savedTheme = localStorage.getItem('zoomos-theme') || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlEl.setAttribute('data-theme', 'dark');
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    } else {
      htmlEl.removeAttribute('data-theme');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }
    localStorage.setItem('zoomos-theme', theme);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Cycle 'Imagine' between 10 fonts: starts fast, slows down, stops on main font after 1.5s
  const imagineEl = document.getElementById('imagine-text');
  if (imagineEl) {
    const fonts = [
      "'Playfair Display', Georgia, serif",
      "'Press Start 2P', monospace",
      "'Caveat', cursive",
      "'Orbitron', sans-serif",
      "'Cinzel', 'Times New Roman', serif",
      "'Pacifico', cursive",
      "'Special Elite', monospace",
      "'Syne', sans-serif",
      "'Space Mono', monospace",
      "'Bungee', sans-serif"
    ];
    let fontIndex = 0;
    const duration = 1500; // 1.5 seconds total
    const startTime = Date.now();

    function cycleStep() {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        // Return to the main brand font
        imagineEl.style.fontFamily = 'inherit';
        return;
      }

      fontIndex = (fontIndex + 1) % fonts.length;
      imagineEl.style.fontFamily = fonts[fontIndex];

      // Smooth deceleration over 1.5s: starts at ~50ms and scales up to ~250ms
      const progress = elapsed / duration;
      const nextDelay = 50 + Math.pow(progress, 2) * 200;

      setTimeout(cycleStep, nextDelay);
    }

    cycleStep();
  }
});
