import Tab from './Tab';

export const aboutContent = `
  <p>Este aplicativo calcula a hora ideal para dormir e acordar baseado
  em ciclos de sono.</p>

  <p> Você pode ver mais opções clicando no botão "Mais opções ⌄"
  nas abas de Dormir e Acordar.</p>

  <p><strong> Créditos </strong></p>
  <p>Feito por <a href="https://github.com/yudi-azvd">Yudi Yamane</a></p>
  <p>Código fonte: <a href="https://github.com/yudi-azvd/bedtime-calculator">yudi-azvd/bedtime-calculator</a></p>
  <p> <a href="https://www.flaticon.com/premium-icon/clock_2838590?term=clock&page=1&position=13&page=1&position=13&related_id=2838590&origin=search">Relógio</a> da logo </p>
  <p> <a href="https://www.flaticon.com/premium-icon/bed_3010012?term=bed&page=1&position=8&page=1&position=8&related_id=3010012&origin=search">Cama</a> da logo </p>
`

export default class TabAbout extends Tab {
  constructor(document: Document) {
    super(document, 'tab-about', 'Sobre')
    this.htmlElement.innerHTML = aboutContent
  }

  setup(): void { }

  onMoreOptionsChange(): void { }
}
