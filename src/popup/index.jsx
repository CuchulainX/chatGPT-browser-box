import { render } from 'preact'
import Popup from './Popup'
import '../_locales/i18n-react'
<<<<<<< HEAD
=======
import { getUserConfig } from '../config/index.mjs'
import { config as menuConfig } from '../content-script/menu-tools/index.mjs'
import Browser from 'webextension-polyfill'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585

getUserConfig().then(async (config) => {
  if (config.clickIconAction === 'popup' || (window.innerWidth > 100 && window.innerHeight > 100)) {
    render(<Popup />, document.getElementById('app'))
  } else {
    const message = {
      itemId: config.clickIconAction,
      selectionText: '',
      useMenuPosition: false,
    }
    console.debug('custom icon action triggered', message)

    if (config.clickIconAction in menuConfig) {
      const currentTab = (await Browser.tabs.query({ active: true, currentWindow: true }))[0]

      if (menuConfig[config.clickIconAction].action) {
        menuConfig[config.clickIconAction].action(false, currentTab)
      }

      if (menuConfig[config.clickIconAction].genPrompt) {
        Browser.tabs.sendMessage(currentTab.id, {
          type: 'CREATE_CHAT',
          data: message,
        })
      }
    }
    window.close()
  }
})
