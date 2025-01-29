import React from 'react'
import './CustPlan.css';
import planImage from './plan.png'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import CustomizedP from '../../components/CustomizedP/CustomizedP';

const CustPlan = () => {
    return (
        <div className="CustPlan">
            <Header />
            <div className="plan-wrapper">
                <div className="plan-left">
                    <h1 className="plan-heading">Customized Plan</h1>
                </div>
                <div className="plan-right">
                    <img
                        src={planImage}
                        alt="plan Illustration"
                        className="plan-image"
                    />
                </div>
            </div>
            <div className='footer-plan'>
                <CustomizedP />
                <Footer />
            </div>
        </div>
    )
}

export default CustPlan;
