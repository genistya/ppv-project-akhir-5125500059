const KEY_STORAGE = 'cumalator_data';

let daftarMatkul = [];

export function muatState() {
  daftarMatkul = JSON.parse(localStorage.getItem(KEY_STORAGE)) || [];
  return daftarMatkul;
}

export function simpanState() {
  localStorage.setItem(KEY_STORAGE, JSON.stringify(daftarMatkul));
}

export function dapatkanSemuaMatkul() {
  return daftarMatkul;
}

export function tambahMatkul(nama, sks, nilai) {
  const baru = {
    id: Date.now(),
    nama: nama,
    sks: Number(sks),
    nilai: Number(nilai)
  };
  daftarMatkul.push(baru);
  simpanState();
  return baru;
}

export function hapusMatkul(id) {
  daftarMatkul = daftarMatkul.filter(m => m.id !== id);
  simpanState();
}

export function hitungRingkasan() {
  let totalSKS = 0;
  let totalBobot = 0;

  daftarMatkul.forEach(m => {
    totalSKS += m.sks;
    totalBobot += m.sks * m.nilai;
  });

  const ipk = totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : '0.00';
  return { totalSKS, totalBobot: totalBobot.toFixed(2), ipk };
}