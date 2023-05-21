import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;

  const onCompletePost = (data) => {
    setAddress(data.address);
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} autoclose onComplete={onCompletePost} />
    </div>
  );
};

const postCodeStyle = {
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "600px",
  padding: "7px",
  zIndex: 100,
  border: "1px solid #000",
};

export default PopupPostCode;