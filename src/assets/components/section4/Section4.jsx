import React from 'react'
import './section4.css'
import { FaAddressBook, FaAddressCard, FaBeer, FaFacebook, FaMailBulk, FaPhone } from "react-icons/fa";
const Section4 = () => {
  return (
        
          <section id="section4" class="">
            <div class='box'>
              <div class='wave -one'> </div>
              <div class='wave -two'></div>
            </div>
              <h2 id="ContactUs" class="text-center mt-5">Contact Us</h2>
              <div class="container mt-5 " id="forForm">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 align-items-center">
  
                  <div class="container">
                    <div class="container">
                      <div id="socialIcons" class="container">
                        <h3>We're always here to help!</h3>
                        <p>Our team is dedicated to providing prompt and helpful responses to your inquiries. Contact us with any questions or concerns, and we'll get back to you as soon as possible.</p>
                        
  
                      </div>
                    </div>
                      
                  </div>
                  
                  <div class="container" id="contForm">
                      <div class="row container justify-content-center">
                        <div class="row p-1" id="svg-icon">
                          <a href=""><FaMailBulk/> hasharonmarketing_25@yahoo.com</a>
                          <a href=""><FaAddressCard/> Lot 2 block 55, Queborac St. Bagumbayan Sur, Naga City 4400</a>
                          <a href=""><FaPhone/> (054) 331 7858</a>
                          <a href=""><FaAddressBook/> Hasharon Marketing</a>
                          <a href=""><FaPhone/> 09984520255</a>
                        </div>  
                       
                      </div>
                    
                  </div>
                  </div>
  
              </div>
          </section>
      
  )
}

export default Section4