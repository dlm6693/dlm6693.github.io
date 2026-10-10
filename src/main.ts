import './style.css';
import {CREDIT, INTERESTS, INTRO, LANGUAGES, SITE, THROUGH_LINE, WORK} from './content.ts';
import {esc, mount} from './shell.ts';

const work = WORK.map(
  r => `
    <li class="job">
      <div class="job-meta">
        <h3 class="job-org">${esc(r.org)}${r.current ? ' <span class="tag-current">current</span>' : ''}</h3>
        <p class="job-title">${esc(r.title)}</p>
      </div>
      <p class="job-summary">${esc(r.summary)}</p>
    </li>`,
).join('');

const {desktop, phone} = SITE.skyline;

mount(
  'home',
  `
    <section class="hero" aria-labelledby="hero-name">
      <p class="prompt"><span class="ps1">dlm@queens</span>:~$ whoami</p>
      <h1 id="hero-name" class="name">${esc(SITE.name)}</h1>
      <p class="intro">${esc(INTRO)}</p>
      <p class="through">${esc(THROUGH_LINE)}</p>
      <ul class="actions">
        <li><a class="btn btn-primary" href="/about/">Read the bio</a></li>
        <li><a class="btn" href="${esc(SITE.github)}">GitHub</a></li>
        <li><a class="btn" href="${esc(SITE.linkedin)}">LinkedIn</a></li>
      </ul>
    </section>

    <section class="section" aria-labelledby="work-heading">
      <h2 id="work-heading" class="label">work</h2>
      <ol class="work">${work}</ol>
    </section>

    <section class="section" aria-labelledby="interests-heading">
      <h2 id="interests-heading" class="label">interests</h2>
      <p class="prose-block">${esc(INTERESTS)}</p>
      <p class="meta-line"><span class="meta-key">languages</span>${LANGUAGES.map(esc).join(' · ')}</p>
    </section>

    <section class="section skyline" aria-labelledby="skyline-heading">
      <h2 id="skyline-heading" class="visually-hidden">Contribution skyline</h2>
      <figure>
        <picture>
          <source media="(max-width: 600px)" srcset="${esc(phone.src)}" width="${phone.width}" height="${phone.height}" />
          <img
            src="${esc(desktop.src)}"
            width="${desktop.width}"
            height="${desktop.height}"
            alt="My GitHub contributions over the last year drawn as an isometric city, one building per day."
            loading="lazy"
            decoding="async"
          />
        </picture>
        <figcaption>
          <p>My GitHub contributions over the last year, as a city: one building per day, regenerated from my
          <a href="${esc(SITE.github)}/${esc(SITE.handle)}">profile</a> every few hours. A fun artifact, not a measure of anything important.</p>
          <p class="credit">City generator adapted from <a href="${esc(CREDIT.url)}">${esc(CREDIT.name)}’s profile console</a>
          (MIT; <a href="${esc(CREDIT.post)}">how he built it</a>).</p>
        </figcaption>
      </figure>
    </section>
`,
);
