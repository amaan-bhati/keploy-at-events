import { headers } from "next/headers";
import { KeployFullLogo } from "@/components/keploy-logo";
import { KeployQr } from "@/components/keploy-qr";
import { PersonCard, ResourceCard } from "@/components/cards";
import { HERO, RESOURCES, SITE, TEAM } from "@/lib/content";
import styles from "./page.module.css";

// The QR code points at whatever address this page is served from (the Vercel
// URL or a custom domain), unless NEXT_PUBLIC_SITE_URL pins it.
async function pageUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export default async function Page() {
  const url = await pageUrl();
  const shown = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className={styles.shell}>
      <div className={styles.glow} aria-hidden="true" />
      <main className={styles.page}>

      <header className={styles.hero}>
        <KeployFullLogo className={styles.logo} aria-label="Keploy" />
        <h1 className={styles.title}>
          {HERO.titleStart} <span className={styles.accent}>{HERO.titleAccent}</span> {HERO.titleEnd}
        </h1>
        <p className={styles.description}>{HERO.description}</p>

        <div className={styles.qrWrap}>
          <div className={styles.qrHalo}>
            <KeployQr value={url} label={`QR code that opens ${shown}`} />
          </div>
          <p className={styles.qrCaption}>Scan to keep this page</p>
          <p className={styles.qrUrl}>{shown}</p>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="team-heading">
        <div className={styles.sectionHead}>
          <h2 id="team-heading" className={styles.h2}>
            Connect with the <span className={styles.accent}>team</span>
          </h2>
          <p className={styles.sub}>Say hello on LinkedIn. We would love to hear what you are building.</p>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map((p, i) => (
            <PersonCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="explore-heading">
        <div className={styles.sectionHead}>
          <h2 id="explore-heading" className={styles.h2}>
            Explore <span className={styles.accent}>Keploy</span>
          </h2>
          <p className={styles.sub}>Pick where to start: open source, testing guides, or the app itself.</p>
        </div>
        <div className={styles.resourceGrid}>
          {RESOURCES.map((r, i) => (
            <div key={r.title} className={r.featured ? styles.span2 : undefined}>
              <ResourceCard r={r} index={i} />
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <a href={SITE.home} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
          keploy.io
        </a>
        <span>© {new Date().getFullYear()} Keploy Inc.</span>
      </footer>
      </main>
    </div>
  );
}
