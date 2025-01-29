import React from 'react'
import './Payment.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import PMethod from '../../components/PMethod/PMethod';

const Payment = () => {
    return (
        <div className="Payment">
            <Header />
            <div className="Payment-wrappr">
                <div className="Payment-left">
                    <h1 className="Payment-heading">Payment Method</h1>
                </div>
            </div>
            <div className='footer-Payment'>
                <PMethod />
                <Footer />
            </div>
        </div>
    )
}

export default Payment;
