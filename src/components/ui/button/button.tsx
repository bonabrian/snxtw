import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import cn from '@/lib/cn'
import { ariaAttr, dataAttr } from '@/lib/utils'

import { ButtonSpinner } from './button-spinner'

export type HTMLButtonType = 'button' | 'submit' | 'reset'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center appearance-none select-none whitespace-nowrap align-middle outline-none outline-offset-2 leading-tight rounded-md font-semibold transition-common duration-normal disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean
  htmlType?: HTMLButtonType
  loading?: boolean
  loadingText?: string
  spinnerPlacement?: 'start' | 'end'
}

type ButtonContentProps = Pick<ButtonProps, 'children'>

const ButtonContent = ({ children }: ButtonContentProps) => children

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      className,
      children,
      disabled,
      loading,
      loadingText,
      spinnerPlacement = 'start',
      htmlType = 'button',
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const contentProps = { children }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || disabled}
        type={htmlType}
        data-loading={dataAttr(loading)}
        aria-disabled={ariaAttr(loading || disabled)}
        {...rest}
      >
        {loading && spinnerPlacement === 'start' && (
          <ButtonSpinner label={loadingText} placement="start" />
        )}

        {loading ? (
          loadingText || (
            <span className="opacity-0">
              <ButtonContent {...contentProps} />
            </span>
          )
        ) : (
          <ButtonContent {...contentProps} />
        )}

        {loading && spinnerPlacement === 'end' && (
          <ButtonSpinner label={loadingText} placement="end" />
        )}
      </button>
    )
  },
)
