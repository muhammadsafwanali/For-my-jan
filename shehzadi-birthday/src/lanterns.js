// ============================================================
//  🏮 Sky lanterns — aasmaan mein urte chiragh (khwahish wale)
// ============================================================

export class Lanterns {
  constructor() { this.active = 0 }

  launch(n = 1) {
    for (let i = 0; i < n; i++) {
      if (this.active >= 14) return
      this.active++
      const el = document.createElement('div')
      el.className = 'lantern'
      const dur = 11 + Math.random() * 6
      el.style.left = (6 + Math.random() * 86) + 'vw'
      el.style.setProperty('--dur', dur.toFixed(1) + 's')
      el.style.setProperty('--sway', (Math.random() * 90 - 45).toFixed(0) + 'px')
      el.style.setProperty('--lscale', (0.7 + Math.random() * 0.6).toFixed(2))
      document.body.appendChild(el)
      setTimeout(() => { el.remove(); this.active-- }, dur * 1000 + 500)
    }
  }
}

export function initLanternSection(lanterns) {
  const btn = document.getElementById('lanternBtn')
  const msg = document.getElementById('lanternMsg')
  const section = document.getElementById('lanternSection')
  let wishShown = false

  btn.addEventListener('click', () => {
    lanterns.launch(1 + ((Math.random() * 2) | 0))
    btn.classList.remove('tapped')
    void btn.offsetWidth
    btn.classList.add('tapped')
    if (!wishShown) {
      wishShown = true
      msg.classList.remove('hidden')
      requestAnimationFrame(() => msg.classList.add('in'))
    }
  })

  // Section nazar aaye to 5 lanterns khud-ba-khud ur jayen
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        let i = 0
        const t = setInterval(() => { lanterns.launch(1); if (++i >= 5) clearInterval(t) }, 600)
        io.disconnect()
      }
    })
  }, { threshold: 0.35 })
  io.observe(section)
}
