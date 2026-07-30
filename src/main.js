import './styles.css'
import { CONFIG } from './config.js'
import { initLock } from './countdown.js'
import { Music } from './audio.js'
import { CakeScene } from './cake.js'
import { Fireworks } from './fireworks.js'
import { Confetti, Balloons } from './confetti.js'
import { Lanterns, initLanternSection } from './lanterns.js'
import { Sparkles } from './sparkles.js'
import { initEasterEggs } from './eastereggs.js'
import tuneUrl from './assets/birthday-tune.wav'

// ----------------------------------------------------------
// 1) Sab text config se bharo
// ----------------------------------------------------------
document.querySelectorAll('[data-cfg]').forEach((el) => {
  const val = CONFIG[el.getAttribute('data-cfg')]
  if (typeof val === 'string') el.textContent = val
})
document.title = `${CONFIG.herName} 👑 • 31 July`

// ----------------------------------------------------------
// 2) Reasons cards banao
// ----------------------------------------------------------
const cardsBox = document.getElementById('cards')
CONFIG.reasons.forEach((text, i) => {
  const c = document.createElement('div')
  c.className = 'card'
  c.innerHTML =
    '<div class="card-inner">' +
      '<div class="card-front"><b>' + String(i + 1).padStart(2, '0') + '</b><span>✦ tap karo ✦</span></div>' +
      '<div class="card-back"><p></p></div>' +
    '</div>'
  c.querySelector('.card-back p').textContent = text
  c.addEventListener('click', () => c.classList.toggle('flipped'))
  cardsBox.appendChild(c)
})

// ----------------------------------------------------------
// 3) Letter ke paragraphs banao
// ----------------------------------------------------------
const lp = document.getElementById('letterParas')
CONFIG.letter.forEach((p) => {
  const el = document.createElement('p')
  el.textContent = p
  lp.appendChild(el)
})

// ----------------------------------------------------------
// 4) Taare (stars background) + shooting stars
// ----------------------------------------------------------
initStars()
function initStars() {
  const cv = document.getElementById('stars')
  const cx = cv.getContext('2d')
  let stars = [], shoots = [], W = 0, H = 0

  function resize() {
    W = cv.width = window.innerWidth
    H = cv.height = window.innerHeight
    stars = []
    const n = Math.min(220, Math.floor((W * H) / 9000))
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.4 + Math.random() * 1.5,
        p: Math.random() * Math.PI * 2,
        sp: 0.5 + Math.random() * 2,
        hue: Math.random() < 0.75 ? '#ffffff' : (Math.random() < 0.5 ? '#ffd166' : '#c4b5fd'),
      })
    }
  }
  resize()
  window.addEventListener('resize', resize)

  setInterval(() => {
    if (document.hidden) return
    shoots.push({ x: Math.random() * W * 0.8 + W * 0.1, y: Math.random() * H * 0.3, vx: 6 + Math.random() * 4, vy: 2.5 + Math.random() * 2, life: 1 })
  }, 6500)

  function frame() {
    requestAnimationFrame(frame)
    cx.clearRect(0, 0, W, H)
    const t = performance.now() / 1000
    for (const s of stars) {
      const a = 0.35 + 0.65 * Math.abs(Math.sin(t * s.sp + s.p))
      cx.globalAlpha = a
      cx.fillStyle = s.hue
      cx.beginPath()
      cx.arc(s.x, s.y, s.r, 0, 7)
      cx.fill()
    }
    for (let i = shoots.length - 1; i >= 0; i--) {
      const sh = shoots[i]
      sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.02
      if (sh.life <= 0 || sh.y > H) { shoots.splice(i, 1); continue }
      const g = cx.createLinearGradient(sh.x - 60, sh.y - 26, sh.x, sh.y)
      g.addColorStop(0, 'rgba(255,255,255,0)')
      g.addColorStop(1, 'rgba(255,255,255,' + (0.8 * sh.life).toFixed(2) + ')')
      cx.globalAlpha = 1
      cx.strokeStyle = g
      cx.lineWidth = 1.6
      cx.beginPath()
      cx.moveTo(sh.x - 60, sh.y - 26)
      cx.lineTo(sh.x, sh.y)
      cx.stroke()
    }
    cx.globalAlpha = 1
  }
  frame()
}

// ----------------------------------------------------------
// 5) FX systems
// ----------------------------------------------------------
const fireworks = new Fireworks(document.getElementById('fx'))
const confetti = new Confetti(document.getElementById('fx'), fireworks)
const balloons = new Balloons(document.getElementById('balloons'))

function celebrateBig() {
  fireworks.start(15000)
  confetti.burstSeries(7)
  balloons.launch(14)
}

// ----------------------------------------------------------
// 6) Music
// ----------------------------------------------------------
const music = new Music(tuneUrl, document.getElementById('musicBtn'))
// Browser autoplay policy: pehle tap par chalu ho jaye (agar na chali ho)
document.addEventListener('pointerdown', function once() {
  document.removeEventListener('pointerdown', once)
  if (!music.playing) music.play()
})

// ----------------------------------------------------------
// 7) Lock screen (12 AM unlock)
// ----------------------------------------------------------
initLock({
  onUnlock: () => {
    music.play()
    setTimeout(() => confetti.burst(window.innerWidth / 2, window.innerHeight * 0.28, 90), 500)
  },
})

// ----------------------------------------------------------
// 8) Cake + mic candles
// ----------------------------------------------------------
new CakeScene({
  candlesEl: document.getElementById('candles'),
  micBtn: document.getElementById('micBtn'),
  blowBtn: document.getElementById('blowBtn'),
  relightBtn: document.getElementById('relightBtn'),
  statusEl: document.getElementById('cakeStatus'),
  bannerEl: document.getElementById('bdayBanner'),
  count: CONFIG.candleCount,
  strings: CONFIG,
  onAllOut: () => celebrateBig(),
})

// ----------------------------------------------------------
// 9) Love letter (envelope)
// ----------------------------------------------------------
const envelope = document.getElementById('envelope')
const envWrap = document.getElementById('envWrap')
envelope.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return
  envelope.classList.add('open')
  envWrap.classList.add('open')
  const hint = document.getElementById('envHint')
  if (hint) hint.textContent = CONFIG.letterHintOpen || ''
})

// ----------------------------------------------------------
// 10) Finale fireworks button
// ----------------------------------------------------------
document.getElementById('fwBtn').addEventListener('click', celebrateBig)

// ----------------------------------------------------------
// 11) Sky lanterns (khwahish section)
// ----------------------------------------------------------
const lanterns = new Lanterns()
initLanternSection(lanterns)

// ----------------------------------------------------------
// 12) Cursor sparkle trail ✨
// ----------------------------------------------------------
new Sparkles(document.getElementById('fx'), fireworks)

// ----------------------------------------------------------
// 13) 🥚 Hidden easter eggs
// ----------------------------------------------------------
initEasterEggs({ CONFIG, celebrateBig, balloons, confetti })

// ----------------------------------------------------------
// 14) Scroll reveal animations
// ----------------------------------------------------------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in')
      io.unobserve(e.target)
    }
  })
}, { threshold: 0.15 })
document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
