// ============================================================
//  Neon fireworks (canvas) — confetti drawing bhi isi par hota hai
// ============================================================

export class Fireworks {
  constructor(canvas) {
    this.cv = canvas
    this.cx = canvas.getContext('2d')
    this.rockets = []
    this.parts = []
    this.drawers = [] // extra draw functions (confetti) — return true agar active hain
    this._until = 0
    this._last = 0
    this._dirty = false
    this.colors = ['#ff2d78', '#a855f7', '#ffd166', '#22d3ee', '#ff8fa3', '#c084fc']
    this._fit()
    window.addEventListener('resize', () => this._fit())
    const loop = (t) => { this._tick(t); requestAnimationFrame(loop) }
    requestAnimationFrame(loop)
  }

  _fit() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.cv.width = window.innerWidth * this.dpr
    this.cv.height = window.innerHeight * this.dpr
    this.cv.style.width = window.innerWidth + 'px'
    this.cv.style.height = window.innerHeight + 'px'
  }

  start(ms = 12000) { this._until = performance.now() + ms }
  stop() { this._until = 0 }

  burst(x, y) { this._explode(x * this.dpr, y * this.dpr, null) }

  _launch() {
    const w = this.cv.width
    this.rockets.push({
      x: w * (0.12 + Math.random() * 0.76),
      y: this.cv.height + 10,
      vy: -(8.5 + Math.random() * 4) * this.dpr,
      hue: this.colors[(Math.random() * this.colors.length) | 0],
      fuse: 34 + Math.random() * 34,
    })
  }

  _explode(x, y, hue) {
    const n = 60 + ((Math.random() * 55) | 0)
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const sp = (0.6 + Math.random() * 5.6) * this.dpr
      this.parts.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: 1,
        decay: 0.008 + Math.random() * 0.013,
        hue: hue || this.colors[(Math.random() * this.colors.length) | 0],
        w: (1 + Math.random() * 2) * this.dpr,
      })
    }
  }

  _tick(t) {
    const c = this.cx
    const now = performance.now()

    if (now < this._until && t - this._last > 240 + Math.random() * 380) {
      this._last = t
      this._launch()
      if (Math.random() < 0.4) this._launch()
    }

    const drawerActive = this.drawers.map((fn) => fn.dry()).some(Boolean)
    const hasFire = this.rockets.length > 0 || this.parts.length > 0

    if (!hasFire && !drawerActive) {
      if (this._dirty) { c.clearRect(0, 0, this.cv.width, this.cv.height); this._dirty = false }
      return
    }
    this._dirty = true

    if (hasFire) {
      // glow trails ke liye dheere dheere fade
      c.globalCompositeOperation = 'destination-out'
      c.fillStyle = 'rgba(0,0,0,0.16)'
      c.fillRect(0, 0, this.cv.width, this.cv.height)
    } else {
      c.clearRect(0, 0, this.cv.width, this.cv.height)
    }

    // rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i]
      r.y += r.vy
      r.fuse--
      c.globalCompositeOperation = 'lighter'
      c.fillStyle = r.hue
      c.fillRect(r.x, r.y, 3 * this.dpr, 9 * this.dpr)
      if (r.fuse <= 0 || r.y < this.cv.height * 0.22) {
        this.rockets.splice(i, 1)
        this._explode(r.x, r.y, r.hue)
      }
    }

    // particles
    c.globalCompositeOperation = 'lighter'
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.045 * this.dpr
      p.vx *= 0.985
      p.life -= p.decay
      if (p.life <= 0) { this.parts.splice(i, 1); continue }
      c.globalAlpha = Math.max(p.life, 0)
      c.fillStyle = p.hue
      c.beginPath()
      c.arc(p.x, p.y, p.w, 0, 7)
      c.fill()
    }
    c.globalAlpha = 1

    // confetti waghera
    for (const fn of this.drawers) fn.draw()
    c.globalCompositeOperation = 'source-over'
  }
}
