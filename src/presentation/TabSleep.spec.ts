import Tab from "./Tab"
import TabSleep from "./TabSleep"

let tabSleep: Tab

describe('TabSleep', () => {
  beforeEach(() => {
    tabSleep = new TabSleep(document)
    tabSleep.setup()
  })

  // Esse teste não faz muito sentido por ser um detalhe muito interno.
  it('should have correct id', () => {
    expect(tabSleep.htmlElement.id).toEqual('tab-sleep')
  })

  it('should display 3 times to wake up by default', () => {
    fail('not implemented')
  })

  it('should be able to display 5 times to wake by changing options-number-of-outputs input', () => {
    fail('not implemented')
  })
})
