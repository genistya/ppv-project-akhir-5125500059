import { BOBOT_NILAI } from './state.js';

export function shakeElement(element) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof element.animate !== 'function') return;

  element.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(0)' }
    ],
    { duration: 260, easing: 'ease-in-out' }
  );
}

export function buatBarisMatkul({ nama = '', sks = '', nilai = 'A', onSimpan, onTambahBaris, tooltipEl }) {
  const tr = document.createElement('tr');
  tr.className = 'course-row';

  // Kolom Nama Matkul
  const tdNama = document.createElement('td');
  tdNama.className = 'col-nama';
  const inputNama = document.createElement('input');
  inputNama.type = 'text';
  inputNama.className = 'form-control nama-input';
  inputNama.placeholder = 'Nama mata kuliah';
  inputNama.value = nama;
  tdNama.appendChild(inputNama);

  // Kolom SKS
  const tdSks = document.createElement('td');
  const inputSks = document.createElement('input');
  inputSks.type = 'number';
  inputSks.className = 'form-control sks-input';
  inputSks.min = '1';
  inputSks.max = '24';
  inputSks.placeholder = 'SKS';
  inputSks.value = sks;
  tdSks.appendChild(inputSks);

  // Kolom Nilai
  const tdNilai = document.createElement('td');
  const selectNilai = document.createElement('select');
  selectNilai.className = 'form-select nilai-select';

  Object.keys(BOBOT_NILAI).forEach((huruf) => {
    const opt = document.createElement('option');
    opt.value = huruf;
    opt.textContent = `${huruf} (${BOBOT_NILAI[huruf].toFixed(1)})`;
    if (huruf === nilai) opt.selected = true;
    selectNilai.appendChild(opt);
  });
  tdNilai.appendChild(selectNilai);

  // Kolom Tombol Hapus Baris
  const tdAksi = document.createElement('td');
  tdAksi.className = 'text-end';
  const btnHapus = document.createElement('button');
  btnHapus.type = 'button';
  btnHapus.className = 'btn btn-sm btn-outline-danger';
  btnHapus.textContent = '×';
  btnHapus.title = 'Hapus mata kuliah ini';
  btnHapus.addEventListener('click', () => {
    tr.remove();
    if (onSimpan) onSimpan();
  });
  tdAksi.appendChild(btnHapus);

  tr.append(tdNama, tdSks, tdNilai, tdAksi);

  // Event Interaksi Baris
  inputNama.addEventListener('input', () => {
    if (onSimpan) onSimpan();
  });

  inputNama.addEventListener('dblclick', () => {
    inputNama.value = '';
    inputNama.focus();
    if (onSimpan) onSimpan();
  });

  inputSks.addEventListener('input', () => {
    const val = parseFloat(inputSks.value);
    if (Number.isFinite(val) && val > 0) {
      inputSks.classList.remove('input-invalid');
    }
    if (onSimpan) onSimpan();
  });

  inputSks.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onTambahBaris) onTambahBaris(true);
    }
  });

  selectNilai.addEventListener('change', () => {
    if (onSimpan) onSimpan();
  });

  // Tooltip Hover Bobot Nilai
  if (tooltipEl) {
    tr.addEventListener('mouseover', () => {
      tr.classList.add('hovered');
      const rect = tr.getBoundingClientRect();
      const bobot = BOBOT_NILAI[selectNilai.value]?.toFixed(1) ?? '0.0';
      tooltipEl.textContent = `Bobot nilai saat ini: ${bobot}`;
      tooltipEl.style.left = `${rect.left + 10}px`;
      tooltipEl.style.top = `${rect.top - 28}px`;
      tooltipEl.style.opacity = '1';
    });

    tr.addEventListener('mouseout', () => {
      tr.classList.remove('hovered');
      tooltipEl.style.opacity = '0';
    });
  }

  // Animasi Muncul
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof tr.animate === 'function') {
    tr.animate(
      [
        { opacity: 0, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      { duration: 400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );
  }

  return tr;
}

export function renderDaftarRiwayat(riwayat, containerEl) {
  if (!containerEl) return;
  containerEl.replaceChildren();

  if (riwayat.length === 0) {
    const kosong = document.createElement('p');
    kosong.className = 'text-muted mb-0 small';
    kosong.id = 'historyEmpty';
    kosong.textContent = 'Belum ada riwayat perhitungan.';
    containerEl.appendChild(kosong);
    return;
  }

  riwayat.forEach((entry) => {
    const item = document.createElement('div');
    item.className = 'history-item d-flex justify-content-between align-items-center py-2 border-bottom';

    const meta = document.createElement('span');
    meta.className = 'history-meta small text-muted';
    meta.textContent = `${entry.tanggal} · ${entry.totalSks} SKS`;

    const nilai = document.createElement('span');
    nilai.className = 'history-ipk fw-bold text-primary';
    nilai.textContent = entry.ipk;

    item.append(meta, nilai);
    containerEl.appendChild(item);
  });
}