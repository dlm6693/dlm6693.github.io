export const SITE = {
  name: 'David Miller',
  handle: 'dlm6693',
  title: 'Senior software engineer · CoreWeave',
  focus: 'Go · Kubernetes · billing · DevX that does not hurt',
  location: 'Queens, NY',
  github: 'https://github.com/dlm6693',
  linkedin: 'https://www.linkedin.com/in/david-l-miller',
  profileCity: '/contribution-city.svg',
  profileCityPhone: '/contribution-city-phone.svg',
};

/** Short blurbs for the home page — depth lives on /about/. */
export const ABOUT_TEASER = [
  'I build billing systems for AI infrastructure at CoreWeave — mostly Go on Kubernetes.',
  'Not on a tools team. Still the person asking why CI is flaky and why that alert did not page.',
];

/** Longer bio — dry wit, professionally filtered. */
export const BIO = {
  lead: 'I like systems that stay boring under load — and tooling that makes the next change feel safe when you are freshly caffeinated, not Friday-night mush.',
  paragraphs: [
    'Right now that means the billing platform at CoreWeave: Go services on Kubernetes, Postgres and Kafka in the middle, Prometheus when something looks suspicious. Hyperscale AI infra is loud; the money path has to be quiet and correct. If something should have paged and did not, that is the bug.',
    'I do not sit on a developer-tools team, but I obsess over DevX anyway — local loops, CI you trust enough to merge on green, clear interfaces. Shipping product is the job; making the suite around it less painful is how I stay effective (and slightly less sarcastic in Slack).',
    'Before CoreWeave I maintained boto3 at AWS — developer tooling at planetary scale. Think “a package manager for your package manager,” except it was the AWS SDK a huge slice of the industry imports without thinking about it.',
    'At The New York Times I worked backend at news scale — services behind a daily publish machine. Editorial deadlines do not wait for a flaky deploy. Neither should your pipeline.',
    'NYC native, Queens resident, three cats. I will volunteer for the hard on-call question, then joke about never volunteering again. Then I will still cut the ticket for Monday.',
  ],
  asides: [
    {label: 'based', value: 'Queens, NY'},
    {label: 'day job', value: 'CoreWeave billing'},
    {label: 'title', value: 'Senior software engineer'},
    {label: 'care about', value: 'DevX · CI/CD · alerts that page'},
    {label: 'languages', value: 'Go first · Python & Java as needed'},
  ],
};

/** A living "now" page — update this when life shifts. */
export const NOW = {
  updated: '2026-10',
  items: [
    {
      title: 'Shipping billing at CoreWeave',
      body: 'Go on k8s for metering, credits, and APIs finance trusts. Making the boring path correct — and noticing when the chart looks a little too sudden.',
    },
    {
      title: 'DevX without a tools title',
      body: 'CI/CD, local workflows, and the glue that keeps a platform team moving. Happy to collaborate on CI perf — and to admit when I am already mid-refactor.',
    },
    {
      title: 'Cloud-native day-to-day',
      body: 'Kubernetes, Postgres, Kafka, gRPC/Connect, Prometheus/Grafana. Pipelines you can trust. Alerts you wish you did not need until you do.',
    },
    {
      title: 'Outside the terminal',
      body: 'Queens life, three cats, and trying not to open Slack after 8pm on a Friday. (Results vary.)',
    },
  ],
  reading: [
    'Whatever explains the suspicious drop in the Grafana chart',
    'DevX writing when CI starts to hurt',
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
    role: 'Senior Software Engineer',
    when: 'Present',
    blurb:
      'Go services on Kubernetes for the billing platform — usage metering, discretionary credits, APIs customers and finance share. Obsessing over CI and DevX even when the org chart says product, not tooling.',
    tags: ['Go', 'Kubernetes', 'Billing', 'CI/CD', 'gRPC', 'Postgres', 'Kafka'],
  },
  {
    org: 'Amazon Web Services',
    role: 'boto3 maintainer',
    when: 'Past',
    blurb:
      'Maintained the AWS SDK for Python — developer tooling at scale: client libraries and release paths other engineers build careers on.',
    tags: ['Python', 'SDK', 'DevTools', 'AWS'],
  },
  {
    org: 'The New York Times',
    role: 'Software Engineer',
    when: 'Past',
    blurb:
      'Backend at news scale — services behind a daily publish machine, where traffic spikes and deadlines do not wait for a flaky deploy.',
    tags: ['Backend', 'Newsroom scale', 'Reliability'],
  },
];

export const STACK = [
  {name: 'runtime', value: 'Go · Kubernetes · containers'},
  {name: 'data', value: 'Postgres · Kafka · Redis'},
  {name: 'apis', value: 'gRPC · Connect · REST'},
  {name: 'devx', value: 'CI/CD · local loops · green merges'},
  {name: 'ops', value: 'Prometheus · Grafana · alerts that page'},
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
