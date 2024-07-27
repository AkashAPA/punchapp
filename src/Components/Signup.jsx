import React, { useState, useContext } from 'react';
import './Signup.css'
import { NavLink } from 'react-router-dom';
import { MDBTooltip } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from '../DataContext'; // Correct import path

const Signup = () => {
    const { allData} = useContext(DataContext);
    console.log("useContext",allData);
    const initialFormData = {
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    // Function to generate the next Employee ID
    const getNextEmployeeId = (existingIds) => {
        let maxId = 0;
        existingIds.forEach(id => {
            const numId = parseInt(id, 10);
            if (numId > maxId) {
                maxId = numId;
            }
        });
        return String(maxId + 1).padStart(3, '0');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if any of the form fields are empty
        if (
            formData.firstName.trim() === '' ||
            formData.lastName.trim() === '' ||
            formData.password.trim() === '' ||
            formData.confirmPassword.trim() === ''
        ) {
            toast.error('Please fill in all the required fields', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return; // Exit the function early if any field is empty
        }
    
        // Check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return; // Exit the function if passwords do not match
        }
    
        try {
            
            const data = allData;
            const existingIds = data.loginData.map(emp => emp.empId);
            const newEmployeeId = getNextEmployeeId(existingIds);
    
            // Create a new employee object
            const newEmployee = {
                empId: newEmployeeId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.firstName, // Assuming username is the first name
                password: formData.password,
            };
    
            // Post new employee data to the server
            const postResponse = await fetch('https://punchdata.onrender.com/allData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    loginData: [...data.loginData, newEmployee],
                }),
            });
    
            if (!postResponse.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await postResponse.json();
            console.log('Post success:', result);
    
            // Reset form data
            setFormData(initialFormData);
            toast.success('🦄 Signup Successful!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
    
        } catch (error) {
            console.error('Post error:', error);
            toast.error('Failed to sign up. Please try again later.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    };
    

   


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <section className="LoginMainContainer">
                {/* <ResponsiveAppBar /> */}

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                {/* ... Your animated boxes ... */}
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <span className="AnimatedBox" />
                <div className="singin login-mt-10">
                    <div className="content">
                        <form onSubmit={handleSubmit} className="content">
                            <h2>Sign In</h2>
                            <div className="form">
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        id="MainLoginFormName"
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                    <i>Name</i>
                                </div>
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        id="MainLoginFormPass"
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                    <i>Last Name</i>
                                </div>
                                
                                <div className="inputBox">
                                    <input
                                        id="MainLoginFormPass"
                                        type='password' name='password'
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                    <i>Password</i>
                                </div>
                                <div className="inputBox">
                                    <input
                                        id="ConfirmPassword"
                                        type='password'
                                        name='confirmPassword'
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                    <i>Confirm Password</i>
                                </div>
                                <div className="links">
                                    <NavLink to="#">Click to Login</NavLink>
                                    <MDBTooltip  tag='a' wrapperProps={{ href: '#' }} title="If your already account Click to login">

                                        <NavLink style={{color:'#00FF00'}}to="/">Login</NavLink>
                                    </MDBTooltip>
                                </div>
                                <div className="inputBox">
                                    <input type="submit" value="Sign up" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>


    );
}

export default Signup;