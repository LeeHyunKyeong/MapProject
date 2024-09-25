import styled from "styled-components";
import React, { useState, Fragment } from "react";
import { GrMap } from "react-icons/gr";
import { BsFillPersonPlusFill } from "react-icons/bs";
import  "../styles/InputPage.css";
import Address from '../components/Address';
import { useNavigate } from 'react-router-dom';

const InputpageContainer = styled.div`
  background-color: #e3e3e3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const InputPage = () => {
  const [countList, setCountList] = useState(0);
  const navigate = useNavigate();
  const [addressList, setAddressList] = useState([]);

  const handleAddClick = () => {
    setCountList(countList + 1);
  };

  const handleSubmitClick = () => {
    navigate('/result', { state: { addressList } });
  }

  const countListArray = Array.from({ length: countList }, (_, i) => i);

  const handleAdressList = (newAdress) => {
    setAddressList([...addressList, newAdress]);
  };

  return (
    <InputpageContainer>
      <div className="page">
        <div className="titlewrap">
          <GrMap className="icon" />
          <br />
          출발지를 입력하고
          <br />
          중간 지점과 주변 장소 정보를 받아보세요!
        </div>

        <div className="contentwrap">
          {countListArray.map((count, index) => (
            <Fragment key={`${count}-${index}`}>
              <Address handleAdressList={handleAdressList} />
            </Fragment>
          ))}
          <BsFillPersonPlusFill className="addicon" />
          <button className="addbutton" onClick={handleAddClick}>
            친구 추가하기
          </button>
        </div>
        <button className="submitbutton" onClick={handleSubmitClick}>
          중간장소 찾기
        </button>
      </div>
    </InputpageContainer>
  );
};
export default InputPage;

//{<p>{JSON.stringify(addressList)}</p>}