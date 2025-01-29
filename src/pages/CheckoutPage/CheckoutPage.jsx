import React from 'react'
import Header from '../../components/Header/Header'
import Check from '../../components/Check/Check'
import Footer from '../../components/Footer/Footer'
import './CheckoutPage.css'

const CheckoutPage = () => {
  return (
    <div className="Checkout-Page">
      <Header />
      <div className="Checkout-wrapper">
        <div className="Checkout-left">
          <h1 className="Checkout-heading">CheckOut</h1>
        </div>
      </div>
      <Check />
      <div className='footer-Checkout'>
        <Footer />
      </div>
    </div>
  )
}

export default CheckoutPage
