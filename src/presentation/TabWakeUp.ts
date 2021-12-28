import CalculateOneSleepCycleBeforeService from '../services/CalculateOneSleepCycleBeforeService'
import dateToTimeString from '../util/dateToTimeString'
import Tab from './Tab'

export default class TabWakeUp extends Tab {
  public input: HTMLInputElement

  constructor(document: Document) {
    super(document, 'tab-wake-up', 'Acordar')
    const now = dateToTimeString(new Date())
    this.htmlElement.innerHTML = `
      <p>Eu quero acordar às:</p>

      <label for="base-time-sleep" class="form-label">
        <input class="form-control" type="time" id="base-time-wake-up" value="${now}">
      </label>

      <p>dormindo possivelmente às:</p>
      <div id="times-sleep"></div>
    `

    this.input = this.htmlElement.querySelector('input')
  }

  setup(): void {
    this.input.addEventListener('change', (event: Event) => {
      let baseTime = `${(<HTMLInputElement>event.target).value}`
      const timesDiv = document.querySelector('#times-sleep') as HTMLDivElement
      timesDiv.innerText = ''

      let oneSleepCycleBefore: string
      let calc = new CalculateOneSleepCycleBeforeService({ baseTime })
      let li: HTMLLIElement

      for (let index = 0; index < 5; index++) {
        oneSleepCycleBefore = calc.run()
        baseTime = oneSleepCycleBefore
        li = document.createElement('li')
        li.innerText = oneSleepCycleBefore
        timesDiv.appendChild(li)
      }
    })
  }
}

