/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'
import i18n from '../../../../i18n'

const englishTranslations = i18n.messages[0].messages
const swedishTranslations = i18n.messages[1].messages

const linkToSchool = (name = '') => `https://www.kth.se/${name.toLowerCase().split('/')[0]}`

const version = (language, memoData) =>
  memoData.version ? (
    <div>
      <h3>{language === 'sv' ? swedishTranslations.versionTitle : englishTranslations.versionTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: memoData.version }} />
    </div>
  ) : (
    <div>
      <h3>{language === 'sv' ? swedishTranslations.versionTitle : englishTranslations.versionTitle}</h3>
      <p>{language === 'sv' ? swedishTranslations.mandatoryFieldMissing : englishTranslations.mandatoryFieldMissing}</p>
    </div>
  )

const offeredBy = (language, department) =>
  department.name ? (
    <div>
      <h3>{language === 'sv' ? swedishTranslations.offeredByTitle : englishTranslations.offeredByTitle}</h3>
      <p>
        <a href={linkToSchool(department.name)}>{department.name}</a>
      </p>
    </div>
  ) : (
    <div>
      <h3>{language === 'sv' ? swedishTranslations.versionTitle : englishTranslations.versionTitle}</h3>
      <p>{language === 'sv' ? swedishTranslations.mandatoryFieldMissing : englishTranslations.mandatoryFieldMissing}</p>
    </div>
  )

const languageOfInstruction = (language, memoData) =>
  memoData.languageOfInstructions ? (
    <div>
      <h3>
        {language === 'sv'
          ? swedishTranslations.languageOfInstructionTitle
          : englishTranslations.languageOfInstructionTitle}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: memoData.languageOfInstructions }} />
    </div>
  ) : (
    <div>
      <h3>
        {language === 'sv'
          ? swedishTranslations.languageOfInstructionTitle
          : englishTranslations.languageOfInstructionTitle}
      </h3>
      <p>{language === 'sv' ? swedishTranslations.mandatoryFieldMissing : englishTranslations.mandatoryFieldMissing}</p>
    </div>
  )

const CourseFacts = ({ language = 'sv', department = {}, memoData = {} }) => (
  <div>
    <div className="text-break" style={{ backgroundColor: '#f4f4f4' }}>
      {version(language, memoData)}
      {offeredBy(language, department)}
      {languageOfInstruction(language, memoData)}
    </div>
  </div>
)

export default CourseFacts
