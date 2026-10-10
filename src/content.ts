export const SITE = {
  name: 'David Miller',
  handle: 'dlm6693',
  location: 'Queens, NYC',
  github: 'https://github.com/dlm6693',
  linkedin: 'https://www.linkedin.com/in/david-l-miller',
  // Refreshed from the profile repo by .github/workflows/refresh-city.yml
  skyline: {
    desktop: {src: '/contribution-city.svg', width: 880, height: 680},
    phone: {src: '/contribution-city-phone.svg', width: 440, height: 400},
  },
};

export const INTRO =
  'I build backend infrastructure — currently billing and usage-metering systems for GPU cloud computing at CoreWeave. Before that, I worked on The New York Times’ subscription platform, and on boto3, the AWS SDK for Python.';

export const THROUGH_LINE =
  'Developers, subscribers, and GPU customers are very different audiences. The work underneath has been similar: backend systems people depend on without having to think about them.';

export type Role = {
  org: string;
  title: string;
  current?: boolean;
  summary: string;
};

/** Reverse chronological. */
export const WORK: Role[] = [
  {
    org: 'CoreWeave',
    title: 'Senior Software Engineer',
    current: true,
    summary:
      'Billing infrastructure for GPU cloud computing: metering usage and processing infrastructure usage data reliably enough to bill from. Mostly Go, on Kubernetes.',
  },
  {
    org: 'The New York Times',
    title: 'Senior Software Engineer',
    summary: 'Backend systems for the Times’ subscription platform.',
  },
  {
    org: 'AWS',
    title: 'Software Development Engineer',
    summary: 'Worked on boto3, the AWS SDK for Python.',
  },
];

export const INTERESTS =
  'Distributed systems and backend architecture, mostly — and the properties that decide whether you can trust them: correctness, reliability, observability. Also cloud and data infrastructure, Kubernetes, developer productivity, and programming language design and performance: why a language makes the trade-offs it does, and what they cost.';

export const LANGUAGES = ['Go', 'Python', 'Java'];

export const BIO = {
  lead: 'I’m a backend and infrastructure engineer in Queens. Most of my career has been spent on systems other people build on, depend on, or get billed by.',
  paragraphs: [
    'I started at AWS as a Software Development Engineer on boto3, the AWS SDK for Python. An SDK’s users are all engineers, which makes developer experience hard to ignore — an awkward interface or an unclear error doesn’t stay your problem for long; it becomes everyone’s.',
    'From there I moved to The New York Times as a Senior Software Engineer, working on backend systems for the subscription platform.',
    'Now I’m a senior software engineer at CoreWeave, on billing infrastructure for GPU cloud computing: metering usage and processing infrastructure usage data reliably enough to bill from. Billing is a clarifying domain. “Mostly correct” isn’t a number you can put on an invoice.',
    'Across all three, what I care about has stayed fairly constant: distributed systems and backend architecture that hold up — correct, reliable, and observable enough that you can tell when they aren’t. I’m also interested in developer productivity, and in programming language design and performance. These days I write mostly Go, along with Python and Java.',
    'Outside of work, I live in Queens with three cats. I play tennis, play video games, and follow history. Only one of those counts as exercise.',
  ],
  facts: [
    {label: 'Based', value: 'Queens, NYC'},
    {label: 'Now', value: 'CoreWeave — billing infrastructure'},
    {label: 'Before', value: 'The New York Times — subscription platform'},
    {label: 'Before that', value: 'AWS — boto3'},
    {label: 'Languages', value: 'Go, Python, Java'},
  ],
};

/** Only things that are true right now. Bump `updated` when the content changes, not the design. */
export const NOW = {
  updated: '2026-10',
  updatedLabel: 'October 2026',
  items: [
    {
      label: 'Work',
      body: 'Billing infrastructure at CoreWeave: usage metering, and processing infrastructure usage data reliably.',
    },
    {label: 'Based', body: 'Queens, NYC.'},
  ],
};

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
