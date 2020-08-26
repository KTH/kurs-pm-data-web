/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'

import { adminLink } from '../util/links'
import { Row, Col } from 'reactstrap'

const formatCredits = (credits, creditUnitAbbr, language) => {
  const localeCredits = language === 'sv' ? credits.toLocaleString('sv-SE') : credits.toLocaleString('en-US')
  const creditUnit = language === 'sv' ? creditUnitAbbr : 'credits'
  return `${localeCredits} ${creditUnit}`
}

const AboutHeader = ({
  courseCode = '',
  title = '',
  credits = '',
  creditUnitAbbr = '',
  labels = {},
  language = 'sv'
}) => {
  const { adminLinkLabel } = labels
  return (
    <>
      <Row>
        <Col>
          <h1 className="course-header-title">{labels.memoLabel}</h1>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col className="text-left" xs="12" lg="6">
          <h4 className="secondTitle">
            {courseCode} {title} {formatCredits(credits, creditUnitAbbr, language)}
          </h4>
        </Col>
        <Col className="text-lg-right" xs="12" lg="6">
          <a
            id="admin-link"
            className="course-header-admin-link"
            title={adminLinkLabel}
            href={adminLink(courseCode, language)}
          >
            {adminLinkLabel}
          </a>
        </Col>
      </Row>
    </>
  )
}

export default AboutHeader
