import React from 'react'
import './Subscription.css';
import SubscriptionImage from './subscription.png'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import SubPlans from '../../components/SubPlans/SubPlans';

const Subscription = () => {
    return (
        <div className="Subscription">
            <Header />
            <div className="Subscription-wrapper">
                <div className="Subscription-left">
                    <h1 className="Subscription-heading">Subscription</h1>
                </div>
                <div className="Subscription-right">
                    <img
                        src={SubscriptionImage}
                        alt="Subscription Illustration"
                        className="Subscription-image"
                    />
                </div>
            </div>
            <div className='footer-Subscription'>
                <SubPlans />
                <Footer />
            </div>
        </div>
    )
}

export default Subscription
