const main = document.querySelector('.main-wrapper');

export function showMainSection() {
  main.style.display = 'flex';
}

export function hideMainSection() {
  main.style.display = 'none';
}
