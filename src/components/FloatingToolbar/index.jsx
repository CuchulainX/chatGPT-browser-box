import Browser from 'webextension-polyfill'
import { cloneElement, useCallback, useEffect, useState } from 'react'
import ConversationCard from '../ConversationCard'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { defaultConfig, getUserConfig } from '../../config/index.mjs'
=======
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
import { config as toolsConfig } from '../../content-script/selection-tools'
import { getClientPosition, isMobile, setElementPositionInViewport } from '../../utils'
import Draggable from 'react-draggable'
import { useClampWindowSize } from '../../hooks/use-clamp-window-size'
import { useTranslation } from 'react-i18next'
<<<<<<< HEAD
=======
import { useConfig } from '../../hooks/use-config.mjs'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585

const logo = Browser.runtime.getURL('logo.png')

function FloatingToolbar(props) {
  const { t } = useTranslation()
  const [selection, setSelection] = useState(props.selection)
  const [prompt, setPrompt] = useState(props.prompt)
  const [triggered, setTriggered] = useState(props.triggered)
  const [render, setRender] = useState(false)
  const [closeable, setCloseable] = useState(props.closeable)
  const [position, setPosition] = useState(getClientPosition(props.container))
  const [virtualPosition, setVirtualPosition] = useState({ x: 0, y: 0 })
  const windowSize = useClampWindowSize([750, 1500], [0, Infinity])
<<<<<<< HEAD

  useEffect(() => {
    getUserConfig().then((config) => {
      setConfig(config)
      setRender(true)

      if (!triggered) props.container.style.position = 'absolute'
    })
  }, [])

  useEffect(() => {
    const listener = (changes) => {
      const changedItems = Object.keys(changes)
      let newConfig = {}
      for (const key of changedItems) {
        newConfig[key] = changes[key].newValue
=======
  const config = useConfig(() => {
    setRender(true)
    if (!triggered) {
      props.container.style.position = 'absolute'
      setTimeout(() => {
        const left = Math.min(
          Math.max(0, window.innerWidth - props.container.offsetWidth - 30),
          Math.max(0, position.x),
        )
        props.container.style.left = left + 'px'
      })
    }
  })

  useEffect(() => {
    if (isMobile()) {
      const selectionListener = () => {
        const currentSelection = window.getSelection()?.toString()
        if (currentSelection) setSelection(currentSelection)
      }
      document.addEventListener('selectionchange', selectionListener)
      return () => {
        document.removeEventListener('selectionchange', selectionListener)
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
      }
    }
  }, [])

  useEffect(() => {
    if (isMobile()) {
      const selectionListener = () => {
        const currentSelection = window.getSelection()?.toString()
        if (currentSelection) setSelection(currentSelection)
      }
      document.addEventListener('selectionchange', selectionListener)
      return () => {
        document.removeEventListener('selectionchange', selectionListener)
      }
    }
  }, [])

  if (!render) return <div />

  if (triggered) {
    const updatePosition = () => {
      const newPosition = setElementPositionInViewport(props.container, position.x, position.y)
      if (position.x !== newPosition.x || position.y !== newPosition.y) setPosition(newPosition) // clear extra virtual position offset
    }

    const dragEvent = {
      onDrag: (e, ui) => {
        setVirtualPosition({ x: virtualPosition.x + ui.deltaX, y: virtualPosition.y + ui.deltaY })
      },
      onStop: () => {
        setPosition({ x: position.x + virtualPosition.x, y: position.y + virtualPosition.y })
        setVirtualPosition({ x: 0, y: 0 })
      },
    }

    if (virtualPosition.x === 0 && virtualPosition.y === 0) {
      updatePosition() // avoid jitter
    }

    const onClose = useCallback(() => {
      props.container.remove()
    }, [])

    const onDock = useCallback(() => {
      props.container.className = 'chatgptbox-toolbar-container-not-queryable'
      setCloseable(true)
    }, [])

    const onUpdate = useCallback(() => {
      updatePosition()
    }, [position])

    if (config.alwaysPinWindow) onDock()

    return (
      <div data-theme={config.themeMode}>
        <Draggable
          handle=".draggable"
          onDrag={dragEvent.onDrag}
          onStop={dragEvent.onStop}
          position={virtualPosition}
        >
          <div
            className="chatgptbox-selection-window"
            style={{ width: windowSize[0] * 0.4 + 'px' }}
          >
            <div className="chatgptbox-container">
              <ConversationCard
                session={props.session}
                question={prompt}
                draggable={true}
                closeable={closeable}
<<<<<<< HEAD
                onClose={() => {
                  props.container.remove()
                }}
                dockable={props.dockable}
                onDock={() => {
                  props.container.className = 'chatgptbox-toolbar-container-not-queryable'
                  setCloseable(true)
                }}
                onUpdate={() => {
                  updatePosition()
                }}
=======
                onClose={onClose}
                dockable={props.dockable}
                onDock={onDock}
                onUpdate={onUpdate}
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
              />
            </div>
          </div>
        </Draggable>
      </div>
    )
  } else {
    if (config.activeSelectionTools.length === 0) return <div />

    const tools = []

    for (const key in toolsConfig) {
      if (config.activeSelectionTools.includes(key)) {
        const toolConfig = toolsConfig[key]
        tools.push(
          cloneElement(toolConfig.icon, {
            size: 20,
            className: 'chatgptbox-selection-toolbar-button',
            title: t(toolConfig.label),
            onClick: async () => {
              const p = getClientPosition(props.container)
              props.container.style.position = 'fixed'
              setPosition(p)
              setPrompt(await toolConfig.genPrompt(selection))
              setTriggered(true)
            },
          }),
        )
      }
    }

    return (
      <div data-theme={config.themeMode}>
        <div className="chatgptbox-selection-toolbar">
<<<<<<< HEAD
          <img src={logo} style="user-select:none;width:24px;height:24px;" />
=======
          <img
            src={logo}
            style="user-select:none;width:24px;height:24px;background:rgba(0,0,0,0);filter:none;"
          />
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
          {tools}
        </div>
      </div>
    )
  }
}

FloatingToolbar.propTypes = {
  session: PropTypes.object.isRequired,
  selection: PropTypes.string.isRequired,
  container: PropTypes.object.isRequired,
  triggered: PropTypes.bool,
  closeable: PropTypes.bool,
  dockable: PropTypes.bool,
  prompt: PropTypes.string,
}

export default FloatingToolbar
