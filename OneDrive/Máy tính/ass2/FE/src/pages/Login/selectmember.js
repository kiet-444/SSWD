import React from "react";
import { Container} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./login";
function SelectMember() {

  const loginbgStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw', // 100% of the viewport width
    height: '100vh', // 100% of the viewport height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    /* Add any other styling you need */
  };

  return (
    <>
      <div className="bg-image" style={loginbgStyle}>
        <Container className="d-flex flex-column" style={{ backgroundColor: '#F8FAFB', width: '90vw', maxWidth: '500px', padding: '1em' , borderRadius: '3%'}}>
          <div className="pe-2 ps-2" style={{textAlign: 'center'}}>
            <span style={{color: '#032B91', fontSize: 60, fontFamily: 'Train One', fontWeight: '400', wordWrap: 'break-word'}}>BK</span>
            <span style={{color: '#1488DB', fontSize: 60, fontFamily: 'Train One', fontWeight: '400', wordWrap: 'break-word'}}>LIB</span>
          </div>
          <div className="pb-3" style={{textAlign: 'center'}}>
            <button className="mb-4" style={{width: '80%', height: '100%', paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 4, border: '1px black solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
              <Link to='/user/login' style={{textDecoration: 'none', color: 'black'}}>
                <div style={{width: '100%', height: '100%', textAlign: 'center', fontSize: 16, fontFamily: 'Work Sans', fontWeight: '600', wordWrap: 'break-word'}}>Sinh viên</div>
              </Link>
            </button>
            
            <button style={{width: '80%', height: '100%', paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 4, border: '1px black solid', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
              <Link to='/admin/login' style={{textDecoration: 'none', color: 'black'}}>
                <div style={{width: '100%', height: '100%', textAlign: 'center', fontSize: 16, fontFamily: 'Work Sans', fontWeight: '600', wordWrap: 'break-word'}}>Nhân viên</div>
              </Link>
            </button>
        </div>
        </Container>
          {/* <section>
                <Routes>
                  <Route path="/user/login" element={<Login func='login' title='user'/>} />
                  <Route path="/admin/login" element={<Login func='login' title='admin'/>} />
                </Routes>
          </section> */}
      </div>
    </>
  );
}

export default SelectMember;
