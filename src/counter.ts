/**
 * Contribution totals, shown with the yearly towers. Every number comes from /data/stats.json and
 * /data/calendar.json (real GitHub totals, refreshed by a workflow); when motion
 * is on the figures count up once from zero, then hold.
 */
import type {Activity} from './data.ts';

type Readout = {label: string; value: number; suffix?: string};

const fmt = new Intl.NumberFormat('en-US');

function readouts(a: Activity): Readout[] {
  const out: Readout[] = [];
  const s = a.stats;
  if (s) {
    const since = new Date(s.created_at).getUTCFullYear();
    out.push({label: `contributions since ${since}`, value: s.contributions_all});
    out.push({label: 'current streak', value: s.streak_current, suffix: 'd'});
    out.push({label: 'longest streak', value: s.streak_longest, suffix: 'd'});
  } else {
    out.push({label: 'last 53 weeks', value: a.last365});
  }
  out.push({label: 'last 7 days', value: a.last7});
  out.push({label: `busiest day ${a.busiest.date}`, value: a.busiest.count});
  return out;
}

export function mountCounter(host: HTMLElement, activity: Activity | null): void {
  if (!activity) return;
  const strip = document.createElement('div');
  strip.className = 'meter';
  strip.setAttribute('aria-label', 'GitHub activity');
  strip.innerHTML = readouts(activity)
    .map(
      r =>
        `<span class="meter-item"><span class="meter-label">${r.label}</span> ` +
        `<span class="meter-value" data-target="${r.value}" data-suffix="${r.suffix ?? ''}">${fmt.format(r.value)}${r.suffix ?? ''}</span></span>`,
    )
    .join('');
  const heading = host.querySelector('h2');
  if (heading) heading.insertAdjacentElement('afterend', strip);
  else host.prepend(strip);

  if (document.documentElement.dataset.motion !== 'on') return;
  const values = [...strip.querySelectorAll<HTMLElement>('.meter-value')];
  const start = performance.now();
  const duration = 1400;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    for (const el of values) {
      const target = Number(el.dataset.target);
      el.textContent = fmt.format(Math.round(target * eased)) + (el.dataset.suffix ?? '');
    }
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
