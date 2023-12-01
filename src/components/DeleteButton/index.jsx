import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { TrashIcon } from '@primer/octicons-react'

DeleteButton.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
<<<<<<< HEAD
}

function DeleteButton({ onConfirm, size }) {
=======
  text: PropTypes.string.isRequired,
}

function DeleteButton({ onConfirm, size, text }) {
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
  const { t } = useTranslation()
  const [waitConfirm, setWaitConfirm] = useState(false)
  const confirmRef = useRef(null)

  useEffect(() => {
    if (waitConfirm) confirmRef.current.focus()
  }, [waitConfirm])

  return (
    <span>
      <button
        ref={confirmRef}
        type="button"
        className="normal-button"
        style={{
          fontSize: '10px',
          ...(waitConfirm ? {} : { display: 'none' }),
        }}
<<<<<<< HEAD
=======
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
        onBlur={() => {
          setWaitConfirm(false)
        }}
        onClick={() => {
          setWaitConfirm(false)
          onConfirm()
        }}
      >
        {t('Confirm')}
      </button>
      <span
<<<<<<< HEAD
        title={t('Clear Conversation')}
=======
        title={text}
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
        className="gpt-util-icon"
        style={waitConfirm ? { display: 'none' } : {}}
        onClick={() => {
          setWaitConfirm(true)
        }}
      >
        <TrashIcon size={size} />
      </span>
    </span>
  )
}

export default DeleteButton
