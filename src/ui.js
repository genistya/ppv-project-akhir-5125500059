export function buatBarisMatkulHTML(matkul, indeks) {
  return `
    <tr data-id="${matkul.id}">
      <td>${indeks + 1}</td>
      <td>${matkul.nama}</td>
      <td>${matkul.sks}</td>
      <td>${matkul.nilai}</td>
      <td>
        <button data-aksi="hapus" data-id="${matkul.id}" class="btn-hapus">Hapus</button>
      </td>
    </tr>
  `;
}

export function perbaruiTampilanTabel(daftarMatkul, elTabelBody) {
  if (!elTabelBody) return;
  if (daftarMatkul.length === 0) {
    elTabelBody.innerHTML = `<tr><td colspan="5" class="text-center">Belum ada data mata kuliah.</td></tr>`;
    return;
  }
  elTabelBody.innerHTML = daftarMatkul.map((m, i) => buatBarisMatkulHTML(m, i)).join('');
}

export function perbaruiRingkasanIPK(ringkasan, elIPK, elTotalSKS) {
  if (elIPK) elIPK.textContent = ringkasan.ipk;
  if (elTotalSKS) elTotalSKS.textContent = ringkasan.totalSKS;
}