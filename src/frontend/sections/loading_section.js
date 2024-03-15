const loading = document.querySelector('.loading-section');

export function showLoadingSection() {
  loading.style.display = 'flex';
}

export function hideLoadingSection() {
  loading.style.display = 'none';
}
