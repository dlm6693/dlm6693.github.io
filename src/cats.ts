const r = (x: number, y: number, w: number, h: number, fill: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;

const WHITE = '#f4f6f8';
const GREY = '#8d97a6';
const GREY_DARK = '#5c6574';
const TABBY = '#c4a36a';
const STRIPE = '#3e3428';
const TUX = '#2a241c';
const TUX_STRIPE = '#120e0b';
const NOSE = '#e7a0b0';

function cat(kind: string, body: string, tail: string, extra: string, lid: string): string {
  return `<span class="walker ${kind}"><span class="hop"><svg class="cat" viewBox="0 0 44 32" aria-hidden="true" shape-rendering="crispEdges">
    <g class="tail">${r(30, 16, 8, 3, tail)}${r(36, 13, 3, 5, tail)}</g>
    ${r(6, 14, 22, 12, body)}
    ${r(8, 6, 16, 10, body)}
    ${r(8, 3, 4, 4, body)}
    ${r(18, 3, 4, 4, body)}
    ${r(4, 22, 5, 4, body)}
    ${r(22, 22, 5, 4, body)}
    ${extra}
    ${r(12, 10, 2, 2, '#1a1a1a')}
    ${r(18, 10, 2, 2, '#1a1a1a')}
    ${r(15, 13, 2, 1, NOSE)}
    <g class="lid">${r(11, 9, 4, 3, lid)}${r(17, 9, 4, 3, lid)}</g>
    ${r(6, 26, 20, 2, '#07111f')}
  </svg></span></span>`;
}

const COATS: Array<[string, string, string, string, string]> = [
  ['bicolor', WHITE, GREY, r(8, 3, 4, 4, GREY) + r(8, 6, 6, 4, GREY) + r(10, 16, 10, 6, GREY_DARK), WHITE],
  [
    'mackerel',
    TABBY,
    TABBY,
    r(9, 4, 1, 6, STRIPE) +
      r(13, 5, 1, 5, STRIPE) +
      r(17, 4, 1, 6, STRIPE) +
      r(11, 16, 2, 8, STRIPE) +
      r(16, 16, 2, 8, STRIPE) +
      r(21, 16, 2, 8, STRIPE),
    TABBY,
  ],
  [
    'tuxedo',
    TUX,
    TUX,
    r(10, 5, 1, 5, TUX_STRIPE) +
      r(14, 4, 1, 6, TUX_STRIPE) +
      r(18, 5, 1, 5, TUX_STRIPE) +
      r(12, 16, 2, 8, TUX_STRIPE) +
      r(18, 16, 2, 8, TUX_STRIPE) +
      r(12, 18, 8, 5, WHITE) +
      r(4, 23, 5, 3, WHITE) +
      r(22, 23, 5, 3, WHITE) +
      r(11, 12, 8, 3, WHITE),
    TUX,
  ],
];

export function wanderers(): string {
  return '';
}

type Mood = 'run' | 'towers' | 'skyline' | 'chase' | 'traffic' | 'puddle';
type Cat = {el: HTMLElement; x: number; y: number; timer?: number; mood: Mood; at: number; quarry?: HTMLElement};

const WALK = 78;
const SPRINT = 260;
const CAT = 58;
/** Landing spots on the contribution city, as fractions of the picture. */
const SKY = [
  [0.18, 0.58], [0.30, 0.50], [0.42, 0.44], [0.52, 0.38], [0.63, 0.46],
  [0.74, 0.54], [0.28, 0.66], [0.46, 0.62], [0.60, 0.68], [0.36, 0.74],
];

function motionOn(): boolean {
  return document.documentElement.dataset.motion === 'on';
}
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T>(xs: T[]): T => xs[Math.floor(Math.random() * xs.length)];

/**
 * Each cat picks its own activity and keeps it for a little while: running
 * the page, hopping the yearly towers, hopping the contribution city, or
 * chasing the tennis ball.
 */
export function bootCats(world: HTMLElement): void {
  const play = document.createElement('div');
  play.className = 'play';
  play.setAttribute('aria-hidden', 'true');
  world.append(play);

  const starters: Mood[] = ['run', 'towers', 'skyline'];
  const cats: Cat[] = COATS.map((coat, i) => {
    const tpl = document.createElement('template');
    tpl.innerHTML = cat(...coat).trim();
    const el = tpl.content.firstElementChild;
    if (!(el instanceof HTMLElement)) throw new Error('cat');
    play.append(el);
    return {el, x: 0, y: 0, mood: starters[i] ?? 'run', at: i * 3};
  });

  const timers = new Set<number>();
  let ball: HTMLElement | null = null;
  let ballAt = {x: 0, y: 0};
  let ballMove = 0;

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
    return id;
  };

  const box = () => ({w: Math.max(8, play.clientWidth - CAT), h: Math.max(48, play.clientHeight - 48)});
  const tall = () => cats[0]?.el.offsetHeight || 36;

  const roofs = () => {
    const origin = play.getBoundingClientRect();
    return [...document.querySelectorAll<HTMLElement>('.tower-body')].map(el => {
      const r = el.getBoundingClientRect();
      return {x: r.left - origin.left + r.width / 2 - CAT / 2, y: r.top - origin.top - tall() + 8};
    });
  };

  const skyline = () => {
    const frame = document.querySelector('.city-frame');
    if (!frame) return [];
    const origin = play.getBoundingClientRect();
    const r = frame.getBoundingClientRect();
    if (r.width < 40) return [];
    return SKY.map(([fx, fy]) => ({
      x: r.left - origin.left + r.width * fx - CAT / 2,
      y: r.top - origin.top + r.height * fy - tall() + 8,
    }));
  };

  const choices = (c: Cat): Mood[] => {
    const moods: Mood[] = ['run', 'chase'];
    if (roofs().length > 1) moods.push('towers');
    if (skyline().length) moods.push('skyline');
    if (document.querySelector('.car, .el-train')) moods.push('traffic');
    if (puddles().length) moods.push('puddle');
    return moods.filter(m => m !== c.mood).concat(c.mood);
  };

  const puddles = () => {
    const origin = play.getBoundingClientRect();
    return [...document.querySelectorAll<HTMLElement>('.puddle')]
      .map(el => el.getBoundingClientRect())
      .filter(r => r.width > 0 && r.bottom > 0 && r.top < window.innerHeight)
      .map(r => ({x: r.left - origin.left + r.width / 2 - CAT / 2, y: r.top - origin.top - tall() + 6}));
  };

  const ground = () => {
    const origin = play.getBoundingClientRect();
    const {w, h} = box();
    const viewTop = Math.max(64, -origin.top + 24);
    const viewBot = Math.min(h, -origin.top + window.innerHeight - 72);
    const blocked = 'p, h1, h2, h3, li, a, button, dd, dt, figcaption, .meter, .hud, .foot';
    for (let i = 0; i < 12; i++) {
      const x = rand(8, w);
      const y = viewBot > viewTop ? rand(viewTop, viewBot) : rand(64, h);
      const hit = document.elementFromPoint(origin.left + x + 20, origin.top + y + 12);
      if (hit?.closest(blocked)) continue;
      return {x, y};
    }
    return {x: rand(8, w), y: Math.min(h, Math.max(64, -origin.top + window.innerHeight - 88))};
  };

  const jump = (c: Cat, x: number, y: number, done: () => void) => {
    c.el.classList.remove('walking', 'sitting');
    c.el.classList.add('leaping');
    c.el.classList.toggle('facing-right', x > c.x + 4);
    const secs = 0.46;
    c.el.style.transition = `left ${secs}s linear, top ${secs}s ease-in`;
    c.el.style.left = `${x}px`;
    c.el.style.top = `${y}px`;
    c.x = x;
    c.y = y;
    if (c.timer) window.clearTimeout(c.timer);
    c.timer = later(() => {
      c.el.classList.remove('leaping');
      done();
    }, secs * 1000);
  };

  const go = (c: Cat, x: number, y: number, speed: number, done: () => void) => {
    const {w, h} = box();
    x = Math.min(w, Math.max(0, x));
    y = Math.min(h, Math.max(40, y));
    const secs = Math.max(0.28, Math.hypot(x - c.x, y - c.y) / speed);
    c.el.classList.toggle('facing-right', x > c.x + 4);
    c.el.classList.remove('sitting', 'leaping');
    c.el.classList.add('walking');
    c.el.style.transition = `left ${secs}s linear, top ${secs}s linear`;
    c.el.style.left = `${x}px`;
    c.el.style.top = `${y}px`;
    c.x = x;
    c.y = y;
    if (c.timer) window.clearTimeout(c.timer);
    c.timer = later(() => {
      c.el.classList.remove('walking');
      done();
    }, secs * 1000);
  };

  const move = (c: Cat, x: number, y: number, done: () => void) => {
    if (Math.abs(y - c.y) > 28) jump(c, x, y, done);
    else go(c, x, y, c.mood === 'chase' ? SPRINT : WALK, done);
  };

  const relocate = () => {
    if (!ball) return;
    const pads = [...roofs(), ...skyline(), ground()];
    ballAt = pick(pads);
    const secs = 0.7;
    ball.style.transition = `left ${secs}s cubic-bezier(.2,.7,.3,1), top ${secs}s cubic-bezier(.2,.7,.3,1)`;
    ball.style.left = `${ballAt.x + 18}px`;
    ball.style.top = `${ballAt.y + 20}px`;
    window.clearTimeout(ballMove);
    ballMove = later(() => relocate(), rand(2200, 4200));
  };

  const serve = () => {
    if (!motionOn() || ball) return;
    ball = document.createElement('span');
    ball.className = 'ball';
    play.append(ball);
    ballAt = ground();
    ball.style.left = `${ballAt.x}px`;
    ball.style.top = `${ballAt.y}px`;
    ballMove = later(() => relocate(), 900);
  };

  const rest = (c: Cat, then: () => void, lo: number, hi: number) => {
    c.el.classList.add('sitting');
    c.timer = later(then, rand(lo, hi));
  };

  const act = (c: Cat) => {
    if (!motionOn()) return;
    if (Math.random() < 0.38) c.mood = pick(choices(c));
    if (c.mood === 'towers') {
      const rs = roofs();
      if (rs.length < 2) {
        c.mood = 'run';
        act(c);
        return;
      }
      c.at = (c.at + (Math.random() < 0.5 ? 1 : rs.length - 1)) % rs.length;
      jump(c, rs[c.at].x, rs[c.at].y, () => rest(c, () => act(c), 500, 1400));
      return;
    }
    if (c.mood === 'skyline') {
      const pads = skyline();
      if (!pads.length) {
        c.mood = 'run';
        act(c);
        return;
      }
      c.at = (c.at + 1 + Math.floor(Math.random() * 3)) % pads.length;
      jump(c, pads[c.at].x, pads[c.at].y, () => rest(c, () => act(c), 500, 1400));
      return;
    }
    if (c.mood === 'traffic') {
      const fleet = [...document.querySelectorAll<HTMLElement>('.car, .el-train')];
      if (!fleet.length) {
        c.mood = 'run';
        act(c);
        return;
      }
      if (!c.quarry?.isConnected) c.quarry = pick(fleet);
      const origin = play.getBoundingClientRect();
      const r = c.quarry.getBoundingClientRect();
      const gone = r.width < 2 || r.right < origin.left - 30 || r.left > origin.right + 30;
      if (gone) c.quarry = pick(fleet);
      const live = c.quarry.getBoundingClientRect();
      const x = live.left - origin.left + live.width / 2 - CAT / 2;
      const y = live.top - origin.top - tall() + live.height;
      if (Math.hypot(c.x - x, c.y - y) < 28) {
        c.el.classList.add('sitting');
        c.timer = later(() => act(c), rand(200, 500));
        return;
      }
      move(c, x, y, () => act(c));
      return;
    }
    if (c.mood === 'puddle') {
      const spots = puddles();
      if (!spots.length) {
        c.mood = 'run';
        act(c);
        return;
      }
      const spot = pick(spots);
      move(c, spot.x, spot.y, () => rest(c, () => act(c), 1600, 3200));
      return;
    }
    if (c.mood === 'chase') {
      if (!ball) {
        c.timer = later(() => act(c), 350);
        return;
      }
      const near = Math.hypot(c.x - ballAt.x, c.y - ballAt.y) < 48;
      if (near) {
        c.el.classList.add('batting');
        later(() => c.el.classList.remove('batting'), 360);
        relocate();
        rest(c, () => act(c), 280, 700);
        return;
      }
      move(c, ballAt.x + rand(-14, 14), ballAt.y + rand(-8, 8), () => act(c));
      return;
    }
    const there = ground();
    go(c, there.x, there.y, WALK, () => rest(c, () => act(c), 700, 2200));
  };

  const park = () => {
    const rs = roofs();
    const pads = skyline();
    const {w, h} = box();
    cats.forEach((c, i) => {
      c.el.classList.add('sitting');
      c.el.classList.remove('walking', 'batting', 'leaping', 'facing-right');
      c.el.style.transition = 'none';
      const spot = i === 0 && rs.length ? rs[0] : i === 1 && pads.length ? pads[3] : {x: w * (0.15 + i * 0.28), y: h - 8};
      c.x = spot.x;
      c.y = spot.y;
      c.el.style.left = `${c.x}px`;
      c.el.style.top = `${c.y}px`;
    });
  };

  const stop = () => {
    for (const id of timers) window.clearTimeout(id);
    timers.clear();
    ball?.remove();
    ball = null;
    park();
  };

  const start = () => {
    stop();
    if (!motionOn()) return;
    cats.forEach((c, i) => {
      c.mood = starters[i] ?? 'run';
      c.timer = later(() => act(c), 1100 + i * 600);
    });
    later(serve, 2500);
  };

  start();
  new MutationObserver(() => (motionOn() ? start() : stop())).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-motion'],
  });
}
