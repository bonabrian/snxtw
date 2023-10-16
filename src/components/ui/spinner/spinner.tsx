import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import cn from '@/lib/cn'

const spinnerVariants = cva(
  'inline-block animate-spin rounded-full border-2 border-solid border-current border-b-transparent border-l-transparent',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-6 w-8',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ label = 'Loading...', size, className, ...rest }: SpinnerProps, ref) => {
    return (
      <div
        className={cn(spinnerVariants({ size, className }))}
        ref={ref}
        {...rest}
      >
        {label && <span className="sr-only">{label}</span>}
      </div>
    )
  },
)
