// Everything the page says and links to lives here, so it can be updated
// before an event without touching the layout.

// Links to keploy.io and the Keploy app carry UTM tags, so visits from this
// page show up in GA4 as event traffic. utm_content says which card was used.
const UTM = { utm_source: "event", utm_medium: "qr_linkpage", utm_campaign: "keploy_at_events" };
const tracked = (url: string, card: string) => {
  const u = new URL(url);
  Object.entries({ ...UTM, utm_content: card }).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
};

export const HERO = {
  // The accent word is drawn with the Keploy orange gradient.
  titleStart: "AI writes code.",
  titleAccent: "Keploy",
  titleEnd: "catches what breaks.",
  description:
    "Keploy turns real application traffic into tests and dependency sandboxes, so every change is verified locally, in CI, or across Kubernetes. Open source, any language, no code changes.",
};

export type Person = {
  name: string;
  role: string;
  avatar: string;
  linkedin: string;
};

export const TEAM: Person[] = [
  {
    name: "Neha Gupta",
    role: "Founder",
    avatar: "https://avatars.githubusercontent.com/u/15074229?s=160&v=4",
    linkedin: "https://www.linkedin.com/in/neha-gup/",
  },
  {
    name: "Shubham Jain",
    role: "Co-founder",
    avatar: "https://avatars.githubusercontent.com/u/12831254?s=160&v=4",
    linkedin: "https://www.linkedin.com/in/slayerjain/",
  },
  {
    name: "Amaan Bhati",
    role: "Developer Relations",
    avatar: "https://avatars.githubusercontent.com/u/94218318?s=160&v=4",
    linkedin: "https://www.linkedin.com/in/amaan-bhati/",
  },
  {
    name: "Dhananjay Aggarwal",
    role: "Developer Relations",
    avatar: "https://avatars.githubusercontent.com/u/133662894?s=160&v=4",
    linkedin: "https://www.linkedin.com/in/dhananjay6561/",
  },
];

export type Resource = {
  icon: "github" | "regression" | "api" | "integration" | "app";
  title: string;
  desc: string;
  href: string;
  featured?: boolean;
};

export const RESOURCES: Resource[] = [
  {
    icon: "api",
    title: "API testing",
    desc: "Record real API calls and replay them as tests with mocks, no scripts to write.",
    href: tracked("https://keploy.io/api-testing", "api_testing"),
  },
  {
    icon: "integration",
    title: "Integration testing",
    desc: "Test services against recorded databases, queues and third-party APIs.",
    href: tracked("https://keploy.io/integration-testing", "integration_testing"),
  },
  {
    icon: "regression",
    title: "Regression testing",
    desc: "Catch what a change breaks by replaying production traffic on every pull request.",
    href: tracked("https://keploy.io/regression-testing", "regression_testing"),
  },
  {
    icon: "github",
    title: "Keploy on GitHub",
    desc: "Open source. Star the repo, open an issue, or contribute.",
    href: "https://github.com/keploy/keploy",
  },
  {
    icon: "app",
    title: "Try Keploy",
    desc: "Sign in and generate your first tests from real traffic in minutes.",
    href: tracked("https://app.keploy.io/", "try_keploy"),
    featured: true,
  },
];

export const SITE = {
  title: "Keploy at events",
  description: "Meet the Keploy team: who we are, how to connect, and where to start.",
  home: tracked("https://keploy.io/", "footer"),
};
