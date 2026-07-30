// ================================================================
//  ⭐ YAHAAN SE SAB KUCH BADAL SAKTE HO — naam, waqt, messages ⭐
//  Kisi bhi line ko edit karo, save karo, browser khud refresh ho jayega.
// ================================================================

export const CONFIG = {

  // ---- Uska naam (website par har jagah yahi dikhega) ----
  herName: "Shehzadi",

  // ---- Website KAB unlock ho ----
  // Format: new Date(saal, mahina - 1, tareekh, ghanta, minute)
  // Neeche likha hai: 31 July 2026, raat 12:00 bajay (30 July khatam hote hi)
  // Note: January = 0, February = 1, ... July = 6
  unlockDate: new Date(2026, 6, 31, 0, 0, 0),

  // ---- Cake par kitni candles hon ----
  candleCount: 5,

  // ================= LOCK SCREEN =================
  lockKicker: "✦ SIRF TUMHARE LIYE ✦",
  lockTitle: "31 July — Raat 12 Bajay",
  lockLine: "Shehzadi, waqt poora hone se pehle ye darwaaza nahi khulta… 💜",
  lockHint: "⏳ Waqt poora hote hi yahan ek button aa jayega — bas us par tap karna",
  unlockBtn: "💜 Unlock Karo — Yahan Tap Karo",

  // ================= HERO =================
  heroDate: "✦ 31 • 07 ✦",
  heroKicker: "Happy Birthday",
  heroSub: "Meri jaan, meri duniya, meri Shehzadi — aaj ka din, har sitara, har roshni… sab kuch sirf tumhare liye hai ✨",

  // ================= CAKE =================
  cakeTitle: "🎂 Tumhara Cake",
  cakeSub: "Candles khud bujhaani hain! Mic on karo aur zor se phoonk maaro 🌬️ — ya neeche wala button daba ke rakho",
  micBtn: "Mic On Karo",
  blowBtn: "Yahan Daba Ke Rakho",
  relightBtn: "Phir Se Jalaao",
  cakeStatusStart: "Pehle 🎤 mic on karo, phir zor se phoonk maaro 🌬️",
  strMicOn: "🎤 Mic sun raha hai… ab zor zor se phoonk maaro! 🌬️",
  strMicDenied: "Mic ki ijazat nahi mili — koi baat nahi! Button daba ke rakho, wohi kaam karega 💜",
  strMicError: "Mic nahi mil saka — koi baat nahi, button se candles bujha sakti ho 💜",
  strLeft: (n) => `✨ ${n} candle${n > 1 ? "s" : ""} baaki… aur zor se! 🌬️`,
  strAllOut: "MashaAllah! Saari candles bujh gayeen ✨",

  // ================= BANNER (candles bujhne ke baad) =================
  bannerSmall: "✦ Mubarak Ho ✦",
  bannerBig: "Happy Birthday",

  // ================= REASONS CARDS =================
  reasonsTitle: "👑 Wajhein Jo Tumhe Shehzadi Banati Hain",
  reasonsSub: "Har card par tap karo — andar ek wajah chhupi hai 💜",
  reasons: [
    "Tumhaari muskurahat meri har thakaan mita deti hai ✨",
    "Tumhaari awaaz sun ke din bhar ka stress ghayab 💜",
    "Tum sab ka khayaal rakhne wali ho — dil se 🌸",
    "Tumhaari hansti duniya ki sab se pyaari awaaz hai 😊",
    "Tumhe dekh ke lagta hai duayein kabhi jhoot nahi boltin ⭐",
    "Tum girne nahi deti — har mod par saath deti ho 🤝",
    "Tumhaari duayein mere liye hamesha ka sahaara hain 🤲",
    "Kyunke tum ho… wohi sab se badi wajah hai 👑",
  ],

  // ================= LOVE LETTER =================
  letterTitle: "💌 Ek Khat — Sirf Tumhare Liye",
  letterHint: "Muhar 👑 par tap karo",
  letterHintOpen: "💜",
  letterHeading: "Meri pyaari Shehzadi,",
  letter: [
    "Aaj ka din mere liye duniya ka sab se khaas din hai — kyunke isi din duniya mein meri Shehzadi aayi thi. Tumhaari muskurahat meri subah hai aur tumhaari awaaz mera sukoon.",
    "Main har lamha shukar ada karta hoon ke zindagi ne tumhe mera humsafar banaya. Tumhaare saath har mushkil aasaan lagti hai, aur har khushi dugni ho jaati hai.",
    "Ye website sirf ek chhota sa tohfa hai — asal tohfa to woh waqt hai jo main tumhaare saath guzaarna chahta hoon: har saal, har birthday, hamesha.",
    "Happy Birthday meri Shehzadi 👑 Allah tumhe hamesha hansta rakhe aur tumhaari har khwahish poori kare.",
  ],
  letterSign: "— sirf tumhaara 💜",

  // ================= FINALE =================
  finaleScript: "hamesha hansti raho…",
  finaleTitle: "Aaj Nahi, Har Din Tumhaara Hai",
  finaleSub: "Ye tohfa chhota hai, magar kehna bara hai: tum meri zindagi ki sab se khoobsurat wajah ho ✨",
  fwBtn: "Fireworks Dikhao",

  // ================= SKY LANTERNS =================
  lanternTitle: "🌌 Ek Khwahish Maango",
  lanternSub: "Aankhein band karo, dil se ek khwahish maango… phir neeche lantern par tap karo aur use aasmaan mein urta dekho ✨",
  lanternBtn: "🏮 Lantern par tap karo",
  lanternWish: "🤲 Allah tumhaari har nek khwahish poori kare, meri Shehzadi",

  // ================= 🥚 SECRET EASTER EGGS =================
  // (Ye messages kahin nahi likhe dikhte — woh khud dhoondhegi!)
  secretCrownMsg: "Ye crown sirf ek hi shakhs ke sar sajta hai — meri Shehzadi ke. Tumne raaz dhoondh liya 👑💜",
  secretHeartMsg: "Chhupa hua dil dhoondh liya! 💜 Iska inaam: ek lamha hanstay hue, har roz — wada raha.",
  secretTypedMsg: "Naam letay hi aasmaan jagmaga gaya ✨ Aisi ho tum mere liye — roz o shab, har jagah.",

  // ================= FOOTER =================
  footerText: "Banaaya gaya bohot saare pyaar ke saath",
  footerDate: "31 July • Sirf Shehzadi ke liye 👑",
}
