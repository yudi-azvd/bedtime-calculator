export default class TabManagerMenu {
  htmlElement: HTMLDivElement

  constructor(private document: Document, tabs: { id: string, name: string }[]) {
    this.htmlElement = this.document.createElement('div')
    this.htmlElement.classList.add('tab-manager-menu')
    this.htmlElement.innerHTML = tabs.map(
      t => `<button id="btn-${t.id}"> ${t.name} </button>`).join('')
  }

  setActive(buttonId: string): void {

    const currentlyActiveButton = this.htmlElement.querySelector('button.active')
    currentlyActiveButton?.classList.remove('active')

    const toBeActivetated = this.htmlElement.querySelector(`#${buttonId}`)
    toBeActivetated.classList.add('active')
    console.log({buttonId});
  }
}
