/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react'
import { ContentHead, SubSectionHeaderMessage } from './ContentHead'
import i18n from '../../../../i18n'
import { context } from '../util/fieldsByType'

const Section = ({ contentId, menuId, visibleInMemo, html, memoLangIndex }) => {
  const { nothingFetched, insertedSubSection } = i18n.messages[memoLangIndex].sourceInfo
  const fromSyllabus = {
    is: context[contentId].source === '(s)',
    subHeader: contentId === 'examination' || contentId === 'ethicalApproach'
  }
  const isAddedSubSection = context[contentId].hasParentTitle && contentId !== 'permanentDisabilitySubSection'
  return (
    <article id={menuId} key={contentId} aria-labelledby={contentId}>
      {isAddedSubSection ? (
        <SubSectionHeaderMessage message={insertedSubSection} />
      ) : (
        <ContentHead contentId={contentId} memoLangIndex={memoLangIndex} fromSyllabus={fromSyllabus} />
      )}
      <span
        style={visibleInMemo ? {} : { display: 'none' }}
        dangerouslySetInnerHTML={{
          __html: html || `<p><i>${nothingFetched[context[contentId].type]}</i></p>`
        }}
      />
    </article>
  )
}

export default Section
