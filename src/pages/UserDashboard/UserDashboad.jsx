import React from 'react'
import './UserDashboard.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import UDash from '../../components/UDash/UDash';

const UserDashboard = () => {
    return (
        <div className="udash">
            <Header />
            <div className="udash-content">
                <UDash />
            </div>
            <Footer />
        </div>
    )
}

export default UserDashboard;
