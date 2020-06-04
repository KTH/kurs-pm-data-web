/* eslint-disable react/no-danger */
import React from 'react'
import { FaRegFilePdf, FaAsterisk } from 'react-icons/fa'

import { seasonStr } from '../util/helpers'
import { linkToArchive, /* linkToMemoPdf, */ linkToSyllabus } from '../util/links'

const formatVersion = (language = 'sv', version) => {
  const unixTime = Date.parse(version)
  if (unixTime) {
    const locale = language === 'sv' ? 'sv-SE' : 'en-US'
    return new Date(unixTime).toLocaleString(locale)
  }
  return null
}

const version = (language, labels, memoVersion) =>
  memoVersion ? (
    <>
      <h4>{labels.versionTitle}</h4>
      <p>{`${labels.latest} ${formatVersion(language, memoVersion)}`}</p>
    </>
  ) : (
    <>
      <h4>{labels.versionTitle}</h4>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const archiveLink = (language, labels, courseCode) => (
  <p>
    <a
      id="archive-link"
      title={labels.courseMemoArchiveLabel}
      href={linkToArchive(courseCode, language)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {labels.courseMemoArchiveLabel}
    </a>
  </p>
)

const pdfLink = (labels /* courseCode, memoEndPoint */) => (
  <>
    <h4>{labels.courseMemoPdf}</h4>
    <p>
      <i>{labels.inDevelopment}</i>
      {/* <a
        id="pdf-link"
        title={memoEndPoint}
        href={linkToMemoPdf(courseCode, memoEndPoint)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {memoEndPoint}
        <FaRegFilePdf className="pdf-icon" />
      </a> */}
    </p>
  </>
)

const syllabusLink = (language, labels, extraInfo, courseCode, validFromTerm) => {
  const syllabusLinkLabel = `${labels.syllabusLinkStart}${seasonStr(extraInfo, validFromTerm)}${labels.syllabusLinkEnd}`
  return (
    <>
      <h4>{labels.syllabus}</h4>
      <p>
        <FaAsterisk className="syllabus-marker-icon" />
        {labels.syllabusInformation}
        <br />
        <a
          id="syllabus-link"
          title={syllabusLinkLabel}
          href={linkToSyllabus(courseCode, validFromTerm, language)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {syllabusLinkLabel}
          <FaRegFilePdf className="pdf-icon" />
        </a>
      </p>
    </>
  )
}

const CourseMemoLinks = ({ language, labels, extraInfo, memoData = {}, validFromTerm = '' }) => (
  <div className="info-box">
    {version(memoData.memoLanguage, labels, memoData.lastChangeDate)}
    {archiveLink(language, labels, memoData.courseCode)}
    {pdfLink(labels, memoData.courseCode, memoData.memoEndPoint)}
    {syllabusLink(language, labels, extraInfo, memoData.courseCode, validFromTerm.term)}
  </div>
)

export default CourseMemoLinks
