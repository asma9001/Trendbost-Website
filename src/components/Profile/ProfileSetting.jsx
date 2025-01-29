import React, { useState } from 'react';
import './ProfileSetting.css';
import { FaCamera } from 'react-icons/fa';

function ProfileSetting() {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        password: '',
        confirmPassword: '',
        profilePicture: 'https://www.w3schools.com/w3images/avatar2.png',
    });

    const toggleEditMode = () => {
        if (editMode) {
            // Save changes logic (you can integrate API calls here)
            console.log('Saved:', formData);
        }
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    profilePicture: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-settings">
            <div className="profile-header">
                <h2>Profile Settings</h2>
            </div>

            <div className="profile-info">
                <div className="profile-details">
                    <div className="profile-picture">
                        <img
                            src={formData.profilePicture}
                            alt="Profile"
                        />
                        {editMode && (
                            <label className="profile-picture-edit">
                                <FaCamera />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                />
                            </label>
                        )}
                    </div>
                    <div className="profile-name-email">
                        <p className="profile-name">{formData.firstName} {formData.lastName}</p>
                        <p className="profile-email">{formData.email}</p>
                    </div>
                </div>
                <button className="edit-button" onClick={toggleEditMode}>
                    {editMode ? 'Save Changes' : 'Edit'}
                </button>
            </div>

            <div className="main-container">
                <div className="prof-container">
                    <form className="prof-form">
                        <div className="prof-form-row">
                            <div className="prof-form-group half-width">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    disabled={!editMode}
                                />
                            </div>
                            <div className="prof-form-group half-width">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="prof-form-row">
                            <div className="prof-form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    disabled
                                />
                            </div>
                            <div className="prof-form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        {editMode && (
                            <div className="prof-form-row">
                                <div className="prof-form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="New Password"
                                    />
                                </div>
                                <div className="prof-form-group">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileSetting;
