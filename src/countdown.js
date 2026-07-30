import { CONFIG } from './config.js'

// ============================================================
//  Lock screen: raat 12 bajay tak countdown, phir unlock button
//  Abhi test karna ho to URL ke aakhir mein  ?preview  laga do
//  maslan:  http://localhost:5173/?preview
// ============================================================

export function initLock({ onUnlock }) {
  const lock = document.getElementById('lock')
  const body = document.body
  const btn = document.getElementById('unlockBtn')
  const cd = document.getElementById('countdown')
  const hint = document.getElementById('lockHint')
  const D = document.getElementById('cdD')
  const H = document.getElementById('cdH')
  const M = document.getElementById('cdM')
  const S = document.getElementById('cdS')

  const preview = new URLSearchParams(location.search).has('preview')
  const unlockAt = CONFIG.unlockDate.getTime()
  let ready = false

  function showUnlockButton() {
    if (ready) return
    ready = true
    cd.classList.add('hidden')
    hint.classList.add('hidden')
    btn.classList.remove('hidden')
    lock.classList.add('ready')
  }

  function tick() {
    if (ready) return
    let diff = unlockAt - Date.now()
    if (diff <= 0) { showUnlockButton(); return }
    const d = Math.floor(diff / 86400000); diff -= d * 86400000
    const h = Math.floor(diff / 3600000); diff -= h * 3600000
    const m = Math.floor(diff / 60000); diff -= m * 60000
    const s = Math.floor(diff / 1000)
    D.textContent = String(d).padStart(2, '0')
    H.textContent = String(h).padStart(2, '0')
    M.textContent = String(m).padStart(2, '0')
    S.textContent = String(s).padStart(2, '0')
    setTimeout(tick, 1000)
  }

  function openTheDoor() {
    lock.classList.add('gone')
    body.classList.remove('locked')
    setTimeout(() => { if (lock.parentNode) lock.parentNode.removeChild(lock) }, 1100)
    if (onUnlock) onUnlock()
  }

  btn.addEventListener('click', openTheDoor)

  if (preview) {
    // Test mode: lock foran hata do
    openTheDoor()
    return
  }

  tick()
}
