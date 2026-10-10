/** Elevated 7 train above the skyline and street traffic below it, paced by recent contributions. */
import type {Activity} from './data.ts';

const CAR_COLORS = ['#3ee0ff', '#b06bff', '#ff4f9a', '#f0b429', '#6dffc2', '#d7e0f2', '#7aa2ff'];

function train(): string {
  const car = (x: number) =>
    `<g transform="translate(${x} 0)">
      <rect x="0" y="4" width="34" height="14" fill="#c9d1dd"/>
      <rect x="0" y="4" width="34" height="3" fill="#B933AD"/>
      <rect x="3" y="9" width="5" height="4" fill="#f0b429"/>
      <rect x="11" y="9" width="5" height="4" fill="#f0b429"/>
      <rect x="19" y="9" width="5" height="4" fill="#1a2340"/>
      <rect x="27" y="9" width="5" height="4" fill="#f0b429"/>
    </g>`;
  return `<svg viewBox="0 0 152 22" shape-rendering="crispEdges" aria-hidden="true">
    <rect class="headlight" x="148" y="9" width="4" height="4" fill="#f5f8ff"/>
    ${car(0)}${car(38)}${car(76)}${car(114)}
    <rect x="146" y="16" width="4" height="2" fill="#ff4f4f"/>
  </svg>`;
}

function car(i: number, lane: number, rest: number): string {
  const color = CAR_COLORS[i % CAR_COLORS.length];
  const dur = 11 + ((i * 3) % 9);
  const delay = -((i * 5) % dur);
  return `<span class="car lane-${lane}" style="--rest:${rest}%;--dur:${dur}s;--delay:${delay}s;background:${color}"></span>`;
}

export function mountStreet(scene: HTMLElement, activity: Activity | null): void {
  const figure = scene.querySelector('figure');
  const picture = figure?.querySelector('picture');
  if (!figure || !picture || figure.querySelector('.el')) return;

  const tempo = activity?.tempo ?? 0.15;
  const run = Math.round(38 - tempo * 22);
  const count = activity ? Math.min(7, 1 + Math.round(tempo * 6)) : 2;

  const el = document.createElement('div');
  el.className = 'el';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="el-rail"></div>
    <div class="el-train" style="--run:${run}s">${train()}</div>
    <div class="el-train back" style="--run:${run + 7}s">${train()}</div>`;
  picture.before(el);

  const street = document.createElement('div');
  street.className = 'street';
  street.setAttribute('aria-hidden', 'true');
  const cars: string[] = [];
  for (let i = 0; i < count; i++) cars.push(car(i, i % 2, 8 + ((i * 17) % 78)));
  street.innerHTML = cars.join('');
  picture.after(street);

  const note = document.createElement('p');
  note.className = 'street-note';
  note.textContent = activity
    ? `Traffic paced to the last 7 days: ${activity.last7} contributions, ${Math.round(tempo * 100)}% of the busiest week.`
    : 'Traffic paced to recent activity.';
  street.after(note);
}
