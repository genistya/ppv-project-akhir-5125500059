function tampilkanModal(idElement) {
  const el = document.querySelector(idElement);
  if (el && typeof bootstrap !== 'undefined') {
    bootstrap.Modal.getOrCreateInstance(el).show();
  }
}

function sembunyikanModal(idElement) {
  const el = document.querySelector(idElement);
  if (el && typeof bootstrap !== 'undefined') {
    const instance = bootstrap.Modal.getInstance(el);
    if (instance) instance.hide();
  }
}