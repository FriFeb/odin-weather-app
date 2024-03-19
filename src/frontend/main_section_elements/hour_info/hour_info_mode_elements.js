export function deactivateHourInfoModeElements() {
  const hourInfoModeElements = document.querySelectorAll(
    '.hours-info-mode > *'
  );
  hourInfoModeElements.forEach((el) =>
    el.classList.remove('hour-info-mode-active')
  );
}

export function activateHourInfoModeElement(hourInfoModeElement) {
  hourInfoModeElement.classList.add('hour-info-mode-active');
}
