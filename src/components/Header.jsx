import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import  "../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <IoIosArrowBack className="headericon"/>
      <div className="text">중간장소 맛집 결과 보기</div>
    </div>
  );
};

export default Header;