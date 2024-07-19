import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import userIcon from '../../assets/image/userIcon.png';
import './History.css';

function History() {
  const [latestDeadline, setLatestDeadline] = useState(() => {
    const a = localStorage.getItem('latestDeadline');
    if (!a) {
      return '...';
    }
    else {
      if (a === 'undefined') {
        return '';
      }
      else {
        return a;
      }
    }
  });
  const [notGiveBackCount, setNotGiveBackCount] = useState(() => {
    const b = localStorage.getItem('notGiveBackCount');
    if (!b) {
      return '...';
    }
    else {
      if (b === 'undefined') {
        return '';
      }
      else {
        return b;
      }
    }
  });
  const [giveBackCount, setGiveBackCount] = useState(() => {
    const c = localStorage.getItem('giveBackCount');
    if (!c) {
      return '...';
    }
    else {
      if (c === 'undefined') {
        return '';
      }
      else {
        return c;
      }
    }
  });
  const [borrowCount, setBorrowCount] = useState(() => {
    const d = localStorage.getItem('borrowCount');
    if (!d) {
      return '...';
    }
    else {
      if (d === 'undefined') {
        return '';
      }
      else {
        return d;
      }
    }
  });

  // Lấy JWT từ Local Storage
  const jwtToken = localStorage.getItem('token');

  const getData = async () => {
    try {
      const borrowInfoResponse = await fetch("http://localhost:3001/borrow/:readerId/general-info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
          "Content-Type": "application/json",
        },
      });
      if (borrowInfoResponse.ok) {
        const borrowInfoResult = await borrowInfoResponse.json();
        console.log(borrowInfoResult);

        //console.log(latestDeadline);
        setLatestDeadline(borrowInfoResult.latestDeadline);
        //console.log(latestDeadline);
        setNotGiveBackCount(borrowInfoResult.notGiveBackCount);
        setGiveBackCount(borrowInfoResult.giveBackCount);
        setBorrowCount(borrowInfoResult.borrowCount);
        localStorage.setItem('latestDeadline', borrowInfoResult.latestDeadline);
        //const temp = localStorage.getItem('latestDeadline');
        //console.log(temp);
        localStorage.setItem('notGiveBackCount', borrowInfoResult.notGiveBackCount);
        localStorage.setItem('giveBackCount', borrowInfoResult.giveBackCount);
        localStorage.setItem('borrowCount', borrowInfoResult.borrowCount);
      }
      else {
        console.error("Failed to get borrow information");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  const accountName = localStorage.getItem('name');

  return (
    <>
      <div className="boxNoBorder">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb-history">
            <li className="breadcrumb-item"><Link to="/" style={{ textDecorationLine: 'none', color: 'var(--product-normal)' }}><p>Trang chủ</p></Link></li>
            {/*<li className="breadcrumb-item"><a href="https://translate.google.com" style={{ textDecorationLine: 'none', color: 'var(--product-normal)' }}><span>Thông tin cá nhân</span></a></li>*/}
            <li className="breadcrumb-item active" aria-current="page">Lịch sử</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-3">
            <div className="row">
              <div className="col-3">
                <img src={userIcon} alt='User Icon' width={44}></img>
              </div>
              <div className="col-9">
                <small>Tài khoản của</small>
                <p className='headline'>{accountName}</p>
              </div>
            </div>
            <div className="list-group-history">
              <Link to="/profile" className="list-group-item list-group-item-action">Thông tin tài khoản</Link>
              <Link to="#" className="list-group-item list-group-item-action active" aria-current="true">
                Lịch sử
              </Link>
              <Link to="/favor" className="list-group-item list-group-item-action">Danh mục ưa thích</Link>
              <Link to="/suggestion" className="list-group-item list-group-item-action">Đề xuất của tôi</Link>
            </div>
          </div>
          <div className="col-9" style={{ border: '1px solid black', borderRadius: '5px', paddingTop: '2%', paddingRight: '8%', paddingBottom: '10%', paddingLeft: '8%' }}>
            <div className="mb-5"><p className="title2"><strong>Sách của bạn</strong></p></div>
            <div className="mb-4"><Link to="/historypage" style={{ color: 'black' }}><b>Lịch sử mượn, trả sách</b></Link></div>
            <div className="mb-3">
              <div className="row">
                <div className="col-6"><p>Ngày phải trả sách gần nhất:</p></div>
                <div className="col-6">{!latestDeadline ? (<p style={{ color: 'var(--yellow-normal)' }}>Chưa có thông tin sách đã mượn</p>) : (<p style={{ color: 'var(--red-normal)' }}>{latestDeadline}</p>)}</div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-6"><p>Tổng sách chưa trả:</p></div>
                <div className="col-6">{!notGiveBackCount ? (<p style={{ color: 'var(--yellow-normal)' }}>Chưa có thông tin sách đã mượn</p>) : (<p style={{ color: 'var(--green-normal)' }}>{notGiveBackCount}</p>)}</div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-6"><p>Tổng sách đã trả:</p></div>
                <div className="col-6">{!giveBackCount ? (<p style={{ color: 'var(--yellow-normal)' }}>Chưa có thông tin sách đã mượn</p>) : (<p style={{ color: 'var(--green-normal)' }}>{giveBackCount}</p>)}</div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-6"><p>Tổng sách đã mượn:</p></div>
                <div className="col-6"><p style={{ color: 'var(--yellow-normal)' }}>Chưa có thông tin sách đã mượn</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
