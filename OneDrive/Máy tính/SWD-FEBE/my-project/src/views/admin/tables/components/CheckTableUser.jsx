import React, { useMemo } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Checkbox from "components/checkbox";
import ButtonCreate from "components/atom/ButtonCreate/ButtonCreate";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useState } from "react";
import useDeleteData from "api/DeleteApi/DeleteApi";
import ButtonCss from "components/atom/ButtonDelete/ButtonDeleteDeco";
import { ToastContainer } from "react-toastify";
import { useMaterialApi } from "./MaterialApi/useMaterialApi";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CheckTable = (props) => {
  const { columnsData, tableData } = props;
  const { name, index } = props;

  const nameLower = name.toLowerCase();
  const refreshList = useMaterialApi();
  const deleteData = useDeleteData(refreshList);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const [checkedRows, setCheckedRows] = useState([]);

  const handleCheckboxChange = (rowId) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(rowId)
        ? prevCheckedRows.filter((id) => id !== rowId)
        : [...prevCheckedRows, rowId]
    );
  };

  const handleDelete = async () => {
    const endpoint = name.toLowerCase(); // Replace with your actual endpoint
    await deleteData(checkedRows, "staffsRouter/deleteUser",refreshList);
    setCheckedRows([]);
  };

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
  initialState.pageSize = data?.length;
console.log(data?.length);
  return (
    <Card extra={"w-full sm:overflow-auto p-4"} index={index}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </div>
        <div className="center flex items-center justify-center">
          <ButtonCreate name={name} />
          <ButtonCss handleDelete={handleDelete} />
          {/* <CardMenu handleDelete={handleDelete} /> */}
        </div>
      </header>
      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              const rowId = row.original._id;
              const isChecked = checkedRows.includes(rowId);
              return (
                <tr {...row.getRowProps()} key={rowId}>
                  {row.cells.map((cell, index) => {
                    let data = "";
               
                    if (cell.column.Header === "ID") {
                      data = (
                        <div className="flex items-center gap-2">
                        <Checkbox
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(rowId)}
                          />
                        <Link
                          to={`${nameLower}/update/${rowId}`}
                          className="flex items-center"
                        >
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                           {parseInt(row.id)+1}
                          </p>
                        </Link>
                        </div>
                      );
                    } else if (cell.column.Header === "NAME") {
                      data = (
                        <div className="flex items-center gap-2">
                          
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
                    } else if (cell.column.Header === "PASSWORD") {
                      data = (
                        <Link to={`${nameLower}/update/${rowId}`}>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {" "}
                            {cell.value}{" "}
                          </p>
                        </Link>
                      );
                    } else if (cell.column.Header === "ROLE") {
                      data = (
                        <Link to={`${nameLower}/update/${rowId}`}>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {" "}
                            {cell?.value}{" "}
                          </p>
                        </Link>
                      );
                    }

                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pt-[14px] pb-[16px] sm:text-[14px]"
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

export default CheckTable;
