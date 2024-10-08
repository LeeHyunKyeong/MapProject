import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import  "../styles/Header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="header">
      <IoIosArrowBack onClick={handleBack} className="headericon"/>
      <div className="text">중간 지점 결과 보기</div>
    </div>
  );
};

export default Header;