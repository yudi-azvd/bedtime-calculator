import CalculateOneSleepCycleLaterService from './services/CalculateOneSleepCycleLaterService'

function main() {
  const startTimeInput = document.querySelector('#start-time-sleep') as HTMLInputElement
  const timesDiv = document.querySelector('#times-wake-up') as HTMLDivElement

  function onStartTimeChange(event: Event) {
    const startTime = `${(<HTMLInputElement>event.target).value}`
    timesDiv.innerText = ''

    let oneSleepCycleLater: string
    let newTime = startTime
    let calc = new CalculateOneSleepCycleLaterService({ baseTime: newTime })
    for (let index = 0; index < 5; index++) {
      oneSleepCycleLater = calc.run()
      newTime = oneSleepCycleLater
      const li = document.createElement('li')
      li.innerText = oneSleepCycleLater
      timesDiv.appendChild(li)
    }
  }

  startTimeInput.addEventListener('change', onStartTimeChange)
}

main()

function dateToTimeString(date: Date): string {
  let hours = new String(date.getHours())
  hours = hours.padStart(2, '0')
  let minutes = new String(date.getMinutes())
  minutes = minutes.padStart(2, '0')
  return `${hours}:${minutes}`
}

