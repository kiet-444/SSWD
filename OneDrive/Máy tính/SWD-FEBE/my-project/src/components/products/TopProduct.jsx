import React, { useEffect, useState } from "react";
import Img1 from "../../assets/img/topProduct/shirt.png";
import Img2 from "../../assets/img/topProduct/shirt2.png";
import Img3 from "../../assets/img/topProduct/shirt3.png";
import { FaStar } from "react-icons/fa";
import axios from "api/axios";

const TopProducts = ({ handleOrderPopup }) => {
  const [ListProduct, setListProduct] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await axios.get(`products/`);
      console.log('data',response.data);
      if (response?.data?.products) {
        setListProduct(response?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const getRandomImageLink = (imageIDs) => {
    if (imageIDs.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * imageIDs.length);
    return imageIDs[randomIndex]?.imageLink || '';
  };

  const topProducts = ListProduct.sort((a, b) => b.price - a.price).slice(0, 3);

  return (
    <div>
      /* <div className="container">
        
        <div className="my-24 ml-10 text-left">
          <p data-aos="fade-up" className="text-2xl text-bloom text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-hemp">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-20 mb-10 sm:grid-cols-2 md:grid-cols-3 md:gap-5 place-items-center">
          {topProducts.map((list) => (
            <div
              key={list.id}
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px] mt-5"
            >
             
              <div className="h-[100px] w-[300px]">
                <img
                  src={getRandomImageLink(list?.imageIDs)}
                  alt=""
                  className="max-w-[150px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div> */
              {/* details section */}
              /* <div className="p-4 text-center">
               
                <div className="flex items-center justify-center w-full gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold group-hover:text-hemp">{list.name}</h1>
                <p className="text-sm text-gray-500 duration-300 group-hover:text-bloom line-clamp-2">
                  {list.price}
                </p>
                <button
                  className="px-4 py-1 mt-4 duration-300 rounded-full text-hemp bg-primary hover:scale-105 group-hover:bg-bloom group-hover:text-primary"
                  onClick={handleOrderPopup}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */
    </div>
  );
};

export default TopProducts;
