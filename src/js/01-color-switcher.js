const refs = {
  startBtn: document.querySelector('[data-start]'),
  closeBtn: document.querySelector('[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', onChangeColor);
refs.closeBtn.addEventListener('click', onStopColor);

function onChangeColor() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
}

function onStopColor() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
