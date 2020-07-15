import React from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

import Button from '../components/Button'

const Start = () => {
  const { message, language: lang } = useStore()

  return (
    <main id="mainContent">
      <h1>Node-web</h1>
      <h2>{i18n.message('template_app_works', lang)}</h2>
      <hr className="my-2" />
      <p>{`${i18n.message('template_store_text', lang)}: ${message}`}</p>
      <Button caption={i18n.message('template_try_me', lang)} />
    </main>
  )
}

export default observer(Start)
