import { render, screen } from '@testing-library/react'

import { ButtonSpinner } from './button-spinner'

type Placement = 'start' | 'end'
const placements: Placement[] = ['start', 'end']

describe('ButtonSpinner', () => {
  it('should render correctly', () => {
    render(<ButtonSpinner />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it.each(placements)(
    'should have correct placement %s with label',
    (placement) => {
      render(
        <ButtonSpinner
          placement={placement}
          label="Submitting..."
          data-testid="buttonSpinner"
        />,
      )

      expect(screen.getByTestId('buttonSpinner')).toHaveClass(
        `placement-${placement}`,
      )
    },
  )

  it.each(placements)(
    'should have correct placement %s class without label',
    (placement) => {
      render(
        <ButtonSpinner placement={placement} data-testid="buttonSpinner" />,
      )

      expect(screen.getByTestId('buttonSpinner')).toHaveClass('m-0')
    },
  )
})
