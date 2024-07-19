import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './ShowDashboard.css';
import Container from "react-bootstrap/Container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReaderList from './ReaderList';
import GeneralInfo from './GeneralInfo';
import BookList from './BookList';


function ShowDashboard() {
  const [dataChart, setData] = useState([]);
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const fetchData = (year) => {
    const token = localStorage.getItem('token');
    const url = 'http://localhost:3001/borrow/dashboard/borrow-chart';
    const payload = {
      year: year,
    };

    axios
      .post(url, payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        let processedData = [];

        const monthToDataMap = new Map();
        res.data.forEach((entry) => {
          monthToDataMap.set(entry.month, entry);
        });

        for (let i = 1; i <= 12; i++) {
          const monthData = monthToDataMap.get(i.toString());
          if (monthData) {
            processedData.push(monthData);
          } else {
            processedData.push({ year: payload.year, month: i.toString(), total_borrowed: 0, total_givedback: 0 });
          }
        }

        setData(processedData);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Container fluid>
      <div className='row'>
        <h1 style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '30px', textAlign: 'center', marginTop: '10px' }}>Thống kê hoạt động của thư viện</h1>
      </div>
      <div className='row mt-3 gx-5 gy-5'>
        <GeneralInfo />
      </div>
          <div className="year-select d-flex justify-content-center mt-5 align-items-center">
            <label htmlFor="year-select" className='me-3'>Chọn năm : </label>
            <select id="year-select" className='p-2' value={selectedYear} onChange={handleYearChange}>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

      <div className='charts mb-5 mt-2'>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h5 className='text-center'>Biểu đồ thống kê số lượng truy cập và số sách mượn</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={500}
              height={300}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_givedback" stroke="#8884d8" activeDot={{ r: 8 }} name="Số lượt truy cập" />
              <Line type="monotone" dataKey="total_borrowed" stroke="#82ca9d" name="Số sách mượn" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h5 className='text-center'>Biểu đồ thống kê số lượng sách mượn và trả</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_borrowed" fill="#8884d8" name="Số sách mượn" />
              <Bar dataKey="total_givedback" fill="#82ca9d" name="Số sách trả" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='row my-5 gx-5 gy-5'>
        <ReaderList />
        <BookList />
      </div>
    </Container>
  );
}

export default ShowDashboard;