import i18n from 'i18next'
import { resources } from './resources'

i18n.init({
  resources,
  fallbackLng: 'en',
<<<<<<< HEAD
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
=======
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
})
