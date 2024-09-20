import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link href='/'>Return Home</Link>
    </div>
  )
}

export default NotFound
