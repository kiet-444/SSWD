import ComplexTableOrder from "./components/ComplexTableOrder";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
import { columnsDataOrder } from "./variables/columnsData";
import { toast, ToastContainer } from "react-toastify";
import { useOrderApi } from "./components/OrderApi/useOrderApi";
import { columnsDataCategory } from "./variables/columnsData";
import Search from "components/atom/Search/Search";
import useAuth from "hook/useAuth";
import axios from "api/axios";
import { useState } from "react";
const Tables = () => {
  const OrderList = useOrderApi();
  const token = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [DisplayOrders ,setDisplayedOrders] = useState([]);
  const name = [
    { name: "Orders", data: OrderList },
    
  ];
console.log(OrderList);
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`orders?customerName=${searchTerm}`,{headers});
      if(response?.data?.success)
        setDisplayedOrders(response?.data?.orders );
      if(response?.data?.orders.length === 0){
        toast.error("Not found")
      }     
    } catch (error) {
      console.error("Error searching orders:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols">
        <div className="flex justify-end">
          <Search onSearch={handleSearch}/>
        </div>
        {name?.map((data, index) => (
          <ComplexTableOrder
            name={data?.name}
            index={index}
            columnsData={columnsDataOrder}
            tableData={DisplayOrders?.length !== 0 ? DisplayOrders : data?.data}
          />
        ))}{" "}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Tables;
