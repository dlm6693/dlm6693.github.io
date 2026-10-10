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

export const ABOUT = [
  'I build billing systems for AI infrastructure at CoreWeave — mostly Go on Kubernetes: services, APIs, the meters and ledgers finance and customers both trust.',
  'Earlier I maintained the AWS Python SDK (boto3) and worked backend at The New York Times. Python and Java are still in the toolkit; day-to-day is cloud-native Go.',
  'NYC native, living in Queens with my wife and three cats.',
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
