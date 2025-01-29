import React from 'react'
import './AddLinksPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import AddLinksForm from '../../components/AddLinkForm/AddLinkForm';

const AddLinksPage = () => {
    return (
        <div className="AddLinksPage">
            <Header />
            <div className="AddLink-wrapper">
                <div className="AddLink-left">
                    <h1 className="AddLink-heading">Add Links</h1>
                </div>
            </div>
            <AddLinksForm />
            <div className='footer-AddLink'>
                <Footer />
            </div>
        </div>
    )
}

export default AddLinksPage;
