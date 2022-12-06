const formElement = document.querySelector('.form');
formElement.addEventListener('submit', onAddPromise);
function onAddPromise(e) {
  e.preventDefault();

  let delay = Number(formElement.delay.value);
  let position = Number(formElement.amount.value);
  let step = Number(formElement.step.value);

  for (let i = 1; i <= position; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const form = {
    position,
    delay,
  };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(form);
      } else {
        reject(form);
      }
    }, delay);
  });
}
