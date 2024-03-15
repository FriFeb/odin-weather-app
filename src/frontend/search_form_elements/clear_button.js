const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {
  hideClearBtn();
});

export function showClearBtn() {
  clearBtn.style.display = 'block';
}

export function hideClearBtn() {
  clearBtn.style.display = 'none';
}
