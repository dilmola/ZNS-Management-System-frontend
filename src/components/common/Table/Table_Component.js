import useTable from "./Table_BL";
import { getStatusIcon } from "../IconStatus";
import React, { useState } from "react";

const Table = ({ data, columns, onRowClick }) => {
  const table = useTable(data, columns);

  return (
    <div>
      <table className="table-auto w-full">
        <thead className="border-b-2 border-gray-600 border-opacity-20 text-left">
          <tr className="px-5 py-3 ">
            {table.columns().map((column, index) => (
              <th
                key={column.key}
                className={`px-5 py-3 font-medium ${
                  index !== table.columns().length - 1
                    ? "border-r-2 border-gray-600 border-opacity-20"
                    : ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : null}
              className={`px-5 py-3 ${
                onRowClick ? "cursor-pointer rounded-full transition-colors hover:bg-[#f4f6f3]" : "cursor-auto	rounded-full transition-colors hover:bg-[#f4f6f300]"
              } `}
            >
              {columns.map((column, columnIndex) => {
                if (column.accessor === "appointment_status") {
                  return (
                    <React.Fragment key={column.accessor}>
                      <td
                        className={`w-0 px-5 py-3 ${
                          columnIndex !== columns.length - 1
                            ? "border-r-2 border-gray-600 border-opacity-20"
                            : ""
                        }`}
                      >
                        <div className="w-5 h-5">
                          {getStatusIcon(row[column.accessor])}
                        </div>
                      </td>
                      <td className="px-5 py-3">{row[column.accessor]}</td>
                    </React.Fragment>
                  );
                } else if (column.accessor === "quotation_key") {
                  return (
                    <td
                      key={column.accessor}
                      className={`px-5 py-3 ${
                        columnIndex !== columns.length - 1
                          ? "border-r-2 border-gray-600 border-opacity-20"
                          : ""
                      }`}
                    >
                      {row[column.accessor]}
                    </td>
                  );
                } else if (column.accessor === "contractor_fullname") {
                  return (
                    <td
                      key={column.accessor}
                      className={`px-5 py-3 ${
                        columnIndex !== columns.length - 1
                          ? "border-r-2 border-gray-600 border-opacity-20"
                          : ""
                      }`}
                    >
                      {column.accessor === "contractor_fullname" &&
                      row[column.accessor] === null
                        ? "No assign"
                        : row[column.accessor]}
                    </td>
                  );
                } else if (column.accessor === "add_appointment_date") {
                  return (
                    <td
                      key={column.accessor}
                      className={`px-5 py-3 ${
                        columnIndex !== columns.length - 1
                          ? "border-r-2 border-gray-600 border-opacity-20"
                          : ""
                      }`}
                    >
                      {row[column.accessor]}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={column.accessor}
                      className={`px-5 py-3 ${
                        columnIndex !== columns.length - 1
                          ? "border-r-2 border-gray-600 border-opacity-20"
                          : ""
                      }`}
                    >
                      {row[column.accessor]}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
