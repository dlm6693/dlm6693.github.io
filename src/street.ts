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

function fireEscape(): string {
  const rail = (y: number) => `<rect x="0" y="${y}" width="30" height="2" fill="#4a6190"/>
    <rect x="0" y="${y + 2}" width="2" height="7" fill="#4a6190"/>
    <rect x="28" y="${y + 2}" width="2" height="7" fill="#4a6190"/>
    <rect x="9" y="${y + 2}" width="1" height="7" fill="#33456b"/>
    <rect x="19" y="${y + 2}" width="1" height="7" fill="#33456b"/>`;
  return `<svg viewBox="0 0 36 40" shape-rendering="crispEdges" aria-hidden="true">
    <rect x="31" y="0" width="5" height="40" fill="#1c2540"/>
    <rect x="32" y="4" width="3" height="4" fill="#f0b429" class="esc-window"/>
    <rect x="32" y="22" width="3" height="4" fill="#1a2340"/>
    ${rail(6)}${rail(24)}
    <rect x="6" y="15" width="2" height="9" fill="#4a6190"/>
    <rect x="6" y="17" width="6" height="1" fill="#4a6190"/>
    <rect x="6" y="20" width="6" height="1" fill="#4a6190"/>
  </svg>`;
}

/** Autumn by the calendar in New York. Snow comes only from the weather. */
function season(now = new Date()): 'autumn' | 'other' {
  const month = Number(new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York', month: 'numeric'}).format(now));
  return month >= 9 && month <= 11 ? 'autumn' : 'other';
}

function car(i: number, lane: number, rest: number): string {
  const color = CAR_COLORS[i % CAR_COLORS.length];
  const dur = 11 + ((i * 3) % 9);
  const delay = -((i * 5) % dur);
  return `<span class="car lane-${lane}" style="--rest:${rest}%;--dur:${dur}s;--delay:${delay}s;background:${color}"></span>`;
}

export function mountStreet(scene: HTMLElement, activity: Activity | null): void {
  const slot = scene.querySelector('.rail-slot') ?? scene;
  if (slot.querySelector('.el')) return;

  const tempo = activity?.tempo ?? 0.15;
  const run = Math.round(38 - tempo * 22);
  const count = activity ? Math.min(7, 1 + Math.round(tempo * 6)) : 2;

  const el = document.createElement('div');
  el.className = 'el';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="el-escape">${fireEscape()}</div>
    <div class="el-rail"></div>
    <div class="el-train" style="--run:${run}s">${train()}</div>
    <div class="el-train back" style="--run:${run + 7}s">${train()}</div>`;
  slot.append(el);

  const street = document.createElement('div');
  street.className = 'street';
  street.dataset.season = season();
  street.setAttribute('aria-hidden', 'true');
  const puddles = [16, 47, 78].map((at, i) => `<span class="puddle" style="--at:${at}%;--i:${i}"><i></i></span>`);
  const leaves =
    street.dataset.season === 'autumn'
      ? [6, 23, 41, 58, 71, 89].map((at, i) => `<span class="leaf leaf-${i % 3}" style="--at:${at}%;--i:${i}"></span>`)
      : [];
  const cars: string[] = [];
  for (let i = 0; i < count; i++) cars.push(car(i, i % 2, 8 + ((i * 17) % 78)));
  street.innerHTML = puddles.join('') + leaves.join('') + cars.join('');
  slot.append(street);

  const note = document.createElement('p');
  note.className = 'street-note';
  note.textContent = activity
    ? `Traffic paced to the last 7 days: ${activity.last7} contributions, ${Math.round(tempo * 100)}% of the busiest week.`
    : 'Traffic paced to recent activity.';
  street.after(note);
}
