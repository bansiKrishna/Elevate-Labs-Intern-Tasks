/**
 * File: app/page.tsx
 *
 * Purpose:
 * Renders the public landing page for the URL shortener.
 *
 * Responsibilities:
 * - Introduce the product using only capabilities implemented by the backend.
 * - Present the shortening form and explain the supported workflow.
 *
 * Inputs:
 * - No props; the interactive form owns its input and API state.
 *
 * Outputs:
 * - A responsive landing page with navigation, form, feature summary, and footer.
 *
 * Dependencies:
 * - Next.js server rendering, Lucide icons, and the URL shortening form.
 *
 * Notes:
 * Link management and account features are omitted because the backend has no
 * authentication or endpoint for listing a user's links.
 */
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarClock,
  ChartNoAxesColumnIncreasing,
  Link2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { UrlShortenerForm } from "@/components/links/url-shortener-form";

const features = [
  {
    icon: Link2,
    title: "Short by design",
    description:
      "Turn a long destination into a compact link that is easier to share.",
  },
  {
    icon: CalendarClock,
    title: "Your timeline",
    description:
      "Set an optional expiry from one to 365 days when you create a link.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Clicks, not guesswork",
    description:
      "Check the real click count for any link you create, whenever you need it.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <a aria-label="Forma home" className="brand" href="#">
          <span aria-hidden="true" className="brand-mark">
            <Link2 size={17} strokeWidth={2.5} />
          </span>
          <span>forma</span>
        </a>
        <nav aria-label="Main navigation" className="header-nav">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
        </nav>
        <a className="header-cta" href="#shorten">
          Make a link <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </header>

      <section aria-labelledby="hero-title" className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles aria-hidden="true" size={14} />
            A little more intentional
          </div>
          <h1 id="hero-title">
            Good links.
            <br />
            <span>Better first</span>
            <br />
            impressions.
          </h1>
          <p className="hero-description">
            Give every destination a cleaner way in. Create a short link,
            choose an alias, and share it with confidence.
          </p>
          <a className="hero-scroll" href="#shorten">
            Make your first link
            <ArrowDownRight aria-hidden="true" size={16} />
          </a>
          <div aria-label="Product features" className="trust-note">
            <span className="trust-icon">
              <ShieldCheck aria-hidden="true" size={15} />
            </span>
            No account needed. Just a better link.
          </div>
        </div>

        <div className="hero-workspace" id="shorten">
          <div aria-hidden="true" className="workspace-glow" />
          <div className="workspace-topline">
            <div className="workspace-dots">
              <i />
              <i />
              <i />
            </div>
            <span>YOUR LINK, REIMAGINED</span>
            <span className="workspace-status">
              <span /> READY
            </span>
          </div>
          <UrlShortenerForm />
          <div className="workspace-footnote">
            <span className="footnote-sparkle">
              <Sparkles aria-hidden="true" size={12} />
            </span>
            Short, simple, and ready when you are.
          </div>
        </div>

        <div aria-hidden="true" className="hero-index">
          <span>01</span> / 03
        </div>
      </section>

      <section aria-labelledby="features-title" className="features-section" id="features">
        <div className="section-heading">
          <p className="section-kicker">LESS LINK. MORE INTENT.</p>
          <h2 id="features-title">Everything a good link needs.</h2>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, description }, index) => (
            <article className="feature-card" key={title}>
              <div className="feature-card-top">
                <span className="feature-icon">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <span className="feature-index">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-title" className="how-section" id="how-it-works">
        <div className="how-intro">
          <p className="section-kicker">A SMALLER WAY TO SHARE</p>
          <h2 id="how-title">From long link to link worth sharing.</h2>
        </div>
        <div className="how-steps">
          <div className="how-step">
            <span>01</span>
            <div>
              <h3>Paste your destination</h3>
              <p>Any valid HTTP or HTTPS address.</p>
            </div>
          </div>
          <div className="step-rule" />
          <div className="how-step">
            <span>02</span>
            <div>
              <h3>Make it yours</h3>
              <p>Keep the generated code or set a custom alias.</p>
            </div>
          </div>
          <div className="step-rule" />
          <div className="how-step">
            <span>03</span>
            <div>
              <h3>Share the short link</h3>
              <p>Redirects are tracked so you can check real clicks.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a aria-label="Forma home" className="brand footer-brand" href="#">
          <span aria-hidden="true" className="brand-mark">
            <Link2 size={16} strokeWidth={2.5} />
          </span>
          <span>forma</span>
        </a>
        <p>Make every link feel intentional.</p>
        <span className="footer-note">Made for sharing, not clutter.</span>
      </footer>
    </main>
  );
}
