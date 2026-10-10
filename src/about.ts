import './style.css';
import {BIO, WORK} from './content.ts';
import {emblem} from './emblems.ts';
import {esc, mount} from './shell.ts';

const facts = BIO.facts.map(fact => `<div><dt>${esc(fact.label)}</dt><dd>${esc(fact.value)}</dd></div>`).join('');
const marks = WORK.map(role => `<li>${emblem(role.emblem)}<span>${esc(role.org)}</span></li>`).join('');

mount(
  'about',
  `
    <header class="screen">
      <p class="prompt"><span class="ps1">dlm@queens</span>:~$ less bio</p>
      <h1>Bio</h1>
      <p class="lead">${esc(BIO.lead)}</p>
    </header>
    <div class="dossier settle">
      <div class="prose">
        ${BIO.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
      </div>
      <aside>
        <ul class="mini-log">${marks}</ul>
        <dl class="facts">${facts}</dl>
      </aside>
    </div>
`,
);
