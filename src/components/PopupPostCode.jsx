import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  //여기 코드때문에 input칸이 같은 걸로 변경되는데, 
  //addressList 컴포넌트를 따로 만들어서 관리해야 할지, 전역 상태 관리 코드를 변경해야 할지 고민
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

/*const PopupPostCode = (props) => {
  const { kakao } = window;
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState([]);

  const onCompletePost = (data) => {
    const geocoder = new kakao.maps.services.Geocoder();
    setAddress(data.address)
    geocoder.addressSearch(data.address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newCoords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setCoords({ lat: newCoords.getLat(), lng: newCoords.getLng() });
      }
    });
  };

  useEffect(() => {
    props.onSelect(address);
  }, [address, props]);
  //사용자가 주소를 선택하면 PopupPostCode 컴포넌트 내부에서 props.onSelect(address)를 호출하여 선택한 주소 값을 Address 컴포넌트로 전달

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

export default PopupPostCode;*/