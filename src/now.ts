import './style.css';
import {NOW, SITE} from './content.ts';
import {esc, mount} from './shell.ts';

const items = NOW.items
  .map(
    (item, i) => `
  <article class="now-card" style="animation-delay:${(0.05 * i).toFixed(2)}s">
    <h3>${esc(item.title)}</h3>
    <p>${esc(item.body)}</p>
  </article>`,
  )
  .join('');

const reading = NOW.reading.map(r => `<li>${esc(r)}</li>`).join('');

mount(
  'now',
  `
      <section class="page-hero">
        <p class="prompt"><span class="ok">$</span> date; cat ~/now.md</p>
        <h1 class="page-title">Now</h1>
        <p class="page-lead">A snapshot of focus — updated ${esc(NOW.updated)}. Inspired by the <a href="https://nownownow.com/about" rel="noopener noreferrer" target="_blank">/now movement</a>.</p>
      </section>

      <section class="section">
        <div class="section-head">
          <h2><span class="path">~/</span>focus</h2>
          <span class="counter">// live</span>
        </div>
        <div class="now-list">${items}</div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2><span class="path">~/</span>also</h2>
          <span class="counter">// soft</span>
        </div>
        <p class="cmd"><span class="ok">$</span> head ~/reading.txt</p>
        <ul class="reading">${reading}</ul>
        <p class="more"><a href="/about/">← back to bio</a> · <a href="${esc(SITE.github)}">GitHub</a></p>
      </section>
`,
);
