// LoginForm.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import myImage from '../img/background.png';
import myLogoBlack from '../img/logoBlack.png';
import myLogoWhite from '../img/logoWhite.png';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log('Login data:', { email, password });
  };

  render() {
    return (
        <div className="w-3/5">
        <img className=" w-32	mb-1 items-start" src={myLogoBlack} alt="Your Image" /> 
        <h2 className="text-sm	 mb-6 font-semibold">Management System </h2>

        <h2 className="text-2xl font-semibold mb-20">Log In into your account </h2>
        <form onSubmit={this.handleSubmit}>
        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Name
        </label>
          <div className="mb-4">
            <input
              type="email"
              // placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              className="w-full border p-2 rounded bg-input-field"
            />
          </div>

          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Password
          </label>
          <div className="mb-1">
            <input
              type="password"
              // placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              className="w-full border p-2 rounded bg-input-field"
            />
          </div>
          <h2 className="text-sm mb-20 font-semibold">
            Don’t have an account yet?{' '}
            <Link to="/register" className="text-red-500 hover:underline">
              Create an account
            </Link>
          </h2>

          <button
            type="submit"
            className="w-full  text-white p-2 rounded bg-button-dark">
              Login
          </button>
        </form>
        </div>
    );
  }
}

export default LoginForm;

























// // Login.js
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// import myImage from '../img/background.jpg';
// import myLogoBlack from '../img/logoBlack.png';
// import myLogoWhite from '../img/logoWhite.png';
// className LoginForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password } = this.state;
//     console.log('Login data:', { email, password });
//   };

//   render() {
//     return (
      
//       // <div className="min-h-screen flex items-center justify-center bg-yellow-300">
        
//         <div className="h-screen flex grid grid-cols-2">
//             <div className="col-span-1 flex items-center justify-center p-4 bg-primary">  
//             <div className="w-3/5">
//               <img className=" w-32	mb-1 items-start" src={myLogoBlack} alt="Your Image" /> 
//               <h2 className="text-sm	 mb-6 font-semibold">Management System </h2>
      
//               <h2 className="text-2xl font-semibold mb-20">Log In into your account </h2>
//               <form onSubmit={this.handleSubmit}>
//               <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
//                 Name
//               </label>
//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     // placeholder="Email"
//                     name="email"
//                     value={this.state.email}
//                     onChange={this.handleInputChange}
//                     className="w-full border p-2 rounded bg-input-field"
//                   />
//                 </div>

//                 <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
//                   Password
//                 </label>
//                 <div className="mb-1">
//                   <input
//                     type="password"
//                     // placeholder="Password"
//                     name="password"
//                     value={this.state.password}
//                     onChange={this.handleInputChange}
//                     className="w-full border p-2 rounded bg-input-field"
//                   />
//                 </div>
//                 <h2 className="text-sm mb-20 font-semibold">
//                   Don’t have an account yet?{' '}
//                   <Link to="/register" className="text-red-500 hover:underline">
//                     Create an account
//                   </Link>
//                 </h2>

//                 <button
//                   type="submit"
//                   className="w-full  text-white p-2 rounded bg-button-dark">
//                   Login
//                 </button>
//               </form>
//           </div>
//         </div>

//           <div className="col-span-1 lg:block w-full bg-primary h-screen">         
//                 <img className=" w-full h-full object-cover p-3 rounded inline" src={myImage} alt="Your Image" />   
//           </div>     
      
//       </div>

//     );
//   }
// }

// export default LoginForm;
