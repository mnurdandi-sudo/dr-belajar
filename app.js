/**
 * DR. BELAJAR - INTERACTIVE APPLICATION LOGIC
 * Features:
 * - Dynamic Banner Tabs & Countdown Timer
 * - Mood Booster / Meme Generator
 * - Course Filter & Tuition Calculator
 * - Audio Note Simulation & Instagram Reactions
 * - Modals & Form Submission to WhatsApp / Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  calculateTuition();
  setupMobileNav();
  setupModalDismissOnOutsideClick();
});

/* ==========================================================================
   1. DYNAMIC BANNER TABS
   ========================================================================== */
function switchBannerTab(tabName) {
  const tabs = {
    event: { btn: 'tabBtnEvent', card: 'bannerCardEvent' },
    nasional: { btn: 'tabBtnNasional', card: 'bannerCardNasional' },
    oprec: { btn: 'tabBtnOprec', card: 'bannerCardOprec' }
  };

  // Reset all
  Object.keys(tabs).forEach(key => {
    const btn = document.getElementById(tabs[key].btn);
    const card = document.getElementById(tabs[key].card);
    if (btn) btn.classList.remove('active');
    if (card) card.classList.remove('active');
  });

  // Activate selected
  if (tabs[tabName]) {
    const activeBtn = document.getElementById(tabs[tabName].btn);
    const activeCard = document.getElementById(tabs[tabName].card);
    if (activeBtn) activeBtn.classList.add('active');
    if (activeCard) activeCard.classList.add('active');
  }
}

/* ==========================================================================
   2. COUNTDOWN TIMER FOR TRYOUT EVENT
   ========================================================================== */
function initCountdown() {
  // Set target 14 days ahead from today
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 14);
  targetDate.setHours(targetDate.getHours() + 8);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      document.getElementById('countdownDays').innerText = '00';
      document.getElementById('countdownHours').innerText = '00';
      document.getElementById('countdownMinutes').innerText = '00';
      document.getElementById('countdownSeconds').innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = n => (n < 10 ? '0' + n : n);

    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minsEl = document.getElementById('countdownMinutes');
    const secsEl = document.getElementById('countdownSeconds');

    if (daysEl) daysEl.innerText = pad(days);
    if (hoursEl) hoursEl.innerText = pad(hours);
    if (minsEl) minsEl.innerText = pad(minutes);
    if (secsEl) secsEl.innerText = pad(seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   3. MOOD BOOSTER & RELATABLE QUOTES GENERATOR
   ========================================================================== */
const boosterQuotes = [
  {
    text: "Ingat, rumus fisika itu nggak gigit. Yang bikin pusing itu kalau kamu belajar sendiri sambil scroll TikTok jam 2 pagi. Tarik napas, pelajari satu konsep sekarang!",
    author: "dr. Belajar Daily Reminder 💡"
  },
  {
    text: "Jangan bandingin bab 1 perjalananmu dengan bab 20 orang lain. Yang penting tiap hari ada 1 soal matematika yang tadinya nggak ngerti, sekarang jadi paham!",
    author: "Kak Sarah • Tutor Kedokteran UI 🩺"
  },
  {
    text: "Tuntutlah ilmu walau ke negeri seberang, tapi jangan lupa PR sekolah dikerjain sebelum tutor dr. Belajar nge-zoom ya!",
    author: "Pojok Motivasi Santai 🚀"
  },
  {
    text: "Man Jadda Wajada bukan sekadar quotes bio IG. Kalau kamu konsisten latihan 30 menit sehari, UTBK bakal terasa kayak ulangan harian biasa!",
    author: "Kak Farhan • Alumnus ITB 🎯"
  },
  {
    text: "Belajar itu ibarat download file: kalau sinyalnya sabar dan fokus, pasti 100% complete tanpa error. Tetap semangat pejuang mimpi!",
    author: "dr. Belajar Gen-Z Squad ✨"
  },
  {
    text: "Bapak Pendidikan Ki Hajar Dewantara bilang: 'Setiap orang menjadi guru, setiap rumah menjadi sekolah'. Belajar privat online bikin kamarmu jadi lab impian!",
    author: "Inspirasi Nusantara 🇮🇩"
  }
];

let currentBoosterIndex = 0;

function generateNewBooster() {
  const quoteText = document.getElementById('boosterQuoteText');
  const quoteAuthor = document.getElementById('boosterQuoteAuthor');
  const quoteBox = document.getElementById('boosterQuoteBox');

  // Animation effect
  quoteBox.style.opacity = '0.3';
  quoteBox.style.transform = 'scale(0.98)';

  setTimeout(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * boosterQuotes.length);
    } while (nextIndex === currentBoosterIndex && boosterQuotes.length > 1);

    currentBoosterIndex = nextIndex;
    const q = boosterQuotes[currentBoosterIndex];

    quoteText.innerText = `"${q.text}"`;
    quoteAuthor.innerHTML = `<i class="fa-solid fa-lightbulb" style="color: #F59E0B;"></i> ${q.author}`;

    quoteBox.style.opacity = '1';
    quoteBox.style.transform = 'scale(1)';
  }, 200);
}

function copyBoosterQuote() {
  const quoteText = document.getElementById('boosterQuoteText').innerText;
  navigator.clipboard.writeText(quoteText).then(() => {
    showToast('Quote berhasil disalin! Semangat belajarnya!');
  }).catch(() => {
    showToast('Quote siap disebarkan!');
  });
}

/* ==========================================================================
   4. INSTAGRAM MEME LIKE & AUDIO PLAYER SIMULATION
   ========================================================================== */
let isMemeLiked = false;
function toggleMemeLike(btn) {
  const countEl = document.getElementById('likeCountMeme');
  let currentCount = parseInt(countEl.innerText.replace(/,/g, ''));
  const heartIcon = btn.querySelector('i');

  if (!isMemeLiked) {
    isMemeLiked = true;
    btn.classList.add('liked');
    heartIcon.classList.remove('fa-regular');
    heartIcon.classList.add('fa-solid');
    countEl.innerText = (currentCount + 1).toLocaleString();
    showToast('❤️ Kamu menyukai meme edukasi ini!');
  } else {
    isMemeLiked = false;
    btn.classList.remove('liked');
    heartIcon.classList.remove('fa-solid');
    heartIcon.classList.add('fa-regular');
    countEl.innerText = (currentCount - 1).toLocaleString();
  }
}

let isAudioPlaying = false;
let audioTimerInterval = null;
let audioSeconds = 15;

function toggleAudioSimulation() {
  const playIcon = document.getElementById('playIcon');
  const timerEl = document.getElementById('audioTimer');
  const bars = document.querySelectorAll('.wave-bar');

  if (!isAudioPlaying) {
    isAudioPlaying = true;
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    bars.forEach(b => b.classList.add('playing'));

    audioTimerInterval = setInterval(() => {
      audioSeconds--;
      if (audioSeconds < 0) {
        audioSeconds = 15;
        resetAudioSimulation();
        return;
      }
      const pad = audioSeconds < 10 ? '0' + audioSeconds : audioSeconds;
      timerEl.innerText = `0:${pad}`;
    }, 1000);

    showToast('🔊 Memutar wejangan motivasi dari Kak Mentor!');
  } else {
    resetAudioSimulation();
  }
}

function resetAudioSimulation() {
  isAudioPlaying = false;
  clearInterval(audioTimerInterval);
  const playIcon = document.getElementById('playIcon');
  const timerEl = document.getElementById('audioTimer');
  const bars = document.querySelectorAll('.wave-bar');

  if (playIcon) {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
  bars.forEach(b => b.classList.remove('playing'));
  if (timerEl) timerEl.innerText = '0:15';
  audioSeconds = 15;
}

/* ==========================================================================
   5. COURSE FILTERING
   ========================================================================== */
function filterCourses(category, btn) {
  // Update active filter button
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.course-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.35s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ==========================================================================
   6. TUITION CALCULATOR
   ========================================================================== */
function calculateTuition() {
  const levelSelect = document.getElementById('calcLevel');
  const sessionsSelect = document.getElementById('calcSessions');
  const outputEl = document.getElementById('tuitionOutput');
  const noteEl = document.getElementById('tuitionNote');

  if (!levelSelect || !sessionsSelect) return;

  const pricePerSession = parseInt(levelSelect.value);
  const sessionsCount = parseInt(sessionsSelect.value);

  let discountRate = 0;
  let discountLabel = 'Harga Standar Sesi Hemat';

  if (sessionsCount === 8) {
    discountRate = 0.10; // 10%
    discountLabel = 'Termasuk Diskon Paket 10% + Free Konsul PR 24 Jam';
  } else if (sessionsCount === 12) {
    discountRate = 0.15; // 15%
    discountLabel = 'Termasuk Diskon Paket 15% + Modul Ringkasan Lengkap';
  } else if (sessionsCount === 16) {
    discountRate = 0.20; // 20%
    discountLabel = 'Termasuk Diskon Spesial Intensif 20% + Garansi Tutor Cocok';
  }

  const rawTotal = pricePerSession * sessionsCount;
  const finalTotal = Math.round(rawTotal * (1 - discountRate));

  outputEl.innerText = 'Rp ' + finalTotal.toLocaleString('id-ID');
  noteEl.innerText = discountLabel;
}

/* ==========================================================================
   7. MODALS & FORMS
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openModalWithPlan(planName) {
  openModal('modalDaftar');
  const catatanField = document.getElementById('regCatatan');
  if (catatanField) {
    catatanField.value = `Pilihan Paket: ${planName}. `;
  }
}

function setupModalDismissOnOutsideClick() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal.id);
        }
      });
    }
  });
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  const nama = document.getElementById('regNamaSiswa').value;
  const jenjang = document.getElementById('regJenjang').value;
  const mapel = document.getElementById('regMapel').value;
  const wa = document.getElementById('regWhatsApp').value;
  const catatan = document.getElementById('regCatatan').value;

  closeModal('modalDaftar');
  showToast(`Terima kasih ${nama}! Pendaftaran kelasmu berhasil dikirim.`);

  // Prepare WhatsApp redirection url
  const waText = encodeURIComponent(
    `Halo Admin dr. Belajar! 🩺\n\nSaya ingin mendaftar kelas privat online:\n- *Nama*: ${nama}\n- *Jenjang*: ${jenjang}\n- *Mapel*: ${mapel}\n- *No. WA*: ${wa}\n- *Catatan*: ${catatan || '-'}\n\nMohon info jadwal dan rekomendasi tutor terbaik ya. Terima kasih!`
  );

  setTimeout(() => {
    window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
  }, 1200);

  e.target.reset();
}

function handleTutorSubmit(e) {
  e.preventDefault();
  const nama = document.getElementById('tutorNama').value;
  const univ = document.getElementById('tutorUniv').value;
  const bidang = document.getElementById('tutorBidang').value;

  closeModal('modalTutor');
  showToast(`Terima kasih ${nama} (${univ})! Berkas lamaran tutor berhasil diterima.`);

  e.target.reset();
}

/* ==========================================================================
   8. MOBILE NAV TOGGLE & TOAST
   ========================================================================== */
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '78px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '24px';
        navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        navLinks.style.borderBottom = '2px solid #E2E8F0';
      }
    });

    // Close menu when link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(l => {
      l.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMessage');
  if (toast && toastMsg) {
    toastMsg.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}
