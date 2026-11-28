// demo-kit.js — kit pra-demo untuk Demo Akhir Praktikum Pemrograman Visual (TB033109)
// Pasang di aplikasi Anda SEBELUM script utama: <script src="demo-kit.js"></script>
// Aktif hanya bila alamat diakhiri ?demo=1, jadi tidak mengganggu pemakaian biasa.
//
// Atur di aplikasi Anda (opsional), sebelum demo-kit.js dimuat:
// window.DEMO_KIT = {
// kunciStorage: ['nama-kunci-localStorage-anda'], // dihapus saat Reset
// isiContoh() { /* tulis data contoh ke localStorage */ },
// };
(function () {
  const aktif = new URLSearchParams(location.search).get('demo') === '1';
  const atur = Object.assign({ kunciStorage: [], isiContoh: null }, window.DEMO_KIT || {});
  // 1. Penangkap kesalahan: error tetap tercatat di Console, tetapi penonton melihat pesan yang jelas
  function spanduk(pesan) {
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', () => spanduk(pesan));
      return;
    }
    let s = document.getElementById('demo-kit-error');
    if (!s) {
      s = document.createElement('div');
      s.id = 'demo-kit-error';
      s.setAttribute('role', 'alert');
      s.style.cssText =
        'position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;padding:10px 14px;' +
        'border-radius:8px;background:#b42318;color:#fff;font:14px system-ui,sans-serif;display:flex;gap:10px;' +
        'align-items:center;justify-content:space-between';
      const teks = document.createElement('span');
      const tombol = document.createElement('button');
      tombol.textContent = 'Muat ulang';
      tombol.style.cssText = 'border:0;border-radius:6px;padding:6px 10px;cursor:pointer';
      tombol.addEventListener('click', () => location.reload());
      s.append(teks, tombol);
      document.body.append(s);
    }
    s.firstChild.textContent = 'Terjadi kesalahan: ' + pesan;
  }
  window.addEventListener('error', (e) => spanduk(e.message || 'kesalahan tidak dikenal'));
  window.addEventListener('unhandledrejection', (e) =>
    spanduk(String((e.reason && e.reason.message) || e.reason)),
  );
  if (!aktif) return;
  // 2. Panel demo: isi data contoh, reset, dan pengatur waktu 5–7 menit
  function panel() {
    const p = document.createElement('div');
    p.id = 'demo-kit-panel';
    p.style.cssText =
      'position:fixed;top:12px;right:12px;z-index:99998;background:#1f3b63;color:#fff;' +
      'padding:8px 10px;border-radius:8px;font:13px system-ui,sans-serif;display:flex;gap:8px;align-items:center';
    const waktu = document.createElement('strong');
    waktu.textContent = '00:00';
    const tombol = (label, aksi) => {
      const b = document.createElement('button');
      b.textContent = label;
      b.style.cssText = 'border:0;border-radius:6px;padding:4px 8px;cursor:pointer';
      b.addEventListener('click', aksi);
      return b;
    };
    const reset = () => {
      atur.kunciStorage.forEach((k) => {
        try {
          localStorage.removeItem(k);
        } catch (err) {
          console.warn(err);
        }
      });
      location.reload();
    };
    const isi = () => {
      if (typeof atur.isiContoh !== 'function') {
        spanduk('DEMO_KIT.isiContoh belum diatur');
        return;
      }
      atur.isiContoh();
      location.reload();
    };
    p.append(document.createTextNode('Demo'), waktu, tombol('Isi contoh', isi), tombol('Reset', reset));
    document.body.append(p);
    const mulai = Date.now();
    setInterval(() => {
      const detik = Math.floor((Date.now() - mulai) / 1000);
      waktu.textContent =
        String(Math.floor(detik / 60)).padStart(2, '0') + ':' + String(detik % 60).padStart(2, '0');
      p.style.background = detik >= 420 ? '#b42318' : detik >= 300 ? '#b26a00' : '#1f3b63';
    }, 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', panel);
  else panel();
})();
