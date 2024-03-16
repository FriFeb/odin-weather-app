export function deactivateTempModeElements() {
  const tempModeElements = document.querySelectorAll('[data-temperature-mode]');
  tempModeElements.forEach((el) => el.classList.remove('temp-mode-active'));
}

export function activateTempModeElement(tempModeElement) {
  tempModeElement.classList.add('temp-mode-active');
}
