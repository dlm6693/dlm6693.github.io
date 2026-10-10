import './style.css';
import {BIO} from './content.ts';
import {esc, mount} from './shell.ts';

const facts = BIO.facts
  .map(f => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)
  .join('');

mount(
  'about',
  `
    <header class="page-head">
      <h1 class="page-title">Bio</h1>
      <p class="lead">${esc(BIO.lead)}</p>
    </header>

    <div class="section bio">
      <div class="prose">
        ${BIO.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
      </div>
      <aside aria-label="Quick facts">
        <dl class="facts">${facts}</dl>
      </aside>
    </div>
`,
);
