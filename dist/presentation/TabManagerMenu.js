export default class TabManagerMenu {
  constructor(document, tabs) {
    this.document = document;
    this.htmlElement = this.document.createElement("div");
    this.htmlElement.classList.add("tab-manager-menu");
    this.htmlElement.innerHTML = tabs.map((t) => `<button id="btn-${t.id}" class="tab-btn"> ${t.name} </button>`).join("");
  }
  setActive(buttonId) {
    const currentlyActiveButton = this.htmlElement.querySelector("button.active");
    currentlyActiveButton?.classList.remove("active");
    const toBeActivetated = this.htmlElement.querySelector(`#${buttonId}`);
    toBeActivetated.classList.add("active");
  }
}
