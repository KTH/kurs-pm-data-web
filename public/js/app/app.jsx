/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'mobx-react/batchingForReactDom'

import { MobxStoreProvider, uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import '../../css/node-web.scss'

// Store
// import RouterStore from './stores/RouterStore'

// Pages
import CourseMemo from './pages/CourseMemo'
import AboutCourseMemo from './pages/AboutCourseMemo'
import AboutCourseMemos from './pages/AboutCourseMemos'

export default appFactory

_renderOnClientSide()

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  // @ts-ignore
  const basename = window.config.proxyPrefixPath.uri

  const applicationStore = createApplicationStore()
  uncompressStoreInPlaceFromDocument(applicationStore)

  const app = <BrowserRouter basename={basename}>{appFactory(applicationStore)}</BrowserRouter>

  const domElement = document.getElementById('app')
  ReactDOM.hydrate(app, domElement)
}

function appFactory(applicationStore) {
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Switch>
        <Route exact path="/kurs-pm/" component={AboutCourseMemos} />
        <Route exact path="/kurs-pm/:courseCode" component={CourseMemo} />
        <Route exact path="/kurs-pm/:courseCode/om-kurs-pm" component={AboutCourseMemo} />
        <Route exact path="/kurs-pm/:courseCode/:id" component={CourseMemo} />
        <Route exact path="/kurs-pm/:courseCode/:semester/:id" component={CourseMemo} />
      </Switch>
    </MobxStoreProvider>
  )
}
