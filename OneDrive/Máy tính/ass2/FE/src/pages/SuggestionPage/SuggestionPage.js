import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './SuggestionPage.css';

function SuggestionPage() {
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');

  // Lấy JWT từ Local Storage
  const jwtToken = localStorage.getItem('token');

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    
    //Lấy name, email từ Local Storage
    const readerName = localStorage.getItem('username');
    const email = localStorage.getItem('userEmail');

    if (bookTitle.trim() === '' || authorName.trim() === '') {
      if (bookTitle.trim() === '' && authorName.trim() === '') {
        alert("Hãy nhập Tiêu đề và Tác giả của sách mà bạn muốn đề xuất v_v");
      }
      else if (bookTitle.trim() === '') {
        alert("Hãy nhập Tiêu đề của sách mà bạn muốn đề xuất v_v");
      }
      else if (authorName.trim() === '') {
        alert("Hãy nhập Tác giả của sách mà bạn muốn đề xuất v_v");
      }
    }
    else {
      try {
        const postData = await fetch("http://localhost:3001/reader/suggestBook", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Include the token in the request header
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ readerName, email, bookTitle, authorName }),
        });
        if (postData.status === 200) {
          const postDataResult = await postData.json();
          console.log(postDataResult);
  
          alert("Gửi đề xuất thành công :D");
        }
        else {
          console.error("Failed to post suggest book");
        }
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  };

  return (
    <>
      {/* <button type="button" className="btn-close" aria-label="Close"></button> */}

      <div className='boxNoBorder'>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb-suggestion-page">
            <li className="breadcrumb-item"><Link to="/" style={{ textDecorationLine: 'none', color: 'var(--product-normal)' }}><p>Trang chủ</p></Link></li>
            <li className="breadcrumb-item active" aria-current="page">Đề xuất</li>
          </ol>
        </nav>
      </div>

      <div className="boxSolidBorder">
        <div className="mb-5" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '48px', lineHeight: '54px' }}><strong>Gửi đề xuất nhập sách của bạn</strong></p>
        </div>
        <div className="mb-5">
          <label htmlFor="tieude" className="form-label"><b>Tiêu đề</b></label>
          <input type="text" className="form-control" id="tieude" placeholder="Nhập tiêu đề" aria-label="Tiêu đề" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="tacgia" className="form-label"><b>Tác giả</b></label>
          <input type="text" className="form-control" id="tacgia" placeholder="Nhập tác giả" aria-label="Tác giả" value={authorName} onChange={(e) => setAuthorName(e.target.value)}/>
          {/*<a href="https://translate.google.com">Thêm tác giả</a>*/}
        </div>
        {/*<div className="mb-5">
          <label htmlFor="nhaxuatban" className="form-label"><b>Nhà xuất bản</b></label>
          <input type="text" className="form-control" id="nhaxuatban" placeholder="Nhập nhà xuất bản" aria-label="Nhà xuất bản" />
        </div>
        <div className="mb-5">
          <label htmlFor="namxuatban" className="form-label"><b>Năm xuất bản</b></label>
          <input type="text" className="form-control" id="namxuatban" placeholder="Nhập năm xuất bản" aria-label="Năm xuất bản" />
        </div>
        <div className="mb-5">
          <label htmlFor="isbn" className="form-label"><b>Số ID - như ISBN</b></label>
          <input type="text" className="form-control" id="isbn" placeholder="Nhập mã" aria-label="Số ID - như ISBN" />
        </div>*/}
        <div className="row justify-content-evenly" style={{ textAlign: 'center' }}>
          <div className="col-4">
            <Link to='/'><button type="button" className="btn btn-outline-danger" id='btn-outline-danger'><b>Hủy bỏ</b></button></Link>
          </div>
          <div className="col-4">
            <button type="button" className="btn btn-outline-primary" id='btn-outline-primary' onClick={handleSubmitClick}><b>Gửi đề xuất</b></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestionPage;
