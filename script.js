const forgiveBtn = document.getElementById('forgiveBtn');
const finalModal = document.getElementById('finalModal');
const closeModal = document.getElementById('closeModal');
const playBtn = document.getElementById('playBtn');
const bg = document.getElementById('bgMusic');

forgiveBtn.addEventListener('click', ()=> {
  finalModal.classList.remove('hidden');
  // gentle confetti effect (simple)
  startHearts();
});

closeModal.addEventListener('click', ()=> {
  finalModal.classList.add('hidden');
});

playBtn.addEventListener('click', ()=> {
  if(!bg) return;
  if(bg.paused){ bg.play().catch(()=>{}); playBtn.textContent='Pause ▶'; }
  else{ bg.pause(); playBtn.textContent='Play Music ▶'; }
});

// small hearts animation generator
function startHearts(){
  for(let i=0;i<12;i++){
    createHeart(i*120);
  }
}
function createHeart(delay){
  const heart = document.createElement('div');
  heart.className = 'tiny-heart';
  heart.style.position='fixed';
  heart.style.left = (30 + Math.random()*60) + '%';
  heart.style.bottom = '-40px';
  heart.style.width='18px';
  heart.style.height='18px';
  heart.style.borderRadius='8px';
  heart.style.background='radial-gradient(circle at 30% 30%, #fff, #ff4d6d)';
  heart.style.opacity='0.95';
  heart.style.transform='translateY(0) scale(1)';
  heart.style.transition='transform 2.6s linear, opacity 2.6s linear';
  document.body.appendChild(heart);
  setTimeout(()=>{
    heart.style.transform='translateY(-260px) scale(1.2)';
    heart.style.opacity='0';
  }, delay + 50);
  setTimeout(()=>heart.remove(), delay + 3000);
}