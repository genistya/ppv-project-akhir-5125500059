(function () {
  const grades = {
    "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "D": 1.0, "E": 0.0
  };

  const tableBody = document.getElementById('tableBody');
  const addRowBtn = document.getElementById('addRowBtn');
  const resetBtn = document.getElementById('resetBtn');
  const form = document.getElementById('ipkForm');
  const resultCard = document.getElementById('resultCard');
  const ipkValue = document.getElementById('ipkValue');
  const eventLog = document.getElementById('eventLog');
  const tooltip = document.getElementById('tooltip');
  const saveIndicator = document.getElementById('saveIndicator');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  const STORAGE_KEY = 'kalkulator-ipk-data';
  const HISTORY_KEY = 'kalkulator-ipk-history';
  let rowCount = 0;
  let saveTimeout = null;

  function playSuccessSound() {
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(
        660,
        audioContext.currentTime
      );
      oscillator.frequency.setValueAtTime(
        880,
        audioContext.currentTime + 0.12
      );

      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.12,
        audioContext.currentTime + 0.02
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.28
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);

      oscillator.onended = () => audioContext.close();
    } catch (err) {
      console.warn('Audio feedback tidak tersedia:', err);
    }
  }

  function shakeElement(element) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (typeof element.animate !== 'function') return;

    element.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(0)' }
      ],
      {
        duration: 260,
        easing: 'ease-in-out'
      }
    );
  }

  function saveToStorage() {
    try {
      const rows = tableBody.querySelectorAll('.course-row');
      const data = Array.from(rows).map(row => ({
        nama: row.querySelector('.nama-input').value,
        sks: row.querySelector('.sks-input').value,
        nilai: row.querySelector('.nilai-select').value
      }));

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      saveIndicator.textContent = '✓ Data tersimpan otomatis';

      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveIndicator.textContent = '';
      }, 1500);
    } catch (err) {
      console.error('Gagal menyimpan data:', err);
    }
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;

      const data = JSON.parse(raw);
      if (!Array.isArray(data) || data.length === 0) return false;

      data.forEach(item => addRow(item.nama, item.sks, item.nilai));
      log('Data sebelumnya berhasil dimuat dari penyimpanan lokal');

      return true;
    } catch (err) {
      console.error('Gagal memuat data:', err);
      return false;
    }
  }

  function getHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const data = raw ? JSON.parse(raw) : [];

      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Gagal membaca riwayat:', err);
      return [];
    }
  }

  function renderHistory() {
    const history = getHistory();
    historyList.innerHTML = '';

    if (history.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'hint';
      empty.id = 'historyEmpty';
      empty.textContent = 'Belum ada riwayat perhitungan.';
      historyList.appendChild(empty);
      return;
    }

    history.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `
        <span class="history-meta">${entry.tanggal} &middot; ${entry.totalSks} SKS</span>
        <span class="history-ipk">${entry.ipk}</span>
      `;
      historyList.appendChild(item);
    });
  }

  function addHistoryEntry(ipk, totalSks) {
    try {
      const history = getHistory();

      const tanggal = new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      history.unshift({ tanggal, ipk, totalSks });

      const trimmed = history.slice(0, 20);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));

      renderHistory();
    } catch (err) {
      console.error('Gagal menyimpan riwayat:', err);
    }
  }

  clearHistoryBtn.addEventListener('click', () => {
    if (!confirm('Hapus semua riwayat perhitungan IPK?')) return;

    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (err) {
      console.error(err);
    }

    renderHistory();
    log('Riwayat perhitungan IPK dihapus');
  });

  function log(msg) {
    if (!eventLog) return;

    const line = document.createElement('div');
    const time = new Date().toLocaleTimeString('id-ID', {
      hour12: false
    });

    line.textContent = `[${time}] ${msg}`;
    eventLog.prepend(line);

    while (eventLog.children.length > 12) {
      eventLog.removeChild(eventLog.lastChild);
    }
  }

  function gradeOptionsHtml(selected) {
    return Object.keys(grades).map(g =>
      `<option value="${g}" ${g === selected ? 'selected' : ''}>${g} (${grades[g].toFixed(1)})</option>`
    ).join('');
  }

  function addRow(nama = '', sks = '', nilai = 'A') {
    rowCount++;

    const tr = document.createElement('tr');
    tr.className = 'course-row';
    tr.dataset.rowId = rowCount;

    tr.innerHTML = `
      <td class="col-nama">
        <input type="text" class="nama-input" placeholder="Nama mata kuliah" value="${nama}">
      </td>
      <td>
        <input type="number" class="sks-input" min="1" max="24" placeholder="SKS" value="${sks}">
      </td>
      <td>
        <select class="nilai-select">${gradeOptionsHtml(nilai)}</select>
      </td>
    `;

    tableBody.appendChild(tr);

    // ANIMASI 1: Baris mata kuliah baru muncul
    if (
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      typeof tr.animate === 'function'
    ) {
      tr.animate(
        [
          { opacity: 0, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }
      );
    }

    const sksInput = tr.querySelector('.sks-input');
    const namaInput = tr.querySelector('.nama-input');
    const nilaiSelect = tr.querySelector('.nilai-select');

    sksInput.addEventListener('input', () => {
      const sks = parseFloat(sksInput.value);

      if (Number.isFinite(sks) && sks > 0) {
        sksInput.classList.remove('input-invalid');
      }

      log(`Mengetik SKS pada baris ${rowCount}: "${sksInput.value}"`);
      saveToStorage();
    });

    nilaiSelect.addEventListener('change', () => {
      log(`Nilai baris ${rowCount} diubah menjadi ${nilaiSelect.value} (bobot ${grades[nilaiSelect.value].toFixed(1)})`);
      saveToStorage();
    });

    sksInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        log('Enter ditekan pada kolom SKS -> menambah baris baru');
        addRow();

        const newRow = tableBody.lastElementChild;
        newRow.querySelector('.nama-input').focus();
      }
    });

    namaInput.addEventListener('dblclick', () => {
      log(`Nama mata kuliah baris ${rowCount} dikosongkan (double-click)`);

      namaInput.value = '';
      namaInput.focus();
      saveToStorage();
    });

    [namaInput, sksInput, nilaiSelect].forEach(field => {
      field.addEventListener('focus', () => {
        field.classList.add('field-focused');
      });

      field.addEventListener('blur', () => {
        field.classList.remove('field-focused');
      });
    });

    tr.addEventListener('mouseover', () => {
      tr.classList.add('hovered');

      const rect = tr.getBoundingClientRect();
      tooltip.textContent = `Bobot nilai saat ini: ${grades[nilaiSelect.value].toFixed(1)}`;
      tooltip.style.left = (rect.left + 10) + 'px';
      tooltip.style.top = (rect.top - 28) + 'px';
      tooltip.style.opacity = '1';
    });

    tr.addEventListener('mouseout', () => {
      tr.classList.remove('hovered');
      tooltip.style.opacity = '0';
    });
  }

  addRowBtn.addEventListener('click', () => {
    log('Menambahkan baris mata kuliah baru');
    addRow();
    saveToStorage();
  });

  resetBtn.addEventListener('click', () => {
    if (!confirm('Hapus semua data mata kuliah? Tindakan ini tidak bisa dibatalkan.')) {
      return;
    }

    tableBody.innerHTML = '';
    rowCount = 0;
    resultCard.style.display = 'none';

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }

    log('Semua data direset');

    addRow();
    saveToStorage();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rows = tableBody.querySelectorAll('.course-row');
    let totalSks = 0;
    let totalBobot = 0;
    let valid = true;

    rows.forEach(row => {
      const sks = parseFloat(row.querySelector('.sks-input').value);
      const nilai = row.querySelector('.nilai-select').value;

      if (isNaN(sks) || sks <= 0) {
        valid = false;
        return;
      }

      totalSks += sks;
      totalBobot += sks * grades[nilai];
    });

    if (!valid || rows.length === 0 || totalSks === 0) {
      log('Gagal menghitung: pastikan semua SKS terisi dengan angka valid');

      resultCard.style.display = 'none';

      rows.forEach(row => {
        const sksInput = row.querySelector('.sks-input');
        const sks = parseFloat(sksInput.value);
        const invalid = !Number.isFinite(sks) || sks <= 0;

        sksInput.classList.toggle('input-invalid', invalid);

        if (invalid) {
          shakeElement(sksInput);
        }
      });

      alert('Pastikan semua kolom SKS diisi dengan angka yang valid sebelum menghitung.');

      const firstInvalid = tableBody.querySelector('.input-invalid');
      if (firstInvalid) firstInvalid.focus();

      return;
    }

    const ipk = totalBobot / totalSks;
    ipkValue.textContent = ipk.toFixed(2);

    // Tampilkan kartu hasil sebelum memulai animasi
    resultCard.style.display = 'block';

    // ANIMASI 2: Kartu hasil IPK muncul
    if (
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      typeof resultCard.animate === 'function'
    ) {
      resultCard.animate(
        [
          {
            opacity: 0,
            transform: 'translateY(40px) scale(0.90)'
          },
          {
            opacity: 1,
            transform: 'translateY(0) scale(1)'
          }
        ],
        {
          duration: 900,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }
      );
    }

    playSuccessSound();
    log(`IPK dihitung: ${ipk.toFixed(2)} dari total ${totalSks} SKS`);
    resultCard.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    saveToStorage();
    addHistoryEntry(ipk.toFixed(2), totalSks);
  });

  renderHistory();

  const loaded = loadFromStorage();

  if (!loaded) {
    addRow('Kalkulus I', 3, 'A');
    addRow('Pemrograman Dasar', 4, 'A-');
    addRow('Bahasa Inggris', 2, 'B+');
  }

  log('Kalkulator IPK siap digunakan');
})();