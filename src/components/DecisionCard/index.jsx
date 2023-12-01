import { LightBulbIcon, SearchIcon } from '@primer/octicons-react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ConversationCard from '../ConversationCard'
<<<<<<< HEAD
import { defaultConfig, getUserConfig } from '../../config/index.mjs'
import Browser from 'webextension-polyfill'
import { getPossibleElementByQuerySelector, endsWithQuestionMark } from '../../utils'
import { useTranslation } from 'react-i18next'
=======
import { getPossibleElementByQuerySelector, endsWithQuestionMark } from '../../utils'
import { useTranslation } from 'react-i18next'
import { useConfig } from '../../hooks/use-config.mjs'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585

function DecisionCard(props) {
  const { t } = useTranslation()
  const [triggered, setTriggered] = useState(false)
  const [render, setRender] = useState(false)
  const config = useConfig(() => {
    setRender(true)
  })

  const question = props.question

<<<<<<< HEAD
  useEffect(() => {
    getUserConfig().then((config) => {
      setConfig(config)
      setRender(true)
    })
  }, [])

  useEffect(() => {
    const listener = (changes) => {
      const changedItems = Object.keys(changes)
      let newConfig = {}
      for (const key of changedItems) {
        newConfig[key] = changes[key].newValue
      }
      setConfig({ ...config, ...newConfig })
    }
    Browser.storage.local.onChanged.addListener(listener)
    return () => {
      Browser.storage.local.onChanged.removeListener(listener)
    }
  }, [config])

=======
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  const updatePosition = () => {
    if (!render) return

    const container = props.container
    const siteConfig = props.siteConfig
    container.classList.remove('chatgptbox-sidebar-free')

    if (config.appendQuery) {
      const appendContainer = getPossibleElementByQuerySelector([config.appendQuery])
      if (appendContainer) {
        appendContainer.appendChild(container)
        return
      }
    }

    if (config.prependQuery) {
      const prependContainer = getPossibleElementByQuerySelector([config.prependQuery])
      if (prependContainer) {
        prependContainer.prepend(container)
        return
      }
    }

    if (!siteConfig) return

    if (config.insertAtTop) {
      const resultsContainerQuery = getPossibleElementByQuerySelector(
        siteConfig.resultsContainerQuery,
      )
      if (resultsContainerQuery) resultsContainerQuery.prepend(container)
    } else {
      const sidebarContainer = getPossibleElementByQuerySelector(siteConfig.sidebarContainerQuery)
      if (sidebarContainer) {
        sidebarContainer.prepend(container)
      } else {
        const appendContainer = getPossibleElementByQuerySelector(siteConfig.appendContainerQuery)
        if (appendContainer) {
          container.classList.add('chatgptbox-sidebar-free')
          appendContainer.appendChild(container)
        } else {
          const resultsContainerQuery = getPossibleElementByQuerySelector(
            siteConfig.resultsContainerQuery,
          )
          if (resultsContainerQuery) resultsContainerQuery.prepend(container)
        }
      }
    }
  }

  useEffect(() => updatePosition(), [config])

  return (
    render && (
      <div data-theme={config.themeMode}>
        {(() => {
          if (question)
            switch (config.triggerMode) {
              case 'always':
                return <ConversationCard session={props.session} question={question} />
              case 'manually':
                if (triggered) {
                  return <ConversationCard session={props.session} question={question} />
                }
                return (
<<<<<<< HEAD
                  <p
                    className="gpt-inner manual-btn icon-and-text"
                    onClick={() => setTriggered(true)}
                  >
                    <SearchIcon size="small" /> {t('Ask ChatGPT')}
=======
                  <p className="gpt-inner manual-btn" onClick={() => setTriggered(true)}>
                    <span className="icon-and-text">
                      <SearchIcon size="small" /> {t('Ask ChatGPT')}
                    </span>
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
                  </p>
                )
              case 'questionMark':
                if (endsWithQuestionMark(question.trim())) {
                  return <ConversationCard session={props.session} question={question} />
                }
                if (triggered) {
                  return <ConversationCard session={props.session} question={question} />
                }
                return (
<<<<<<< HEAD
                  <p
                    className="gpt-inner manual-btn icon-and-text"
                    onClick={() => setTriggered(true)}
                  >
                    <SearchIcon size="small" /> {t('Ask ChatGPT')}
=======
                  <p className="gpt-inner manual-btn" onClick={() => setTriggered(true)}>
                    <span className="icon-and-text">
                      <SearchIcon size="small" /> {t('Ask ChatGPT')}
                    </span>
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
                  </p>
                )
            }
          else
            return (
<<<<<<< HEAD
              <p className="gpt-inner icon-and-text">
                <LightBulbIcon size="small" /> {t('No Input Found')}
=======
              <p className="gpt-inner">
                <span className="icon-and-text">
                  <LightBulbIcon size="small" /> {t('No Input Found')}
                </span>
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
              </p>
            )
        })()}
      </div>
    )
  )
}

DecisionCard.propTypes = {
  session: PropTypes.object.isRequired,
  question: PropTypes.string.isRequired,
  siteConfig: PropTypes.object.isRequired,
  container: PropTypes.object.isRequired,
}

export default DecisionCard
