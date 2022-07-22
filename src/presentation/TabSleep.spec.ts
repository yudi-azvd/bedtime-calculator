import Tab from "./Tab"
import TabSleep from "./TabSleep"

import { describe, it, beforeEach, expect } from 'vitest'

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

  it.todo('should display 3 times to wake up by default')

  it.todo('should be able to display 5 times to wake by changing options-number-of-outputs input')
})
