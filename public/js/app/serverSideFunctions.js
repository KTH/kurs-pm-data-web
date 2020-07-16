/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import { StaticRouter } from 'react-router'
import { useStaticRendering } from 'mobx-react'
import ReactDOMServer from 'react-dom/server'

import { compressStoreIntoJavascriptCode } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import appFactory from './app'

export default _getServerSideFunctions()

function _getServerSideFunctions() {
  return {
    createStore() {
      return createApplicationStore()
    },

    getcompressedApplicationStore(store) {
      const code = compressStoreIntoJavascriptCode(store)
      return code
    },

    renderStaticPage({ applicationStore, location, basename }) {
      useStaticRendering(true)

      const app = (
        <StaticRouter basename={basename} location={location}>
          {appFactory(applicationStore)}
        </StaticRouter>
      )

      const html = ReactDOMServer.renderToString(app)
      return html
    }
  }
}
