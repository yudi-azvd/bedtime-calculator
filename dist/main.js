import TabSleep from "./presentation/TabSleep.js";
import TabWakeUp from "./presentation/TabWakeUp.js";
import TabManager from "./presentation/TabManager.js";
import TabManagerMenu from "./presentation/TabManagerMenu.js";
import TabAbout from "./presentation/TabAbout.js";
function main() {
  const tabManagerHtmlElem = document.querySelector(".tab-manager");
  const tabs = [
    new TabSleep(document),
    new TabWakeUp(document),
    new TabAbout(document)
  ];
  const tabManagerMenu = new TabManagerMenu(document, tabs.map((tab) => ({id: tab.id.replace(/tab-/, ""), name: tab.name})));
  const tabManager = new TabManager(tabManagerHtmlElem, tabManagerMenu, tabs);
  tabManager.setupMenuListeners();
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const isHostedOnGitHub = window.location.href.indexOf("github.io") > 0;
    if (isHostedOnGitHub)
      navigator.serviceWorker.register("/bedtime-calculator/sw.js");
    else
      navigator.serviceWorker.register("/sw.js");
  });
}
main();
