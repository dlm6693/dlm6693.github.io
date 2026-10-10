export const SITE = {
  name: 'David Miller',
  handle: 'dlm6693',
  title: 'Software engineer · CoreWeave',
  focus: 'Go · Kubernetes · billing platforms',
  location: 'Queens, NY',
  github: 'https://github.com/dlm6693',
  linkedin: 'https://www.linkedin.com/in/david-l-miller',
  profileCity: '/contribution-city.svg',
  profileCityPhone: '/contribution-city-phone.svg',
};

/** Short blurbs for the home page — depth lives on /about/. */
export const ABOUT_TEASER = [
  'I build billing systems for AI infrastructure at CoreWeave — mostly Go on Kubernetes.',
  'NYC native in Queens. Three cats. Not an OSS highlight reel.',
];

/** Longer bio — personality + path, not a résumé paste. */
export const BIO = {
  lead: 'I like systems that stay boring under load — meters that add up, ledgers that reconcile, APIs that tell the truth about usage.',
  paragraphs: [
    'Right now that means the billing platform at CoreWeave: Go services on Kubernetes, Postgres and Kafka in the middle, Prometheus when something lies. Hyperscale AI infra is loud; the money path has to be quiet and correct.',
    'Before that I maintained boto3 at AWS — the Python SDK a huge slice of the industry imports without thinking about it. Before that, backend work at The New York Times. Different stacks, same job: ship reliable software other people depend on.',
    'I grew up in New York City and live in Queens with my wife and three cats. I care more about clear interfaces and honest telemetry than about collecting stars on GitHub. If something is hard to operate, it is not finished.',
  ],
  asides: [
    {label: 'based', value: 'Queens, NY'},
    {label: 'day job', value: 'CoreWeave billing'},
    {label: 'languages', value: 'Go first · Python & Java as needed'},
    {label: 'shape', value: 'backend · platforms · data paths'},
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
      title: 'Cloud-native day-to-day',
      body: 'Kubernetes, Postgres, Kafka, gRPC/Connect, Prometheus/Grafana, CI that you trust enough to merge on green.',
    },
    {
      title: 'Outside the terminal',
      body: 'Queens life, three cats, and trying not to let the laptop win every evening.',
    },
  ],
  reading: [
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
      'Go services on Kubernetes for the billing platform — usage metering, discretionary credits, and the APIs customers and finance both trust.',
    tags: ['Go', 'Kubernetes', 'Billing', 'gRPC', 'Postgres', 'Kafka'],
  },
  {
    org: 'Amazon Web Services',
    role: 'boto3 maintainer',
    when: 'Past',
    blurb:
      'Maintained the AWS SDK for Python — the client libraries people import when they automate the cloud.',
    tags: ['Python', 'SDK', 'AWS'],
  },
  {
    org: 'The New York Times',
    role: 'Software Engineer',
    when: 'Past',
    blurb: 'Backend engineering at news scale — reliable services behind stories that ship every day.',
    tags: ['Backend', 'Python', 'Java'],
  },
];

export const STACK = [
  {name: 'runtime', value: 'Go · Kubernetes · containers'},
  {name: 'data', value: 'Postgres · Kafka · Redis'},
  {name: 'apis', value: 'gRPC · Connect · REST'},
  {name: 'ops', value: 'Prometheus · Grafana · CI/CD'},
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
