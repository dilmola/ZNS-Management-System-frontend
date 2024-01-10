import React, { useState } from 'react';
import RegisterComponent from './Register_BL';
import { Link } from 'react-router-dom';

import myLogoBlack from '../../img/logoBlack.png';
import InputField from '../../components/common/InputField';

const Register_Component = () => {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { handleRegister } = RegisterComponent();

    return (
        <div className="w-3/5">
            <img className="w-32 mb-1 items-start" src={myLogoBlack} alt="Your Image" />
            <h2 className="text-sm mb-6 font-semibold">Management System </h2>
            <h2 className="text-2xl font-semibold mb-12">Log In into your account </h2>

            <form onSubmit={(e) => handleRegister(e, username, fullname, email, password , setLoading, setUsernameError, setFullnameError, setEmailError, setPasswordError)}>
                <div className='mb-2'>
                    Username:
                    <InputField
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                    />     
                    {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                </div>

                <div className='mb-2'>                  
                    Fullname:
                    <InputField
                        name="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        type="text"
                    />     
                    {fullnameError && <p style={{ color: 'red' }}>{fullnameError}</p>}
                </div>

                <div className='mb-2'>  
                    Email:                  
                    <InputField
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />     
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>

                <div className='mb-2'>           
                    Password:         
                    <InputField
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />     
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>

                <h2 className="text-sm mb-20 font-semibold mt-4">
                    have an account? {' '}
                    <Link to="/login" className="text-red-500 hover:underline">
                        Log in now
                    </Link>
                </h2>

                <button
                type="submit"
                className="w-full text-white p-2 rounded bg-button-dark mt-2"
                >
                {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Register_Component;
