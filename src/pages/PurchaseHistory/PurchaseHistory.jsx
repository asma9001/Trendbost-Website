import React from 'react'
import './PurchaseHistory.css';
import PurchaseHistoryImage from './PurchaseHistory.png'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import History from '../../components/History/History';

const PurchaseHistory = () => {
    return (
        <div className="Payment">
            <Header />
            <div className="Payment-wrapper">
                <div className="Payment-left">
                    <h1 className="Payment-heading">Purchase History</h1>
                </div>
                <div className="Payment-right">
                    <img
                        src={PurchaseHistoryImage}
                        alt="Payment Illustration"
                        className="Payment-image"
                    />
                </div>
            </div>
            <History />
            <div className='footer-Payment'>
                <Footer />
            </div>
        </div>
    )
}

export default PurchaseHistory;
