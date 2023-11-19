import React from 'react';
import depositIcon from '../img/icon/deposit-icon.png';
import payFullIcon from '../img/icon/payfull-icon.png';
import completedIcon from '../img/icon/completed-icon.png';

// import depositIcon from 'path/to/depositIcon'; // replace with the actual path

const Card = ({ title, description, icon }) => (
  <div className="flex items-center justify-center h-44 rounded-lg border-solid border-2 border-black relative">
    <h2 className="text-4xl absolute top-0 left-0 p-5">1
      <small className="text-gray-500 text-sm">item</small>
    </h2>
    <img className="absolute top-0 right-0 p-5 h-20" src={icon} alt="Deposit Icon" />
    <h2 className="text-xl absolute bottom-0 left-0 p-5">{title}
      <br /><small className="text-gray-500 text-sm"><li>{description}</li></small>
    </h2>
  </div>
);

const Cards = () => (
  <div className="grid grid-cols-3 gap-4 mb-20">
    <Card title="Pay Deposit" description="Paying a deposit" icon={depositIcon} />
    <Card title="Pay Full" description="Paying a price of product" icon={payFullIcon} />
    <Card title="Completed" description="Completed pay a product" icon={completedIcon} />
  </div>
);

export default Cards;

// const Cards = () => {
//     return (
//       <div className="flex items-center justify-center h-44 rounded-lg border-solid border-2 border-black relative">
//         <h2 className="text-4xl absolute top-0 left-0 p-5" data={data}> 
//             <small className="text-gray-500 text-sm">item</small>
//         </h2>       
//         <img className="absolute top-0 right-0 p-5 h-20	" src={depositIcon} alt="Deposit Icon"/>       
//         <h2 className="text-xl absolute bottom-0 left-0 p-5"> Pay Deposit
//             <br /><small className="text-gray-500 text-sm"><li>Paying a deposit</li></small>
//         </h2>
//       </div>
//     );
//   };
  
  // export default Cards;
  