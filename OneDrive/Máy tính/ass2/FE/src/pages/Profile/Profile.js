import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import userIcon from '../../assets/image/userIcon.png';
import './Profile.css';

function Profile() {
  const [readerName, setReaderName] = useState(() => {
    const name = localStorage.getItem('username');
    return name ? name : '';
  });
  const [birthday, setBirthday] = useState(() => {
    const storedBirthday = localStorage.getItem('storedBirthday');
    return storedBirthday ? storedBirthday.slice(0, 10) : '';
  });
  const [gender, setGender] = useState(() => {
    const storedGender = localStorage.getItem('storedGender');
    return storedGender ? storedGender : '';
  });
  const [university, setUniversity] = useState(() => {
    const storedUniversity = localStorage.getItem('storedUniversity');
    return storedUniversity ? storedUniversity : '';
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const storedPhoneNumber = localStorage.getItem('storedPhoneNumber');
    return storedPhoneNumber ? storedPhoneNumber : '';
  });
  const [email, setEmail] = useState(() => {
    const tempEmail = localStorage.getItem('userEmail');
    return tempEmail ? tempEmail : '';
  });
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkCurrentPassword, setCheckCurrentPassword] = useState(-1);
  const [checkNewPassword, setCheckNewPassword] = useState(-1);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(-1);

  // Lấy JWT từ Local Storage
  const jwtToken = localStorage.getItem('token');
  // Gửi yêu cầu GET với JWT trong header
  const getData = async () => {
    try {
      const readerInfoResponse = await fetch("http://localhost:3001/reader/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (readerInfoResponse.status === 200) {
        const readerInfoResult = await readerInfoResponse.json();
        console.log("Reader Information:", readerInfoResult);

        localStorage.setItem('storedReaderInfo', JSON.stringify(readerInfoResult));
        setReaderName(readerInfoResult.name);
        console.log("readerInfoResult.dob", typeof(readerInfoResult.dob));
        let newDate = readerInfoResult.dob.slice(0, 10);
        if (typeof(readerInfoResult.dob) === 'string') {
          newDate = new Date(newDate).toISOString().slice(0, 10);
        }
        setBirthday(newDate);
        setGender(readerInfoResult.sex);
        setUniversity(readerInfoResult.university);
        setPhoneNumber(readerInfoResult.phoneNumber);
        setEmail(readerInfoResult.email);
        localStorage.setItem('username', readerInfoResult.name);
        localStorage.setItem('storedBirthday', newDate);
        localStorage.setItem('storedGender', readerInfoResult.sex);
        localStorage.setItem('storedUniversity', readerInfoResult.university);
        localStorage.setItem('storedPhoneNumber', readerInfoResult.phoneNumber);
        localStorage.setItem('userEmail', readerInfoResult.email);
      }
      else {
        console.error("Failed to fetch reader information");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const storedReaderInfo = localStorage.getItem('storedReaderInfo');
    if (!storedReaderInfo) {
      getData();
    }
    else {
      console.log('storedReaderInfo:', JSON.parse(storedReaderInfo));
    }
  }, []);


  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };
  const handleCancelEditPasswordClick = () => {
    setIsEditingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setCheckCurrentPassword(-1);
    setCheckNewPassword(-1);
    setCheckConfirmPassword(-1);
  };
  const handleSaveClick = async (event) => {
    event.preventDefault();

    const name = readerName;
    const sex = gender;
    const dob = birthday;
    if (readerName.trim() === '' || birthday.trim() === '' || gender.trim() === '' || university.trim() === '' || phoneNumber.trim() === '' || email.trim() === '') {
      alert("Hãy nhập đầy đủ thông tin v_v");
      return;
    }

    const tempPassword = localStorage.getItem("userPassword");
    if (isEditingPassword) {
      if (!currentPassword) {
        setCheckCurrentPassword(1); //Chua dien thong tin vao o currentPassword
        return;
      }
      else {
        if (currentPassword !== tempPassword) {
          setCheckCurrentPassword(2); //currentPassword khong khop voi password
          return;
        }
        else {
          setCheckCurrentPassword(0); //currentPassword hop le
        }
      }
      if (!newPassword) {
        setCheckNewPassword(1); //Chua dien thong tin vao o newPassword
        return;
      }
      else {
        if (newPassword === tempPassword) {
          setCheckNewPassword(2); //newPassword trung voi password!!!
          return;
        }
        else {
          setCheckNewPassword(0); //newPassword hop le
        }
      }
      if (!confirmPassword) {
        setCheckConfirmPassword(1); //Chua dien thong tin vao o confirmPassword
        return;
      }
      else {
        if (confirmPassword !== newPassword) {
          setCheckConfirmPassword(2); //confirmPassword khong khop voi newPassword
          return;
        }
        else {
          setCheckConfirmPassword(0); //confirmPassword hop le
        }
      }
      const password = newPassword;
      try {

        const patchData = await fetch("http://localhost:3001/reader/update", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, sex, dob, phoneNumber, university, email, password }),
        });

        console.log("dob", dob);
        console.log("patchData", patchData);
        if (patchData.status === 200) {
          const patchDataResult = await patchData.json();
          console.log("patch: ", patchDataResult);

          getData();
          localStorage.setItem("userPassword", newPassword);

          alert("Cập nhật thông tin với mật khẩu mới thành công ^_^");
          window.location.reload();
        }
        else {
          console.error("Failed to patch reader information with new password");
        }
      } catch (error) {
        console.error('Error patching data:', error);
      }
    }
    else {
      const password = tempPassword;
      try {
        const patchData = await fetch("http://localhost:3001/reader/update", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, sex, dob, phoneNumber, university, email, password }),
        });
        if (patchData.status === 200) {
          const patchDataResult = await patchData.json();
          console.log(patchDataResult);

          getData();

          alert("Cập nhật thông tin thành công ^_^");
          window.location.reload();
        }
        else {
          console.error("Failed to patch reader information");
        }
      } catch (error) {
        console.error('Error patching data:', error);
      }
    }
  };

  const accountName = localStorage.getItem('name');

  return (
    <>
      <div className="boxNoBorder">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb-profile">
            <li className="breadcrumb-item"><Link to="/" style={{ textDecorationLine: 'none', color: 'var(--product-normal)' }}><p>Trang chủ</p></Link></li>
            {/*<li className="breadcrumb-item"><a href="https://translate.google.com" style={{ textDecorationLine: 'none', color: 'var(--product-normal)' }}><span>Thông tin cá nhân</span></a></li>*/}
            <li className="breadcrumb-item active" aria-current="page">Thông tin tài khoản</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-3">
            <div className="row">
              <div className="col-4">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={userIcon} alt='User Icon' width={44}></img>
                </div>
              </div>
              <div className="col-8">
                <small>Tài khoản của</small>
                <p className='headline'>{accountName}</p>
              </div>
            </div>
            <div className="list-group-profile">
              <Link to="#" className="list-group-item list-group-item-action active" aria-current="true">
                Thông tin tài khoản
              </Link>
              <Link to="/history" className="list-group-item list-group-item-action">Lịch sử</Link>
              <Link to="/favor" className="list-group-item list-group-item-action">Danh mục ưa thích</Link>
              <Link to="/suggestion" className="list-group-item list-group-item-action">Đề xuất của tôi</Link>
            </div>
          </div>
          <div className="col-9" style={{ backgroundColor: 'var(--white)', borderRadius: '5px' }}>
            <p style={{ fontSize: '28px', lineHeight: '32px' }}><strong>Thông tin tài khoản</strong></p>

            <hr style={{ borderTop: '2px solid' }} />

            <p>THÔNG TIN CÁ NHÂN</p>
            <div className="mb-3">
              <img src={userIcon} alt='User Icon'></img>
            </div>
            <div className="mb-3">
              <label htmlFor="hovaten" className="form-label">Họ & tên</label>
              <input type="text" className="form-control" id="hovaten" placeholder="Nhập họ & tên" aria-label="Họ & tên" value={readerName} onChange={(e) => setReaderName(e.target.value)} />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="ngaysinh" className="form-label">Ngày sinh</label>
                  <input type="date" className="form-control" id="ngaysinh" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <p>Giới tính</p>
                  <input className="form-check-input" type="radio" name="gioitinh" id="nam" value='M' checked={gender === 'M'} onChange={(e) => setGender(e.target.value)} />
                  <label className="form-check-label" htmlFor="nam">
                    Nam
                  </label>
                  <input className="form-check-input" type="radio" name="gioitinh" id="nu" value='F' checked={gender === 'F'} onChange={(e) => setGender(e.target.value)} />
                  <label className="form-check-label" htmlFor="nu">
                    Nữ
                  </label>
                  <input className="form-check-input" type="radio" name="gioitinh" id="khac" value='O' checked={gender === 'O'} onChange={(e) => setGender(e.target.value)} />
                  <label className="form-check-label" htmlFor="khac">
                    Khác
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="daihoc" className="form-label">Đại học</label>
              <input type="text" className="form-control" id="daihoc" placeholder="Nhập đại học" aria-label="Đại học" value={university} onChange={(e) => setUniversity(e.target.value)} />
            </div>

            <hr />

            <p>SỐ ĐIỆN THOẠI & EMAIL</p>
            <div className="mb-3">
              <label htmlFor="sdt" className="form-label">Số điện thoại</label>
              <input type="tel" className="form-control" id="sdt" placeholder="Nhập số điện thoại" aria-label="Số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" style={{ backgroundColor: 'var(--primary-background)' }} id="email" placeholder="email@gmail.com" aria-label="Email" value={email} readOnly />
            </div>

            <hr />

            <p>PASSWORD</p>
            {isEditingPassword ? (
              <>
                <div className="mb-3">
                  <label htmlFor="matkhauhientai" className="form-label">Mật khẩu hiện tại</label>
                  <input type="password" className="form-control" id="matkhauhientai" placeholder="Nhập mật khẩu hiện tại" aria-label="Mật khẩu hiện tại" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                  {checkCurrentPassword === 1 && (
                    <div className="text-danger mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Vui lòng điền thông tin vào ô trên!
                    </div>
                  )}
                  {checkCurrentPassword === 2 && (
                    <div className="text-danger mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Mật khẩu đã nhập không khớp với mật khẩu hiện tại của bạn!
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="matkhaumoi" className="form-label">Mật khẩu mới</label>
                  <input type="password" className="form-control" id="matkhaumoi" placeholder="Nhập mật khẩu mới" aria-label="Mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  {checkNewPassword === 1 && (
                    <div className="text-danger mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Vui lòng điền thông tin vào ô trên!
                    </div>
                  )}
                  {checkNewPassword === 2 && (
                    <div className="text-danger mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Mật khẩu mới trùng với mật khẩu hiện tại!!!
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="xacnhanmatkhau" className="form-label">Xác nhận mật khẩu</label>
                  <input type="password" className="form-control" id="xacnhanmatkhau" placeholder="Xác nhận mật khẩu mới" aria-label="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  {checkConfirmPassword === 1 && (
                    <div className="text-danger mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Vui lòng điền thông tin vào ô trên!
                    </div>
                  )}
                  {checkConfirmPassword === 2 && (
                    <div className="text-danger mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Mật khẩu và xác nhận mật khẩu không khớp!
                    </div>
                  )}
                </div>
                <div className="mb-3" style={{ textAlign: 'center' }}>
                  <button type="button" className="btn btn-outline-danger" id='btn-outline-danger' onClick={handleCancelEditPasswordClick}>Hủy bỏ</button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                <button type="button" className="btn btn-outline-primary" id='btn-outline-primary' onClick={handleEditPasswordClick}>Đổi mật khẩu</button>
              </div>
            )}

            <hr style={{ borderTop: '2px solid' }} />

            <div className="mb-3" style={{ textAlign: 'center' }}>
              <button type="button" className="btn btn-primary" id='btn-primary' onClick={handleSaveClick}><b>Lưu thay đổi</b></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
