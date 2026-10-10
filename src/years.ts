/** The long view: one tower per year on GitHub, height from that year's contributions. */
import type {Activity} from './data.ts';

const fmt = new Intl.NumberFormat('en-US');

export function mountYears(after: HTMLElement, activity: Activity | null): void {
  const years = activity?.stats?.years;
  if (!years) return;
  const entries = Object.entries(years)
    .map(([y, n]) => [Number(y), n] as const)
    .sort((a, b) => a[0] - b[0]);
  if (entries.length < 2) return;
  const peak = Math.max(1, ...entries.map(([, n]) => n));
  const current = activity!.stats!.year;

  const towers = entries
    .map(([year, n], i) => {
      const h = Math.max(6, Math.round((n / peak) * 100));
      const now = year === current;
      const blink = (0.35 + (1 - n / peak) * 2.4).toFixed(2);
      return `<li class="tower${now ? ' is-now' : ''}" style="--h:${h}%;--i:${i};--blink:${blink}s">
        <span class="tower-count">${fmt.format(n)}</span>
        <span class="tower-body" aria-hidden="true"></span>
        <span class="tower-year">${year}${now ? '<small> so far</small>' : ''}</span>
      </li>`;
    })
    .join('');

  const section = document.createElement('section');
  section.className = 'years-scene';
  section.setAttribute('aria-labelledby', 'years-heading');
  section.innerHTML = `
    <h2 id="years-heading"><span class="kicker">the long view</span></h2>
    <div class="years-sky" aria-hidden="true"><i class="years-cloud"></i><i class="years-plane"></i></div>
    <ol class="years">${towers}</ol>
    <p class="years-note">One tower per year on GitHub, by contributions. ${entries[0][0]} to ${current}.</p>`;
  after.after(section);
}
