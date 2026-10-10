import './style.css';
import {BIO, SITE} from './content.ts';
import {esc, mount} from './shell.ts';

const asides = BIO.asides
  .map(
    a => `
  <div class="aside-row">
    <span class="k">${esc(a.label)}</span>
    <span class="v">${esc(a.value)}</span>
  </div>`,
  )
  .join('');

mount(
  'about',
  `
      <section class="page-hero">
        <p class="prompt"><span class="ok">$</span> less ~/bio.md</p>
        <h1 class="page-title">Bio</h1>
        <p class="page-lead">${esc(BIO.lead)}</p>
      </section>

      <section class="section bio-grid">
        <div class="bio-prose">
          ${BIO.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
        </div>
        <aside class="bio-aside">
          <p class="aside-label">$ facts</p>
          ${asides}
          <div class="contact-row aside-cta">
            <a class="btn" href="/now/">What I'm doing now</a>
            <a class="btn secondary" href="${esc(SITE.linkedin)}" rel="noopener noreferrer" target="_blank">LinkedIn</a>
          </div>
        </aside>
      </section>
`,
);
