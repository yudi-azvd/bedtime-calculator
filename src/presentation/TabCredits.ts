import Tab from './Tab';

export default class TabCredits extends Tab {
  constructor(document: Document) {
    super(document, 'tab-credits', 'Créditos')
    this.htmlElement.innerHTML = `
      <p><strong> Créditos </strong></p>
      <p> <a href="https://www.flaticon.com/premium-icon/clock_2838590?term=clock&page=1&position=13&page=1&position=13&related_id=2838590&origin=search">Relógio</a> da logo </p>
      <p> <a href="https://www.flaticon.com/premium-icon/bed_3010012?term=bed&page=1&position=8&page=1&position=8&related_id=3010012&origin=search">Cama</a> da logo </p>
    `
  }

  setup(): void { }
}
