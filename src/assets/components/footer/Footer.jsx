import React from 'react'
import './footer.css'
import image from '../images/agriculture/pngwing.com (1).png'

const Footer = () => {
  return (
    <footer className="text-center">
      <p>Copyright © 2024 Hasharon. All Rights Reserved.</p>
      <img src={image} alt="" id="human"/>
    </footer>
  )
}

export default Footer