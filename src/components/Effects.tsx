import { useEffect, useRef, useState } from "react"
import { SwarmLogo } from "./SwarmIllustrations"

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Runs `onEnter` once when the element scrolls into view. */
export function useInView<T extends Element>(threshold = 0.4) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

const missions = [
  "Recon agent: mapping pages",
  "Probe agent: testing endpoints",
  "Proof agent: confirming risks",
  "Report agent: ranking fixes",
]

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (reduced()) {
      setGone(true)
      return
    }
    document.body.style.overflow = "hidden"
    const start = performance.now()
    const duration = 1900
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else {
        setDone(true)
        document.body.style.overflow = ""
        setTimeout(() => setGone(true), 650)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = ""
    }
  }, [])
  if (gone) return null
  const level = Math.min(missions.length, Math.floor(progress / 25) + 1)
  return (
    <div className={done ? "loader is-done" : "loader"} role="status" aria-label="Loading S.W.A.R.M">
      <div className="loader-card">
        <div className="loader-logo">
          <SwarmLogo className="swarm-logo" />
          <span className="loader-ring" />
        </div>
        <div className="loader-hud">
          <span>LEVEL {String(level).padStart(2, "0")}</span>
          <span>{progress}%</span>
        </div>
        <div className="loader-bar">
          <i style={{ width: `${progress}%` }} />
        </div>
        <ul className="loader-missions">
          {missions.map((m, i) => {
            const state = progress >= (i + 1) * 25 ? "done" : level === i + 1 ? "active" : ""
            return (
              <li key={m} className={state}>
                <span>{state === "done" ? "✓" : state === "active" ? "▸" : "·"}</span>
                {m}
              </li>
            )
          })}
        </ul>
        <p className="loader-title">{progress < 100 ? "Deploying the swarm…" : "Swarm deployed. Let’s go."}</p>
      </div>
    </div>
  )
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.current?.style.setProperty("--p", String(max > 0 ? window.scrollY / max : 0))
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}

export function CountUp({ to, from = 0, duration = 1200 }: { to: number; from?: number; duration?: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.5)
  const [value, setValue] = useState(from)
  useEffect(() => {
    if (!seen) return
    if (reduced()) return setValue(to)
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [seen, to, from, duration])
  return (
    <span ref={ref} className="count-up">
      {value}
    </span>
  )
}

/** Types `text` once `start` is true, after `delay` ms. */
export function Typed({ text, start, delay = 0 }: { text: string; start: boolean; delay?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!start) return
    if (reduced()) return setN(text.length)
    let i = 0
    let timer = 0
    const step = () => {
      i += 1
      setN(i)
      if (i < text.length) timer = window.setTimeout(step, 55)
    }
    timer = window.setTimeout(step, delay)
    return () => clearTimeout(timer)
  }, [start, text, delay])
  const typing = start && n < text.length
  return (
    <code className={typing ? "typed is-typing" : "typed"} aria-label={text}>
      <span className="typed-prompt">$ </span>
      {text.slice(0, n)}
      <span className="caret" />
    </code>
  )
}

/** Primary buttons lean toward the cursor on hover-capable devices. */
export function useMagnetic() {
  useEffect(() => {
    if (reduced() || !window.matchMedia("(hover: hover)").matches) return
    const move = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>(".magnetic")
      document.querySelectorAll<HTMLElement>(".magnetic.is-pulled").forEach((b) => {
        if (b !== el) {
          b.classList.remove("is-pulled")
          b.style.transform = ""
        }
      })
      if (!el || (el as HTMLButtonElement).disabled) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * 0.25
      const y = (e.clientY - (r.top + r.height / 2)) * 0.35
      el.classList.add("is-pulled")
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    document.addEventListener("pointermove", move)
    return () => document.removeEventListener("pointermove", move)
  }, [])
}

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem("swarm-theme", dark ? "dark" : "light")
    } catch {
      /* storage unavailable */
    }
  }, [dark])
  return (
    <button
      className="theme-toggle"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      onClick={() => setDark(!dark)}
    >
      <span className="theme-knob">{dark ? <MoonIcon /> : <SunIcon />}</span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  )
}

