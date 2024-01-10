import React, { Component } from 'react';
import myImage from '../../img/background.png';
import RegisterForm from '../../components/Register/Register_Component';
import ImageSection from '../../components/common/ImageForLoginAndRegister';

class Register extends Component {
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

export default Register;