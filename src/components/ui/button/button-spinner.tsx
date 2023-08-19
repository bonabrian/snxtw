import { cva, type VariantProps } from 'class-variance-authority'

import cn from '@/lib/cn'

import { Spinner } from '../spinner'

const buttonSpinnerVariants = cva(
  'flex items-center leading-normal text-base',
  {
    variants: {
      placement: {
        start: '',
        end: '',
      },
    },
    defaultVariants: {
      placement: 'start',
    },
  },
)

interface ButtonSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonSpinnerVariants> {
  label?: string
}

export const ButtonSpinner = ({
  label,
  placement,
  className,
  children = <Spinner />,
  ...rest
}: ButtonSpinnerProps) => {
  const positionStyle = label ? 'relative' : 'absolute'
  const placementStartStyle = label ? 'placement-start mr-2' : 'm-0'
  const placementEndStyle = label ? 'placement-end ml-2' : 'm-0'

  const placementStyle =
    placement === 'start' ? placementStartStyle : placementEndStyle

  return (
    <div
      className={cn(
        positionStyle,
        placementStyle,
        buttonSpinnerVariants({ placement, className }),
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
