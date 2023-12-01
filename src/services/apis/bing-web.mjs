<<<<<<< HEAD:src/background/apis/bing-web.mjs
import BingAIClient from '../clients/BingAIClient'
import { getUserConfig } from '../../config/index.mjs'
=======
import BingAIClient from '../clients/bing/index.mjs'
import { getUserConfig } from '../../config/index.mjs'
import { pushRecord, setAbortController } from './shared.mjs'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/bing-web.mjs

/**
 * @param {Runtime.Port} port
 * @param {string} question
 * @param {Session} session
 * @param {string} accessToken
<<<<<<< HEAD:src/background/apis/bing-web.mjs
 * @param {string} modelName
=======
 * @param {boolean} sydneyMode
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/bing-web.mjs
 */
export async function generateAnswersWithBingWebApi(
  port,
  question,
  session,
  accessToken,
<<<<<<< HEAD:src/background/apis/bing-web.mjs
  // eslint-disable-next-line
  modelName,
) {
  const controller = new AbortController()
  const stopListener = (msg) => {
    if (msg.stop) {
      console.debug('stop generating')
      port.postMessage({ done: true })
      port.onMessage.removeListener(stopListener)
      controller.abort()
    }
  }
  port.onMessage.addListener(stopListener)
  port.onDisconnect.addListener(() => {
    console.debug('port disconnected')
    controller.abort()
  })

  const bingAIClient = new BingAIClient({ userToken: accessToken })
=======
  sydneyMode = false,
) {
  const { controller, messageListener, disconnectListener } = setAbortController(port)
  const config = await getUserConfig()
  let modelMode
  if (session.modelName.includes('-')) modelMode = session.modelName.split('-')[1]
  else modelMode = config.modelMode

  console.debug('mode', modelMode)

  const bingAIClient = new BingAIClient({ userToken: accessToken, features: { genImage: false } })
  if (session.bingWeb_jailbreakConversationCache)
    bingAIClient.conversationsCache.set(
      session.bingWeb_jailbreakConversationId,
      session.bingWeb_jailbreakConversationCache,
    )
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/bing-web.mjs

  let answer = ''
  const response = await bingAIClient
    .sendMessage(question, {
      abortController: controller,
<<<<<<< HEAD:src/background/apis/bing-web.mjs
      toneStyle: (await getUserConfig()).modelMode,
      onProgress: (token) => {
        answer += token
        // remove reference markers [^number^]
        answer = answer.replaceAll(/\[\^\d+\^\]/g, '')
        port.postMessage({ answer: answer, done: false, session: null })
      },
      ...(session.bingWeb.conversationId
        ? {
            conversationId: session.bingWeb.conversationId,
            conversationSignature: session.bingWeb.conversationSignature,
            clientId: session.bingWeb.clientId,
            invocationId: session.bingWeb.invocationId,
=======
      toneStyle: modelMode,
      jailbreakConversationId: sydneyMode,
      onProgress: (message) => {
        answer = message
        // reference markers [^number^]
        answer = answer.replaceAll(/\[\^(\d+)\^\]/g, '<sup>$1</sup>')
        port.postMessage({ answer: answer, done: false, session: null })
      },
      ...(session.bingWeb_conversationId
        ? {
            conversationId: session.bingWeb_conversationId,
            encryptedConversationSignature: session.bingWeb_encryptedConversationSignature,
            clientId: session.bingWeb_clientId,
            invocationId: session.bingWeb_invocationId,
          }
        : session.bingWeb_jailbreakConversationId
        ? {
            jailbreakConversationId: session.bingWeb_jailbreakConversationId,
            parentMessageId: session.bingWeb_parentMessageId,
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/bing-web.mjs
          }
        : {}),
    })
    .catch((err) => {
<<<<<<< HEAD:src/background/apis/bing-web.mjs
      port.onMessage.removeListener(stopListener)
      throw err
    })

  session.bingWeb.conversationSignature = response.conversationSignature
  session.bingWeb.conversationId = response.conversationId
  session.bingWeb.clientId = response.clientId
  session.bingWeb.invocationId = response.invocationId

  session.conversationRecords.push({ question: question, answer: answer })
  console.debug('conversation history', { content: session.conversationRecords })
  port.onMessage.removeListener(stopListener)
=======
      port.onMessage.removeListener(messageListener)
      port.onDisconnect.removeListener(disconnectListener)
      throw err
    })

  if (!sydneyMode) {
    session.bingWeb_encryptedConversationSignature = response.encryptedConversationSignature
    session.bingWeb_conversationId = response.conversationId
    session.bingWeb_clientId = response.clientId
    session.bingWeb_invocationId = response.invocationId
  } else {
    session.bingWeb_jailbreakConversationId = response.jailbreakConversationId
    session.bingWeb_parentMessageId = response.messageId
    session.bingWeb_jailbreakConversationCache = bingAIClient.conversationsCache.get(
      response.jailbreakConversationId,
    )
  }

  if (response.details.sourceAttributions.length > 0) {
    const footnotes =
      '\n\\-\n' +
      response.details.sourceAttributions
        .map((attr, index) => `\\[${index + 1}]: [${attr.providerDisplayName}](${attr.seeMoreUrl})`)
        .join('\n')
    answer += footnotes
  }

  pushRecord(session, question, answer)
  console.debug('conversation history', { content: session.conversationRecords })
  port.onMessage.removeListener(messageListener)
  port.onDisconnect.removeListener(disconnectListener)
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/bing-web.mjs
  port.postMessage({ answer: answer, done: true, session: session })
}
