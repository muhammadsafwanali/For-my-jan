// ============================================================
//  ✨ Cursor/touch ke peeche golden sparkle trail
// ============================================================

export class Sparkles {
  constructor(canvas, fireworks) {
    this.cv = canvas
    this.cx = canvas.getContext('2d')
    this.parts = []
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    window.addEventListener('resize', () => { this.dpr = Math.min(window.devicePixelRatio || 1, 2) })
    fireworks.drawers.push({ dry: () => this.parts.length > 0, draw: () => this._draw() })

    let last = 0
    window.addEventListener('pointermove', (e) => {
      const now = performance.now()
      if (now - last < 30) return
      last = now
      this._spawn(e.clientX, e.clientY, 2)
    }, { passive: true })

    window.addEventListener('pointerdown', (e) => this._spawn(e.clientX, e.clientY, 9), { passive: true })
  }

  _spawn(x, y, n) {
    const d = this.dpr
    for (let i = 0; i < n; i++) {
      this.parts.push({
        x: x * d, y: y * d,
        vx: (Math.random() - 0.5) * 1.7 * d,
        vy: (Math.random() - 0.8) * 1.7 * d,
        life: 1,
        sz: (0.8 + Math.random() * 2.4) * d,
        hue: Math.random() < 0.6 ? '#ffd166' : '#ff8fa3',
      })
    }
    if (this.parts.length > 220) this.parts.splice(0, this.parts.length - 220)
  }

  _draw() {
    const c = this.cx
    c.globalCompositeOperation = 'lighter'
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.015 * this.dpr
      p.life -= 0.028
      if (p.life <= 0) { this.parts.splice(i, 1); continue }
      c.globalAlpha = p.life * 0.85
      c.fillStyle = p.hue
      c.beginPath()
      c.arc(p.x, p.y, Math.max(0.1, p.sz * p.life), 0, 7)
      c.fill()
    }
    c.globalAlpha = 1
    c.globalCompositeOperation = 'source-over'
  }
}
