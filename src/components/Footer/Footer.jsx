import React, { useEffect, useState } from "react";
import playstore from "../../images/pngegg.png"
import {FaFacebookSquare,FaTwitter,FaInstagram,FaTelegram} from "react-icons/fa"
import "./Footer.css"
import { Link } from "react-router-dom";
const Footer = () => {
  
 
  return (
    <>
   
   <div className="footer">
     
      
        <div className="buttom-containter">
           <span className="text-secondary  "><FaFacebookSquare className="react-icons-buttom"/><FaTwitter className="react-icons-buttom"/><FaInstagram className="react-icons-buttom"/><FaTelegram className="react-icons-buttom"/></span>
       
           <span className="text-secondary  ">@ 2023 Thunder Client priviate limited all right reserved </span>
        </div>
        </div>
      
    </>
  );
};

export default Footer;
