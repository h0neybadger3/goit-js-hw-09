import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    checkCorrectDate(selectedDate);
  },
};

flatpickr(refs.datetimePicker, options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', startTimer);

function checkCorrectDate(selectedDate) {
  const currentDate = Date.now();
  if (selectedDate < currentDate) {
    Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtn.disabled = false;
  }
}

function startTimer() {
  timerId = setInterval(updateClock, 1000);
  refs.startBtn.disabled = true;
}

function updateClock() {
  const currentDate = Date.now();
  const deltaTime = selectedDate - currentDate;
  const endtime = convertMs(deltaTime);

  if (deltaTime <= 1000) {
    clearInterval(timerId);
  }

  refs.dataDays.innerHTML = addLeadingZero(endtime.days);
  refs.dataHours.innerHTML = addLeadingZero(endtime.hours);
  refs.dataMinutes.innerHTML = addLeadingZero(endtime.minutes);
  refs.dataSeconds.innerHTML = addLeadingZero(endtime.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
