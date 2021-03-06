import Tab from './Tab'
import TabManagerMenu from './TabManagerMenu'

export default class TabManager {
  constructor(
    private htmlElement: HTMLDivElement,
    readonly tabManagerMenu: TabManagerMenu,
    tabs: Tab[]
  ) {
    // Impede que o Hot Reload fique adicionando várias Tabs
    this.htmlElement.innerText = ''
    tabs.forEach(t => this.register(t))
    this.htmlElement.prepend(tabManagerMenu.htmlElement)
    this.setActive(tabs[0].id)
    this.tabManagerMenu.setActive(tabs[0].id.replace(/^tab/, 'btn'))
  }

  register(tab: Tab): void {
    tab.setup()
    this.htmlElement.append(tab.htmlElement)
  }

  setActive(tabId: string) {
    const currentActiveTab = this.htmlElement.querySelector('.tab.active')
    currentActiveTab?.classList.add('transparent')
    currentActiveTab?.classList.add('hide')
    currentActiveTab?.classList.remove('active')

    const toBeActivated = this.htmlElement.querySelector(`#${tabId}`)
    toBeActivated.classList.remove('transparent')
    toBeActivated.classList.remove('hide')
    setTimeout(() => {
      toBeActivated.classList.add('active')
    }, 150);
  }

  setupMenuListeners() {
    const setupListener = (button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        this.tabManagerMenu.setActive(button.id)
        this.setActive(button.id.replace(/^btn/, 'tab'))
        button.classList.add('active')
      })
    }

    (this.htmlElement.querySelectorAll('button.tab-btn') as NodeListOf<HTMLButtonElement>)
      .forEach(button => setupListener(button))
  }
}
