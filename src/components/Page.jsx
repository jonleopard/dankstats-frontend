import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Page({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="py-4" />
      <div className="container mx-auto flex-grow px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Page
