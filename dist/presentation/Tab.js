import dateToTimeString from "../util/dateToTimeString.js";
export default class Tab {
  constructor(document2, id, name, outputDivId) {
    this.document = document2;
    this.id = id;
    this.name = name;
    this.outputDivId = outputDivId;
    this.htmlElement = this.document.createElement("div");
    this.htmlElement.classList.add("tab");
    this.htmlElement.classList.add("transparent");
    this.htmlElement.classList.add("hide");
    this.htmlElement.id = id;
    this.calculationInput = {
      baseTime: dateToTimeString(new Date()),
      minimumAmountOfSleepInMinutes: 90,
      numberOfOutputs: 5,
      oneSleepCycleDurationInMinutes: 90
    };
  }
  addOutputToDOM(outputTimesDivId, calcService, numberOfOutputs) {
    const outputTimesDiv = this.htmlElement.querySelector(outputTimesDivId);
    outputTimesDiv.innerText = "";
    let oneSleepCycleLaterOrBefore;
    let li;
    let baseTime;
    for (let i = 0; i < numberOfOutputs; i++) {
      oneSleepCycleLaterOrBefore = calcService.run();
      baseTime = oneSleepCycleLaterOrBefore;
      li = document.createElement("li");
      li.innerText = oneSleepCycleLaterOrBefore;
      outputTimesDiv.appendChild(li);
    }
  }
  generateMoreOptionsHtmlString() {
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
    `;
  }
  setupMoreOptionsListeners() {
    const inputsList = this.htmlElement.querySelectorAll('input[id^="options"]');
    inputsList.forEach((input) => input.addEventListener("change", (event) => {
      this.calculationInput[event.target.name] = parseInt(event.target.value);
      this.onMoreOptionsChange();
    }));
    let chevrons = ["⌃", "⌄"];
    let i = 0;
    const moreOptionsButton = this.htmlElement.querySelector("button.btn-more-options");
    moreOptionsButton.addEventListener("click", () => {
      moreOptionsButton.classList.toggle("active");
      moreOptionsButton.innerText = `Mais opções ${chevrons[i++ % 2]}`;
      this.htmlElement.querySelector("div.more-options").classList.toggle("hide");
    });
  }
}
