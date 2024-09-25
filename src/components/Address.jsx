import React, { useState, useEffect } from "react";
import PopupPostCode from "../components/PopupPostCode";
import PopupDom from "../components/PopupDom";
import  "../styles/InputPage.css";

const Address = ({ handleAdressList }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handleAdress = (newAdress) => {
    // data.address가 들어오는 곳
    setAddress(newAdress);
    handleAdressList(newAdress);
  };

  return (
  <div className="inputwrap">
    <input className="input" 
          id="address"
          placeholder="출발 주소를 검색해주세요." 
          type="text" 
          value={address}
          readOnly />
    <button type="button" className="searchbutton" onClick={openPostCode}>
      검색
    </button>
    <div id="popupDom">
      {isPopupOpen && (
        <PopupDom>
          <PopupPostCode
            address={address}
            setAddress={handleAdress}
            onClose={closePostCode}
          />
        </PopupDom>
      )}
    </div>
  </div>
  );
};
export default Address;

//setAddressList([...addressList, e.target.value])