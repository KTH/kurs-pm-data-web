import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Button from './Button'

import 'mobx-react/batchingForReactDom'

describe('Component <Button>', () => {
  test('creates a button', () => {
    const { asFragment } = render(<Button caption="This is a message" />)

    expect(asFragment()).toMatchSnapshot()
    // or
    expect(screen.getByText('This is a message')).toHaveAttribute('type', 'button')
    expect(() => screen.getByText('Knappen fungerar!')).toThrow()
  })

  test('changes output after first click', () => {
    const { asFragment } = render(<Button caption="This is a message" />)
    const stateBeforeFirstClick = asFragment()

    fireEvent.click(screen.getByText('This is a message'))
    expect(asFragment()).not.toEqual(stateBeforeFirstClick)

    expect(asFragment()).toMatchSnapshot()
    // or
    expect(screen.getByText('This is a message')).toHaveAttribute('type', 'button')
    expect(screen.getByText('Knappen fungerar!'))
  })

  test("doesn't change anything after another click", () => {
    const { asFragment } = render(<Button caption="This is a message" />)

    fireEvent.click(screen.getByText('This is a message'))
    const stateAfterFirstClick = asFragment()

    fireEvent.click(screen.getByText('This is a message'))
    expect(asFragment()).toEqual(stateAfterFirstClick)
  })
})
