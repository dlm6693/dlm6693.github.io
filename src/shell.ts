import {NAV, SITE, type NavId} from './content.ts';

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
  <a class="skip-link" href="#content">Skip to content</a>
  <div class="frame">
    <header class="topbar">
      <a class="brand" href="/"><span class="brand-mark" aria-hidden="true"></span>${esc(SITE.name)}</a>
      <nav aria-label="Primary"><ul class="nav">${navHtml(active)}</ul></nav>
    </header>
    <main id="content" tabindex="-1">${inner}</main>
    <footer class="footer">
      <p>Written in ${esc(SITE.location)}.</p>
      <ul class="footer-links">
        <li><a href="${esc(SITE.github)}">GitHub</a></li>
        <li><a href="${esc(SITE.linkedin)}">LinkedIn</a></li>
      </ul>
    </footer>
  </div>`;
}
