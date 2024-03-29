const form = document.querySelector('form');

export function changeMargin(margin) {
  const { top, right, bottom, left } = margin;

  form.style.marginTop = top;
  form.style.marginRight = right;
  form.style.marginBottom = bottom;
  form.style.marginLeft = left;
}
