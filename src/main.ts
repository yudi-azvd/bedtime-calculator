(() => {
  const startTimeInput = document.querySelector('#start-time') as HTMLInputElement
  const startTimeSpan = document.querySelector('#start-time-show') as HTMLSpanElement

  const now = new Date()
  let hours = new String(now.getHours())
  hours = hours.padStart(2, '0')
  let minutes = new String(now.getMinutes())
  minutes = minutes.padStart(2, '0')
  startTimeSpan.textContent = `${hours}:${minutes}`

  function onStartTimeChange(event: Event) {
    startTimeSpan.textContent = `${(<HTMLInputElement>event.target).value}`
  }

  startTimeInput.addEventListener('change', onStartTimeChange)
})()
