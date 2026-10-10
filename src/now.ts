import './style.css';
import {NOW} from './content.ts';
import {emblem} from './emblems.ts';
import {esc, mount} from './shell.ts';

const items = NOW.items
  .map(item => `<div><dt>${esc(item.label)}</dt><dd>${esc(item.body)}</dd></div>`)
  .join('');

mount(
  'now',
  `
    <header class="screen">
      <p class="prompt"><span class="ps1">dlm@queens</span>:~$ cat now</p>
      <h1>Now</h1>
      <p class="stamp">Updated <time datetime="${esc(NOW.updated)}">${esc(NOW.updatedLabel)}</time></p>
      <p class="lead">What I’m focused on. It changes when the work does, not when the site does. (<a href="https://nownownow.com/about">What’s a now page?</a>)</p>
    </header>
    <section class="panel settle now-board">
      <div class="entry-mark">${emblem('coreweave')}</div>
      <dl class="snapshot">${items}</dl>
    </section>
`,
);
