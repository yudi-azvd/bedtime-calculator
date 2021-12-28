import CalculateOneSleepCycleLaterService from '../services/CalculateOneSleepCycleLaterService'
import dateToTimeString from '../util/dateToTimeString'
import Tab from './Tab'

export default class TabSleep extends Tab {
  public input: HTMLInputElement

  constructor(document: Document) {
    super(document, 'tab-sleep', 'Dormir')

    const now = dateToTimeString(new Date())
    this.htmlElement.innerHTML = `
      <p>Eu quero dormir às:</p>

      <label for="base-time-sleep" class="form-label">
        <input class="form-control" type="time" id="base-time-sleep" value="${now}">
      </label>

      <p>pra acordar possivelmente às:</p>
      <div id="times-wake-up"></div>
    `

    this.input = this.htmlElement.querySelector('input')
  }

  setup(): void {
    this.input.addEventListener('change', (event: Event) => {
      let baseTime = `${(<HTMLInputElement>event.target).value}`
      const timesDiv = document.querySelector('#times-wake-up') as HTMLDivElement
      timesDiv.innerText = ''

      let oneSleepCycleLater: string
      let calc = new CalculateOneSleepCycleLaterService({ baseTime })
      let li: HTMLLIElement

      for (let index = 0; index < 5; index++) {
        oneSleepCycleLater = calc.run()
        baseTime = oneSleepCycleLater
        li = document.createElement('li')
        li.innerText = oneSleepCycleLater
        timesDiv.appendChild(li)
      }
    })
  }
}

