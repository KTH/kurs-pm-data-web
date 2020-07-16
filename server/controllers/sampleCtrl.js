/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const api = require('../api')
const serverConfig = require('../configuration').server

const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getcompressedApplicationStore, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()
    applicationStore.setLanguage(lang)

    await _fillApplicationStoreOnServerSide({ applicationStore, query: req.query })

    const compressedApplicationStore = getcompressedApplicationStore(applicationStore)

    const { uri: basename } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename })

    res.render('sample/index', {
      html,
      title: 'TODO',
      compressedApplicationStore,
      description: 'TODO',
      breadcrumbsPath: [],
      lang
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

async function _fillApplicationStoreOnServerSide({ applicationStore, query }) {
  applicationStore.setMessage('Tjena!')
}

module.exports = {
  getIndex
}
