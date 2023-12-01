import { memo, useState } from 'react'
import { ChevronDownIcon, XCircleIcon, SyncIcon } from '@primer/octicons-react'
import CopyButton from '../CopyButton'
import ReadButton from '../ReadButton'
import PropTypes from 'prop-types'
import MarkdownRender from '../MarkdownRender/markdown.jsx'
import { useTranslation } from 'react-i18next'
<<<<<<< HEAD

export function ConversationItem({ type, content, session, done, port }) {
=======
import { isUsingCustomModel } from '../../config/index.mjs'
import { useConfig } from '../../hooks/use-config.mjs'

function AnswerTitle({ descName, modelName }) {
  const { t } = useTranslation()
  const config = useConfig()

  return (
    <p style="white-space: nowrap;">
      {descName && modelName
        ? `${t(descName)}${
            isUsingCustomModel({ modelName }) ? ' (' + config.customModelName + ')' : ''
          }:`
        : t('Loading...')}
    </p>
  )
}

AnswerTitle.propTypes = {
  descName: PropTypes.string,
  modelName: PropTypes.string,
}

export function ConversationItem({ type, content, descName, modelName, onRetry }) {
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)

  switch (type) {
    case 'question':
      return (
        <div className={type} dir="auto">
          <div className="gpt-header">
            <p>{t('You')}:</p>
            <div className="gpt-util-group">
<<<<<<< HEAD
              <CopyButton contentFn={() => content} size={14} />
=======
              <CopyButton contentFn={() => content.replace(/\n<hr\/>$/, '')} size={14} />
              <ReadButton contentFn={() => content} size={14} />
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
              {!collapsed ? (
                <span
                  title={t('Collapse')}
                  className="gpt-util-icon"
                  onClick={() => setCollapsed(true)}
                >
                  <XCircleIcon size={14} />
                </span>
              ) : (
                <span
                  title={t('Expand')}
                  className="gpt-util-icon"
                  onClick={() => setCollapsed(false)}
                >
                  <ChevronDownIcon size={14} />
                </span>
              )}
            </div>
          </div>
          {!collapsed && <MarkdownRender>{content}</MarkdownRender>}
        </div>
      )
    case 'answer':
      return (
        <div className={type} dir="auto">
          <div className="gpt-header">
<<<<<<< HEAD
            <p style="white-space: nowrap;">
              {session && session.aiName ? `${t(session.aiName)}:` : t('Loading...')}
            </p>
            <div className="gpt-util-group">
              {!done && (
                <button
                  type="button"
                  className="normal-button"
                  onClick={() => {
                    port.postMessage({ stop: true })
                  }}
                >
                  {t('Stop')}
                </button>
              )}
              {done && session && session.conversationId && (
                <FeedbackForChatGPTWeb
                  messageId={session.messageId}
                  conversationId={session.conversationId}
                />
              )}
              {session && session.conversationId && (
                <a
                  title={t('Continue on official website')}
                  href={'https://chat.openai.com/chat/' + session.conversationId}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="gpt-util-icon"
                  style="color: inherit;"
                >
                  <LinkExternalIcon size={14} />
                </a>
=======
            <AnswerTitle descName={descName} modelName={modelName} />
            <div className="gpt-util-group">
              {onRetry && (
                <span title={t('Retry')} className="gpt-util-icon" onClick={onRetry}>
                  <SyncIcon size={14} />
                </span>
              )}
              {modelName && (
                <CopyButton contentFn={() => content.replace(/\n<hr\/>$/, '')} size={14} />
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
              )}
              {modelName && <ReadButton contentFn={() => content} size={14} />}
              {!collapsed ? (
                <span
                  title={t('Collapse')}
                  className="gpt-util-icon"
                  onClick={() => setCollapsed(true)}
                >
                  <XCircleIcon size={14} />
                </span>
              ) : (
                <span
                  title={t('Expand')}
                  className="gpt-util-icon"
                  onClick={() => setCollapsed(false)}
                >
                  <ChevronDownIcon size={14} />
                </span>
              )}
            </div>
          </div>
          {!collapsed && <MarkdownRender>{content}</MarkdownRender>}
        </div>
      )
    case 'error':
      return (
        <div className={type} dir="auto">
          <div className="gpt-header">
            <p>{t('Error')}:</p>
            <div className="gpt-util-group">
<<<<<<< HEAD
              <CopyButton contentFn={() => content} size={14} />
=======
              {onRetry && (
                <span title={t('Retry')} className="gpt-util-icon" onClick={onRetry}>
                  <SyncIcon size={14} />
                </span>
              )}
              <CopyButton contentFn={() => content.replace(/\n<hr\/>$/, '')} size={14} />
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
              {!collapsed ? (
                <span
                  title={t('Collapse')}
                  className="gpt-util-icon"
                  onClick={() => setCollapsed(true)}
                >
                  <XCircleIcon size={14} />
                </span>
              ) : (
                <span
                  title={t('Expand')}
                  className="gpt-util-icon"
                  onClick={() => setCollapsed(false)}
                >
                  <ChevronDownIcon size={14} />
                </span>
              )}
            </div>
          </div>
          {!collapsed && <MarkdownRender>{content}</MarkdownRender>}
        </div>
      )
  }
}

ConversationItem.propTypes = {
  type: PropTypes.oneOf(['question', 'answer', 'error']).isRequired,
  content: PropTypes.string.isRequired,
<<<<<<< HEAD
  session: PropTypes.object.isRequired,
  done: PropTypes.bool.isRequired,
  port: PropTypes.object.isRequired,
=======
  descName: PropTypes.string,
  modelName: PropTypes.string,
  onRetry: PropTypes.func,
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
}

export default memo(ConversationItem)
