import { render, screen } from '@testing-library/react'

import ErrorPage from './error'

describe('ErrorPage', () => {
  it('should render correctly', () => {
    render(
      <ErrorPage error={new Error('Something went wrong')} reset={() => {}} />,
    )
    const errorPage = screen.queryByText(
      'Oh no, something went wrong... maybe refresh?',
    )
    expect(errorPage).toBeInTheDocument()
  })
})
