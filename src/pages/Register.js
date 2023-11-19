import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import myImage from '../img/background.png';
import myLogoBlack from '../img/logoBlack.png';
import RegisterForm from '../components/RegistrationForm';
import ImageSection from '../components/ImageForLoginAndRegister';

class Login extends Component {
  render() {
    return (
      <div className="h-screen flex grid grid-cols-2">
        <div className="col-span-1 flex items-center justify-center p-4 bg-primary">  
          <RegisterForm />
        </div>
        <div className="col-span-1 lg:block w-full bg-primary h-screen">         
          <ImageSection imageUrl={myImage} />
        </div>
      </div>
    );
  }
}

export default Login;