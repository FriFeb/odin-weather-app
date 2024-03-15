import { hideClearBtn, showClearBtn } from './clear_button';

const input = document.querySelector('#location');

input.addEventListener('input', (e) => {
  showClearBtn();

  if (e.target.value === '') {
    hideClearBtn();
  }
});
