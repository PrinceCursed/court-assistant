/**
 * Tiny Web-Audio sound kit — all sounds are synthesised on the fly, so there
 * are no audio assets to bundle and nothing copyrighted. Used for the iMessage
 * prank and achievement unlocks.
 */

let ctx: AudioContext | null = null

function actx(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    return ctx
  } catch {
    return null
  }
}

/** A single enveloped tone. */
function blip(freq: number, when: number, dur: number, type: OscillatorType = 'sine', peak = 0.16): void {
  const c = actx()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  o.connect(g)
  g.connect(c.destination)
  const t = c.currentTime + when
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(peak, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.start(t)
  o.stop(t + dur + 0.03)
}

/** A pitch sweep between two frequencies. */
function sweep(f1: number, f2: number, when: number, dur: number, type: OscillatorType = 'sine', peak = 0.14): void {
  const c = actx()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.connect(g)
  g.connect(c.destination)
  const t = c.currentTime + when
  o.frequency.setValueAtTime(f1, t)
  o.frequency.exponentialRampToValueAtTime(Math.max(40, f2), t + dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(peak, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.start(t)
  o.stop(t + dur + 0.03)
}

/** Bright two-note banner alert (notification arriving). */
export function playNotification(): void {
  blip(1568, 0, 0.09, 'sine', 0.16)
  blip(2093, 0.085, 0.16, 'sine', 0.14)
}

/** Outgoing iMessage "whoosh" — quick rising sweep. */
export function playSend(): void {
  sweep(420, 1300, 0, 0.18, 'sine', 0.12)
}

/** Incoming message — soft low→high two-note. */
export function playReceive(): void {
  blip(660, 0, 0.11, 'sine', 0.15)
  blip(990, 0.07, 0.17, 'sine', 0.13)
}

/** Cheerful arpeggio for unlocking an achievement. */
export function playAchievement(): void {
  const notes = [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6
  notes.forEach((f, i) => blip(f, i * 0.1, 0.32, 'triangle', 0.15))
}

/** Ominous descending tone — "you're fired" / error. */
export function playError(): void {
  sweep(420, 90, 0, 0.55, 'sawtooth', 0.12)
  blip(140, 0.06, 0.5, 'sine', 0.12)
}
