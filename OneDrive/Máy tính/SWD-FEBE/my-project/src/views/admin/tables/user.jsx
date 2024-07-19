import CheckTableUser from "./components/CheckTableUser";

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
import { columnsDataUser } from "./variables/columnsData";
import { ToastContainer } from "react-toastify";
import { useUserApi } from "./components/useUserApi/useUserApi";
import { columnsDataCategory } from "./variables/columnsData";
const Tables = () => {
  const userList = useUserApi();
 
  const name = [
    { name: "Users", data: userList },    
  ]

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols">
        {name?.map((data, index) => (
          <CheckTableUser
            name={data?.name}
            index={index}
            columnsData={columnsDataUser}
            tableData={data?.data}
          />
        ))}{" "}
      </div>
   
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Tables;
