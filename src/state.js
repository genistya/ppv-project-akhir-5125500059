export const BOBOT_NILAI = {
  "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "D": 1.0, "E": 0.0
};

const STORAGE_KEY = 'cumalator:data:v1';
const HISTORY_KEY = 'cumalator:history:v1';

export function simpanAman(kunci, nilai) {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai));
    return true;
  } catch (err) {
    console.warn(`Gagal menyimpan ke localStorage (${kunci}):`, err);
    return false;
  }
}

export function muatAman(kunci, nilaiDefault) {
  try {
    const mentah = localStorage.getItem(kunci);
    if (!mentah) return nilaiDefault;
    const hasil = JSON.parse(mentah);
    return Array.isArray(hasil) ? hasil : nilaiDefault;
  } catch (err) {
    console.warn(`Data rusak/tidak terbaca di ${kunci}, memakai default:`, err);
    return nilaiDefault;
  }
}

export function simpanDaftarMatkul(data) {
  return simpanAman(STORAGE_KEY, data);
}

export function muatDaftarMatkul() {
  const data = muatAman(STORAGE_KEY, []);
  return data.filter(
    (item) => item && typeof item === 'object' && typeof item.nama === 'string'
  );
}

export function hapusDaftarMatkul() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn(err);
  }
}

export function muatRiwayat() {
  const data = muatAman(HISTORY_KEY, []);
  return data.filter(
    (item) =>
      item &&
      typeof item === 'object' &&
      typeof item.tanggal === 'string' &&
      typeof item.ipk === 'string'
  );
}

export function tambahRiwayat(ipk, totalSks) {
  const riwayat = muatRiwayat();
  const tanggal = new Date().toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  riwayat.unshift({ tanggal, ipk, totalSks });
  const dibatasi = riwayat.slice(0, 20);
  simpanAman(HISTORY_KEY, dibatasi);
  return dibatasi;
}

export function hapusSemuaRiwayat() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.warn(err);
  }
}

export function hitungIPK(daftarMatkul) {
  let totalSks = 0;
  let totalBobot = 0;

  for (const item of daftarMatkul) {
    const sks = parseFloat(item.sks);
    const bobot = BOBOT_NILAI[item.nilai];

    if (!Number.isFinite(sks) || sks <= 0 || bobot === undefined) {
      return { valid: false, ipk: '0.00', totalSks: 0 };
    }

    totalSks += sks;
    totalBobot += sks * bobot;
  }

  if (daftarMatkul.length === 0 || totalSks === 0) {
    return { valid: false, ipk: '0.00', totalSks: 0 };
  }

  const ipk = (totalBobot / totalSks).toFixed(2);
  return { valid: true, ipk, totalSks };
}