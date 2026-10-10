import './style.css';
import {ABOUT, CREDIT, EXPERIENCE, SITE, STACK} from './content.ts';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const roles = EXPERIENCE.map(
  (r, i) => `
  <article class="role" style="animation-delay:${(0.05 * i).toFixed(2)}s">
    <div class="when">${esc(r.when)}</div>
    <div>
      <h3>${esc(r.role)} <span class="at">@</span> <span class="org">${esc(r.org)}</span></h3>
      <p>${esc(r.blurb)}</p>
      <div class="tags">${r.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
    </div>
  </article>`,
).join('');

const stackRows = STACK.map(
  (s, i) => `
  <div class="stack-row" style="animation-delay:${(0.04 * i).toFixed(2)}s">
    <span class="k">${esc(s.name)}</span>
    <span class="dots" aria-hidden="true"></span>
    <span class="v">${esc(s.value)}</span>
  </div>`,
).join('');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
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

      <section class="hero" id="top">
        <p class="prompt"><span class="ok">$</span> identity<span class="cursor" aria-hidden="true"></span></p>
        <h1 class="brand">${esc(SITE.name)}</h1>
        <div class="meter-bar" aria-hidden="true"></div>
        <p class="tagline">${esc(SITE.title)}</p>
        <p class="focus">${esc(SITE.focus)} <span class="amp">·</span> ${esc(SITE.location)}</p>
        <div class="hero-cta">
          <a class="btn" href="#path">Path</a>
          <a class="btn secondary" href="${esc(SITE.linkedin)}" rel="noopener noreferrer" target="_blank">LinkedIn</a>
        </div>
      </section>

      <section class="section about" id="about">
        <div class="section-head">
          <h2><span class="path">~/</span>about</h2>
          <span class="counter">// 01</span>
        </div>
        <p class="cmd"><span class="ok">$</span> cat notes.md <span class="comment"># short version</span></p>
        ${ABOUT.map(p => `<p>${esc(p)}</p>`).join('')}
      </section>

      <section class="section" id="stack">
        <div class="section-head">
          <h2><span class="path">~/</span>stack</h2>
          <span class="counter">// 02</span>
        </div>
        <p class="cmd"><span class="ok">$</span> kubectl get tools -n billing <span class="comment"># day-to-day</span></p>
        <div class="stack-list">${stackRows}</div>
      </section>

      <section class="section" id="path">
        <div class="section-head">
          <h2><span class="path">~/</span>path</h2>
          <span class="counter">// 03</span>
        </div>
        <p class="cmd"><span class="ok">$</span> history --roles</p>
        <div class="timeline">${roles}</div>
      </section>

      <section class="section" id="skyline">
        <div class="section-head">
          <h2><span class="path">~/</span>skyline</h2>
          <span class="counter">// 04</span>
        </div>
        <p class="cmd"><span class="ok">$</span> render --graph 365d <span class="comment"># synced from GitHub</span></p>
        <div class="city-wrap">
          <picture>
            <source media="(max-width: 600px)" srcset="${esc(SITE.profileCityPhone)}" />
            <img
              src="${esc(SITE.profileCity)}"
              alt="Isometric contribution skyline from David Miller's GitHub activity"
              width="880"
              height="680"
              loading="lazy"
            />
          </picture>
        </div>
        <p class="credit">
          Regenerates with the
          <a href="${esc(SITE.github)}/${esc(SITE.handle)}">GitHub profile</a>.
          City technique by
          <a href="${esc(CREDIT.url)}">${esc(CREDIT.name)}</a>
          (<a href="${esc(CREDIT.post)}">writeup</a>), MIT — restyled here for ice + billing chrome.
        </p>
      </section>

      <section class="section" id="contact">
        <div class="section-head">
          <h2><span class="path">~/</span>connect</h2>
          <span class="counter">// 05</span>
        </div>
        <p class="cmd"><span class="ok">$</span> open --url …</p>
        <div class="contact-row">
          <a class="btn" href="${esc(SITE.linkedin)}" rel="noopener noreferrer" target="_blank">LinkedIn</a>
          <a class="btn secondary" href="${esc(SITE.github)}" rel="noopener noreferrer" target="_blank">GitHub</a>
        </div>
      </section>

      <footer class="footer">
        <span><span class="ok">$</span> exit — see you around <a href="${esc(SITE.github)}">${esc(SITE.handle)}</a>.</span>
        <span class="eof">// Queens</span>
      </footer>
    </main>
  </div>
`;
