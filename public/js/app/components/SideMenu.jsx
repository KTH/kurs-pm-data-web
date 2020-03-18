/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
import React from 'react'

const SideMenu = ({ courseCode = '' }) => {
  return (
    <div>
      <p>
        &lsaquo; <a href="https://www.kth.se/student/kurser/kurser-inom-program">Kurs- och programkatalogen</a>
      </p>
      <p>
        <b>Om kursen {courseCode}</b>
      </p>
      <hr />
      <p>
        <b>Inför kursval</b>
      </p>
      <p>Förbereda, gå (kurs-pm)</p>
      <p>Slutföra ej avklarad kurs</p>
      <p>Kursens utveckling och historik</p>
    </div>
  )
}

export default SideMenu