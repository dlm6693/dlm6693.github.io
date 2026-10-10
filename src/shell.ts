import {bootCats} from './cats.ts';
import {NAV, SITE, type NavId} from './content.ts';
import {mountCounter} from './counter.ts';
import {loadActivity} from './data.ts';
import {bootMotion} from './motion.ts';
import {mountSky} from './sky.ts';
import {mountStreet} from './street.ts';
import {mountYears} from './years.ts';

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function navHtml(active: NavId): string {
  return NAV.map(item => {
    const current = item.id === active ? ' aria-current="page"' : '';
    return `<li><a href="${esc(item.href)}"${current}>${esc(item.label)}</a></li>`;
  }).join('');
}

export function mount(active: NavId, inner: string): void {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip" href="#content">Skip to content</a>
  <div class="world">
    <header class="hud">
      <a class="brand" href="/"><span class="brand-mark" aria-hidden="true"></span>${esc(SITE.name)}</a>
      <nav aria-label="Primary"><ul class="nav">${navHtml(active)}</ul></nav>
      <button class="motion-toggle" type="button" aria-pressed="true">motion on</button>
      <span class="sparks" aria-hidden="true"><i></i><i></i><i></i></span>
    </header>
    <main id="content">${inner}</main>
    <footer class="foot">
      <p>Queens, NYC</p>
      <ul>
        <li><a href="${esc(SITE.github)}">GitHub</a></li>
        <li><a href="${esc(SITE.linkedin)}">LinkedIn</a></li>
      </ul>
    </footer>
  </div>`;
  bootMotion();

  const world = document.querySelector<HTMLElement>('.world')!;
  mountSky(world);
  void loadActivity().then(activity => {
    if (active === 'home') {
      const city = document.querySelector<HTMLElement>('.city-scene');
      if (city) {
        mountStreet(city, activity);
        mountYears(city, activity);
        const years = document.querySelector<HTMLElement>('.years-scene');
        if (years) mountCounter(years, activity);
      }
    }
    bootCats(world);
  });
}
