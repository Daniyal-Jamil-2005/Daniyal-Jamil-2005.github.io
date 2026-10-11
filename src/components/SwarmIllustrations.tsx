import { CountUp } from "./Effects"
import type React from "react"
export function Icon({ kind = 0 }: { kind?: number | string }) {
  const paths: Record<string, string> = {
    shield: "M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-6",
    close: "m6 6 12 12M18 6 6 18",
    menu: "M4 6h16M4 12h16M4 18h16",
    code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18",
    url: "M9 15H7a4 4 0 0 1 0-8h4m2 0h4a4 4 0 0 1 0 8h-2M8 11h8",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    refresh: "M20 8a8 8 0 1 0 0 8M20 3v5h-5",
    check: "m5 12 4 4L19 6",
    report: "M6 3h9l4 4v14H6V3Zm9 0v5h4M9 12h7m-7 4h5",
    swarm:
      "M12 8V3m0 18v-5M8 12H3m18 0h-5M5 5l4 4m6 6 4 4m0-14-4 4M9 15l-4 4M12 8l4 4-4 4-4-4 4-4",
    "0": "M12 3v5m0 8v5M3 12h5m8 0h5M8 8h8v8H8V8ZM4 4l4 4m8 8 4 4m0-16-4 4M8 16l-4 4",
    "1": "M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-4v8m-4-4h8",
    "2": "M4 4h5v5H4V4Zm11 0h5v5h-5V4ZM9 15h6v6H9v-6ZM6 9v3h12V9m-6 3v3",
    "3": "M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9h8m-4-4v8",
    "4": "M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-6",
    "5": "M6 3h9l4 4v14H6V3Zm9 0v5h4M9 12h7m-7 4h5",
  }
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[String(kind)] || paths.swarm} />
    </svg>
  )
}

function Agent({
  x,
  y,
  name,
  index,
}: {
  x: number
  y: number
  name: string
  index: number
}) {
  return (
    <g
      transform={`translate(${x},${y})`}
      className={`diagram-agent agent-${index}`}
    >
      <rect
        x="-43"
        y="-29"
        width="86"
        height="68"
        rx="12"
        fill={index % 2 === 0 ? "#f6edf1" : "#eff5f0"}
        stroke="#a88191"
      />
      <path d="M-13-8q13-13 26 0v17h-26V-8Z" fill="white" stroke="#562130" />
      <path
        d="M-6-2v3m12-3v3m-10 5h8M0-17v5m-17 9h4m26 0h4"
        stroke="#562130"
        strokeLinecap="round"
      />
      <circle cy="-18" r="2" fill="#562130" />
      <text y="27" textAnchor="middle" fill="#562130" fontSize="10">
        {name}
      </text>
    </g>
  )
}

export function HeroScene() {
  const nodes = [
    { x: 230, y: 65 },
    { x: 409, y: 135 },
    { x: 409, y: 300 },
    { x: 238, y: 400 },
    { x: 68, y: 305 },
    { x: 68, y: 130 },
  ]
  return (
    <svg
      className="hero-svg"
      viewBox="0 0 600 510"
      role="img"
      aria-label="Six connected AI agents examine your website and produce a prioritized security report"
    >
      <defs>
        <linearGradient id="halo" x1="0" x2="1" y2="1">
          <stop stopColor="#f5e3ec" />
          <stop offset=".6" stopColor="#f1edf9" />
          <stop offset="1" stopColor="#e4f4ec" />
        </linearGradient>
      </defs>
      <circle cx="235" cy="232" r="197" fill="url(#halo)" opacity=".45" />
      <circle
        cx="235"
        cy="232"
        r="161"
        fill="none"
        stroke="#d8c5cf"
        strokeDasharray="3 7"
      />
      {nodes.map((node, index) => (
        <g key={index}>
          <path
            d={`M235 225 Q${node.x} 225 ${node.x} ${node.y}`}
            fill="none"
            stroke="#b397a6"
            strokeWidth="1.2"
          />
          <circle r="3" fill="#8c4b67" className="connection-pulse">
            <animateMotion
              dur={`${5 + index}s`}
              repeatCount="indefinite"
              path={`M${node.x} ${node.y} Q${node.x} 225 235 225`}
            />
          </circle>
        </g>
      ))}
      <g transform="translate(146 167)">
        <rect
          width="180"
          height="123"
          rx="10"
          fill="white"
          stroke="#562130"
          strokeWidth="1.4"
        />
        <path d="M0 25h180" stroke="#562130" />
        <circle cx="13" cy="12" r="3" fill="#d8beca" />
        <circle cx="24" cy="12" r="3" fill="#e6d6de" />
        <circle cx="35" cy="12" r="3" fill="#e6d6de" />
        <text x="96" y="16" textAnchor="middle" fontSize="9" fill="#786570">
          your-website.com
        </text>
        <rect x="14" y="39" width="51" height="66" rx="4" fill="#f3eef6" />
        <path
          d="m28 65-7 6 7 6m22-12 7 6-7 6m-7-17-6 22"
          fill="none"
          stroke="#81536b"
          strokeWidth="1.4"
        />
        <rect x="79" y="43" width="81" height="7" rx="3" fill="#d8beca" />
        <rect x="79" y="59" width="66" height="4" rx="2" fill="#e8dfe5" />
        <rect x="79" y="70" width="75" height="4" rx="2" fill="#e8dfe5" />
        <rect x="79" y="86" width="40" height="16" rx="8" fill="#35121e" />
        <text x="99" y="97" textAnchor="middle" fontSize="7" fill="white">
          Your product
        </text>
      </g>
      {nodes.map((node, index) => (
        <Agent
          key={index}
          {...node}
          index={index}
          name={
            [
              "Coordinator",
              "Recon",
              "Mapper",
              "Attacker",
              "Validator",
              "Reporter",
            ][index]
          }
        />
      ))}
      <path
        d="M326 228h157q15 0 15 15v90"
        stroke="#81536b"
        strokeDasharray="4 5"
        fill="none"
      />
      <g transform="translate(353 353) rotate(-5)">
        <rect width="220" height="142" rx="10" fill="white" stroke="#a88191" />
        <rect x="15" y="15" width="25" height="25" rx="6" fill="#f3e8ee" />
        <path
          d="m22 28 5 5 7-10"
          fill="none"
          stroke="#562130"
          strokeWidth="1.5"
        />
        <text x="50" y="25" fontSize="12" fontWeight="600" fill="#35121e">
          Your security report
        </text>
        <text x="50" y="39" fontSize="8" fill="#8a7680">
          Prioritized. Validated. Actionable.
        </text>
        {["High", "Medium", "Low"].map((severity, index) => (
          <g key={severity} transform={`translate(16 ${57 + index * 25})`}>
            <rect
              width="44"
              height="16"
              rx="8"
              fill={["#f9e2e4", "#fcf0dd", "#edf3eb"][index]}
            />
            <text x="22" y="11" textAnchor="middle" fontSize="8" fill="#694250">
              {severity}
            </text>
            <rect
              x="56"
              y="3"
              width={125 - index * 17}
              height="4"
              rx="2"
              fill="#d7cbd2"
            />
            <rect x="56" y="11" width="87" height="3" rx="1.5" fill="#eee7eb" />
          </g>
        ))}
      </g>
      <g transform="translate(113 447)">
        <path
          d="m0 0 5 5 9-10"
          stroke="#668572"
          fill="none"
          strokeWidth="1.5"
        />
        <text x="23" y="4" fontSize="10" fill="#687a70">
          A little more peace of mind.
        </text>
      </g>
    </svg>
  )
}

const sceneLabels = [
  ["Recon", "Mapper", "Attacker", "Validator", "Reporter"],
  ["/login", "/api", "/checkout", "Services", "Software"],
  ["Software", "Fingerprint", "Known weakness", "Risk match", "Investigate"],
  [
    "Approved scope",
    "Test request",
    "Response",
    "Compare",
    "Potential finding",
  ],
  ["Candidate", "Reproduce", "Verify scope", "Validated", "False alarm"],
  ["Confirmed", "High risk", "Medium risk", "Fix guidance", "Your report"],
]

export function AgentScene({ selected }: { selected: number }) {
  const labels = sceneLabels[selected]
  return (
    <svg
      viewBox="0 0 550 320"
      className="agent-scene"
      role="img"
      aria-label={`${["Coordinated routing", "Website discovery", "Weakness mapping", "Scoped testing", "Finding validation", "Report generation"][selected]} diagram`}
    >
      <path
        d="M140 151h90v-71h80m-80 71h80m-80 0v80h80M397 80h43v151h-43m43-80h35"
        fill="none"
        stroke="#b29aa7"
        strokeWidth="1.5"
        strokeDasharray={selected === 3 ? "5 5" : undefined}
      />
      <g transform="translate(38 104)">
        <rect width="113" height="94" rx="9" fill="white" stroke="#81536b" />
        <path d="M0 22h113" stroke="#c8b5bf" />
        <circle cx="12" cy="11" r="2" fill="#b697a6" />
        <circle cx="20" cy="11" r="2" fill="#b697a6" />
        <text x="56" y="15" textAnchor="middle" fontSize="7" fill="#81536b">
          your-website.com
        </text>
        <path
          d="m35 45-9 8 9 8m42-16 9 8-9 8m-16-22-10 29"
          fill="none"
          stroke="#81536b"
          strokeWidth="1.5"
        />
        <text x="56" y="82" textAnchor="middle" fontSize="9" fill="#81536b">
          {selected === 0 ? "Coordinator" : "Your website"}
        </text>
      </g>
      {labels.slice(0, 3).map((label, index) => (
        <g
          key={`${selected}-${label}`}
          transform={`translate(296 ${49 + index * 77})`}
        >
          <rect
            width="110"
            height="49"
            rx="8"
            fill={index === 1 ? "#f4e7ef" : "white"}
            stroke="#a88191"
          />
          <circle
            cx="18"
            cy="24"
            r="9"
            fill={index === 2 ? "#e9f3ec" : "#f5f0f7"}
          />
          <path
            d={selected === 4 ? "m14 24 3 3 6-7" : "M14 24h8m-4-4v8"}
            stroke="#81536b"
            fill="none"
          />
          <text x="35" y="28" fontSize="9" fill="#562130">
            {label}
          </text>
        </g>
      ))}
      <g transform="translate(452 113)">
        <rect width="64" height="81" rx="8" fill="#f0f5ee" stroke="#8da08e" />
        <path
          d={
            selected === 4
              ? "m471 145 10 10 15-20"
              : "M14 24h36m-36 12h29m-29 12h32"
          }
          transform={selected === 4 ? "translate(-452 -113)" : undefined}
          stroke="#668572"
          fill="none"
          strokeWidth="1.5"
        />
        <text x="32" y="69" textAnchor="middle" fontSize="7" fill="#617464">
          {labels[4]}
        </text>
      </g>
      <rect
        x="184"
        y="259"
        width="188"
        height="32"
        rx="16"
        fill="white"
        stroke="#d3c2cd"
      />
      <circle cx="203" cy="275" r="3" fill="#81536b" />
      <text x="218" y="279" fontSize="9" fill="#81536b">
        {selected === 3
          ? "Scoped, non-destructive checks"
          : selected === 4
            ? "Only verified findings move forward"
            : "Shared memory · Connected intelligence"}
      </text>
      <text
        x="276"
        y="25"
        textAnchor="middle"
        fontSize="8"
        letterSpacing="2"
        fill="#ac95a2"
      >
        SWARM /{" "}
        {
          ["ORCHESTRATE", "DISCOVER", "CONNECT", "TEST", "VALIDATE", "REPORT"][
            selected
          ]
        }
      </text>
    </svg>
  )
}

export function Report() {
  return (
    <div className="report-preview">
      <div className="report-heading">
        <span className="report-logo"><SwarmLogo /></span>
        <div>
          <strong>Your security report</strong>
          <span>your-website.com</span>
        </div>
        <span className="report-status">Assessment complete</span>
      </div>
      <div className="report-summary">
        <span>
          <strong>03</strong>Findings to review
        </span>
        <span>
          <strong>01</strong>High priority
        </span>
        <span>
          <strong>02</strong>Fixed this week
        </span>
      </div>
      <div className="report-table-heading">
        <span>FINDING</span>
        <span>SEVERITY</span>
      </div>
      {[
        [
          "Missing access control",
          "High",
          "Restrict endpoint access to authorized users.",
        ],
        [
          "Security header missing",
          "Medium",
          "Add the recommended security headers.",
        ],
        [
          "Software version exposed",
          "Low",
          "Remove version details from public responses.",
        ],
      ].map(([title, severity, fix], index) => (
        <div className="report-finding" key={title}>
          <div>
            <span className="finding-index">0{index + 1}</span>
            <strong>{title}</strong>
            <span className={`severity severity-${index}`}>{severity}</span>
          </div>
          <p>
            <Icon kind="code" />
            {fix}
          </p>
        </div>
      ))}
      <div className="report-footer">
        <Icon kind="check" />
        Validated findings. Clear next steps.<span>↗</span>
      </div>
    </div>
  )
}

const hexPath = (r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`
  }).join(" ")

export function HeroShield() {
  const orbit = [
    [92, 120, 26, "#f7d9e3"],
    [420, 96, 20, "#dcecf7"],
    [452, 268, 30, "#e5f3e6"],
    [70, 300, 18, "#efe4f8"],
    [250, 48, 14, "#fbe9d6"],
  ] as const
  return (
    <svg className="hero-shield" viewBox="0 0 520 440" role="img" aria-label="Illustration: hands cupping a shield protected by orbiting hexagons">
      <ellipse cx="260" cy="210" rx="210" ry="150" fill="none" stroke="#e9d6de" strokeDasharray="4 8" className="spin-slow" />
      <ellipse cx="260" cy="210" rx="160" ry="112" fill="none" stroke="#f0e2e8" />
      {orbit.map(([x, y, r, fill], i) => (
        <g key={i} transform={`translate(${x},${y})`} className={`float float-${i}`}>
          <polygon points={hexPath(r)} fill={fill} stroke="#8C1D40" strokeWidth="1.4" />
          <polygon points={hexPath(r * 0.45)} fill="none" stroke="#8C1D40" strokeWidth="1.2" />
        </g>
      ))}
      <g transform="translate(260,190)">
        <polygon points={hexPath(108)} fill="#fbeff3" stroke="#8C1D40" strokeWidth="1.6" />
        <polygon points={hexPath(84)} fill="#fff" stroke="#8C1D40" strokeWidth="1.3" />
        <path d="M0-52 42-36v30c0 34-42 56-42 56s-42-22-42-56v-30Z" fill="#f7d9e3" stroke="#8C1D40" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m-17 0 12 12 24-26" fill="none" stroke="#8C1D40" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g fill="#fff" stroke="#8C1D40" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M60 400c30-10 70-30 100-58 22-20 50-28 70-20 10 4 8 16-2 20l-40 14c26 2 52-4 70-14" />
        <path d="M150 352c-8-14 2-30 18-34M128 368c-10-12-2-30 14-34" />
        <path d="M460 400c-30-10-70-30-100-58-22-20-50-28-70-20-10 4-8 16 2 20l40 14c-26 2-52-4-70-14" />
        <path d="M370 352c8-14-2-30-18-34M392 368c10-12 2-30-14-34" />
      </g>
    </svg>
  )
}

function MockFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mock">
      <div className="mock-top"><i /><i /><i /><span>{title}</span></div>
      <div className="mock-body">{children}</div>
    </div>
  )
}

export function FindMock() {
  return (
    <MockFrame title="Attack surface · your-site.com">
      <div className="mock-stats">
        <span><strong><CountUp to={142} /></strong>Pages</span>
        <span><strong><CountUp to={18} /></strong>Endpoints</span>
        <span><strong><CountUp to={9} /></strong>Technologies</span>
      </div>
      <div className="mock-row"><code>/api/users</code><span>Exposed endpoint</span><em className="tag tag-high">High</em></div>
      <div className="mock-row"><code>nginx 1.18</code><span>Outdated</span><em className="tag tag-low">Low</em></div>
    </MockFrame>
  )
}

export function ProveMock() {
  return (
    <MockFrame title="Validation results">
      <div className="mock-row"><span className="mock-strong">SQL injection on /search</span><em className="tag tag-ok">✓ Confirmed</em></div>
      <div className="mock-row mock-dismissed"><span><s>Missing header on /about</s></span><em className="tag tag-grey">Dismissed: false alarm</em></div>
      <div className="mock-foot">1 confirmed, 1 dismissed</div>
    </MockFrame>
  )
}

export function FixMock() {
  return (
    <MockFrame title="Fix guidance">
      <div className="mock-row"><span className="mock-strong">Missing access control</span><em className="tag tag-high">High</em></div>
      <pre className="mock-code diff">
        <span className="del">- router.get("/api/users", listUsers)</span>
        {"\n"}
        <span className="add">+ router.get("/api/users", requireAuth, listUsers)</span>
      </pre>
      <p className="mock-note"><b>How to fix:</b> require a signed-in session before returning user data.</p>
    </MockFrame>
  )
}

export function HeroSecurity() {
  const M = "#8C1D40"
  const D = "#1C1418"
  const P = "#F7D9E3"
  const T = "#FBF3F6"
  const wires = [
    "M118 300 H170 L210 260",
    "M150 150 V210 L210 250",
    "M150 300 V360 H230 L262 392",
    "M420 340 H470 V300",
    "M300 410 H400 L420 390",
  ]
  return (
    <svg className="hero-security" viewBox="0 0 560 460" role="img" aria-label="Illustration: a laptop protected by a shield and padlock, connected to servers, a browser, and analytics">
      <defs>
        <linearGradient id="hs-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D0A1B" />
          <stop offset="1" stopColor={D} />
        </linearGradient>
      </defs>
      <circle cx="290" cy="235" r="190" fill={T} />
      <circle cx="290" cy="235" r="150" fill="none" stroke={P} strokeDasharray="3 9" className="hs-spin" />
      {/* circuit wires with travelling pulses */}
      {wires.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke={P} strokeWidth="2" />
          <path d={d} fill="none" stroke={M} strokeWidth="2.5" strokeLinecap="round" className="hs-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
        </g>
      ))}
      {/* laptop */}
      <g className="hs-laptop">
        <rect x="190" y="120" width="230" height="160" rx="14" fill="url(#hs-screen)" stroke={D} strokeWidth="3" />
        <rect x="204" y="134" width="202" height="132" rx="6" fill="#2a0f19" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="216" y={148 + i * 20} width={[90, 60, 110, 70, 50][i]} height="6" rx="3" fill={i % 2 ? "#ffffff30" : "#ffffff55"} className="hs-code" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
        <rect x="214" y="246" width="116" height="14" rx="7" fill="#ffffff14" />
        <text x="222" y="256" fill="#ffffffb3" fontSize="8.5" fontWeight="500" fontFamily="Inter, sans-serif">www.yourwebsite.com</text>
        <path d="M170 284 H440 L454 304 Q456 312 446 312 H164 Q154 312 156 304 Z" fill="#fff" stroke={D} strokeWidth="3" strokeLinejoin="round" />
        <rect x="280" y="292" width="50" height="6" rx="3" fill={P} />
      </g>
      {/* shield + padlock */}
      <g className="hs-shield">
        <path d="M305 92 L365 114 V170 C365 214 305 244 305 244 C305 244 245 214 245 170 V114 Z" fill={M} stroke={D} strokeWidth="3" strokeLinejoin="round" />
        <path d="M305 108 L352 126 V170 C352 204 305 228 305 228 Z" fill="#B02A57" />
        <path d="M288 160 V146 a17 17 0 0 1 34 0 V160" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <rect x="278" y="158" width="54" height="42" rx="8" fill="#fff" stroke={D} strokeWidth="3" />
        <circle cx="305" cy="175" r="5" fill={D} />
        <rect x="302.5" y="177" width="5" height="12" rx="2" fill={D} />
      </g>
      {/* key */}
      <g className="hs-key">
        <circle cx="200" cy="205" r="22" fill="#fff" stroke={D} strokeWidth="3" />
        <circle cx="200" cy="205" r="9" fill={P} stroke={D} strokeWidth="2" />
        <path d="M222 205 H272 M252 205 V216 M262 205 V214" stroke={D} strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* browser window */}
      <g className="hs-float hs-f1">
        <rect x="402" y="70" width="118" height="128" rx="10" fill="#fff" stroke={D} strokeWidth="3" />
        <path d="M402 92 H520" stroke={D} strokeWidth="3" />
        <circle cx="414" cy="81" r="3" fill={M} /><circle cx="424" cy="81" r="3" fill={P} /><circle cx="434" cy="81" r="3" fill={P} />
        <circle cx="490" cy="124" r="18" fill={P} stroke={M} strokeWidth="2" />
        <path d="M472 124 H508 M490 106 C480 116 480 132 490 142 C500 132 500 116 490 106" fill="none" stroke={M} strokeWidth="1.5" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(414 ${112 + i * 24})`}>
            <rect width="14" height="14" rx="3" fill={i === 1 ? M : "#fff"} stroke={D} strokeWidth="2" />
            {i === 1 && <path d="m3 7 3 3 5-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />}
            <rect x="20" y="4" width="28" height="6" rx="3" fill={P} />
          </g>
        ))}
        <path d="M486 160 l14 22 4-9 9-2 Z" fill={D} className="hs-cursor" />
      </g>
      {/* server stacks */}
      <g className="hs-float hs-f2">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(110 ${104 + i * 22})`}>
            <rect width="80" height="18" rx="5" fill={i === 1 ? D : "#fff"} stroke={D} strokeWidth="2.5" />
            <circle cx="12" cy="9" r="3" fill={i === 1 ? "#22c55e" : M} className="hs-blink" style={{ animationDelay: `${i * 0.4}s` }} />
            <rect x="22" y="7" width="32" height="4" rx="2" fill={i === 1 ? "#ffffff55" : P} />
          </g>
        ))}
      </g>
      {/* node + gears */}
      <g className="hs-float hs-f3">
        <ellipse cx="100" cy="300" rx="30" ry="12" fill="#fff" stroke={D} strokeWidth="2.5" />
        <ellipse cx="100" cy="296" rx="18" ry="6" fill={M} />
      </g>
      <g transform="translate(230 392)"><g className="hs-gear">
        <circle r="20" fill="#fff" stroke={D} strokeWidth="2.5" strokeDasharray="8 4" />
        <circle r="10" fill={P} stroke={D} strokeWidth="2.5" />
      </g></g>
      <g transform="translate(276 404)"><g className="hs-gear hs-gear-rev">
        <circle r="13" fill={D} stroke={D} strokeWidth="2.5" strokeDasharray="6 3" />
        <circle r="5" fill="#fff" />
      </g></g>
      {/* analytics node */}
      <g className="hs-float hs-f4">
        <ellipse cx="440" cy="392" rx="44" ry="16" fill="#fff" stroke={D} strokeWidth="2.5" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={424 + i * 12} y={364 - i * 10} width="8" height={26 + i * 10} rx="2" fill={i === 2 ? M : D} className="hs-bar" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </g>
      {/* status chip */}
      <g className="hs-float hs-f2">
        <rect x="156" y="318" width="270" height="26" rx="13" fill={D} />
        <circle cx="172" cy="331" r="4.5" fill="#22c55e" className="hs-blink" />
        <text x="184" y="335" fontSize="11.5" textLength="230" lengthAdjust="spacingAndGlyphs" fill="#fff" fontWeight="600" fontFamily="Inter, sans-serif">S.W.A.R.M agent has identified 3 threats</text>
      </g>
    </svg>
  )
}

// Traced from the brand mark (1254 grid), origin at the bird's wing junction.
const birdHalf =
  "M7 5 C28 -55 53 -102 83 -102 L281 -20 L156 -5 C133 -15 108 -20 85 -18 C63 -5 38 30 23 70 Z M30 67 C53 30 73 5 88 0 C108 -2 123 5 136 12 Z"
const birdCenter =
  "M0 -240 L41 -145 C24 -100 12 -50 5 5 L-5 5 C-12 -50 -24 -100 -41 -145 Z M-17 70 L18 70 L31 122 L0 245 L-30 122 Z"

function Bird({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={birdCenter} />
      <path d={birdHalf} />
      <path d={birdHalf} transform="scale(-1 1)" />
    </g>
  )
}

export function SwarmLogo({ className = "swarm-logo" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1254 1254" aria-hidden="true" fill="currentColor">
      <circle cx="627" cy="627" r="590" fill="none" stroke="currentColor" strokeWidth="48" />
      <Bird x={627} y={480} />
      <Bird x={440} y={810} />
      <Bird x={812} y={810} />
    </svg>
  )
}
