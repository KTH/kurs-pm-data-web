/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable, action } from 'mobx'

export default createApplicationStore

function createApplicationStore() {
  const store = {
    language: null,

    message: 'Hallo',

    setMessage: action(function setMessage(text = 'Happy coding!! :)') {
      this.message = text
    }),

    setLanguage: action(function setLanguage(lang) {
      this.language = lang
    })
  }

  return store
}
