import './style.css';
import {CREDIT, INTRO, LOADOUT, SITE, THROUGH_LINE, WORK} from './content.ts';
import {emblem} from './emblems.ts';
import {esc, mount} from './shell.ts';

const log = WORK.map(
  role => `
    <li class="entry${role.current ? ' is-current' : ''}">
      <div class="entry-mark">${emblem(role.emblem)}</div>
      <div>
        <h3>${esc(role.org)}${role.current ? ' <span class="now-tag">current</span>' : ''}</h3>
        <p class="role">${esc(role.title)}</p>
        <p>${esc(role.summary)}</p>
      </div>
    </li>`,
).join('');

const loadout = LOADOUT.map(
  item => `
    <li>
      <a class="tile" href="${esc(item.href)}">
        ${emblem(item.id)}
        <span>${esc(item.name)}</span>
      </a>
    </li>`,
).join('');

const {desktop, phone} = SITE.skyline;

mount(
  'home',
  `
    <section class="opening">
      <div class="stage-copy">
        <p class="prompt"><span class="ps1">dlm@queens</span>:~$ whoami</p>
        <h1 class="name">${esc(SITE.name)}</h1>
        <p class="intro">${esc(INTRO)}</p>
        <p class="through">${esc(THROUGH_LINE)}</p>
        <ul class="actions">
          <li><a class="btn btn-primary" href="/about/">Read the bio</a></li>
          <li><a class="btn" href="${esc(SITE.github)}">GitHub</a></li>
          <li><a class="btn" href="${esc(SITE.linkedin)}">LinkedIn</a></li>
        </ul>
      </div>
    </section>

    <section class="panel settle" aria-labelledby="log-heading">
      <h2 id="log-heading"><span class="kicker">career log</span></h2>
      <ol class="log">${log}</ol>
    </section>

    <section class="panel settle" aria-labelledby="loadout-heading">
      <h2 id="loadout-heading"><span class="kicker">loadout</span></h2>
      <p class="panel-note">What I work with.</p>
      <ul class="loadout">${loadout}</ul>
    </section>

    <section class="city-scene settle" aria-labelledby="city-heading">
      <h2 id="city-heading" class="visually-hidden">Contribution skyline</h2>
      <div class="rail-slot"></div>
      <figure>
        <div class="city-frame">
          <picture>
            <source media="(max-width: 800px)" srcset="${esc(phone.src)}" width="${phone.width}" height="${phone.height}" />
            <img src="${esc(desktop.src)}" width="${desktop.width}" height="${desktop.height}" alt="GitHub contributions over the last year, drawn as an isometric city. One building per day." />
          </picture>
        </div>
        <figcaption>
          <p>One building a day, from the last year of <a href="${esc(SITE.github)}/${esc(SITE.handle)}">GitHub contributions</a>. A skyline, not a score.</p>
          <p class="credit">City generator adapted from <a href="${esc(CREDIT.url)}">${esc(CREDIT.name)}’s profile console</a> (MIT; <a href="${esc(CREDIT.post)}">how it was built</a>). The marks are the companies' own, shown small.</p>
        </figcaption>
      </figure>
    </section>
`,
);
