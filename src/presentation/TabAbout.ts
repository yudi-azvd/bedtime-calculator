import Tab from './Tab';

export default class TabAbout extends Tab {
  constructor(document: Document) {
    super(document, 'tab-about', 'Sobre')
    this.htmlElement.innerHTML = `
      <p>Ainda vou acrescentar uma breve descrição sobre esse app aqui.</p>
      <p>Feito por <a href="https://github.com/yudi-azvd">Yudi Yamane</a></p>
      <p>Código fonte: <a href="https://github.com/yudi-azvd/bedtime-calculator">yudi-azvd/bedtime-calculator</a></p>
    `
  }

  setup(): void { }
}
