import ComplexTableCustomer from "./components/ComplexTableCustomer";

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
import { columnsDataCustomer } from "./variables/columnsData";
import { ToastContainer } from "react-toastify";
import { useCustomerApi } from "./components/CustomerApi/useCustomerApi";
import { columnsDataCategory } from "./variables/columnsData";
import { useState } from "react";
import Search from "components/atom/Search/Search";
const Tables = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const CusList = useCustomerApi(refreshKey);
  const refreshCustomerList = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const name = [
    { name: "Customer", data: CusList },
    
  ];

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols">
        {name?.map((data, index) => (
          <ComplexTableCustomer
          key={`${data?.name}-${refreshKey}`}
            name={data?.name}
            index={index}
            columnsData={columnsDataCustomer}
            tableData={data?.data}
            refreshList={refreshCustomerList}

          />
        ))}{" "}
      </div>
      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns} </div>
      />*/}
      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        {nameType.map((data, index) => (
          <ComplexTable
            name={data.name}
            columnsData={data.name === "Type" ? columnsDataComplex : columnsDataCategory}
            tableData={data.data}
          />
        ))}
      </div> */}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Tables;
