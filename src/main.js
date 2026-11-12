import * as state from './state.js';
import * as ui from './ui.js';

const tableBody = document.getElementById('tableBody');
const addRowBtn = document.getElementById('addRowBtn');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const form = document.getElementById('ipkForm');
const resultCard = document.getElementById('resultCard');
const ipkValue = document.getElementById('ipkValue');
const tooltip = document.getElementById('tooltip');
const saveIndicator = document.getElementById('saveIndicator');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

let saveTimeout = null;

function playSuccessSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.12);

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.28);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
    oscillator.onended = () => audioContext.close();
  } catch (err) {
    console.warn('Audio feedback tidak tersedia:', err);
  }
}

function ambilDataDariTabel() {
  const rows = tableBody.querySelectorAll('.course-row');
  return Array.from(rows).map((row) => ({
    nama: row.querySelector('.nama-input').value,
    sks: row.querySelector('.sks-input').value,
    nilai: row.querySelector('.nilai-select').value
  }));
}

function simpanOtomatis() {
  const data = ambilDataDariTabel();
  const berhasil = state.simpanDaftarMatkul(data);
  if (berhasil && saveIndicator) {
    saveIndicator.textContent = '✓ Data tersimpan otomatis';
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveIndicator.textContent = '';
    }, 1500);
  }
}

function tambahBaris(fokusKeNama = false, dataAwal = {}) {
  const tr = ui.buatBarisMatkul({
    nama: dataAwal.nama ?? '',
    sks: dataAwal.sks ?? '',
    nilai: dataAwal.nilai ?? 'A',
    onSimpan: simpanOtomatis,
    onTambahBaris: (fokus) => {
      tambahBaris(fokus);
      simpanOtomatis();
    },
    tooltipEl: tooltip
  });

  tableBody.appendChild(tr);

  if (fokusKeNama) {
    tr.querySelector('.nama-input')?.focus();
  }
}

// Navigasi Antar-Halaman (Kalkulator / Panduan Nilai / Tentang)
function gantiHalaman(targetId) {
  document.querySelectorAll('.app-view').forEach((sec) => {
    const aktif = sec.id === targetId;
    sec.hidden = !aktif;
    sec.classList.toggle('active', aktif);
  });

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === targetId);
  });
}

document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => gantiHalaman(btn.dataset.view));
});

document.querySelectorAll('[data-go-view]').forEach((btn) => {
  btn.addEventListener('click', () => gantiHalaman(btn.dataset.goView));
});

// Event Tombol & Form
addRowBtn?.addEventListener('click', () => {
  tambahBaris(true);
  simpanOtomatis();
});

exportBtn?.addEventListener('click', () => {
  const payload = {
    aplikasi: 'CUMALATOR',
    versi: '1.0.0',
    waktuEkspor: new Date().toISOString(),
    daftarMatkul: ambilDataDariTabel(),
    riwayatIPK: state.muatRiwayat()
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cumalator-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

resetBtn?.addEventListener('click', () => {
  if (!confirm('Hapus semua data mata kuliah? Tindakan ini tidak bisa dibatalkan.')) return;

  tableBody.replaceChildren();
  resultCard.style.display = 'none';
  state.hapusDaftarMatkul();

  tambahBaris();
  simpanOtomatis();
});

clearHistoryBtn?.addEventListener('click', () => {
  if (!confirm('Hapus semua riwayat perhitungan IPK?')) return;
  state.hapusSemuaRiwayat();
  ui.renderDaftarRiwayat([], historyList);
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = ambilDataDariTabel();
  const hasil = state.hitungIPK(data);

  if (!hasil.valid) {
    resultCard.style.display = 'none';
    const rows = tableBody.querySelectorAll('.course-row');

    rows.forEach((row) => {
      const sksInput = row.querySelector('.sks-input');
      const sks = parseFloat(sksInput.value);
      const invalid = !Number.isFinite(sks) || sks <= 0;
      sksInput.classList.toggle('input-invalid', invalid);
      if (invalid) ui.shakeElement(sksInput);
    });

    alert('Pastikan semua kolom SKS diisi dengan angka yang valid (1–24) sebelum menghitung.');
    tableBody.querySelector('.input-invalid')?.focus();
    return;
  }

  ipkValue.textContent = hasil.ipk;
  resultCard.style.display = 'block';

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof resultCard.animate === 'function') {
    resultCard.animate(
      [
        { opacity: 0, transform: 'translateY(30px) scale(0.95)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ],
      { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );
  }

  playSuccessSound();
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

  simpanOtomatis();
  const riwayatTerbaru = state.tambahRiwayat(hasil.ipk, hasil.totalSks);
  ui.renderDaftarRiwayat(riwayatTerbaru, historyList);
});

// Inisialisasi Awal Saat Halaman Dibuka
function init() {
  ui.renderDaftarRiwayat(state.muatRiwayat(), historyList);

  const dataTersimpan = state.muatDaftarMatkul();
  if (dataTersimpan.length > 0) {
    dataTersimpan.forEach((item) => tambahBaris(false, item));
  } else {
    tambahBaris(false, { nama: 'Kalkulus I', sks: 3, nilai: 'A' });
    tambahBaris(false, { nama: 'Pemrograman Dasar', sks: 4, nilai: 'A-' });
    tambahBaris(false, { nama: 'Bahasa Inggris', sks: 2, nilai: 'B+' });
  }
}

init();