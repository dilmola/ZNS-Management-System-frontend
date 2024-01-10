import React, { useState, useEffect } from "react";

import clientIcon from "../../img/icon/client-icon.png";
import contractorIcon from "../../img/icon/contractor-icon.png";

import depositIcon from "../../img/icon/deposit-icon.png";
import payFullIcon from "../../img/icon/payfull-icon.png";
import completedIcon from "../../img/icon/completed-icon.png";

import shopimgexample from "../../img/shop_example_img.png";

import acceptedAppointmentIcon from "../../img/icon/acceptedAppointment_icon.png";
import pendingAppointmentIcon from "../../img/icon/pendingAppointment_icon.png";

import totalProductIcon from "../../img/icon/totalProduct-icon.png";
import totalProductOutOfStockIcon from "../../img/icon/totalProductOutOfStock-icon.png";

const CardTypeOne = ({ title, description, icon, total }) => (
  <div className="flex items-center justify-center h-44 rounded-lg border-solid border-2 border-black relative">
    <div className="mb-12">
      <h2 className="text-4xl absolute top-0 left-0 p-5">
        {total}
        <small className="text-gray-500 text-sm">item</small>
      </h2>
      <img
        className="absolute top-0 right-0 p-5 h-20"
        src={icon}
        alt="Deposit Icon"
      />
    </div>
    <div>
      <h2 className="text-xl absolute bottom-0 left-0 p-5">
        {title}
        <br />
        <small className="text-gray-500 text-sm">
          <li>{description}</li>
        </small>
      </h2>
    </div>
  </div>
);
const ListCardForPaymentStatus = () => (
  <div className="grid grid-cols-3 gap-4 mb-20">
    <CardTypeOne
      title="Pending"
      description="Pending pay a deposit"
      icon={depositIcon}
    />
    <CardTypeOne
      title="Pay Deposit"
      description="Client already pay deposit"
      icon={payFullIcon}
    />
    <CardTypeOne
      title="Completed"
      description="Client completed paying"
      icon={completedIcon}
    />
  </div>
);

const ListCardForUserStatus = ({ userTotalData, contractorTotalData }) => (
  <div className="grid grid-cols-2 gap-4 mb-20">
    <CardTypeOne
      title="Total of client"
      description="Total of client"
      icon={clientIcon}
      total={userTotalData}
    />
    <CardTypeOne
      title="Total of contractor"
      description="Total of contractor"
      icon={contractorIcon}
      total={contractorTotalData}
    />
  </div>
);

const ListCardForAppointmentClientStatus = () => (
  <div className="grid grid-cols-2 gap-4 mb-20">
    <CardTypeOne
      title="Accepted"
      description="Accepted"
      icon={acceptedAppointmentIcon}
    />
    <CardTypeOne
      title="Pending"
      description="Pending"
      icon={pendingAppointmentIcon}
    />
  </div>
);

const ListCardForShopAdmintStatus = ({
  itemTotalData,
  outOfStockTotalData,
}) => (
  <div className="grid grid-cols-2 gap-4 mb-20">
    <CardTypeOne
      title="Total product"
      description="Product available in the shop"
      icon={totalProductIcon}
      total={itemTotalData}
    />
    <CardTypeOne
      title="Total out of stock"
      description="Product has been depleted or sold out"
      icon={totalProductOutOfStockIcon}
      total={outOfStockTotalData}
    />
  </div>
);

const CardForShop = ({ title, description, imgItem, price }) => (
  <div className="h-auto	bg-CharlestonGreenText rounded-lg border-solid border-2 border-black relative overflow-hidden">
    <div className="flex justify-center">
      <div className="h-auto overflow-hidden">
        <img
          src={imgItem}
          alt="Card image cap"
          className="card-img-top object-cover w-full h-48"
        />
      </div>
    </div>
    <div className="flex w-full p-4">
      <div className="card-body w-1/2">
        <p className="card-title text-left text-xl text-white">{title}</p>
        <p className="card-title text-left text-sm text-white">{description}</p>
      </div>
      <h2 className="text-xl font-semibold	text-white	card-text text-right w-1/2">
        {price}
      </h2>
    </div>
  </div>
);

const ListCardForShop = ({ sampleData, onRowClick }) => {
  console.log(sampleData);

  return (
    <div className="grid grid-cols-3 gap-4 mb-20">
      {sampleData &&
        sampleData.length > 0 &&
        sampleData.map((item) => (
          <CardForShop
            key={item.id}
            title={item.name_of_item}
            description={item.description_item}
            price={item.price_item}
            imgItem={`http://127.0.0.1:8000/${item.image_item}`}
            onClick={() => onRowClick(item)}
          />
        ))}
    </div>
  );
};

export {
  ListCardForPaymentStatus,
  ListCardForUserStatus,
  ListCardForShop,
  ListCardForAppointmentClientStatus,
  ListCardForShopAdmintStatus,
};
