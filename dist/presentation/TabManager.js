export default class TabManager {
  constructor(htmlElement, tabManagerMenu, tabs) {
    this.htmlElement = htmlElement;
    this.tabManagerMenu = tabManagerMenu;
    this.htmlElement.innerText = "";
    tabs.forEach((t) => this.register(t));
    this.htmlElement.prepend(tabManagerMenu.htmlElement);
    this.setActive(tabs[0].id);
    this.tabManagerMenu.setActive(tabs[0].id.replace(/^tab/, "btn"));
  }
  register(tab) {
    tab.setup();
    this.htmlElement.append(tab.htmlElement);
  }
  setActive(tabId) {
    const currentActiveTab = this.htmlElement.querySelector(".tab.active");
    currentActiveTab?.classList.add("transparent");
    currentActiveTab?.classList.add("hide");
    currentActiveTab?.classList.remove("active");
    const toBeActivated = this.htmlElement.querySelector(`#${tabId}`);
    toBeActivated.classList.remove("transparent");
    toBeActivated.classList.remove("hide");
    setTimeout(() => {
      toBeActivated.classList.add("active");
    }, 150);
  }
  setupMenuListeners() {
    const setupListener = (button) => {
      button.addEventListener("click", () => {
        this.tabManagerMenu.setActive(button.id);
        this.setActive(button.id.replace(/^btn/, "tab"));
        button.classList.add("active");
      });
    };
    this.htmlElement.querySelectorAll("button.tab-btn").forEach((button) => setupListener(button));
  }
}
