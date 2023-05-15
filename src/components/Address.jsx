import React, { useState } from "react";
import PopupPostCode from "../components/PopupPostCode";
import PopupDom from "../components/PopupDom";

const Address = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [address, setAddress] = useState("");
  //여기 코드때문에 input칸이 같은 걸로 변경되는데,
  //addressList 컴포넌트를 따로 만들어서 관리해야 할지, 전역 상태 관리 코드를 변경해야 할지..
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <input type="text" value={address} readOnly />
      <button type="button" onClick={openPostCode}>
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

/*const Address = () => {
  // 팝업창 열거니 말거니
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  
  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true)
  }
  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false)
  }

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div>
      <input type="text" value={selectedAddress} readOnly />
      <button type='button' onClick={openPostCode}>검색</button>
        <div id='popupDom'>
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode onSelect={handleAddressSelection} onClose={closePostCode}/>
            </PopupDom>
          )}
        </div>
    </div>
  );
};

export default Address;*/