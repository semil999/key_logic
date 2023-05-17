import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
        <h1>Page not Found</h1>
        <Link to={'/'}>Go to Home Page</Link>
    </>
  )
}

export default ErrorPage