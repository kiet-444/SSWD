import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useMemo } from "react";
import Checkbox from "components/checkbox";
import Progress from "components/progress";
import ButtonCreate from "components/atom/ButtonCreate/ButtonCreate";
import ButtonAction from "components/atom/ButtonDelete/ButtonAction";
import { Link } from "react-router-dom";
import useAuth from "hook/useAuth";
import ButtonCss from "components/atom/ButtonDelete/ButtonDeleteDeco";
import axios from "api/axios";
import { useState } from "react";
import useDeleteData from "api/DeleteApi/DeleteApi";
import { toast } from "react-toastify";
const ComplexTableCustomer = (props) => {
  const { columnsData, tableData,refreshList  } = props;

  const { name, index } = props;
  const token = useAuth();
  const deleteData = useDeleteData(refreshList);
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const nameLower = name.toLowerCase();
  const [checkedRows, setCheckedRows] = useState([]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  
  const handleCheckboxChange = (rowId) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(rowId)
        ? prevCheckedRows.filter((id) => id !== rowId)
        : [...prevCheckedRows, rowId]
    );
  };

  const handleDelete = async () => {
    const endpoint = name.toLowerCase(); // Replace with your actual endpoint
    console.log(endpoint);
    await deleteData(checkedRows, "customers", "customers", refreshList);
    setCheckedRows([]);
  };


  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </div>
        <div className="center flex items-center justify-center">
        <ButtonCss handleDelete={handleDelete} />
        </div>
      </header>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
               const rowId = row.original._id;
               const isChecked = checkedRows.includes(rowId);
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      data = (
                        <div className="flex items-center gap-2">
                        <Checkbox
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(rowId)}
                      />
                       <Link
                            to={`${nameLower}/update/${rowId}`}
                            className="flex items-center gap-2"
                          >
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                        </Link>
                        </div>
                      );
                    } else if (cell.column.Header === "PHONE") {
                      data = (
                        <div className="flex items-center gap-2">
                           <Link
                            to={`${nameLower}/update/${rowId}`}
                            className="flex items-center gap-2"
                          >
                          <div className={`rounded-full text-xl`}>
                            {cell.value === "Approved" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "Disable" ? (
                              <MdCancel className="text-red-500" />
                            ) : cell.value === "Error" ? (
                              <MdOutlineError className="text-orange-500" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                          </Link>
                        </div>
                      );
                    } else if (cell.column.Header === "ADDRESS") {
                      data = (
                        <Link
                        to={`${nameLower}/update/${rowId}`}
                        className="flex items-center gap-2"
                      >
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell?.value}
                        </p>
                        </Link>
                      );
                    } else if (cell.column.Header === "INVOICE") {
                      data = (
                        <Link
                        to={`${nameLower}/update/${rowId}`}
                        className="flex items-center gap-2"
                      >
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {" "}
                          {cell?.row?.original?.orders?.length}{" "}
                        </p>
                        </Link>
                      );
                    } 
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTableCustomer;
