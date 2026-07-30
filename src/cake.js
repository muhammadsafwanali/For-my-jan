import { MicBlow } from './audio.js'

// ============================================================
//  Cake scene: mic se ya button se candles bujhana
// ============================================================

export class CakeScene {
  constructor(o) {
    this.o = o
    this.count = o.count || 5
    this.candles = []
    this.micStrength = 0
    this.holdStrength = 0
    this.allOutFired = false
    this.micStarted = false
    this._lastLeft = this.count
    this._build()
    this._bindControls()
    this._loop()
  }

  _build() {
    const wrap = this.o.candlesEl
    wrap.innerHTML = ''
    this.candles = []
    for (let i = 0; i < this.count; i++) {
      const c = document.createElement('div')
      c.className = 'candle'
      c.innerHTML = '<div class="smoke"></div><div class="flame"></div><div class="wick"></div><div class="wax"></div>'
      wrap.appendChild(c)
      const obj = {
        el: c,
        flame: c.querySelector('.flame'),
        smoke: c.querySelector('.smoke'),
        health: 1,
        lit: true,
        drain: 0.8 + Math.random() * 0.5, // har candle thora alag time par bujhegi
      }
      c.addEventListener('click', () => this._putOut(obj))
      this.candles.push(obj)
    }
  }

  _bindControls() {
    const { micBtn, blowBtn, relightBtn } = this.o

    this.mic = new MicBlow(
      (s) => { this.micStrength = s },
      (st) => {
        if (st === 'listening') {
          micBtn.classList.add('active')
          micBtn.querySelector('span').textContent = 'Mic Chal Raha Hai…'
          this._status(this.o.strings.strMicOn)
        }
        if (st === 'denied') this._status(this.o.strings.strMicDenied)
        if (st === 'error') this._status(this.o.strings.strMicError)
      }
    )
    micBtn.addEventListener('click', () => {
      if (!this.micStarted) { this.micStarted = true; this.mic.start() }
    })

    const hold = (on) => (e) => { e.preventDefault(); this.holdStrength = on ? 0.95 : 0 }
    blowBtn.addEventListener('pointerdown', hold(true))
    window.addEventListener('pointerup', hold(false))
    blowBtn.addEventListener('pointercancel', hold(false))
    blowBtn.addEventListener('contextmenu', (e) => e.preventDefault())

    relightBtn.addEventListener('click', () => this.relight())
  }

  _loop() {
    const s = Math.max(this.micStrength, this.holdStrength)
    let left = 0
    for (const c of this.candles) {
      if (!c.lit) continue
      left++
      // phoonk par flame "jhukti" hai
      const lean = s > 0.12 ? Math.min(1, s * 1.5) : 0
      c.flame.style.setProperty('--lean', lean.toFixed(2))
      if (s > 0.28) {
        c.health -= 0.0145 * s * c.drain
        if (c.health <= 0) this._putOut(c)
      }
    }
    if (left !== this._lastLeft) {
      this._lastLeft = left
      if (left > 0 && (this.micStarted || this.holdStrength > 0)) {
        this._status(this.o.strings.strLeft(left))
      }
    }
    requestAnimationFrame(() => this._loop())
  }

  _putOut(c) {
    if (!c.lit) return
    c.lit = false
    c.flame.classList.add('out')
    c.flame.style.setProperty('--lean', '0')
    c.smoke.classList.remove('puff')
    void c.smoke.offsetWidth // animation dobara chalane ke liye
    c.smoke.classList.add('puff')

    const anyLeft = this.candles.some((x) => x.lit)
    if (!anyLeft && !this.allOutFired) {
      this.allOutFired = true
      this._status(this.o.strings.strAllOut)
      this.o.relightBtn.classList.remove('hidden')
      setTimeout(() => {
        this._showBanner()
        if (this.o.onAllOut) this.o.onAllOut()
      }, 700)
    }
  }

  _showBanner() {
    const b = this.o.bannerEl
    b.classList.remove('hidden')
    requestAnimationFrame(() => b.classList.add('show'))
    setTimeout(() => b.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350)
  }

  relight() {
    for (const c of this.candles) {
      c.lit = true
      c.health = 1
      c.flame.classList.remove('out')
    }
    this.allOutFired = false
    this._lastLeft = this.count
    this.o.bannerEl.classList.add('hidden')
    this.o.bannerEl.classList.remove('show')
    this.o.relightBtn.classList.add('hidden')
    this._status(this.o.strings.cakeStatusStart)
  }

  _status(t) {
    if (this.o.statusEl) this.o.statusEl.textContent = t
  }
}
