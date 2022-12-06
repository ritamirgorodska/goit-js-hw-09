import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const refs = {
  Days: document.querySelector('span[data-days]'),
  Hours: document.querySelector('span[data-hours]'),
  Minutes: document.querySelector('span[data-minutes]'),
  Seconds: document.querySelector('span[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      alert('Please choose date in the future');
      startBtn.setAttribute('disabled', '');
    } else {
      startBtn.removeAttribute('disabled');
      onStartCountdown(selectedDates);
    }
  },
};

startBtn.setAttribute('disabled', '');
flatpickr('#datetime-picker', options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onStartCountdown(selectedDates) {
  startBtn.addEventListener('click', () => {
    let countdownStart = Date.parse(selectedDates) - Date.now();
    // let objTimerValue = convertMs(countdownStart);
    console.log(convertMs(countdownStart));
    const timerId = setInterval(() => {
      if (countdownStart <= 0) {
        clearInterval(countdownStart);
      }
      let objTimerValue = convertMs(countdownStart);
      refs.Days.textContent = addLeadingZero(objTimerValue.days);
      refs.Hours.textContent = addLeadingZero(objTimerValue.hours);
      refs.Minutes.textContent = addLeadingZero(objTimerValue.minutes);
      refs.Seconds.textContent = addLeadingZero(objTimerValue.seconds);
      countdownStart -= 1000;
    }, 1000);
  });
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
