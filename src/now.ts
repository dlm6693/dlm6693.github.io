import './style.css';
import {NOW} from './content.ts';
import {esc, mount} from './shell.ts';

const items = NOW.items
  .map(item => `<div><dt>${esc(item.label)}</dt><dd>${esc(item.body)}</dd></div>`)
  .join('');

mount(
  'now',
  `
    <header class="page-head">
      <h1 class="page-title">Now</h1>
      <p class="updated">Updated <time datetime="${esc(NOW.updated)}">${esc(NOW.updatedLabel)}</time></p>
      <p class="lead">What I’m focused on at the moment. It’s short on purpose, and it changes when something actually changes.
      (<a href="https://nownownow.com/about">What’s a now page?</a>)</p>
    </header>

    <div class="section">
      <dl class="now-list">${items}</dl>
    </div>
`,
);
