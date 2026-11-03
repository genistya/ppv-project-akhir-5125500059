import * as state from './state.js';
import * as ui from './ui.js';

const elForm = document.getElementById('form-matkul');
const elTabelBody = document.getElementById('tbody-matkul');
const elIPK = document.getElementById('ipk-val');
const elTotalSKS = document.getElementById('sks-val');

function render() {
  const data = state.dapatkanSemuaMatkul();
  const ringkasan = state.hitungRingkasan();
  ui.perbaruiTampilanTabel(data, elTabelBody);
  ui.perbaruiRingkasanIPK(ringkasan, elIPK, elTotalSKS);
}

// Inisialisasi awal
state.muatState();

// Form Event Submit
if (elForm) {
  elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama-matkul').value.trim();
    const sks = document.getElementById('sks-matkul').value;
    const nilai = document.getElementById('nilai-matkul').value;

    if (!nama || !sks || !nilai) return;

    state.tambahMatkul(nama, sks, nilai);
    elForm.reset();
    render();
  });
}

// Event Delegation Tombol Hapus (Tanpa inline onclick)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-aksi="hapus"]');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  if (confirm('Hapus mata kuliah ini?')) {
    state.hapusMatkul(id);
    render();
  }
});

render();