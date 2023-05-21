import React, { useState } from "react";
import PopupPostCode from "../components/PopupPostCode";
import PopupDom from "../components/PopupDom";
import  "../styles/InputPage.css";

const Address = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="inputwrap">
    <input className="input" 
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
              setAddress={setAddress}
              onClose={closePostCode}
            />
          </PopupDom>
        )}
      </div>
    </div>
  );
};
export default Address;