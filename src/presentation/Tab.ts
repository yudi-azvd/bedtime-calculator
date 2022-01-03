import CalculateOneSleepCycleService from "../services/CalculateOneSleepCycleService"
import dateToTimeString from "../util/dateToTimeString"

interface CalculationInput {
  baseTime: string
  minimumAmountOfSleepInMinutes: number
  numberOfOutputs: number
  oneSleepCycleDurationInMinutes: number
}

export default abstract class Tab {
  htmlElement: HTMLDivElement
  public input: HTMLInputElement
  protected calculationInput: CalculationInput

  abstract setup(): void

  constructor(
    private document: Document,
    readonly id: string,
    readonly name: string,
    readonly outputDivId?: string
  ) {
    this.htmlElement = this.document.createElement('div')
    this.htmlElement.classList.add('tab')
    this.htmlElement.classList.add('transparent')
    this.htmlElement.classList.add('hide')
    this.htmlElement.id = id
    this.calculationInput = {
      baseTime: dateToTimeString(new Date()),
      minimumAmountOfSleepInMinutes: 90,
      numberOfOutputs: 5,
      oneSleepCycleDurationInMinutes: 90,
    }
  }

  protected addOutputToDOM(outputTimesDivId: string, calcService: CalculateOneSleepCycleService, numberOfOutputs: number): void {
    const outputTimesDiv = this.htmlElement.querySelector(outputTimesDivId) as HTMLDivElement
    outputTimesDiv.innerText = ''

    console.log('hey');

    let oneSleepCycleLaterOrBefore: string
    let li: HTMLLIElement
    let baseTime: string

    for (let i = 0; i < numberOfOutputs; i++) {
      oneSleepCycleLaterOrBefore = calcService.run()
      baseTime = oneSleepCycleLaterOrBefore
      li = document.createElement('li')
      li.innerText = oneSleepCycleLaterOrBefore
      outputTimesDiv.appendChild(li)
    }
  }

  protected generateMoreOptionsHtmlString(): string {
    return `
      <div class="more-options hide">
        <label for="options-number-of-outputs" class="form-label">
          <span> Quantidade de horários: </span>
          <input
            class="form-control"
            name="numberOfOutputs"
            type="number"
            min="1"
            id="options-number-of-outputs"
            value="${this.calculationInput.numberOfOutputs}"
          >
        </label>
        <label for="options-minimum-amount-of-sleep" class="form-label">
          <span> Quantidade mínima de sono em minutos: </span>
          <input
            class="form-control"
            name="minimumAmountOfSleepInMinutes"
            type="number"
            min="15"
            id="options-minimum-amount-of-sleep"
            value="${this.calculationInput.minimumAmountOfSleepInMinutes}"
          >
        </label>
        <label for="options-one-slee-cycle-in-minutes" class="form-label">
          <span> Duração de um ciclo de sono em minutos: </span>
          <input
            class="form-control"
            name="oneSleepCycleDurationInMinutes"
            type="number"
            min="15"
            id="options-one-slee-cycle-in-minutes"
            value="${this.calculationInput.oneSleepCycleDurationInMinutes}"
          >
        </label>
      </div>
    `
  }

  protected setupMoreOptionsListeners(): void {
    const inputsList = this.htmlElement.querySelectorAll('input[id^="options"]') as NodeListOf<HTMLInputElement>

    inputsList.forEach(input => input.addEventListener('change', (event: Event) => {
      this.calculationInput[(<HTMLInputElement>event.target).name] = parseInt((<HTMLInputElement>event.target).value)
      this.onMoreOptionsChange()
    }))

    let chevrons = ['⌃', '⌄']
    let i = 0
    const moreOptionsButton = this.htmlElement.querySelector('button.btn-more-options') as HTMLButtonElement
    moreOptionsButton.addEventListener('click', (event: Event) => {
      moreOptionsButton.classList.toggle('active')
      moreOptionsButton.innerText = `Mais opções ${chevrons[i++ % 2]}`
      this.htmlElement.querySelector('div.more-options').classList.toggle('hide')
    })
  }

  abstract onMoreOptionsChange(): void
}
