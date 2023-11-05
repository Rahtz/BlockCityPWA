import React from 'react'

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen z-50">
  <div className="flex-grow">
    {/* Your main content */}
  </div>
  <footer className="bg-black py-4 mt-2">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-white text-center">
        &copy; {new Date().getFullYear()} Jacob Ratima. All rights reserved.
      </p>
    </div>
  </footer>
</div>
  )
}

export default Footer