/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

module.exports = { getServerSideFunctions }

const log = require('kth-node-log')

// eslint-disable-next-line import/no-extraneous-dependencies
const Parcel = process.env.NODE_ENV === 'development' ? require('parcel-bundler') : null

const Global = {
  ServerSideFunctions: null
}

_prepare()

function _prepare() {
  if (process.env.NODE_ENV === 'development') {
    _avoidConflictsBetweenParcelAndNodeDuringStartDev()
    return
  }

  // @ts-ignore
  // eslint-disable-next-line import/no-unresolved
  Global.ServerSideFunctions = require('../../dist/serverSideFunctions').default
}

function _avoidConflictsBetweenParcelAndNodeDuringStartDev() {
  const _requireClientAppWithParcel = async () => {
    log.info('Server-side rendering: Bundling with Parcel in "./dist-dev"...')
    const parcel = new Parcel('./public/js/app/serverSideFunctions.js', { outDir: './dist-dev' })
    await parcel.bundle()

    // @ts-ignore
    // eslint-disable-next-line import/no-unresolved
    Global.ServerSideFunctions = require('../../dist-dev/serverSideFunctions').default
    log.info('Server-side rendering: Parcel finished bundling "./dist-dev", client app prepared')
  }
  _requireClientAppWithParcel()
}

/**
 * @returns {object} default export from public/js/app/app.jsx
 * @throws if applications is still preparing Server Side Rendering
 */
function getServerSideFunctions() {
  if (Global.ServerSideFunctions == null) {
    throw new Error('Server-side rendering: Too early access to client app - still preparing "./dist-dev"...')
  }

  return Global.ServerSideFunctions
}
