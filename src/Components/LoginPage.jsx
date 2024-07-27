import React, { useState, useContext, useEffect } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext'; // Correct import path
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const { allData, updateCurrentUser } = useContext(DataContext); // Get updateCurrentUser from DataContext
    const [formData, setFormData] = useState({
        UserName: '',
        Password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Clear localStorage when Login page is accessed
        localStorage.removeItem('currentUser');
        
        // Check if user is already logged in
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            navigate('/Home');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear specific error when user starts typing
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.UserName) newErrors.UserName = 'Username is required';
        if (!formData.Password) newErrors.Password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Check if allData is available and properly loaded
        if (!allData || !allData.loginData) {
            toast.error('Data failed to load. Please try again later.');
            return;
        }

        const loginData = allData.loginData || [];
        // Find user by username and password
        const user = loginData.find(user => 
            user.empId === formData.UserName &&
            user.password === formData.Password
        );

        if (!user) {
            const usernameExists = loginData.some(user => user.empId === formData.UserName);
            if (!usernameExists) {
                toast.error('Login credentials are incorrect');
                setErrors(prevErrors => ({
                    ...prevErrors,
                    UserName: 'Username is incorrect'
                }));
            } else {
                toast.error('Password is incorrect');
                setErrors(prevErrors => ({
                    ...prevErrors,
                    Password: 'Password is incorrect'
                }));
            }
        } else {
            // Store user information in context and localStorage
            updateCurrentUser({
                empId: user.empId,
                firstName: user.firstName,
                lastName: user.lastName
            });

            // Save user to localStorage
            localStorage.setItem('currentUser', JSON.stringify({
                empId: user.empId,
                firstName: user.firstName,
                lastName: user.lastName
            }));

            toast.success('Login successful');
            navigate('/Home');
        }
    };

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 vh-100">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style={{ width: 185 }}
                                                alt="logo"
                                            />
                                            <h4 className="mt-1 mb-5 pb-1">We are The Eilisys Team</h4>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <p>Please login to your account</p>
                                            <div className="form-outline mb-4">
                                                <MDBInput
                                                    label='Username'
                                                    placeholder='Phone number or email address'
                                                    id='formControlReadOnly'
                                                    type='text'
                                                    name="UserName"
                                                    value={formData.UserName}
                                                    onChange={handleInputChange}
                                                    autoComplete='off'
                                                />
                                                {errors.UserName && <div className="text-danger">{errors.UserName}</div>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <MDBInput
                                                    label='Password'
                                                    id='form1'
                                                    type='password'
                                                    name="Password"
                                                    value={formData.Password}
                                                    onChange={handleInputChange}
                                                    autoComplete="new-password"
                                                />
                                                {errors.Password && <div className="text-danger">{errors.Password}</div>}
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 py-3"
                                                    type="submit"
                                                >
                                                    Log in
                                                </button>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Don't have an account?</p>
                                                <button type="button" className="btn btn-outline-danger">
                                                    <Link to="/Signup" className='text-danger'> Create new</Link>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4 d-none d-sm-block">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default Login;
