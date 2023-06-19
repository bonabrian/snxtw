import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'

import type { ColorScheme } from '@/types'

import Button, { type ButtonVariant } from './button'

const variants: ButtonVariant[] = ['solid', 'outline', 'ghost', 'link']
const colorSchemes: ColorScheme[] = ['primary', 'red', 'green', 'blue']

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

  it.each(colorSchemes)('should have correct color %s class', (color) => {
    render(<Button color={color}>{`Button ${color}`}</Button>)
    expect(screen.getByText(`Button ${color}`)).toBeInTheDocument()
  })
})
