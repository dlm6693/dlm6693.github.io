/** Sky over the page: New York time of day (sun, moon phase, stars) plus live Queens weather. */
const TZ = 'America/New_York';
const LAT = 40.73; // Queens, NY
const LON = -73.87;
const MIN = 6e4;
const RAD = Math.PI / 180;
const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=40.73&longitude=-73.87' +
  '&current=temperature_2m,weather_code,cloud_cover,wind_speed_10m,is_day' +
  '&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York';

type Phase = 'night' | 'dawn' | 'day' | 'dusk';
type Condition = 'clear' | 'partly cloudy' | 'overcast' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
type Weather = {temp: number; condition: Condition; cover: number; wind: number};

// Sunrise and sunset (ms since the epoch) on a calendar date, from NOAA's
// "General Solar Position Calculations"; good to a minute or two here.
function sunTimes(y: number, m: number, d: number): {rise: number; set: number} {
  const day0 = Date.UTC(y, m - 1, d);
  const doy = (day0 - Date.UTC(y, 0, 1)) / 864e5 + 1;
  const len = (Date.UTC(y + 1, 0, 1) - Date.UTC(y, 0, 1)) / 864e5;
  const g = ((2 * Math.PI) / len) * (doy - 1);
  const eqt =
    229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl =
    0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = Math.acos(Math.cos(90.833 * RAD) / (Math.cos(LAT * RAD) * Math.cos(decl)) - Math.tan(LAT * RAD) * Math.tan(decl)) / RAD;
  return {rise: day0 + (720 - 4 * (LON + ha) - eqt) * MIN, set: day0 + (720 - 4 * (LON - ha) - eqt) * MIN};
}

const localDate = new Intl.DateTimeFormat('en-CA', {timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit'});
const localTime = new Intl.DateTimeFormat('en-US', {timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});

// Dawn reaches 45 minutes either side of sunrise; dusk 60 before and 45 after sunset.
function phaseAt(now: number): Phase {
  const [y, m, d] = localDate.format(now).split('-').map(Number);
  const {rise, set} = sunTimes(y, m, d);
  if (now < rise - 45 * MIN) return 'night';
  if (now < rise + 45 * MIN) return 'dawn';
  if (now < set - 60 * MIN) return 'day';
  if (now < set + 45 * MIN) return 'dusk';
  return 'night';
}

// Lunar phase as a fraction of the synodic month: 0 new, 0.5 full.
const SYNODIC = 29.530588853;
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
function moonPhase(now: number): number {
  const f = ((now - NEW_MOON) / 864e5 / SYNODIC) % 1;
  return f < 0 ? f + 1 : f;
}

// A 16x16 pixel moon: the terminator is an ellipse whose width follows the phase.
function moonSvg(p: number): string {
  const n = 16;
  const c = (n - 1) / 2;
  const k = Math.cos(2 * Math.PI * p);
  const px: string[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const dx = (x - c) / (n / 2);
      const dy = (y - c) / (n / 2);
      if (dx * dx + dy * dy > 1) continue;
      const edge = k * Math.sqrt(Math.max(0, 1 - dy * dy));
      const lit = p < 0.5 ? dx > edge : dx < -edge;
      px.push(`<rect x="${x}" y="${y}" width="1" height="1" class="${lit ? 'lit' : 'dim'}"/>`);
    }
  }
  return `<svg class="sky-moon" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges">${px.join('')}</svg>`;
}

// Small seeded generator (mulberry32) so the layout is the same on every page.
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pct = (v: number) => `${v.toFixed(1)}%`;
const tag = (cls: string, style: string) => `<i class="${cls}" style="${style}"></i>`;

function starsHtml(): string {
  const r = rng(40730);
  let out = '';
  for (let i = 0; i < 40; i++) {
    const style = `--left:${pct(r() * 100)};--top:${pct(r() * 55)};--delay:${(r() * 5).toFixed(1)}s`;
    out += tag(i % 3 === 0 ? 'sky-star sky-tw' : 'sky-star', style);
  }
  return out;
}

function bodiesHtml(phase: Phase, now: number): string {
  if (phase === 'day') return '<i class="sky-sun sky-sun-high"></i>';
  if (phase === 'night') return starsHtml() + moonSvg(moonPhase(now));
  return starsHtml() + '<i class="sky-sun sky-sun-low"></i>';
}

function wmo(code: number): Condition {
  if (code <= 1) return 'clear';
  if (code === 2) return 'partly cloudy';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'thunderstorm';
  return 'partly cloudy';
}

const DROPS: Partial<Record<Condition, number>> = {drizzle: 16, rain: 40, thunderstorm: 48};
const WET = new Set<Condition>(['drizzle', 'rain', 'snow', 'thunderstorm']);

function weatherHtml(w: Weather): string {
  const r = rng(7387);
  const parts: string[] = [];
  let clouds = Math.round((w.cover / 100) * 6);
  if (w.condition === 'overcast') clouds = Math.max(clouds, 4);
  if (WET.has(w.condition)) clouds = Math.max(clouds, 3);
  const drift = Math.max(70, 260 - w.wind * 9); // seconds to cross, faster in wind
  for (let i = 0; i < clouds; i++) {
    const width = 48 + Math.round(r() * 72);
    parts.push(tag('sky-cloud', `--left:${pct(r() * 88)};--top:${pct(4 + r() * 36)};width:${width}px;` +
      `--dur:${Math.round(drift * (0.8 + r() * 0.5))}s;--delay:-${Math.round(r() * drift)}s`));
  }
  const drops = DROPS[w.condition] ?? 0;
  const fall = w.condition === 'drizzle' ? 1.6 : 0.9;
  for (let i = 0; i < drops; i++) {
    parts.push(tag('sky-drop', `--left:${pct(r() * 100)};--top:${pct(r() * 70)};--dur:${(fall * (0.8 + r() * 0.4)).toFixed(2)}s;--delay:-${(r() * 2).toFixed(2)}s`));
  }
  if (w.condition === 'snow') {
    for (let i = 0; i < 30; i++) {
      parts.push(tag('sky-flake', `--left:${pct(r() * 100)};--top:${pct(r() * 70)};--dur:${(9 + r() * 6).toFixed(1)}s;--delay:-${(r() * 15).toFixed(1)}s`));
    }
  }
  if (w.condition === 'fog') parts.push('<i class="sky-fog"></i>');
  if (w.condition === 'thunderstorm') parts.push('<i class="sky-flash"></i>');
  return parts.join('');
}

async function fetchWeather(): Promise<Weather | undefined> {
  try {
    const res = await fetch(WEATHER_URL);
    if (!res.ok) return undefined;
    const data = (await res.json()) as {current?: Record<string, unknown>};
    const c = data.current ?? {};
    const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : NaN);
    const temp = num(c.temperature_2m);
    const code = num(c.weather_code);
    if (Number.isNaN(temp) || Number.isNaN(code)) return undefined;
    return {temp, condition: wmo(code), cover: num(c.cloud_cover) || 0, wind: num(c.wind_speed_10m) || 0};
  } catch {
    return undefined;
  }
}

export function mountSky(world: HTMLElement): void {
  if (world.querySelector('.sky')) return;
  const sky = document.createElement('div');
  sky.className = 'sky';
  sky.setAttribute('aria-hidden', 'true');
  sky.innerHTML = '<div class="sky-tint"></div><div class="sky-bodies"></div><div class="sky-weather"></div>';
  world.prepend(sky);
  const bodies = sky.querySelector<HTMLElement>('.sky-bodies')!;
  const weatherLayer = sky.querySelector<HTMLElement>('.sky-weather')!;

  const readout = document.createElement('span');
  readout.className = 'sky-readout';
  readout.setAttribute('aria-hidden', 'true');
  readout.innerHTML =
    '<span class="sky-place">Queens</span><span class="sky-wx"></span><span class="sky-sep"> · </span><span class="sky-time"></span>';
  const hud = world.querySelector<HTMLElement>('.hud');
  const toggle = hud?.querySelector('.motion-toggle');
  if (toggle) toggle.after(readout);
  else hud?.append(readout);
  const wx = readout.querySelector<HTMLElement>('.sky-wx')!;
  const time = readout.querySelector<HTMLElement>('.sky-time')!;

  let phase: Phase | undefined;
  let weather: Weather | undefined;
  const paint = () => {
    const now = Date.now();
    const next = phaseAt(now);
    if (next !== phase) {
      phase = next;
      sky.dataset.phase = next;
      bodies.innerHTML = bodiesHtml(next, now);
    }
    time.textContent = localTime.format(now);
    wx.textContent = weather ? ` · ${Math.round(weather.temp)}°F · ${weather.condition}` : '';
  };
  paint();
  // Tick on the minute so the clock and phase change together.
  window.setTimeout(() => {
    paint();
    window.setInterval(paint, MIN);
  }, MIN - (Date.now() % MIN));

  const refresh = async () => {
    const w = await fetchWeather();
    if (!w) return;
    weather = w;
    sky.dataset.weather = w.condition;
    weatherLayer.innerHTML = weatherHtml(w);
    paint();
  };
  void refresh();
  window.setInterval(() => void refresh(), 15 * MIN);
}
