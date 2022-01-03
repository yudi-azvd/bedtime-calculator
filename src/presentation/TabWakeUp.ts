import CalculateOneSleepCycleBeforeService from '../services/CalculateOneSleepCycleBeforeService'
import dateToTimeString from '../util/dateToTimeString'
import Tab from './Tab'

export default class TabWakeUp extends Tab {
  constructor(document: Document) {
    super(document, 'tab-wake-up', 'Acordar', 'times-sleep')

    const now = dateToTimeString(new Date())
    this.htmlElement.innerHTML = `
      <p>Eu quero acordar às:</p>

      <label for="base-time-sleep" class="form-label">
        <input class="form-control base-time" type="time" id="base-time-wake-up" value="${now}">
      </label>

      <div class="more-options-menu">
        <button class="btn-more-options">Mais opções ⌄</button>
        ${this.generateMoreOptionsHtmlString()}
      </div>

      <p>dormindo possivelmente às:</p>
      <div id="times-sleep"></div>
    `

    this.input = this.htmlElement.querySelector('input#base-time-wake-up')
    this.setupMoreOptionsListeners()
  }

  setup(): void {
    const numberOfOutputs = 3
    const setNewService = (event: Event) => {
      let baseTime = (<HTMLInputElement>event.target).value
      this.addOutputToDOM(
        '#times-sleep',
        new CalculateOneSleepCycleBeforeService({ baseTime }),
        numberOfOutputs
      )
    }

    this.input.addEventListener('change', setNewService)
  }

  onMoreOptionsChange(): void {

  }
}

