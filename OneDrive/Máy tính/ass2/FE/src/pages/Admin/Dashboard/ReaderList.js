import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ReaderList() {
  const [readerList, setreaderList] = useState([
    { readerId: "", readerName: "", borrowCount: 0, givebackCount: 0 },
  ]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get("http://localhost:3001/borrow/dashboard/reader-list",
      {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      .then((res) => {
        console.log(res.data);
        setreaderList(res.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  console.log(">> READERLIST : ", readerList);
  return (
    <div className="col">
      <div className="d-flex flex-wrap p-3 shadow rounded border border-secondary">
        <h5 className="w-100 d-block text-center">Danh sách người dùng</h5>
        <Table>
          <TableHead>
            <TableRow
              className="overflow-auto"
              style={{
                backgroundColor: "#EEEEEE",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Số sách mượn</TableCell>
              <TableCell align="center">Số sách trả</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {readerList.map((user) => (
              <TableRow className="overflow-auto" key={user.readerId}>
                <TableCell style={{ padding: "5px" }} align="center">
                  {user.readerId}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {user.readerName}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {user.borrowCount}
                </TableCell>
                <TableCell style={{ padding: "5px" }} align="center">
                  {user.givebackCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
