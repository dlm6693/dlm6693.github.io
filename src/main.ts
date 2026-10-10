import './style.css';
import {ABOUT, CREDIT, EXPERIENCE, SITE} from './content.ts';

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

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="console console-foot">
    <div class="statusbar">
      <span>SYS://COREWEAVE // NODE:DLM</span>
      <span class="right"><span class="dot" aria-hidden="true"></span><span>ONLINE · NOMINAL</span></span>
    </div>

    <section class="hero" id="top">
      <p class="prompt"><span class="ok">$</span> whoami<span class="cursor" aria-hidden="true"></span></p>
      <h1 class="brand">${esc(SITE.name.toUpperCase())}</h1>
      <p class="tagline">${esc(SITE.title)} <span class="amp">·</span> ${esc(SITE.location)}</p>
      <div class="hero-cta">
        <a class="btn" href="#experience">Experience</a>
        <a class="btn secondary" href="${esc(SITE.linkedin)}" rel="noopener noreferrer" target="_blank">LinkedIn</a>
      </div>
    </section>

    <section class="section about" id="about">
      <div class="section-head">
        <h2><span class="path">~/</span>about</h2>
        <span class="counter">// 01</span>
      </div>
      <p class="cmd"><span class="ok">$</span> cat README.md <span class="comment"># the short version</span></p>
      ${ABOUT.map(p => `<p>${esc(p)}</p>`).join('')}
    </section>

    <section class="section" id="experience">
      <div class="section-head">
        <h2><span class="path">~/</span>experience</h2>
        <span class="counter">// 02</span>
      </div>
      <p class="cmd"><span class="ok">$</span> history --roles <span class="comment"># not an OSS highlight reel</span></p>
      <div class="timeline">${roles}</div>
    </section>

    <section class="section" id="city">
      <div class="section-head">
        <h2><span class="path">~/</span>contribution-city</h2>
        <span class="counter">// 03</span>
      </div>
      <p class="cmd"><span class="ok">$</span> render-city --last 365d <span class="comment"># synced from GitHub profile</span></p>
      <div class="city-wrap">
        <picture>
          <source media="(max-width: 600px)" srcset="${esc(SITE.profileCityPhone)}" />
          <img
            src="${esc(SITE.profileCity)}"
            alt="Isometric contribution city skyline generated from David Miller's GitHub activity"
            width="880"
            height="680"
            loading="lazy"
          />
        </picture>
      </div>
      <p class="credit">
        City regenerates with the
        <a href="${esc(SITE.github)}/${esc(SITE.handle)}">GitHub profile</a>.
        Console / city technique by
        <a href="${esc(CREDIT.url)}">${esc(CREDIT.name)}</a>
        (<a href="${esc(CREDIT.post)}">writeup</a>), MIT.
      </p>
    </section>

    <section class="section" id="contact">
      <div class="section-head">
        <h2><span class="path">~/</span>contact</h2>
        <span class="counter">// 04</span>
      </div>
      <p class="cmd"><span class="ok">$</span> open --url …</p>
      <div class="contact-row">
        <a class="btn" href="${esc(SITE.linkedin)}" rel="noopener noreferrer" target="_blank">LinkedIn</a>
        <a class="btn secondary" href="${esc(SITE.github)}" rel="noopener noreferrer" target="_blank">GitHub</a>
      </div>
    </section>

    <footer class="footer">
      <span><span class="ok">$</span> exit — connection to <a href="${esc(SITE.github)}">${esc(SITE.handle)}</a> closed.</span>
      <span class="eof">// EOF</span>
    </footer>
  </main>
`;
