// ============================================================
//  🥚 HIDDEN EASTER EGGS — Shehzadi ke liye chhupe secrets!
//  1) Hero mein "Shehzadi" naam par 5 tap (3 second ke andar)
//  2) Bottom-left corner mein dim 💜 (chhupa hua dil)
//  3) Keyboard par "shehzadi" type karna
// ============================================================

export function initEasterEggs({ CONFIG, celebrateBig, balloons, confetti }) {
  const modal = document.getElementById('secretModal')
  const modalEmoji = document.getElementById('modalEmoji')
  const modalText = document.getElementById('modalText')
  const closeBtn = document.getElementById('modalClose')

  function showSecret(emoji, text) {
    modalEmoji.textContent = emoji
    modalText.textContent = text
    modal.classList.remove('hidden')
    const card = modal.querySelector('.modal-card')
    card.classList.remove('pop')
    void card.offsetWidth
    card.classList.add('pop')
  }

  function hideSecret() { modal.classList.add('hidden') }
  closeBtn.addEventListener('click', hideSecret)
  modal.addEventListener('click', (e) => { if (e.target === modal) hideSecret() })

  // ---- 1) Naam par 5 jaldi taps ----
  const em = document.querySelector('.hero-title em')
  if (em) {
    let taps = 0, timer = null
    em.addEventListener('click', () => {
      taps++
      clearTimeout(timer)
      timer = setTimeout(() => { taps = 0 }, 3000)
      if (taps >= 5) {
        taps = 0
        showSecret('👑', CONFIG.secretCrownMsg)
        confetti.burstSeries(3)
        balloons.launch(6)
      }
    })
  }

  // ---- 2) Chhupa hua dil (bottom-left) ----
  const heart = document.getElementById('hiddenHeart')
  if (heart) {
    heart.addEventListener('click', () => {
      showSecret('💜', CONFIG.secretHeartMsg)
      confetti.burst(window.innerWidth * 0.2, window.innerHeight * 0.7, 60)
    })
  }

  // ---- 3) Keyboard par "shehzadi" type karo ----
  let buf = ''
  window.addEventListener('keydown', (e) => {
    if (e.key && e.key.length === 1) {
      buf = (buf + e.key.toLowerCase()).slice(-8)
      if (buf === 'shehzadi') {
        buf = ''
        showSecret('✨', CONFIG.secretTypedMsg)
        celebrateBig()
      }
    }
  })

  return { showSecret }
}
