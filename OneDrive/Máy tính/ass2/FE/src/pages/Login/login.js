import React, { useState } from "react";
import {Container} from "react-bootstrap";
import LoginPage from "./loginpage";
import RegisterPage from "./registerpage";
import './login.css';

function Login(props) {
  const [activeTab, setActiveTab] = useState(props.func);
  const handleTabChange = (tab) => {
    if (tab === activeTab) {
      return;
    }
    setActiveTab(tab);
  };

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
        <Container className="d-flex flex-column" style={{ backgroundColor: '#F8FAFBE5', width: '90vw', maxWidth: '500px', padding: '1em' , borderRadius: '3%'}}>
          <div style={{ padding: '1em 2em' }}>
          {activeTab === "login" ? (
              <LoginPage handleTabChange={() => handleTabChange("register")} title={props.title} />
            ) : (
              <RegisterPage handleTabChange={() => handleTabChange("login")} />
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Login;
// import React, { useState } from "react";
// import { Container, Tabs, Tab, Button, Form} from "react-bootstrap";
// import loginbg from "../img/loginbg.png";
// import login1 from "../img/login1.png";
// import login2 from "../img/login2.png";
// import './login.css';

// function Login(props) {
//   const [activeTab, setActiveTab] = useState(props.title);
//   const [passwordMatch, setPasswordMatch] = useState(true);

//   const handleTabClick = (tab) => {
//     if (tab === activeTab) {
//       return;
//     }
//     setActiveTab(tab);
//   };

//   const handleRegisterSubmit = (event) => {
//     event.preventDefault();
//     // Your registration logic here
//     // Check if passwords match
//     const password = event.target.elements.password.value;
//     const confirmPassword = event.target.elements.confirmPassword.value;
//     if (password !== confirmPassword) {
//       setPasswordMatch(false);
//       return;
//     }

//     // Passwords match, proceed with registration
//     setPasswordMatch(true);
//     // Additional registration logic...
//     setActiveTab("login");
//   };

//   const loginbgStyle = {
//     backgroundImage: `url(${loginbg})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     width: '100vw', // 100% of the viewport width
//     height: '100vh', // 100% of the viewport height
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     /* Add any other styling you need */
//   };

//   return (
//     <>
//       <div className="bg-image" style={loginbgStyle}>
//         <Container className="d-flex flex-column" style={{ backgroundColor: '#F8FAFBE5', width: '90vw', maxWidth: '500px', padding: '1em' , borderRadius: '3%'}}>
//           <div style={{ padding: '1em 2em' }}>
//             <Tabs
//               className="mb-3 custom-tabs"
//               activeKey={activeTab}
//               onSelect={(tab) => handleTabClick(tab)}
//             >
//               <Tab eventKey="login" title={<span style={{fontSize: activeTab === "login" ? "2em" : "1em" , color: activeTab === "login" ? "#032B91" : "#888888"}}>Đăng nhập</span>}>
//                 {/* Email and password input fields */}
//                 <Form>
//                   <Form.Group className="mb-3">
//                     <Form.Label style={{fontFamily: 'Work Sans'}}>Email</Form.Label>
//                     <Form.Control type="email" placeholder="Nhập email"  style={{fontFamily: 'Work Sans'}} required />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="d-flex justify-content-between">
//                       <span style={{fontFamily: 'Work Sans'}}>Mật khẩu</span>
//                       <span>
//                         <a href="!#" style={{ color: '#7D92A1', fontFamily: 'Work Sans'}}>Quên mật khẩu?</a>
//                       </span>
//                     </Form.Label>
//                     <Form.Control type="password" placeholder="Nhập mật khẩu..."  style={{fontFamily: 'Work Sans'}} required />
//                   </Form.Group>

//                   {/* Sign in button */}
//                   <Button type="submit" variant="primary" className="mb-2 w-100" style={{ backgroundColor: '#31AAB7', color: '#FFFFFF',  fontFamily: 'Work Sans'}}>
//                     Đăng nhập
//                   </Button>

//                   <div className="f-flex justify-content-center position-relative">
//                     <hr/>
//                     <div className="text-dark position-absolute ps-2 pe-2" style={{top: '42%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#eaeff2',  fontFamily: 'Work Sans'}}>Hoặc</div>
//                   </div>
//                   <Button variant="primary" className="w-100 mb-2" style={{ backgroundColor: '#FFFFFF', color: '#324552' }}>
//                     <div className="d-flex align-items-center justify-content-center">
//                       <img className="img-fluid" src={login1} alt="img" style={{ float: 'left', paddingRight: '5px', display: 'block', alignItems: 'center',  fontFamily: 'Work Sans'}}></img>
//                       Login with Google
//                     </div>
//                   </Button>

//                   <Button variant="primary" className="w-100" style={{ backgroundColor: '#FFFFFF', color: '#324552' }}>
//                     <div className="d-flex align-items-center justify-content-center">
//                       <img className="img-fluid" src={login2} alt="img" style={{ float: 'left', paddingRight: '5px', display: 'block', alignItems: 'center',  fontFamily: 'Work Sans' }}></img>
//                       Login with Mobile number
//                     </div>
//                   </Button>
//                 </Form>
//               </Tab>

//               <Tab eventKey="register" title={<span style={{fontSize: activeTab === "register" ? "2em" : "1em", color: activeTab === "register" ? "#032B91" : "#888888"}}>Đăng ký</span>}>
//                 {/* Name, email, password, and password confirmation input fields */}
//                 <Form onSubmit={handleRegisterSubmit}>
//                   <Form.Group className="mb-2">
//                     <Form.Label style={{fontFamily: 'Work Sans'}}>Họ và tên</Form.Label>
//                     <Form.Control type="text" placeholder="Nhập họ và tên" style={{fontFamily: 'Work Sans'}} required />
//                   </Form.Group>

//                   <Form.Group className="mb-2">
//                     <Form.Label style={{fontFamily: 'Work Sans'}}>Email</Form.Label>
//                     <Form.Control type="email" placeholder="Nhập email" style={{fontFamily: 'Work Sans'}} required />
//                   </Form.Group>

//                   <Form.Group className="mb-2">
//                     <Form.Label style={{fontFamily: 'Work Sans'}}>Mật khẩu</Form.Label>
//                     <Form.Control type="password" placeholder="Nhập mật khẩu..." name="password" style={{fontFamily: 'Work Sans'}} required />
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label style={{fontFamily: 'Work Sans'}}>Xác nhận mật khẩu</Form.Label>
//                     <Form.Control type="password" placeholder="Xác nhận mật khẩu..." name="confirmPassword" style={{fontFamily: 'Work Sans'}} required />
//                   </Form.Group>

//                   {!passwordMatch && (
//                     <div className="text-danger mb-2" style={{fontFamily: 'Work Sans'}}>
//                       Mật khẩu và xác nhận mật khẩu không khớp.
//                     </div>
//                   )}

//                   {/* Sign up button */}
//                   <Button type="submit" variant="primary" className="mb-2 w-100" style={{ backgroundColor: '#31AAB7', color: '#FFFFFF', fontFamily: 'Work Sans'}}>
//                     Đăng ký
//                   </Button>
//                 </Form>
//               </Tab>
//             </Tabs>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// }

// export default Login;
