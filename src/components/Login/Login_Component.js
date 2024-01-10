import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginComponent  from './Login_BL';
import myLogoBlack from '../../img/logoBlack.png';
import InputField from '../../components/common/InputField';

const Login_Component = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidError, setInvalidError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { handleLogin } = LoginComponent();

  return (
    <div className="w-3/5">
      <img className="w-32 mb-1 items-start" src={myLogoBlack} alt="Your Image" />
      <h2 className="text-sm mb-6 font-semibold">Management System </h2>
      <h2 className="text-2xl font-semibold mb-20">Log In into your account </h2>

      <form onSubmit={(e) => handleLogin(e, email, password, setInvalidError, setLoading ,setEmailError , setPasswordError)}>
        Email:
        <div className='mb-4'>
          <InputField
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />     
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          {email && invalidError && <p style={{ color: 'red' }}>{invalidError}</p>}
        </div>

        Password:
        <div className='mb-4'>        
          <InputField
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          {password && invalidError && <p style={{ color: 'red' }}>{invalidError}</p>}
        </div>

        <h2 className="text-sm mb-20 font-semibold mt-4">
          Don’t have an account yet?{' '}
          <Link to="/register" className="text-red-500 hover:underline">
            Create an account
          </Link>
        </h2>

        <button
          type="submit"
          className="w-full text-white p-2 rounded bg-button-dark"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login_Component;
