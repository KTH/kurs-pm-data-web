import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

function Button({ caption = 'N/A' }) {
  const { language: lang } = useStore()

  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setButtonClicked(true)}>
        {caption}
      </button>
      {buttonClicked ? <p>{i18n.message('template_button_works', lang)}</p> : null}
    </>
  )
}

export default observer(Button)
