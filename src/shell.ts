import {NAV, SITE, type NavId} from './content.ts';

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function navHtml(active: NavId): string {
  return NAV.map(item => {
    const cls = item.id === active ? 'nav-link active' : 'nav-link';
    const aria = item.id === active ? ' aria-current="page"' : '';
    return `<a class="${cls}" href="${esc(item.href)}"${aria}>${esc(item.label)}</a>`;
  }).join('');
}

export function openShell(active: NavId, inner: string): string {
  return `
  <div class="shell">
    <aside class="rail" aria-hidden="true">
      <div class="ticks"></div>
      <span class="rail-label">QNS</span>
    </aside>

    <main class="panel">
      <div class="statusbar">
        <span>METER://BILLING // LOC:QNS</span>
        <span class="right"><span class="dot" aria-hidden="true"></span><span>LEDGER SYNCED · OK</span></span>
      </div>
      <nav class="topnav" aria-label="Primary">
        <a class="brand-mini" href="/">${esc(SITE.name)}</a>
        <div class="nav-links">${navHtml(active)}</div>
      </nav>
      ${inner}
      <footer class="footer">
        <span><span class="ok">$</span> exit — see you around <a href="${esc(SITE.github)}">${esc(SITE.handle)}</a>.</span>
        <span class="eof">// Queens</span>
      </footer>
    </main>
  </div>`;
}

export function mount(active: NavId, inner: string): void {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = openShell(active, inner);
}
