import {
  CardHeading,
  CardList,
  EmojiSmile,
  Palette,
  QuestionCircle,
  Translate,
  Braces,
  Globe,
<<<<<<< HEAD
} from 'react-bootstrap-icons'
import { getPreferredLanguage } from '../../config/language.mjs'
=======
  ChatText,
} from 'react-bootstrap-icons'
import { getPreferredLanguage } from '../../config/language.mjs'

const createGenPrompt =
  ({
    message = '',
    isTranslation = false,
    targetLanguage = '',
    enableBidirectional = false,
    includeLanguagePrefix = false
  }) =>
    async (selection) => {
      const preferredLanguage = isTranslation
        ? targetLanguage
        : await getPreferredLanguage()
      let fullMessage = isTranslation
        ? `Translate the following into ${preferredLanguage} and only show me the translated content`
        : message
      if (enableBidirectional) {
        fullMessage += `. If it is already in ${preferredLanguage}, translate it into English and only show me the translated content`
      }
      const prefix = includeLanguagePrefix
        ? `Reply in ${preferredLanguage}.`
        : ''
      return `${prefix}${fullMessage}:\n'''\n${selection}\n'''`
    }
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585

export const config = {
  explain: {
    icon: <ChatText />,
    label: 'Explain',
    genPrompt: createGenPrompt({
      message: 'Explain the following',
      includeLanguagePrefix: true
    }),
  },
  translate: {
    icon: <Translate />,
    label: 'Translate',
<<<<<<< HEAD
    genPrompt: async (selection) => {
      const preferredLanguage = await getPreferredLanguage()
      return `Translate the following into ${preferredLanguage} and only show me the translated content:\n"${selection}"`
    },
=======
    genPrompt: createGenPrompt({
      isTranslation: true
    }),
  },
  translateToEn: {
    icon: <Globe />,
    label: 'Translate (To English)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      targetLanguage: 'English'
    }),
  },
  translateToZh: {
    icon: <Globe />,
    label: 'Translate (To Chinese)',
    genPrompt: createGenPrompt({
      isTranslation: true,
      targetLanguage: 'Chinese'
    }),
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  },
  translateBidi: {
    icon: <Globe />,
    label: 'Translate (Bidirectional)',
<<<<<<< HEAD
    genPrompt: async (selection) => {
      const preferredLanguage = await getPreferredLanguage()
      return (
        `Translate the following into ${preferredLanguage} and only show me the translated content.` +
        `If it is already in ${preferredLanguage},` +
        `translate it into English and only show me the translated content:\n"${selection}"`
      )
    },
=======
    genPrompt: createGenPrompt({
      isTranslation: true,
      enableBidirectional: true
    }),
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  },
  summary: {
    icon: <CardHeading />,
    label: 'Summary',
    genPrompt: createGenPrompt({
      message: 'Summarize the following as concisely as possible',
      includeLanguagePrefix: true
    }),
  },
  polish: {
    icon: <Palette />,
    label: 'Polish',
    genPrompt: createGenPrompt({
      message:
        'Check the following content for possible diction and grammar problems, and polish it carefully'
    }),
  },
  sentiment: {
    icon: <EmojiSmile />,
    label: 'Sentiment Analysis',
    genPrompt: createGenPrompt({
      message:
        'Analyze the sentiments expressed in the following content and make a brief summary of the sentiments',
      includeLanguagePrefix: true
    }),
  },
  divide: {
    icon: <CardList />,
    label: 'Divide Paragraphs',
    genPrompt: createGenPrompt({
      message:
        'Divide the following into paragraphs that are easy to read and understand'
    }),
  },
  code: {
    icon: <Braces />,
    label: 'Code Explain',
    genPrompt: createGenPrompt({
      message: 'Explain the following code',
      includeLanguagePrefix: true
    }),
  },
  code: {
    icon: <Braces />,
    label: 'Code Explain',
    genPrompt: async (selection) => {
      const preferredLanguage = await getPreferredLanguage()
      return `Reply in ${preferredLanguage}.Explain the following code:\n"${selection}"`
    },
  },
  ask: {
    icon: <QuestionCircle />,
    label: 'Ask',
    genPrompt: createGenPrompt({
      message:
        'Analyze the following content and express your opinion, or give your answer',
      includeLanguagePrefix: true
    }),
  },
}
