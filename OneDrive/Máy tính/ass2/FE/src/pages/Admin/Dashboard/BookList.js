import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function BookList() {
  const [bookList, setbookList] = useState([
    { readerId: "", readerName: "", borrowCount: 0, givebackCount: 0 },
  ]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get("http://localhost:3001/borrow/dashboard/book-list",
      {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      .then((res) => {
        console.log(res.data);
        setbookList(res.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  console.log(">> BOOKLIST : ", bookList);
  return (
    <div className="col">
      <div className="d-flex flex-wrap p-3 shadow rounded border border-secondary">
        <h5 className="w-100 d-block text-center">Sách được mượn nhiều nhất</h5>
        <Table style={{height:'200px', overflowX:'scroll'}}>
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#EEEEEE",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <TableCell align="center">Tiêu đề</TableCell>
              <TableCell align="center">Số sách</TableCell>
              <TableCell align="center">Lượt mượn</TableCell>
              <TableCell align="center">Lượt trả</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((book) => (
              <TableRow key={book.ISBN}>
                <TableCell style={{ padding: "5px" }} align="center">
                  {book.title}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {book.copyNumber}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {book.borrowCount}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {book.givebackCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
