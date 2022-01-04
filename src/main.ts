import TabSleep from './presentation/TabSleep'
import TabWakeUp from './presentation/TabWakeUp'
import TabManager from './presentation/TabManager'
import TabManagerMenu from './presentation/TabManagerMenu'
import TabAbout from './presentation/TabAbout'

function main() {
  const tabManagerHtmlElem = document.querySelector('.tab-manager') as HTMLDivElement
  const tabs = [
    new TabSleep(document),
    new TabWakeUp(document),
    new TabAbout(document),
  ]

  const tabManagerMenu = new TabManagerMenu(document,
    tabs.map(tab => ({ id: tab.id.replace(/tab-/, ''), name: tab.name })))

  const tabManager = new TabManager(
    tabManagerHtmlElem,
    tabManagerMenu,
    tabs,
  )

  tabManager.setupMenuListeners()
}

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(new URL('../sw.js', import.meta.url))
  })
}

main()
