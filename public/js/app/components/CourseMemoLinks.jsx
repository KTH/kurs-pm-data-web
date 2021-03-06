import React from 'react'
import { FaRegFilePdf, FaAsterisk, FaPrint } from 'react-icons/fa'
import { Button } from 'reactstrap'

import { linkToArchive, linkToSyllabus } from '../util/links'

const printDialog = () => window.print()

const formatVersion = (languageIndex = 1, lastChangeDate) => {
  const locale = ['en-US', 'sv-SE']
  const unixTime = Date.parse(lastChangeDate)
  if (unixTime) {
    return new Date(unixTime).toLocaleString(locale[languageIndex])
  }
  return null
}

const version = (language, labels, lastChangeDate, ver, archived) =>
  lastChangeDate ? (
    <>
      <h3>{labels.versionTitle}</h3>
      <p>{`${archived ? `${labels.version} ${ver} – ` : labels.latest} ${formatVersion(language, lastChangeDate)}`}</p>
    </>
  ) : (
    <>
      <h3>{labels.versionTitle}</h3>
      <p>{labels.mandatoryFieldMissing}</p>
    </>
  )

const archiveLink = (language, labels, courseCode) => (
  <p>
    <a id="archive-link" title={labels.courseMemoArchiveLabel} href={linkToArchive(courseCode, language)}>
      {labels.courseMemoArchiveLabel}
    </a>
  </p>
)

const printDialogLink = labels => (
  <>
    <h3>{labels.courseMemoPrint}</h3>
    <Button id="print-link" className="print-link" color="link" onClick={printDialog}>
      {labels.printDialog}
      <FaPrint className="pdf-icon" />
    </Button>
  </>
)

const syllabusLink = (language, labels, extraInfo, courseCode, syllabusValid) => (
  <>
    <h3>{labels.syllabus}</h3>
    {syllabusValid ? (
      <p>
        <FaAsterisk className="syllabus-marker-icon" />
        {labels.syllabusInformation}
        <br />
        <a
          id="syllabus-link"
          title={`${labels.syllabusLinkStart}${syllabusValid.textFromTo}${labels.syllabusLinkEnd}`}
          href={linkToSyllabus(courseCode, syllabusValid.validFromTerm, language)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${labels.syllabusLinkStart}${syllabusValid.textFromTo}${labels.syllabusLinkEnd}`}
          <FaRegFilePdf className="pdf-icon" />
        </a>
      </p>
    ) : (
      <p>{labels.mandatoryFieldMissing}</p>
    )}
  </>
)

const CourseMemoLinks = ({ language, labels, extraInfo, memoData = {}, courseMemoName, archivedMemo }) => (
  <aside aria-labelledby="memo-documents">
    <h2 id="memo-documents" className="d-none">
      {labels.documents}
    </h2>
    <div className="info-box text-break">
      {version(language, labels, memoData.lastChangeDate, memoData.version, archivedMemo)}
      {!archivedMemo && archiveLink(language, labels, memoData.courseCode)}
      {printDialogLink(labels, courseMemoName)}
      {syllabusLink(language, labels, extraInfo, memoData.courseCode, memoData.syllabusValid)}
    </div>
  </aside>
)

export default CourseMemoLinks
