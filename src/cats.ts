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

export function wanderers(): string {
  const bicolor = cat(
    'bicolor',
    WHITE,
    GREY,
    r(8, 3, 4, 4, GREY) + r(8, 6, 6, 4, GREY) + r(10, 16, 10, 6, GREY_DARK),
    WHITE,
  );
  const mackerel = cat(
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
  );
  const tuxedo = cat(
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
  );
  return `<div class="wander" aria-hidden="true">${bicolor}${mackerel}${tuxedo}</div>`;
}

type Cat = {el: HTMLElement; x: number; y: number; timer?: number};

const STROLL = 70; // px per second
const SPRINT = 260;
const CAT_W = 70;

function motionOn(): boolean {
  return document.documentElement.dataset.motion === 'on';
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Roam the whole page; when a tennis ball turns up where you are reading, chase it. */
export function bootCats(world: HTMLElement): void {
  const wander = world.querySelector<HTMLElement>('.wander');
  if (!wander) return;
  const cats: Cat[] = [...wander.querySelectorAll<HTMLElement>('.walker')].map(el => ({el, x: 0, y: 0}));
  const timers = new Set<number>();
  let ball: HTMLElement | null = null;

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
    return id;
  };
  const bounds = () => ({w: wander.clientWidth - CAT_W, h: wander.clientHeight - 60});
  /** A point inside the part of the page currently on screen. */
  const visiblePoint = () => {
    const top = wander.getBoundingClientRect().top + window.scrollY;
    const {w, h} = bounds();
    const y0 = Math.max(0, window.scrollY - top + 80);
    const y1 = Math.min(h, window.scrollY - top + window.innerHeight - 80);
    return {x: rand(16, w - 16), y: y1 > y0 ? rand(y0, y1) : rand(0, h)};
  };

  const moveTo = (cat: Cat, x: number, y: number, speed: number, then: () => void) => {
    const dist = Math.hypot(x - cat.x, y - cat.y);
    const secs = Math.max(0.3, dist / speed);
    cat.el.classList.toggle('facing-right', x > cat.x);
    cat.el.classList.remove('sitting');
    cat.el.classList.add('walking');
    cat.el.style.transition = `left ${secs}s linear, top ${secs}s linear`;
    cat.el.style.left = `${x}px`;
    cat.el.style.top = `${y}px`;
    cat.x = x;
    cat.y = y;
    if (cat.timer) window.clearTimeout(cat.timer);
    cat.timer = later(() => {
      cat.el.classList.remove('walking');
      then();
    }, secs * 1000);
  };

  const stroll = (cat: Cat) => {
    if (!motionOn()) return;
    const {w, h} = bounds();
    // Mostly short hops nearby, sometimes a long trip.
    const far = Math.random() < 0.25;
    const x = far ? rand(0, w) : Math.min(w, Math.max(0, cat.x + rand(-260, 260)));
    const y = far ? rand(0, h) : Math.min(h, Math.max(0, cat.y + rand(-200, 200)));
    moveTo(cat, x, y, STROLL, () => {
      cat.el.classList.add('sitting');
      cat.timer = later(() => stroll(cat), rand(2000, 6000));
    });
  };

  const placeBall = (x: number, y: number, secs: number) => {
    if (!ball) return;
    ball.style.transition = `left ${secs}s cubic-bezier(.2,.7,.3,1), top ${secs}s cubic-bezier(.2,.7,.3,1), transform ${secs}s linear`;
    ball.style.left = `${x + CAT_W / 2}px`;
    ball.style.top = `${y + 40}px`;
    ball.style.transform = `rotate(${rand(360, 900)}deg)`;
  };

  const rally = (bats: number) => {
    if (!motionOn() || !ball) return;
    const target = visiblePoint();
    placeBall(target.x, target.y, 1.1);
    let caught = false;
    for (const cat of cats) {
      // Everyone runs; they arrive a bit apart because they start in different places.
      moveTo(cat, target.x + rand(-24, 24), target.y + rand(-10, 10), SPRINT + rand(-40, 40), () => {
        if (caught) {
          cat.el.classList.add('sitting');
          return;
        }
        caught = true;
        cat.el.classList.add('batting');
        later(() => cat.el.classList.remove('batting'), 400);
        if (bats > 1) later(() => rally(bats - 1), 450);
        else later(endRally, 600);
      });
    }
  };

  const endRally = () => {
    ball?.classList.add('gone');
    later(() => {
      ball?.remove();
      ball = null;
    }, 700);
    cats.forEach(cat => (cat.timer = later(() => stroll(cat), rand(3000, 7000))));
    later(serve, rand(20_000, 35_000));
  };

  const serve = () => {
    if (!motionOn() || ball) return;
    ball = document.createElement('span');
    ball.className = 'ball';
    const start = visiblePoint();
    ball.style.left = `${start.x}px`;
    ball.style.top = `${start.y}px`;
    wander.append(ball);
    cats.forEach(cat => cat.timer && window.clearTimeout(cat.timer));
    later(() => rally(3 + Math.floor(Math.random() * 3)), 50);
  };

  const start = () => {
    stop();
    if (!motionOn()) return;
    for (const cat of cats) {
      cat.x = cat.el.offsetLeft;
      cat.y = cat.el.offsetTop;
      cat.el.style.left = `${cat.x}px`;
      cat.el.style.top = `${cat.y}px`;
    }
    cats.forEach((cat, i) => (cat.timer = later(() => stroll(cat), 600 + i * 1500)));
    later(serve, 9000);
  };

  function stop() {
    for (const id of timers) window.clearTimeout(id);
    timers.clear();
    ball?.remove();
    ball = null;
    for (const cat of cats) {
      cat.el.removeAttribute('style');
      cat.el.classList.remove('walking', 'sitting', 'batting', 'facing-right');
    }
  }

  start();
  new MutationObserver(() => (motionOn() ? start() : stop())).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-motion'],
  });
}

