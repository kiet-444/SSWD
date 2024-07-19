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
import CheckTableFee from "./components/CheckTableFee";
import { columnsDataFee } from "./variables/columnsData";
import { ToastContainer } from "react-toastify";
import { useProccessFeeApi } from "./components/ProccessFeeApi/useProccessFeeApi";

const Tables = () => {
  const fee = useProccessFeeApi();
 

  const name = [
    { name: "Fee", data: fee },
    
  ];
  
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols">
        {name?.map((data, index) => (
          <CheckTableFee
            name={data?.name}
            index={index}
            columnsData={columnsDataFee}
            tableData={data?.data}
          />
        ))}{" "}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Tables;
