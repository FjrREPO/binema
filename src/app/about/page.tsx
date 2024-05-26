import About from '@/components/client/pages/about/About'
import React from 'react'
import Navbar from '@/components/client/element/Navbar'

function page() {
  return (
    <div>
      <div><Navbar/></div>
      <div><About/></div>
    </div>
  )
}

export default page