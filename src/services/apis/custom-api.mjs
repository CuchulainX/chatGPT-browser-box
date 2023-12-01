// custom api version

// There is a lot of duplicated code here, but it is very easy to refactor.
// The current state is mainly convenient for making targeted changes at any time,
// and it has not yet had a negative impact on maintenance.
// If necessary, I will refactor.

<<<<<<< HEAD:src/background/apis/custom-api.mjs
import { getUserConfig, maxResponseTokenLength } from '../../config/index.mjs'
import { fetchSSE } from '../../utils/fetch-sse'
import { getConversationPairs } from '../../utils/get-conversation-pairs'
import { isEmpty } from 'lodash-es'

const getCustomApiPromptBase = async () => {
  return `I am a helpful, creative, clever, and very friendly assistant. I am familiar with various languages in the world.`
}
=======
import { getUserConfig } from '../../config/index.mjs'
import { fetchSSE } from '../../utils/fetch-sse.mjs'
import { getConversationPairs } from '../../utils/get-conversation-pairs.mjs'
import { isEmpty } from 'lodash-es'
import { pushRecord, setAbortController } from './shared.mjs'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/custom-api.mjs

/**
 * @param {Browser.Runtime.Port} port
 * @param {string} question
 * @param {Session} session
 * @param {string} apiKey
 * @param {string} modelName
 */
export async function generateAnswersWithCustomApi(port, question, session, apiKey, modelName) {
<<<<<<< HEAD:src/background/apis/custom-api.mjs
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

  const prompt = getConversationPairs(session.conversationRecords, true)
  prompt.unshift({ role: 'system', content: await getCustomApiPromptBase() })
  prompt.push({ role: 'user', content: question })
  const apiUrl = (await getUserConfig()).customModelApiUrl
=======
  const { controller, messageListener, disconnectListener } = setAbortController(port)

  const config = await getUserConfig()
  const prompt = getConversationPairs(
    session.conversationRecords.slice(-config.maxConversationContextLength),
    false,
  )
  // prompt.unshift({ role: 'system', content: await getCustomApiPromptBase() })
  prompt.push({ role: 'user', content: question })
  const apiUrl = config.customModelApiUrl
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/custom-api.mjs

  let answer = ''
  await fetchSSE(apiUrl, {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: prompt,
      model: modelName,
      stream: true,
<<<<<<< HEAD:src/background/apis/custom-api.mjs
      max_tokens: maxResponseTokenLength,
    }),
    onMessage(message) {
      console.debug('sse message', message)
      if (message === '[DONE]') {
        session.conversationRecords.push({ question: question, answer: answer })
=======
      max_tokens: config.maxResponseTokenLength,
      temperature: config.temperature,
    }),
    onMessage(message) {
      console.debug('sse message', message)
      if (message.trim() === '[DONE]') {
        pushRecord(session, question, answer)
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/custom-api.mjs
        console.debug('conversation history', { content: session.conversationRecords })
        port.postMessage({ answer: null, done: true, session: session })
        return
      }
      let data
      try {
        data = JSON.parse(message)
      } catch (error) {
        console.debug('json error', error)
        return
      }
<<<<<<< HEAD:src/background/apis/custom-api.mjs
      if (data.response) answer = data.response
=======

      if (data.response) answer = data.response
      else
        answer +=
          data.choices[0]?.delta?.content ||
          data.choices[0]?.message?.content ||
          data.choices[0]?.text ||
          ''
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/custom-api.mjs
      port.postMessage({ answer: answer, done: false, session: null })
    },
    async onStart() {},
    async onEnd() {
<<<<<<< HEAD:src/background/apis/custom-api.mjs
      port.onMessage.removeListener(stopListener)
    },
    async onError(resp) {
      port.onMessage.removeListener(stopListener)
      if (resp instanceof Error) throw resp
      if (resp.status === 403) {
        throw new Error('CLOUDFLARE')
      }
=======
      port.postMessage({ done: true })
      port.onMessage.removeListener(messageListener)
      port.onDisconnect.removeListener(disconnectListener)
    },
    async onError(resp) {
      port.onMessage.removeListener(messageListener)
      port.onDisconnect.removeListener(disconnectListener)
      if (resp instanceof Error) throw resp
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/custom-api.mjs
      const error = await resp.json().catch(() => ({}))
      throw new Error(!isEmpty(error) ? JSON.stringify(error) : `${resp.status} ${resp.statusText}`)
    },
  })
}
