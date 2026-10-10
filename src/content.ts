export const SITE = {
  name: 'David Miller',
  handle: 'dlm6693',
  title: 'Software engineer · CoreWeave',
  location: 'Queens, NY',
  github: 'https://github.com/dlm6693',
  linkedin: 'https://www.linkedin.com/in/david-l-miller',
  // Local copies refreshed from the profile repo by .github/workflows/refresh-city.yml
  profileCity: '/contribution-city.svg',
  profileCityPhone: '/contribution-city-phone.svg',
};

export const ABOUT = [
  'I build backend systems for AI infrastructure billing at CoreWeave — the meters, ledgers, and APIs that keep hyperscale usage honest.',
  'Before that I maintained the AWS Python SDK (boto3) and worked on backend systems at The New York Times.',
  'NYC native, living in Queens with my wife and three cats. Mostly Python, Java, and Go.',
];

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
      'Building out the billing platform for an AI hyperscaler — usage metering, discretionary credits, and the APIs customers and finance both trust.',
    tags: ['Go', 'Python', 'Billing', 'Distributed systems'],
  },
  {
    org: 'Amazon Web Services',
    role: 'boto3 maintainer',
    when: 'Past',
    blurb:
      'Maintained the AWS SDK for Python used across the industry — the client libraries people import when they automate the cloud.',
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

export const CREDIT = {
  name: 'Giorgi Kobaidze',
  url: 'https://github.com/georgekobaidze/georgekobaidze',
  post: 'https://dev.to/georgekobaidze/i-turned-my-github-profile-into-a-cyberpunk-console-with-a-city-built-from-my-contributions-h4c',
};
