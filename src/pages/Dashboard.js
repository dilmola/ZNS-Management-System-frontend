import React, { Component } from 'react';

import myImage from '../img/background.png';
import myLogoBlack from '../img/logoBlack.png';
import RegisterForm from '../components/RegistrationForm';
import ImageSection from '../components/ImageForLoginAndRegister';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Body from '../components/Body';
import Profile from '../components/Profile';
import Appointment from '../components/Appointment';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: 'body', // Set the default active content
    };
  }

  setActiveContent = (content) => {
    this.setState({ activeContent: content });
  };

  render() {
    const { activeContent } = this.state;

    return (   
      <div className="h-screen bg-PlatinumColor ">             
      <div className="bg-PlatinumColor bg-contain	m-0 p-0"> 
            <Sidebar setActiveContent={this.setActiveContent} />
            <div className="relative md:ml-64 flex flex-col	">  
                <Navbar />
                {activeContent === 'profile' && <Profile />}

                {activeContent === 'body' && <Body />}

                {activeContent === 'appointment' && <Appointment />}
            </div>
            </div>

      </div>   
    );
  }
}

export default Dashboard;