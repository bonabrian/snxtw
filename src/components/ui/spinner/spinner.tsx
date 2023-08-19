import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import cn from '@/lib/cn'

const spinnerVariants = cva(
  'inline-block border-current border-solid border-2 border-b-transparent border-l-transparent rounded-full animate-spin',
  {
    variants: {
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-6',
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
