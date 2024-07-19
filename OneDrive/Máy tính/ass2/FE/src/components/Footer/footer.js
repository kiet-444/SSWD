import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsEnvelope } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="mt-4" style={{backgroundColor: '#F8FAFB'}}>
      <footer className="mt-4 d-flex p-5 justify-content-evenly align-items-center position-relative" style={{ backgroundColor: '#324552' }}>

        <div style={{ position: 'absolute', left: '0', top: '85%', transform: 'rotate(-90deg)', transformOrigin: '0 0', color: 'white', fontSize: 15, fontFamily: 'Open Sans', fontWeight: '300', wordWrap: 'break-word' }}>Copyright 2022</div>
        <div className='d-inline-block align-bottom'>
          <div style={{ width: '100%', height: '100%', color: 'white', fontFamily: 'Work Sans', fontWeight: '400', wordWrap: 'break-word', fontSize: '1vw' }}><BsEnvelope /> abc@gmail.com</div>
        </div>
        <div className='d-inline-block align-bottom'>
          <div style={{ width: '100%', height: '100%', color: 'white', fontFamily: 'Work Sans', fontWeight: '400', wordWrap: 'break-word', fontSize: '1vw' }}><BsTelephone /> 0912345678</div>
        </div>
        <div className='d-inline-block align-bottom'>
          <div style={{ width: '100%', height: '100%', color: 'white', fontFamily: 'Work Sans', fontWeight: '400', wordWrap: 'break-word', fontSize: '1vw' }}><CiLocationOn /> Vinhome</div>
        </div>

      </footer>

      
    </footer>
  );
};

export default Footer;
