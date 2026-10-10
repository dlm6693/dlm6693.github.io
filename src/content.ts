export const SITE = {
  name: 'David Miller',
  handle: 'dlm6693',
  title: 'Software engineer · CoreWeave',
  focus: 'Go · Kubernetes · billing · developer experience',
  location: 'Queens, NY',
  github: 'https://github.com/dlm6693',
  linkedin: 'https://www.linkedin.com/in/david-l-miller',
  profileCity: '/contribution-city.svg',
  profileCityPhone: '/contribution-city-phone.svg',
};

/** Short blurbs for the home page — depth lives on /about/. */
export const ABOUT_TEASER = [
  'I build billing systems for AI infrastructure at CoreWeave — mostly Go on Kubernetes.',
  'Not on a dedicated tools team, but I care deeply about DevX, CI/CD, and the paths that make engineers faster.',
];

/** Longer bio — personality + path, not a résumé paste. */
export const BIO = {
  lead: 'I like systems that stay boring under load — and tooling that makes the next change feel safe.',
  paragraphs: [
    'Right now that means the billing platform at CoreWeave: Go services on Kubernetes, Postgres and Kafka in the middle, Prometheus when something lies. Hyperscale AI infra is loud; the money path has to be quiet and correct.',
    'I do not sit on a developer-tools team, but I obsess over DevX anyway — local loops, CI that you trust enough to merge on green, clear interfaces, honest telemetry. Shipping product is the job; making the suite around it less painful is how I stay effective.',
    'Before CoreWeave I maintained boto3 at AWS — the Python SDK a huge slice of the industry imports without thinking about it. That was developer tooling at planetary scale: APIs, docs, and release paths other engineers build on.',
    'At The New York Times I worked backend at news scale — services and data paths behind a site that has to ship every day, under editorial deadlines and traffic spikes. Reliability was not optional; the product is the publish button.',
    'I grew up in New York City and live in Queens with my wife and three cats. Stars on GitHub are nice. A green CI run and a teammate who can onboard without a scavenger hunt are better.',
  ],
  asides: [
    {label: 'based', value: 'Queens, NY'},
    {label: 'day job', value: 'CoreWeave billing'},
    {label: 'care about', value: 'DevX · CI/CD · tooling'},
    {label: 'languages', value: 'Go first · Python & Java as needed'},
    {label: 'shape', value: 'backend · platforms · feedback loops'},
  ],
};

/** A living "now" page — update this when life shifts. */
export const NOW = {
  updated: '2026-10',
  items: [
    {
      title: 'Shipping billing at CoreWeave',
      body: 'Go services on k8s for metering, credits, and the APIs finance and customers share. Making the boring path correct is the whole game.',
    },
    {
      title: 'DevX without a tools title',
      body: 'CI/CD, local workflows, and the glue that keeps a platform team moving — even when the org chart says “billing,” not “developer experience.”',
    },
    {
      title: 'Cloud-native day-to-day',
      body: 'Kubernetes, Postgres, Kafka, gRPC/Connect, Prometheus/Grafana, pipelines you can trust.',
    },
    {
      title: 'Outside the terminal',
      body: 'Queens life, three cats, and trying not to let the laptop win every evening.',
    },
  ],
  reading: [
    'DevX and platform-engineering writing when CI starts to hurt',
    'Distributed systems papers when a bug smells philosophical',
    'Whatever the cats approve of on the couch',
  ],
};

export type Role = {
  org: string;
  role: string;
  when: string;
  blurb: string;
  tags: string[];
};

export const EXPERIENCE: Role[] = [
  {
    org: 'CoreWeave',
    role: 'Software Engineer',
    when: 'Present',
    blurb:
      'Go services on Kubernetes for the billing platform — usage metering, discretionary credits, and the APIs customers and finance both trust. Obsessing over CI and DevX even though the team charter is product, not tooling.',
    tags: ['Go', 'Kubernetes', 'Billing', 'CI/CD', 'gRPC', 'Postgres', 'Kafka'],
  },
  {
    org: 'Amazon Web Services',
    role: 'boto3 maintainer',
    when: 'Past',
    blurb:
      'Maintained the AWS SDK for Python — developer tooling at scale: client libraries, release paths, and APIs other engineers build careers on.',
    tags: ['Python', 'SDK', 'DevTools', 'AWS'],
  },
  {
    org: 'The New York Times',
    role: 'Software Engineer',
    when: 'Past',
    blurb:
      'Backend engineering at news scale — services and data paths behind a daily publish machine, where traffic spikes and editorial deadlines do not wait for a flaky deploy.',
    tags: ['Backend', 'Newsroom scale', 'Reliability'],
  },
];

export const STACK = [
  {name: 'runtime', value: 'Go · Kubernetes · containers'},
  {name: 'data', value: 'Postgres · Kafka · Redis'},
  {name: 'apis', value: 'gRPC · Connect · REST'},
  {name: 'devx', value: 'CI/CD · local loops · clear interfaces'},
  {name: 'ops', value: 'Prometheus · Grafana · pipelines'},
  {name: 'also', value: 'Python · Java when the job asks'},
];

export const CREDIT = {
  name: 'Giorgi Kobaidze',
  url: 'https://github.com/georgekobaidze/georgekobaidze',
  post: 'https://dev.to/georgekobaidze/i-turned-my-github-profile-into-a-cyberpunk-console-with-a-city-built-from-my-contributions-h4c',
};

export type NavId = 'home' | 'about' | 'now';

export const NAV: {id: NavId; href: string; label: string}[] = [
  {id: 'home', href: '/', label: 'home'},
  {id: 'about', href: '/about/', label: 'bio'},
  {id: 'now', href: '/now/', label: 'now'},
];
