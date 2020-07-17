/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable, action } from 'mobx'

export default createApplicationStore

function createApplicationStore() {
  const store = {
    language: '',
    courseCode: observable.box(''),

    setLanguage: action(function setLanguage(language) {
      this.language = language
    }),
    setCourseCode: action(function setCourseCode(courseCode) {
      this.courseCode.set(courseCode)
    })
  }

  return store
}
