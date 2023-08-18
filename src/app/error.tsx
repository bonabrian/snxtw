'use client'

import { useEffect } from 'react'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    // log the error to the error reporting service
  }, [error])

  return (
    <div className="flex items-center justify-center">
      <p>Oh no, something went wrong... maybe refresh?</p>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default ErrorPage
