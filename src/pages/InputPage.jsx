import styled from "styled-components";
import { React, useState, Fragment } from "react";
import { GrMap } from "react-icons/gr";
import "../styles/InputPage.css";
import Address from "../components/Address";

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

  const handleAddClick = () => {
    setCountList(countList + 1);
  };

  const countListArray = Array.from({ length: countList }, (_, i) => i);

  return (
    <InputpageContainer>
      <div className="page">
        <div className="titlewrap">
          <GrMap className="icon" />
          <br />
          출발지를 입력하고
          <br />
          중간 지점과 추천 맛집 정보를 받아보세요!
        </div>

        <div>
          {countListArray.map((count, index) => (
            <Fragment key={`${count}-${index}`}>
              <Address />
            </Fragment>
          ))}
          <button onClick={handleAddClick}>친구 추가</button>
        </div>
      </div>
    </InputpageContainer>
  );
};
export default InputPage;

/*const InputPage = () => {
  return (
  <InputpageContainer>
    <div className="page">
      <div className="titlewrap">
        <GrMap className="icon"/>
        <br />
        출발지를 입력하고
        <br />
        중간 지점과 추천 맛집 정보를 받아보세요!
      </div>

      <div>
        <AddressList />
        <button type='button'>친구 추가</button>
      </div>

    </div>
  </InputpageContainer>
  );
};

export default InputPage;*/