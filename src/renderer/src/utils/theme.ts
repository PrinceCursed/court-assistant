/** Apply custom theme CSS custom properties directly on <html> inline style.
 *  Inline styles always win over stylesheet rules, so any [data-theme="custom"]
 *  block in CSS is just a fallback baseline; these JS vars take full control.
 */
export function applyCustomThemeCss(
  bgR = 20, bgG = 20, bgB = 30,
  accR = 200, accG = 150, accB = 50
): void {
  const s = document.documentElement.style
  const add = (v: number, n: number) => Math.min(255, v + n)
  const rgb  = (r: number, g: number, b: number) => `rgb(${r},${g},${b})`
  const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r},${g},${b},${a})`

  s.setProperty('--bg-0', rgb(bgR, bgG, bgB))
  s.setProperty('--bg-1', rgb(add(bgR,10), add(bgG,10), add(bgB,10)))
  s.setProperty('--bg-2', rgb(add(bgR,18), add(bgG,18), add(bgB,18)))
  s.setProperty('--bg-3', rgb(add(bgR,28), add(bgG,28), add(bgB,28)))
  s.setProperty('--bg-4', rgb(add(bgR,40), add(bgG,40), add(bgB,40)))
  s.setProperty('--bg-base',    'var(--bg-0)')
  s.setProperty('--bg-surface', 'var(--bg-1)')
  s.setProperty('--bg-elevated','var(--bg-2)')
  s.setProperty('--bg-overlay', 'var(--bg-3)')
  s.setProperty('--bg-input',   'var(--bg-0)')

  s.setProperty('--line-0', rgba(accR, accG, accB, 0.05))
  s.setProperty('--line-1', rgba(accR, accG, accB, 0.10))
  s.setProperty('--line-2', rgba(accR, accG, accB, 0.17))
  s.setProperty('--line-3', rgba(accR, accG, accB, 0.26))
  s.setProperty('--line-4', rgba(accR, accG, accB, 0.38))
  s.setProperty('--border-0', 'var(--line-0)')
  s.setProperty('--border-1', 'var(--line-1)')
  s.setProperty('--border-2', 'var(--line-2)')
  s.setProperty('--border-3', 'var(--line-3)')

  s.setProperty('--t1', '#f0efee')
  s.setProperty('--t2', '#c4bcb5')
  s.setProperty('--t3', '#857d74')
  s.setProperty('--t4', '#4a443e')
  s.setProperty('--text-1',   'var(--t1)')
  s.setProperty('--text-2',   'var(--t2)')
  s.setProperty('--text-3',   'var(--t3)')
  s.setProperty('--text-inv', 'var(--bg-0)')

  s.setProperty('--ac',         rgb(accR, accG, accB))
  s.setProperty('--ac2',        rgb(add(accR,45), add(accG,45), add(accB,45)))
  s.setProperty('--ac-bg',      rgba(accR, accG, accB, 0.12))
  s.setProperty('--ac-border',  rgba(accR, accG, accB, 0.35))
  s.setProperty('--ac-glow',    rgba(accR, accG, accB, 0.20))
  s.setProperty('--accent',         'var(--ac)')
  s.setProperty('--accent-hover',   'var(--ac2)')
  s.setProperty('--accent-dim',     'var(--ac-bg)')
  s.setProperty('--accent-glow',    'var(--ac-glow)')
  s.setProperty('--border-accent',  'var(--ac-border)')
  s.setProperty('--text-accent',    'var(--ac2)')

  s.setProperty('--sh1',   '0 1px 2px rgba(0,0,0,0.4)')
  s.setProperty('--sh2',   '0 2px 8px rgba(0,0,0,0.5)')
  s.setProperty('--sh3',   '0 6px 20px rgba(0,0,0,0.55)')
  s.setProperty('--sh4',   '0 12px 40px rgba(0,0,0,0.65)')
  s.setProperty('--sh-ac', `0 4px 20px ${rgba(accR, accG, accB, 0.35)}`)
  s.setProperty('--sh-xs',  'var(--sh1)')
  s.setProperty('--sh-sm',  'var(--sh2)')
  s.setProperty('--sh-md',  'var(--sh3)')
  s.setProperty('--sh-lg',  'var(--sh4)')
  s.setProperty('--sh-acc', 'var(--sh-ac)')
}

const CUSTOM_PROPS = [
  '--bg-0','--bg-1','--bg-2','--bg-3','--bg-4',
  '--bg-base','--bg-surface','--bg-elevated','--bg-overlay','--bg-input',
  '--line-0','--line-1','--line-2','--line-3','--line-4',
  '--border-0','--border-1','--border-2','--border-3',
  '--t1','--t2','--t3','--t4','--text-1','--text-2','--text-3','--text-inv',
  '--ac','--ac2','--ac-bg','--ac-border','--ac-glow',
  '--accent','--accent-hover','--accent-dim','--accent-glow','--border-accent','--text-accent',
  '--sh1','--sh2','--sh3','--sh4','--sh-ac','--sh-xs','--sh-sm','--sh-md','--sh-lg','--sh-acc',
]

export function clearCustomThemeCss(): void {
  const s = document.documentElement.style
  CUSTOM_PROPS.forEach(p => s.removeProperty(p))
}
