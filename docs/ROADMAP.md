# Roadmap — CUMALATOR

Roadmap diperbarui setiap minggu.

| Sprint | Deliverable | Fitur MVP yang dikerjakan | Bukti |
|---|---|---|---|
| P09 (selesai) | Charter, repo, roadmap, Bootstrap 5.3.3, pembungkus `ui-pustaka.js`, `DEPENDENCIES.md` | Semua fitur tampil dengan komponen pustaka | Screenshot 400 px dan laptop, `git log` |
| P10 | Perbaiki ≥ 2 bug nyata memakai cabang dan merge. Bug 1: skala nilai tidak sesuai kampus (tambah AB dan BC, A- = 3,75, B+ = 3,25, hapus B- dan C+). Bug 2: nama mata kuliah tidak di-escape, dan log baris salah nomor | Hitung IPK (Must), Panduan bobot nilai (Could) | Cabang `fix/skala-nilai` dan `fix/escape-input`, `git log --graph`, screenshot sebelum dan sesudah |
| P11 | Kode dipecah menjadi ≥ 3 modul ES: `src/data.js` (nilai dan penyimpanan), `src/ui.js`, `src/main.js` | Tambah dan ubah mata kuliah (Must), simpan otomatis (Should) | Struktur folder `src/`, aplikasi tetap berjalan, `git log` |
| P12 | Komponen reusable `BarisMataKuliah`, penyimpanan berversi yang aman, ekspor data JSON, `README`, `CHANGELOG`, tag `v0.x` | Riwayat perhitungan (Should), ekspor data | Tag `v0.x` di GitHub, `CHANGELOG.md`, screenshot |
| P13 | Konsep produk (Tugas 7) | Semua fitur MVP dirangkum | Dokumen Tugas 7 |
| P14 | Demo Akhir | Alur utama: hitung IPK sampai riwayat | Demo langsung dan repo final |