import React from 'react'

/** Decorative chain hanging vertically from (x, 0) for `n` links. */
function Chain({ x, n, linkH = 17 }: { x: number; n: number; linkH: number }) {
  const links = []
  for (let i = 0; i < n; i++) {
    const vertical = i % 2 === 0
    links.push(
      <ellipse
        key={i}
        cx={x}
        cy={i * linkH + 12}
        rx={vertical ? 6.5 : 11}
        ry={vertical ? 11 : 6.5}
        fill="none"
        stroke="rgba(225,29,46,0.32)"
        strokeWidth={3.2}
      />,
    )
  }
  return <>{links}</>
}

/** Cursed-theme ambience: blood-red chains in the top corners + faint "1000-7". */
export default function CursedDecor() {
  return (
    <div className="cursed-decor-layer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden>
      {/* Chains from the top corners */}
      <svg style={{ position: 'absolute', top: 0, left: 18, opacity: 0.55 }} width="60" height="230" viewBox="0 0 60 230">
        <Chain x={22} n={12} linkH={17} />
      </svg>
      <svg style={{ position: 'absolute', top: 0, right: 26, opacity: 0.5 }} width="60" height="180" viewBox="0 0 60 180">
        <Chain x={30} n={9} linkH={17} />
      </svg>

      {/* "1000-7" — faint blood-red stamp */}
      <div style={{
        position: 'absolute', top: '46%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-9deg)',
        fontFamily: "'Geist Mono', monospace", fontSize: 150, fontWeight: 800,
        letterSpacing: '-0.02em', color: 'rgba(225,29,46,0.05)',
        userSelect: 'none', whiteSpace: 'nowrap',
        textShadow: '0 0 40px rgba(225,29,46,0.08)',
      }}>1000-7</div>

      {/* Small crisp tag, bottom-left */}
      <div style={{
        position: 'absolute', bottom: 16, left: 18,
        fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 700,
        letterSpacing: '0.22em', color: 'rgba(225,29,46,0.28)', userSelect: 'none',
      }}>1000 − 7 …</div>
    </div>
  )
}
