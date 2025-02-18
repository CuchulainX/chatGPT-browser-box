// api version

<<<<<<< HEAD:src/background/apis/openai-api.mjs
import { maxResponseTokenLength, Models, getUserConfig } from '../../config/index.mjs'
import { fetchSSE } from '../../utils/fetch-sse'
import { getConversationPairs } from '../../utils/get-conversation-pairs'
=======
import { Models, getUserConfig } from '../../config/index.mjs'
import { fetchSSE } from '../../utils/fetch-sse.mjs'
import { getConversationPairs } from '../../utils/get-conversation-pairs.mjs'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/openai-api.mjs
import { isEmpty } from 'lodash-es'
import {
  getChatSystemPromptBase,
  getCompletionPromptBase,
  pushRecord,
  setAbortController,
} from './shared.mjs'

/**
 * @param {Browser.Runtime.Port} port
 * @param {string} question
 * @param {Session} session
 * @param {string} apiKey
 * @param {string} modelName
 */
export async function generateAnswersWithGptCompletionApi(
  port,
  question,
  session,
  apiKey,
  modelName,
) {
<<<<<<< HEAD:src/background/apis/openai-api.mjs
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
=======
  const { controller, messageListener, disconnectListener } = setAbortController(port)
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/openai-api.mjs

  const config = await getUserConfig()
  const prompt =
    (await getCompletionPromptBase()) +
    getConversationPairs(
      session.conversationRecords.slice(-config.maxConversationContextLength),
      true,
    ) +
    `Human: ${question}\nAI: `
  const apiUrl = config.customOpenAiApiUrl

  let answer = ''
  await fetchSSE(`${apiUrl}/v1/completions`, {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      model: Models[modelName].value,
      stream: true,
      max_tokens: config.maxResponseTokenLength,
      temperature: config.temperature,
      stop: '\nHuman',
    }),
    onMessage(message) {
      console.debug('sse message', message)
      if (message.trim() === '[DONE]') {
        pushRecord(session, question, answer)
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
      answer += data.choices[0].text
      port.postMessage({ answer: answer, done: false, session: null })
    },
    async onStart() {},
    async onEnd() {
<<<<<<< HEAD:src/background/apis/openai-api.mjs
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
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/openai-api.mjs
      const error = await resp.json().catch(() => ({}))
      throw new Error(!isEmpty(error) ? JSON.stringify(error) : `${resp.status} ${resp.statusText}`)
    },
  })
}

/**
 * @param {Browser.Runtime.Port} port
 * @param {string} question
 * @param {Session} session
 * @param {string} apiKey
 * @param {string} modelName
 */
export async function generateAnswersWithChatgptApi(port, question, session, apiKey, modelName) {
<<<<<<< HEAD:src/background/apis/openai-api.mjs
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
=======
  const { controller, messageListener, disconnectListener } = setAbortController(port)
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/openai-api.mjs

  const config = await getUserConfig()
  const prompt = getConversationPairs(
    session.conversationRecords.slice(-config.maxConversationContextLength),
    false,
  )
  prompt.unshift({ role: 'system', content: await getChatSystemPromptBase() })
  prompt.push({ role: 'user', content: question })
  const apiUrl = config.customOpenAiApiUrl

  let answer = ''
  await fetchSSE(`${apiUrl}/v1/chat/completions`, {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: prompt,
      model: Models[modelName].value,
      stream: true,
      max_tokens: config.maxResponseTokenLength,
      temperature: config.temperature,
    }),
    onMessage(message) {
      console.debug('sse message', message)
      if (message.trim() === '[DONE]') {
        pushRecord(session, question, answer)
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
      answer +=
        data.choices[0]?.delta?.content ||
        data.choices[0]?.message?.content ||
        data.choices[0]?.text ||
        ''
      port.postMessage({ answer: answer, done: false, session: null })
    },
    async onStart() {},
    async onEnd() {
<<<<<<< HEAD:src/background/apis/openai-api.mjs
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
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585:src/services/apis/openai-api.mjs
      const error = await resp.json().catch(() => ({}))
      throw new Error(!isEmpty(error) ? JSON.stringify(error) : `${resp.status} ${resp.statusText}`)
    },
  })
}
