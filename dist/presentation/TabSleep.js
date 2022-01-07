import CalculateOneSleepCycleLaterService from "../services/CalculateOneSleepCycleLaterService.js";
import dateToTimeString from "../util/dateToTimeString.js";
import Tab from "./Tab.js";
export default class TabSleep extends Tab {
  constructor(document) {
    super(document, "tab-sleep", "Dormir");
    const now = dateToTimeString(new Date());
    this.htmlElement.innerHTML = `
      <div>
        <span>Eu quero dormir às:</span>
      </div>

      <label for="base-time-sleep" class="form-label">
        <input class="form-control base-time" type="time" id="base-time-sleep" value="${now}">
      </label>

      <div class="more-options-menu">
        <button class="btn-more-options">Mais opções ⌄</button>
        ${this.generateMoreOptionsHtmlString()}
      </div>

      <p>pra acordar possivelmente às:</p>
      <div id="times-wake-up"></div>
    `;
    this.input = this.htmlElement.querySelector("input#base-time-sleep");
    this.setupMoreOptionsListeners();
  }
  setup() {
    const setNewService = (event) => {
      this.calculationInput.baseTime = event.target.value;
      this.addOutputToDOM("#times-wake-up", new CalculateOneSleepCycleLaterService({
        baseTime: this.calculationInput.baseTime,
        minimumAmountOfSleepInMinutes: this.calculationInput.minimumAmountOfSleepInMinutes,
        oneSleepCycleDurationInMinutes: this.calculationInput.oneSleepCycleDurationInMinutes
      }), this.calculationInput.numberOfOutputs);
    };
    this.input.addEventListener("change", setNewService);
  }
  onMoreOptionsChange() {
    this.addOutputToDOM("#times-wake-up", new CalculateOneSleepCycleLaterService({
      baseTime: this.calculationInput.baseTime,
      minimumAmountOfSleepInMinutes: this.calculationInput.minimumAmountOfSleepInMinutes,
      oneSleepCycleDurationInMinutes: this.calculationInput.oneSleepCycleDurationInMinutes
    }), this.calculationInput.numberOfOutputs);
  }
}
