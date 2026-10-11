import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import {
  FindMock,
  FixMock,
  HeroSecurity,
  Icon,
  ProveMock,
  SwarmLogo,
} from "./components/SwarmIllustrations"
import {
  CountUp,
  Loader,
  ScrollProgress,
  ThemeToggle,
  Typed,
  useInView,
  useMagnetic,
} from "./components/Effects"

const pillars = [
  { name: "Find", title: ["See your site the way ", "an attacker does."], body: "We map every page, endpoint and piece of software.", Mock: FindMock },
  { name: "Prove", title: ["Real risks only. ", "Most false alarms, gone."], body: "Every finding is tested before it reaches you.", Mock: ProveMock },
  { name: "Fix", title: ["Fixes you can ", "ship today."], body: "Plain-English steps for every confirmed risk.", Mock: FixMock },
]

const faqs = [
  [
    "Is it legal to scan my website?",
    "Yes, if it's yours. S.W.A.R.M. makes you prove ownership first, with a DNS record or a file on your site, and it only tests what you approve. Never scan a site you don't own or aren't authorised to test.",
  ],
  [
    "Will it break my site?",
    "Not by default. S.W.A.R.M. starts in a safe mode that sends no attack traffic. Live testing is opt-in, only unlocks after ownership is verified, and works best on a staging copy of your site.",
  ],
  [
    "Do I need security expertise?",
    "No. Every finding is explained in plain language with step-by-step fixes. If you can edit your site's code or settings, you can follow the report.",
  ],
  [
    "How is this different from a normal scanner?",
    'Scanners hand you a long list of "maybe" issues. S.W.A.R.M. tries to prove each one and drops the false alarms, so your report is shorter and you can trust what\'s in it.',
  ],
  [
    "What kinds of problems does it look for?",
    "Common web-app weaknesses from the OWASP Top 10, such as injection flaws, broken access control, misconfigurations and exposed software versions.",
  ],
  [
    "When can I try it, and what will it cost?",
    "S.W.A.R.M. is in early development. Join the waitlist for early access, and we'll share pricing before anyone is charged.",
  ],
]
const links = [
  ["How it works", "how-it-works"],
  ["Platform", "platform"],
  ["Pricing", "pricing"],
  ["FAQ", "faq"],
]

function Waitlist({ close }: { close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog.current?.showModal()
    dialog.current?.querySelector("input")?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className="waitlist"
      aria-labelledby="waitlist-title"
      onCancel={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="modal-content">
        <button
          className="close-button"
          aria-label="Close waitlist"
          onClick={close}
        >
          <Icon kind="close" />
        </button>
        <SwarmLogo className="swarm-logo modal-logo" />
        <span className="eyebrow">YOUR SECURITY TEAM IS COMING</span>
        <h2 id="waitlist-title">Join the S.W.A.R.M waitlist</h2>
        <p>
          Get ready for a little more peace of mind. Early access is on the way.
        </p>
        <form onSubmit={(event) => event.preventDefault()}>
          <label>
            Name
            <input name="name" autoComplete="name" placeholder="Your name" />
          </label>
          <label>
            Company / startup name
            <input
              name="company"
              autoComplete="organization"
              placeholder="Your company"
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>
          <button className="button primary" disabled>
            Join the waitlist
          </button>
          <p className="form-notice">
            Waitlist registration is coming soon. This form is a preview and
            does not submit your details.
          </p>
        </form>
      </div>
    </dialog>
  )
}

function AgentPanel({ open }: { open: () => void }) {
  const [selected, setSelectedRaw] = useState(0)
  const [dir, setDir] = useState(1)
  const setSelected = (next: number) => {
    setDir(next >= selected ? 1 : -1)
    setSelectedRaw(next)
  }
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const item = pillars[selected]
  function navigate(event: KeyboardEvent, index: number) {
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % pillars.length
    else if (event.key === "ArrowLeft")
      next = (index + pillars.length - 1) % pillars.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = pillars.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    tabRefs.current[next]?.focus()
  }
  return (
    <section id="platform" className="swarm-section section container">
      <div className="section-heading">
        <span className="eyebrow">ONE PLATFORM. THREE JOBS.</span>
        <h2 className="sequence-heading">
          Find it <span className="seq-arrow" aria-hidden="true">→</span> Prove
          it <span className="seq-arrow" aria-hidden="true">→</span> Fix it
        </h2>
        <p>Everything a security team does, without hiring one.</p>
      </div>
      <div className="agent-tabs" role="tablist" aria-label="S.W.A.R.M capabilities">
        {pillars.map((p, index) => (
          <button
            key={p.name}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            role="tab"
            id={`tab-${index}`}
            aria-controls={`panel-${index}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onKeyDown={(event) => navigate(event, index)}
            onClick={() => setSelected(index)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div
        className="agent-panel"
        role="tabpanel"
        id={`panel-${selected}`}
        aria-labelledby={`tab-${selected}`}
        tabIndex={0}
      >
        <div className="agent-copy">
          <h3 key={selected} className="tab-swap">
            {item.title[0]}
            <span>{item.title[1]}</span>
          </h3>
          <p>{item.body}</p>
          <button className="button panel-cta" onClick={open}>
            Join the waitlist <span>→</span>
          </button>
        </div>
        <div className={dir > 0 ? "agent-visual from-right" : "agent-visual from-left"} key={selected}>
          <div className="mock-ghost" aria-hidden="true" />
          <item.Mock />
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [modal, setModal] = useState(false)
  const [menu, setMenu] = useState(false)
  const [faq, setFaq] = useState<number | null>(0)
  const open = () => setModal(true)
  useMagnetic()
  const [feedRef, feedSeen] = useInView<HTMLDivElement>(0.35)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(-1)
  useEffect(() => {
    const steps = stepsRef.current?.querySelectorAll<HTMLElement>(".step")
    if (!steps) return
    const onScroll = () => {
      const line = window.innerHeight * 0.62
      let active = -1
      steps.forEach((step, i) => {
        if (step.getBoundingClientRect().top < line) active = i
      })
      setActiveStep(active)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      [
        ".section-heading > *",
        ".problem-copy > *",
        ".benefits > div:first-child > *",
        ".pricing > div > *",
        ".pricing > .button",
        ".faq-section > div:first-child > *",
        ".final-cta > *",
        ".step",
        ".bento-tile",
        ".faq-item",
        ".agent-tabs",
        ".agent-panel",
        ".threat-feed",
      ].join(","),
    )
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12 },
    )
    targets.forEach((el) => {
      const siblings = el.parentElement ? [...el.parentElement.children] : []
      el.style.setProperty("--i", String(Math.max(0, siblings.indexOf(el))))
      el.classList.add("reveal")
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return (
    <>
      <Loader />
      <ScrollProgress />
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#" aria-label="S.W.A.R.M home">
            <SwarmLogo />
            S.W.A.R.M
          </a>
          <nav
            className={menu ? "navigation is-open" : "navigation"}
            aria-label="Main navigation"
          >
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <button className="button header-cta magnetic" onClick={open}>
            Join the waitlist <span>↗</span>
          </button>
          <button
            className="menu-button"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon kind={menu ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span /> AI-powered website security
            </div>
            <h1>
              <span className="h1-line">
                An <span className="highlight">AI security review</span>
              </span>
              for your product. At a price you can actually afford.
            </h1>
            <p>
              S.W.A.R.M finds the vulnerabilities in your website, proves which
              ones are real, and shows you exactly how to fix them.
            </p>
            <form
              className="hero-form"
              onSubmit={(event) => {
                event.preventDefault()
                open()
              }}
            >
              <input
                type="email"
                aria-label="Work email"
                placeholder="you@company.com"
              />
              <button className="button primary magnetic">
                Join the waitlist <span>↗</span>
              </button>
            </form>
            <div className="hero-note">
              <span className="live-dot" /> Early access coming soon
            </div>
          </div>
          <div className="hero-art">
            <HeroSecurity />
          </div>
        </section>
        <div className="marquee" aria-label="Highlights">
          <div className="marquee-track">
            {[0, 1].map((copy) =>
              ["Built for startups and small teams", "Ownership verified before every scan", "Plain-language reports", "No security department required"].map((t, i) => (
                <span
                  key={`${copy}-${t}`}
                  aria-hidden={copy === 1}
                  className={i % 2 ? "pill pill-maroon" : "pill pill-dark"}
                >
                  <Icon kind="shield" /> {t}
                </span>
              )),
            )}
          </div>
        </div>
        <section className="problem container section">
          <div className="problem-visual threat-feed" ref={feedRef}>
            <div className="feed-head">
              What attackers try on a typical small site
              <em>Example</em>
            </div>
            {[
              ["SQL injection attempt", "/login", "Exposed"],
              ["Credential stuffing", "/api/auth", "Exposed"],
              ["Path traversal probe", "/files", "Exposed"],
              ["Bot scraping pricing", "/pricing", "Exposed"],
            ].map(([t, path, st], i) => (
              <div className={feedSeen ? "feed-row is-on" : "feed-row"} key={t} style={{ transitionDelay: `${i * 0.55}s` }}>
                <Icon kind="shield" />
                <div>
                  <strong>{t}</strong>
                  <Typed text={path} start={feedSeen} delay={i * 550 + 250} />
                </div>
                <span className="pill pill-maroon">{st}</span>
              </div>
            ))}
            <div className={feedSeen ? "feed-final is-on" : "feed-final"}>S.W.A.R.M. finds these first.</div>
          </div>
          <div className="problem-copy">
            <span className="eyebrow">
              THE PROBLEM WITH “WE’LL FIX IT LATER”
            </span>
            <h2>
              Hackers don’t care
              <br />
              that you’re a <span className="mark">small team.</span>
            </h2>
            <p>
              Small businesses and startups face real security risks—often
              without the budget for a dedicated security team. So they ship,
              and hope.
            </p>
            <p className="problem-last">You deserve more than hope.</p>
          </div>
        </section>
        <section id="how-it-works" className="how-section section container">
          <div className="section-heading">
            <span className="eyebrow">FROM URL TO PEACE OF MIND</span>
            <h2>
              Your URL. Our swarm.
              <br />A <span className="mark">clear way forward.</span>
            </h2>
          </div>
          <div className="steps" ref={stepsRef}>
            {[
              ["Point the swarm at your site", "Enter your URL and verify you own it."],
              ["S.W.A.R.M. gets to work", "S.W.A.R.M. scans your site and tests for real weaknesses."],
              ["Get your report", "Get a ranked report with step-by-step fixes."],
            ].map(([title, text], index) => (
              <div className={`step${activeStep >= index ? " is-active" : ""}`} key={title}>
                <div className="step-card">
                  <span className="step-big">{index + 1}</span>
                  {index === 0 ? (
                    <div className="sm-url">
                      <div className="sm-input">
                        <span>https://your-site.com</span>
                        <b>Verify</b>
                      </div>
                      <span className="sm-chip-ok">✓ Ownership verified</span>
                    </div>
                  ) : index === 1 ? (
                    <div className="sm-card">
                      <span className="live-dot sm-live" />
                      {["Mapping pages", "Testing for weaknesses", "Checking results"].map((r, i) => (
                        <div className="sm-row" key={r}>
                          {i === 0 ? <span className="sm-check">✓</span> : <span className="sm-spin" />}
                          {r}
                        </div>
                      ))}
                      <div className="sm-progress"><i /></div>
                    </div>
                  ) : (
                    <div className="sm-card">
                      {[["Missing access control", "High"], ["Security header missing", "Medium"], ["Software version exposed", "Low"]].map(([f, sev], i) => (
                        <div className={`sm-row sm-finding sev-${["high", "med", "low"][i]}`} key={f} tabIndex={0}>
                          <span>{f}</span>
                          <em className={`tag tag-${["high", "med", "low"][i]}`}>{sev}</em>
                        </div>
                      ))}
                    </div>
                  )}
                  {index < 2 && (
                    <svg className="step-arrow" viewBox="0 0 40 16" aria-hidden="true">
                      <path d="M2 8h32M28 2l7 6-7 6" />
                    </svg>
                  )}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <AgentPanel open={open} />
        <section className="benefits container section">
          <div>
            <span className="eyebrow">FIND IT. UNDERSTAND IT. FIX IT.</span>
            <h2>
              Less noise.
              <br />
              More <span className="mark">peace of mind.</span>
            </h2>
          </div>
          <div className="bento">
            <div className="bento-tile bento-black">
              <h3>A prioritized report</h3>
              <p>Ranked by real risk.</p>
              <div className="bento-bars">
                <span style={{ width: "100%" }}>High</span>
                <span style={{ width: "72%" }}>Medium</span>
                <span style={{ width: "46%" }}>Low</span>
              </div>
            </div>
            <div className="bento-tile bento-white">
              <h3>Fixes in plain English</h3>
              <p>No security expertise needed.</p>
              <pre className="bento-code">
                <span className="del">- app.get("/api/users", list)</span>
                {"\n"}
                <span className="add">+ app.get("/api/users", auth, list)</span>
              </pre>
            </div>
            <div className="bento-tile bento-black">
              <h3>Watch it work</h3>
              <p>Follow every step of the scan live.</p>
              <div className="bento-ticker">
                <span className="bento-dot" />
                Testing /login<span className="ticker-dots">...</span>
              </div>
            </div>
            <div className="bento-tile bento-dark">
              <h3>Re-scan anytime</h3>
              <p>Confirm your fixes worked.</p>
              <div className="bento-count">
                <strong><CountUp from={3} to={0} duration={1600} /> <small>open</small></strong>
                <span>3 → 0 findings after fixes</span>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="pricing container">
          <div>
            <span className="eyebrow">
              BIG-TEAM SECURITY. SMALL-TEAM MINDSET.
            </span>
            <h2>
              Early access pricing launching soon.
              <br />
              <span>Be first in line.</span>
            </h2>
            <p>A better way to protect what you’re building is on its way.</p>
          </div>
          <button className="button primary magnetic" onClick={open}>
            Join the waitlist <span>↗</span>
          </button>
        </section>
        <section id="faq" className="faq-section container section">
          <div>
            <span className="eyebrow">GOOD QUESTIONS.</span>
            <h2>
              A little <span className="mark">clarity</span>
              <br />
              before you start.
            </h2>
            <p>Straight answers about safety, scope and what to expect.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className="faq-item" key={question}>
                <h3>
                  <button
                    aria-expanded={faq === index}
                    aria-controls={`answer-${index}`}
                    onClick={() => setFaq(faq === index ? null : index)}
                  >
                    {question}
                    <span>{faq === index ? "−" : "+"}</span>
                  </button>
                </h3>
                <div id={`answer-${index}`} hidden={faq !== index}>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
            <p className="faq-contact">
              Still curious? Email us at{" "}
              <a href="mailto:admin@swarm-ai.me">admin@swarm-ai.me</a>
            </p>
          </div>
        </section>
        <section className="final-cta">
          <SwarmLogo className="swarm-logo cta-logo" />
          <span className="eyebrow">BUILD BOLDLY. SHIP CONFIDENTLY.</span>
          <h2>
            Hope is not a<br />
            <span>security strategy.</span>
          </h2>
          <p>Give your product the security team it deserves.</p>
          <button className="button primary magnetic" onClick={open}>
            Join the waitlist <span>↗</span>
          </button>
        </section>
      </main>
      <footer className="container">
        <div className="footer-top">
          <div>
            <a className="wordmark" href="#">
              <SwarmLogo />
              S.W.A.R.M
            </a>
            <p>Your unfair advantage against vulnerabilities.</p>
          </div>
          <nav aria-label="Footer navigation">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} S.W.A.R.M. All rights reserved.</span>
          <a className="footer-email" href="mailto:admin@swarm-ai.me">
            <span className="footer-email-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span className="footer-email-label">Contact us</span>
            admin@swarm-ai.me
          </a>
        </div>
      </footer>
      {modal && <Waitlist close={() => setModal(false)} />}
    </>
  )
}
