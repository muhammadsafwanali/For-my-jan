// ============================================================
//  Audio: background music + mic se "phoonk" detect karna
// ============================================================

export class Music {
  constructor(url, btn) {
    this.el = new Audio(url)
    this.el.loop = true
    this.el.volume = 0.55
    this.btn = btn
    this.playing = false
    if (btn) {
      btn.addEventListener('click', () => this.toggle())
      this._update()
    }
  }
  _update() {
    if (!this.btn) return
    this.btn.textContent = this.playing ? '🎵' : '🔇'
    this.btn.classList.toggle('on', this.playing)
  }
  async play() {
    try {
      await this.el.play()
      this.playing = true
    } catch (e) {
      // Browser ne autoplay roka — user ke pehle tap par chal jayega
      this.playing = false
    }
    this._update()
  }
  toggle() {
    if (this.playing) { this.el.pause(); this.playing = false; this._update() }
    else { this.play() }
  }
}

// Mic se phoonk (blow) ki strength 0..1
export class MicBlow {
  constructor(onStrength, onState) {
    this.onStrength = onStrength
    this.onState = onState
    this.running = false
    this.stream = null
    this.ctx = null
    this._raf = null
    this.smooth = 0
  }

  async start() {
    if (this.running) return true
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true },
        video: false,
      })
    } catch (err) {
      const denied = err && (err.name === 'NotAllowedError' || err.name === 'SecurityError' || err.name === 'NotFoundError')
      this.onState(denied ? 'denied' : 'error')
      return false
    }
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      this.ctx = new AC()
      if (this.ctx.state === 'suspended') { try { await this.ctx.resume() } catch (e) { /* ignore */ } }
      const src = this.ctx.createMediaStreamSource(this.stream)
      this.analyser = this.ctx.createAnalyser()
      this.analyser.fftSize = 2048
      src.connect(this.analyser)
      this.timeData = new Float32Array(this.analyser.fftSize)
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount)
      this.running = true
      this.onState('listening')
      this._loop()
      return true
    } catch (err) {
      this.onState('error')
      return false
    }
  }

  _loop() {
    if (!this.running) return
    this.analyser.getFloatTimeDomainData(this.timeData)
    let sum = 0, n = 0
    for (let i = 0; i < this.timeData.length; i += 4) { const v = this.timeData[i]; sum += v * v; n++ }
    const rms = Math.sqrt(sum / Math.max(1, n))

    this.analyser.getByteFrequencyData(this.freqData)
    let low = 0, ln = 0
    for (let b = 8; b < 74; b++) { low += this.freqData[b]; ln++ } // ~170Hz–1600Hz (phoonk ki range)
    low = ln ? (low / ln / 255) : 0

    let s = Math.max(rms * 2.4, low * 1.15) - 0.11
    s = Math.max(0, Math.min(1, s / 0.55))
    // halka smoothing taake jitter na ho
    this.smooth = s > this.smooth ? s : this.smooth * 0.82
    this.onStrength(this.smooth)
    this._raf = requestAnimationFrame(() => this._loop())
  }

  stop() {
    this.running = false
    if (this._raf) cancelAnimationFrame(this._raf)
    if (this.stream) this.stream.getTracks().forEach((t) => t.stop())
    if (this.ctx) this.ctx.close().catch(() => {})
  }
}
