import styled from "styled-components";
import { React, useState } from 'react';
import { GrMap } from "react-icons/gr";
import  "../styles/InputPage.css";
import Address from '../components/Address';

const InputpageContainer = styled.div`
  background-color: #e3e3e3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const InputPage = () => {
  const [countList, setCountList] = useState([0])

  const onAdd = () => { //여기 함수
    let countArr = [...countList]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)
    setCountList(countArr)
  }

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
        <Address countList={countList} /> 
        <button onClick={onAdd}>친구 추가</button>
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