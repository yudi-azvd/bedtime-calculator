import Tab from "./Tab"
import TabAbout from "./TabAbout"

let tabAbout: Tab

describe('TabAbout', () => {
  beforeEach(() => {
    tabAbout = new TabAbout(document)
  })

  it('should contain about text', () => {
    expect(tabAbout.htmlElement.innerHTML).toMatch(/.*Este aplicativo calcula.*/)
  })
})
