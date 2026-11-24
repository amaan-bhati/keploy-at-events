import Image from "next/image";
import { ArrowUpRight, Braces, Github, Linkedin, RefreshCcw, Rocket, Workflow } from "lucide-react";
import type { Person, Resource } from "@/lib/content";
import styles from "./cards.module.css";

/**
 * Silk waves along the card's bottom edge (same as the keploy.io resources
 * cards): a warm orange glow on the left flowing into lavender on the right.
 * Gradient ids are unique per card.
 */
function Waves({ id }: { id: string }) {
  return (
    <svg className={styles.waves} viewBox="0 0 340 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`wa-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fdba74" stopOpacity="0.05" />
          <stop offset="30%" stopColor="#fdba74" stopOpacity="0.3" />
          <stop offset="62%" stopColor="#f5d0e6" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#d6c8fd" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id={`wb-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.32" />
          <stop offset="40%" stopColor="#fdba74" stopOpacity="0.22" />
          <stop offset="72%" stopColor="#ede2ff" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.42" />
        </linearGradient>
      </defs>
      <path d="M0 100 L0 90 C 90 96, 180 84, 250 56 C 288 40, 318 30, 340 26 L340 100 Z" fill={`url(#wa-${id})`} />
      <path d="M0 100 L0 96 C 110 100, 200 90, 268 68 C 300 58, 324 52, 340 50 L340 100 Z" fill={`url(#wb-${id})`} />
      <path d="M0 100 C 130 100, 240 94, 340 76 L340 100 Z" fill={`url(#wb-${id})`} opacity="0.7" />
    </svg>
  );
}

const ICONS = { api: Braces, integration: Workflow, regression: RefreshCcw, github: Github, app: Rocket };

export function PersonCard({ p, index }: { p: Person; index: number }) {
  return (
    <a
      href={p.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${styles.person}`}
      aria-label={`${p.name}, ${p.role}. Connect on LinkedIn`}
    >
      <Waves id={`p${index}`} />
      <span className={styles.corner} aria-hidden="true">
        <Linkedin className={styles.cornerIcon} strokeWidth={1.9} />
      </span>
      <span className={styles.avatarRing}>
        <Image src={p.avatar} alt="" width={64} height={64} className={styles.avatar} />
      </span>
      <span className={styles.who}>
        <span className={styles.name}>{p.name}</span>
        <span className={styles.role}>{p.role}</span>
      </span>
    </a>
  );
}

export function ResourceCard({ r, index }: { r: Resource; index: number }) {
  const Icon = ICONS[r.icon];
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${r.featured ? styles.featured : ""}`}
    >
      <Waves id={`r${index}`} />
      <span className={styles.corner} aria-hidden="true">
        <ArrowUpRight className={styles.cornerIcon} strokeWidth={2} />
      </span>
      <span className={styles.head}>
        <span className={styles.icon}>
          <Icon className={styles.iconSvg} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className={styles.title}>{r.title}</span>
      </span>
      <span className={styles.desc}>{r.desc}</span>
    </a>
  );
}
