'use strict'

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

// const apis = require('../api')
const serverConfig = require('../configuration').server

const { getMemoDataById } = require('../kursPmDataApi')
const { getCourseInfo } = require('../kursInfoApi')
const { getDetailedInformation } = require('../koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

function resolveSellingText(sellingText = {}, recruitmentText, lang) {
  return sellingText[lang] ? sellingText[lang] : recruitmentText
}

async function _fillApplicationStoreOnServerSide({ applicationStore, params }) {
  const { courseCode: rawCourseCode, semester, id } = params
  const courseCode = rawCourseCode.toUpperCase()

  // let potentialMemoEndPoint
  // if (semester) {
  //   if (id) {
  //     // Potential memoEndPoint
  //     potentialMemoEndPoint = `${courseCode}${semester}-${id}`
  //   }
  // } else if (id) {
  //   // Probably a memoEndPoint
  //   potentialMemoEndPoint = id
  // }

  applicationStore.setCourseCode(courseCode)

  // const memoDatas = await getMemoDataById(courseCode)
  // applicationStore.memoDatas = memoDatas

  // // Potential memoEndPoint in URL
  // if (potentialMemoEndPoint) {
  //   let memoEndPoint
  //   // Do memoDatas contain memoEndPoint that equals potential memoEndPoint
  //   const memoDataWithMemoEndPoint = memoDatas.find((m) => m.memoEndPoint === potentialMemoEndPoint)
  //   if (memoDataWithMemoEndPoint) {
  //     memoEndPoint = memoDataWithMemoEndPoint.memoEndPoint
  //   }

  //   // No match of potential memoEndPoint in memoDatas, search for rounds in memoDatas’ memoEndPoints
  //   if (!memoEndPoint) {
  //     const potentialMemoEndPointParts = potentialMemoEndPoint.split('-')
  //     if (potentialMemoEndPointParts.length > 1) {
  //       const potentialCourseCodeAndSemester = potentialMemoEndPointParts[0]
  //       const potentialCourseRounds = potentialMemoEndPointParts.slice(1)
  //       const memoData = memoDatas.find((m) => {
  //         const memoEndPointParts = m.memoEndPoint.split('-')
  //         if (memoEndPointParts.length > 1) {
  //           const courseCodeAndSemester = memoEndPointParts[0]
  //           const courseRounds = memoEndPointParts.slice(1)
  //           if (potentialCourseCodeAndSemester === courseCodeAndSemester) {
  //             return potentialCourseRounds.length === 1 && courseRounds.includes(potentialCourseRounds[0])
  //           }
  //         }
  //         return m.memoEndPoint === potentialMemoEndPoint
  //       })
  //       if (memoData) {
  //         memoEndPoint = memoData.memoEndPoint
  //       }
  //     } else {
  //       memoEndPoint = ''
  //     }
  //   }

  //   applicationStore.memoEndPoint = memoEndPoint
  //   // No potential memoEndPoint in URL, grab the first one in memoDatas if memoDatas exists
  // } else {
  //   applicationStore.memoEndPoint = memoDatas[0] ? memoDatas[0].memoEndPoint : ''
  // }

  // const {
  //   courseMainSubjects,
  //   recruitmentText,
  //   title,
  //   credits,
  //   creditUnitAbbr,
  //   infoContactName,
  //   examiners,
  //   roundInfos
  // } = await getDetailedInformation(courseCode, applicationStore.semester, applicationStore.memoLanguage)
  // applicationStore.courseMainSubjects = courseMainSubjects
  // applicationStore.title = title
  // applicationStore.credits = credits
  // applicationStore.creditUnitAbbr = creditUnitAbbr
  // applicationStore.infoContactName = infoContactName
  // applicationStore.examiners = examiners
  // applicationStore.allRoundInfos = roundInfos

  // const { sellingText, imageInfo } = await getCourseInfo(courseCode)
  // applicationStore.sellingText = resolveSellingText(sellingText, recruitmentText, applicationStore.memoLanguage)
  // applicationStore.imageFromAdmin = imageInfo
}

async function getContent(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()

    await _fillApplicationStoreOnServerSide({ applicationStore, params: req.params })
    const responseLanguage = language.getLanguage(res) || 'sv'
    applicationStore.language = responseLanguage

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    console.log('compressedStoreCode', compressedStoreCode)

    const { uri: basename } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename })

    // TODO: Proper language constant
    const shortDescription = (lang === 'sv' ? 'Om kursen ' : 'About course ') + applicationStore.courseCode

    res.render('memo/index', {
      html,
      title: shortDescription,
      compressedStoreCode,
      description: shortDescription,
      instrumentationKey: serverConfig.appInsights.instrumentationKey,
      breadcrumbsPath: [],
      lang
    })
  } catch (err) {
    log.error('Error in getContent', { error: err })
    next(err)
  }
}

async function getNoContent(/*req, res, next*/) {
  try {
    // const context = {}
    // const renderProps = _staticRender(context, req.url)
    // const { applicationStore } = renderProps.props.children.props
    // applicationStore.setBrowserConfig(browser, serverPaths, apis, server.hostUrl)
    // const responseLanguage = language.getLanguage(res) || 'sv'
    // applicationStore.language = responseLanguage
    // // TODO: Proper language constant
    // const shortDescription = responseLanguage === 'sv' ? 'Om kurs-PM' : 'About course memo'
    // // log.debug(`renderProps ${JSON.stringify(renderProps)}`)
    // const html = ReactDOMServer.renderToString(renderProps)
    // res.render('memo/index', {
    //   html,
    //   title: shortDescription,
    //   initialState: JSON.stringify(hydrateStores(renderProps)),
    //   responseLanguage,
    //   description: shortDescription
    // })
  } catch (err) {
    // log.error('Error in getNoContent', { error: err })
    // next(err)
  }
}

module.exports = {
  getContent,
  getNoContent
}
