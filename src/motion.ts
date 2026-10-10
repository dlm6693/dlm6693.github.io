/** Entrance and ambient motion. Content stays visible if this never runs. */
export function bootMotion(): void {
  const root = document.documentElement;
  root.classList.add('js');

  const button = document.querySelector<HTMLButtonElement>('.motion-toggle');
  const on = () => root.dataset.motion !== 'off';
  const paint = (enabled: boolean) => {
    root.dataset.motion = enabled ? 'on' : 'off';
    button?.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    if (button) button.textContent = enabled ? 'motion on' : 'motion off';
  };

  paint(on());
  button?.addEventListener('click', () => {
    const next = !on();
    paint(next);
    try {
      localStorage.setItem('dlm-motion', next ? 'on' : 'off');
    } catch {
      /* private mode */
    }
  });

  const blocks = document.querySelectorAll('.settle');
  if (!('IntersectionObserver' in window)) {
    blocks.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    },
    {threshold: 0.18},
  );
  blocks.forEach(el => io.observe(el));
}
