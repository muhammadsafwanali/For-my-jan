// ============================================================
//  Confetti (canvas) + Balloons (DOM)
// ============================================================

export class Confetti {
  constructor(canvas, fireworks) {
    this.cv = canvas
    this.cx = canvas.getContext('2d')
    this.pieces = []
    this.colors = ['#ff2d78', '#a855f7', '#ffd166', '#22d3ee', '#ff8fa3', '#c4b5fd']
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    window.addEventListener('resize', () => { this.dpr = Math.min(window.devicePixelRatio || 1, 2) })

    const drawer = {
      dry: () => this.pieces.length > 0,
      draw: () => this._draw(),
    }
    fireworks.drawers.push(drawer)
  }

  burst(x, y, n = 80) {
    const d = this.dpr
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.9
      const sp = (3.5 + Math.random() * 7.5) * d
      this.pieces.push({
        x: x * d, y: y * d,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        w: (4 + Math.random() * 5) * d,
        h: (5 + Math.random() * 8) * d,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.32,
        hue: this.colors[(Math.random() * this.colors.length) | 0],
      })
    }
  }

  burstSeries(k = 6) {
    let i = 0
    const step = () => {
      this.burst(window.innerWidth * (0.15 + Math.random() * 0.7), window.innerHeight * (0.18 + Math.random() * 0.28), 70)
      if (++i < k) setTimeout(step, 380)
    }
    step()
  }

  _draw() {
    if (!this.pieces.length) return
    const c = this.cx
    c.globalCompositeOperation = 'source-over'
    for (let i = this.pieces.length - 1; i >= 0; i--) {
      const p = this.pieces[i]
      p.vy += 0.085 * this.dpr
      p.vx *= 0.992
      p.x += p.vx
      p.y += p.vy
      p.r += p.vr
      if (p.y > this.cv.height + 50) { this.pieces.splice(i, 1); continue }
      c.save()
      c.translate(p.x, p.y)
      c.rotate(p.r)
      c.fillStyle = p.hue
      c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      c.restore()
    }
  }
}

export class Balloons {
  constructor(container) { this.box = container }
  launch(n = 12) {
    const colors = ['#ff2d78', '#a855f7', '#ffd166', '#22d3ee', '#ff8fa3', '#7c3aed']
    for (let i = 0; i < n; i++) {
      const b = document.createElement('div')
      b.className = 'balloon'
      b.style.left = (4 + Math.random() * 90) + 'vw'
      const dur = 9 + Math.random() * 7
      const delay = Math.random() * 2.5
      b.style.setProperty('--dur', dur.toFixed(1) + 's')
      b.style.setProperty('--delay', delay.toFixed(1) + 's')
      b.style.setProperty('--hue', colors[(Math.random() * colors.length) | 0])
      this.box.appendChild(b)
      setTimeout(() => b.remove(), (dur + delay) * 1000 + 600)
    }
  }
}
