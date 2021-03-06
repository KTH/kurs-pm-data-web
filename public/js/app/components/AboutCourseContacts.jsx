/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'

import { EMPTY } from '../util/constants'

// Mandatory information
const infoContact = (languageIndex, infoContactName, labels) =>
  infoContactName ? (
    <>
      <h3 className="t4">{labels.infoContactName}</h3>
      <div id="links-info-contact-name" dangerouslySetInnerHTML={{ __html: infoContactName }} />
    </>
  ) : (
    <>
      <h3 className="t4">{labels.infoContactName}</h3>
      <p>
        <i>{EMPTY[languageIndex]}</i>
      </p>
    </>
  )

// Mandatory information
const examinerContacts = (languageIndex, examiners, labels) =>
  examiners ? (
    <>
      <h3 className="t4">{labels.examinerTitle}</h3>
      <div id="links-examiner" dangerouslySetInnerHTML={{ __html: examiners }} />
    </>
  ) : (
    <>
      <h3 className="t4">{labels.examinerTitle}</h3>
      <p>
        <i>{EMPTY[languageIndex]}</i>
      </p>
    </>
  )

const CourseContacts = ({ languageIndex, infoContactName = '', examiners = '', labels = {} }) => (
  <>
    <div className="info-box text-break">
      {infoContact(languageIndex, infoContactName, labels)}
      {examinerContacts(languageIndex, examiners, labels)}
    </div>
  </>
)

export default CourseContacts
