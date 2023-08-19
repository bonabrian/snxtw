import { render, screen } from '@testing-library/react'

import { Spinner } from './spinner'

type Size = 'xs' | 'sm' | 'md' | 'lg'
const sizes: Size[] = ['xs', 'sm', 'md', 'lg']

describe('Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it.each(sizes)('should have correct size %s', (size) => {
    render(<Spinner size={size} label={`Loading ${size}`} />)
    expect(screen.getByText(`Loading ${size}`)).toBeInTheDocument()
  })
})
