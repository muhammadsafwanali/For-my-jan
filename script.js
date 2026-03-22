const texts = [
    "Eid Mubarak My Love",
    "I Love You",
    "Dua tum Meri Zindagi ki sabse khoobsurat wajah ho",
    "Har Eid tumhare sath aur bhi haseen ho jati hy",
    "Tum meri har khushi ka markaz ho",
    "Allah tumhe hamesha mere sath salamat rakhe",
    "Ameen! Hamesha Muskuraati Raho"
];

let index = 0;
const mainTextElement = document.getElementById('main-text');
const contentArea = document.getElementById('content-area');

function updateText() {
    // Fade out
    contentArea.style.opacity = '0';
    contentArea.style.transform = 'translateY(-10px)';
    contentArea.style.transition = '0.8s';

    setTimeout(() => {
        index = (index + 1) % texts.length;
        mainTextElement.innerText = texts[index];
        
        // Fade in
        contentArea.style.opacity = '1';
        contentArea.style.transform = 'translateY(0)';
    }, 800);
}

// Har 4 seconds baad text badlega
setInterval(updateText, 4000);