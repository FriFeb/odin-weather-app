const error = document.querySelector('.error-section');
const errorMessage = document.querySelector('.error-message');

export function showErrorSection() {
  error.style.display = 'flex';
}

export function hideErrorSection() {
  error.style.display = 'none';
}

export function showErrorMessage(message) {
  errorMessage.innerHTML = message;
}
