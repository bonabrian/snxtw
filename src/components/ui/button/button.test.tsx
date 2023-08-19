import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'

import { Button } from './button'

type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link'
const variants: Variant[] = ['default', 'secondary', 'outline', 'ghost', 'link']

type Size = 'default' | 'sm' | 'lg'
const sizes: Size[] = ['default', 'sm', 'lg']

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Button</Button>)
    expect(screen.getByText('Button')).toBeInTheDocument()
  })

  it('should render different text', () => {
    const { rerender } = render(<Button>Foo</Button>)
    expect(screen.getByText('Foo')).toBeInTheDocument()
    rerender(<Button>Bar</Button>)
    expect(screen.getByText('Bar')).toBeInTheDocument()
  })

  it('should ignore events when disabled', () => {
    const WrapperButton = () => {
      const [state, setState] = useState('initializeState')

      return (
        <Button disabled onClick={() => setState('updatedState')}>
          {state}
        </Button>
      )
    }

    render(<WrapperButton />)
    expect(screen.getByText('initializeState')).toBeInTheDocument()
    fireEvent.click(screen.getByText('initializeState'))
    expect(screen.getByText('initializeState')).toBeInTheDocument()
    expect(screen.queryByText('updatedState')).not.toBeInTheDocument()
  })

  it.each(variants)('should have correct variant %s class', (variant) => {
    render(<Button variant={variant}>{`Button ${variant}`}</Button>)
    expect(screen.getByText(`Button ${variant}`)).toBeInTheDocument()
  })

  it.each(sizes)('should have correct size %s class', (size) => {
    render(<Button size={size}>{`Button ${size}`}</Button>)
    expect(screen.getByText(`Button ${size}`)).toBeInTheDocument()
  })

  it('should render loadingText correctly', () => {
    render(
      <Button loading loadingText="Submitting...">
        Current Children
      </Button>,
    )

    expect(screen.getByText('Submitting...')).toBeInTheDocument()
    expect(screen.queryByText('Current Children')).not.toBeInTheDocument()
  })

  it('should render without loadingText', () => {
    render(<Button loading>Current Children</Button>)

    expect(screen.getByText('Current Children')).toBeInTheDocument()
  })

  it('should render spinner placement end', () => {
    render(
      <Button loading loadingText="Submitting..." spinnerPlacement="end">
        Current Children
      </Button>,
    )

    expect(screen.getByText('Submitting...')).toBeInTheDocument()
    expect(screen.queryByText('Current Children')).not.toBeInTheDocument()
  })
})
