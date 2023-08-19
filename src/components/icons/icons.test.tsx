import { render, screen } from '@testing-library/react'

import {
  Eslint,
  Jest,
  Moon,
  NextJs,
  Sun,
  TailwindCss,
  TypeScript,
  Vercel,
} from './icons'

const icons = [
  {
    icon: <TypeScript data-testid="typescript" />,
    dataTestId: 'typescript',
  },
  {
    icon: <Vercel data-testid="vercel" />,
    dataTestId: 'vercel',
  },
  {
    icon: <NextJs data-testid="nextjs" />,
    dataTestId: 'nextjs',
  },
  {
    icon: <TailwindCss data-testid="tailwindcss" />,
    dataTestId: 'tailwindcss',
  },
  {
    icon: <Eslint data-testid="eslint" />,
    dataTestId: 'eslint',
  },
  {
    icon: <Jest data-testid="jest" />,
    dataTestId: 'jest',
  },
  {
    icon: <Sun data-testid="sun" />,
    dataTestId: 'sun',
  },
  {
    icon: <Moon data-testid="moon" />,
    dataTestId: 'moon',
  },
]

describe('Icons', () => {
  it.each(icons)('should render %s icon', ({ icon, dataTestId }) => {
    render(<>{icon}</>)
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument()
  })
})
