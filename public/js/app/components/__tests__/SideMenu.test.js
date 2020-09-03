import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import SideMenu from '../SideMenu'

import i18n from '../../../../../i18n'
const { sideMenuLabels } = i18n.messages[0]

describe('Component <SideMenu>', () => {
  test('renders', () => {
    render(<SideMenu labels={sideMenuLabels} courseMemoItems={[]} />)
  })
})