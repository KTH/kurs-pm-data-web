/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable, action } from 'mobx'

export default createApplicationStore

function createApplicationStore() {
  const store = {
    courseCode: observable.box(''),
    setCourseCode: action(function setCourseCode(courseCode) {
      this.courseCode.set(courseCode)
    })
  }

  return store
}
