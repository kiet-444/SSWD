import "react-multi-carousel/lib/styles.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from "../../../components/Card/Card";
import "./HomePage.css"
import axios from "axios";
import React, { useEffect, useState } from "react";

function Homepage() {
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  console.log("Email:", email, "Name:", name);

  const [listWatchs, setListWatchs] = useState([]);
  const [filteredWatchs, setFilteredWatchs] = useState([]);
  const [brand, setBrand] = useState('');

  const listBrand = [
    "Rolex",
    "Mido",
    "Casio",
    "Tissot",
  ];

  const handleChange = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
    
    if (selectedBrand) {
      const filtered = listWatchs.filter(watch => watch.brand === selectedBrand);
      setFilteredWatchs(filtered);
    } else {
      setFilteredWatchs(listWatchs);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/watch/list")
      .then((res) => {
        console.log(res.data);
        setListWatchs(res.data);
        setFilteredWatchs(res.data); // Initialize filteredWatchs with all watches
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <Box sx={{ maxWidth: "30%", marginTop: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={brand}
                label="Brand"
                onChange={handleChange}
              >
                <MenuItem value="">All Brands</MenuItem>
                {listBrand.map(item => (
                  <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="list-watch">
          {filteredWatchs.map(item => (
            <Card item={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;
