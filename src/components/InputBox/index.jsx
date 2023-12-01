import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { updateRefHeight } from '../../utils'
import { useTranslation } from 'react-i18next'

export function InputBox({ onSubmit, enabled }) {
=======
import { isFirefox, isMobile, isSafari, updateRefHeight } from '../../utils'
import { useTranslation } from 'react-i18next'
import { getUserConfig } from '../../config/index.mjs'

export function InputBox({ onSubmit, enabled, postMessage, reverseResizeDir }) {
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const reverseDivRef = useRef(null)
  const inputRef = useRef(null)
  const resizedRef = useRef(false)
  const [internalReverseResizeDir, setInternalReverseResizeDir] = useState(reverseResizeDir)

  useEffect(() => {
    setInternalReverseResizeDir(
      !isSafari() && !isFirefox() && !isMobile() ? internalReverseResizeDir : false,
    )
  }, [])

  const virtualInputRef = internalReverseResizeDir ? reverseDivRef : inputRef

  useEffect(() => {
    inputRef.current.focus()

    const onResizeY = () => {
      if (virtualInputRef.current.h !== virtualInputRef.current.offsetHeight) {
        virtualInputRef.current.h = virtualInputRef.current.offsetHeight
        if (!resizedRef.current) {
          resizedRef.current = true
          virtualInputRef.current.style.maxHeight = ''
        }
      }
    }
    virtualInputRef.current.h = virtualInputRef.current.offsetHeight
    virtualInputRef.current.addEventListener('mousemove', onResizeY)
  }, [])

  useEffect(() => {
    if (!resizedRef.current) {
      if (!internalReverseResizeDir) {
        updateRefHeight(inputRef)
        virtualInputRef.current.h = virtualInputRef.current.offsetHeight
        virtualInputRef.current.style.maxHeight = '160px'
      }
    }
  })

<<<<<<< HEAD
  const onKeyDown = (e) => {
    e.stopPropagation()
    if (e.keyCode === 13 && e.shiftKey === false) {
=======
  useEffect(() => {
    if (enabled)
      getUserConfig().then((config) => {
        if (config.focusAfterAnswer) inputRef.current.focus()
      })
  }, [enabled])

  const handleKeyDownOrClick = (e) => {
    e.stopPropagation()
    if (e.type === 'click' || (e.keyCode === 13 && e.shiftKey === false)) {
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
      e.preventDefault()
      if (enabled) {
        if (!value) return
        onSubmit(value)
        setValue('')
      } else {
        postMessage({ stop: true })
      }
    }
  }

  return (
<<<<<<< HEAD
    <textarea
      dir="auto"
      ref={inputRef}
      disabled={!enabled}
      className="interact-input"
      placeholder={
        enabled
          ? t('Type your question here\nEnter to send, shift + enter to break line')
          : t('Wait for the answer to finish and then continue here')
      }
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={onKeyDown}
    />
=======
    <div className="input-box">
      <div
        ref={reverseDivRef}
        style={
          internalReverseResizeDir && {
            transform: 'rotateX(180deg)',
            resize: 'vertical',
            overflow: 'hidden',
            minHeight: '160px',
          }
        }
      >
        <textarea
          dir="auto"
          ref={inputRef}
          disabled={false}
          className="interact-input"
          style={
            internalReverseResizeDir
              ? { transform: 'rotateX(180deg)', resize: 'none' }
              : { resize: 'vertical', minHeight: '70px' }
          }
          placeholder={
            enabled
              ? t('Type your question here\nEnter to send, shift + enter to break line')
              : t('Type your question here\nEnter to stop generating\nShift + enter to break line')
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDownOrClick}
        />
      </div>
      <button
        className="submit-button"
        style={{
          backgroundColor: enabled ? '#30a14e' : '#cf222e',
        }}
        onClick={handleKeyDownOrClick}
      >
        {enabled ? t('Ask') : t('Stop')}
      </button>
    </div>
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  )
}

InputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
  reverseResizeDir: PropTypes.bool,
  postMessage: PropTypes.func.isRequired,
}

export default InputBox
