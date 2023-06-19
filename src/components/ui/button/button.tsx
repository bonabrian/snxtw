import { forwardRef } from 'react'

import cn from '@/lib/cn'
import type { ColorScheme } from '@/types'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'
export type HTMLButtonType = 'button' | 'submit' | 'reset'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  color?: ColorScheme
  disabled?: boolean
  loading?: boolean
}

type ButtonContentProps = Pick<ButtonProps, 'children'>

const ButtonContent = ({ children }: ButtonContentProps) => children

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      className,
      children,
      disabled,
      loading,
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const colorSchemes: Record<ColorScheme, Record<ButtonVariant, string>> = {
      primary: {
        solid:
          'bg-primary-500 text-white hover:[&:not(:disabled)]:bg-primary-600',
        ghost:
          'bg-transparent text-primary-500 hover:[&:not(:disabled)]:bg-primary-400/20',
        link: 'h-auto bg-transparent text-primary-500 hover:[&:not(:disabled)]:underline',
        outline:
          'bg-transparent border border-primary-500 text-primary-500 hover:[&:not(:disabled)]:bg-primary-500 hover:[&:not(:disabled)]:text-white',
      },
      red: {
        solid: 'bg-red-500 text-white hover:[&:not(:disabled)]:bg-red-600',
        ghost:
          'bg-transparent text-red-500 hover:[&:not(:disabled)]:bg-red-400/20',
        link: 'h-auto bg-transparent text-red-500 hover:[&:not(:disabled)]:underline',
        outline:
          'bg-transparent border border-red-500 text-red-500 hover:[&:not(:disabled)]:bg-red-500 hover:[&:not(:disabled)]:text-white',
      },
      green: {
        solid: 'bg-green-500 text-white hover:[&:not(:disabled)]:bg-green-600',
        ghost:
          'bg-transparent text-green-500 hover:[&:not(:disabled)]:bg-green-400/20',
        link: 'h-auto bg-transparent text-green-500 hover:[&:not(:disabled)]:underline',
        outline:
          'bg-transparent border border-green-500 text-green-500 hover:[&:not(:disabled)]:bg-green-500 hover:[&:not(:disabled)]:text-white',
      },
      blue: {
        solid: 'bg-blue-500 text-white hover:[&:not(:disabled)]:bg-blue-600',
        ghost:
          'bg-transparent text-blue-500 hover:[&:not(:disabled)]:bg-blue-400/20',
        link: 'h-auto bg-transparent text-blue-500 hover:[&:not(:disabled)]:underline',
        outline:
          'bg-transparent border border-blue-500 text-blue-500 hover:[&:not(:disabled)]:bg-blue-500 hover:[&:not(:disabled)]:text-white',
      },
    }

    const contentProps = { children }
    const shouldDisabled = disabled || loading

    return (
      <button
        ref={ref}
        className={cn(
          'button relative inline-flex items-center justify-center appearance-none select-none whitespace-nowrap align-middle outline-none outline-offset-2 leading-tight rounded-md font-semibold transition-common duration-normal h-10 min-w-10 text-base px-4',
          'disabled:cursor-not-allowed opacity-60',
          colorSchemes[color][variant],
          className,
        )}
        {...rest}
        disabled={shouldDisabled}
      >
        <ButtonContent {...contentProps} />
      </button>
    )
  },
)

export default Button
