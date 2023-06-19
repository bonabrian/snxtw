import { render, screen } from '@testing-library/react'

import Providers from './providers'

describe('Providers', () => {
  it('should render correctly', () => {
    render(<Providers>Children</Providers>)
    expect(screen.getByText('Children')).toBeInTheDocument()
  })
})
