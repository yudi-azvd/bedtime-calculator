export default abstract class Tab {
  htmlElement: HTMLDivElement

  abstract setup(): void

  constructor(
    private document: Document,
    readonly id: string,
    readonly name: string
  ) {
    this.htmlElement = this.document.createElement('div')
    this.htmlElement.classList.add('tab')
    this.htmlElement.classList.add('hide')
    this.htmlElement.id = id
  }
}
