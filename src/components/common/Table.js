// import React, { useState } from "react";
// import { getStatusIcon } from "../common/IconStatus";

// const useTable = (data, columns) => {
//   const [tableData, setTableData] = useState(data);

//   const getColumns = () => columns;

//   return {
//     data: tableData,
//     columns: getColumns,
//     updateData: setTableData,
//   };
// };

// const Table = ({ data, columns, onRowClick }) => {
//   const table = useTable(data, columns);

//   const renderCell = (column, row) => {
//     if (column.accessor === "status") {
//       return (
//         <>
//           <td className="w-0 px-5 py-3">
//             <div className="w-5 h-5">{getStatusIcon(row.status)}</div>
//           </td>
//           <td>{row.status}</td>
//         </>
//       );
//     } else {
//       return <td className="px-5 py-3">{row[column.accessor]}</td>;
//     }
//   };

//   return (
//     <div>
//       <table className="table-auto w-full">
//         <thead className="border-b-2 border-gray-600 border-opacity-60 text-left">
//           <tr className="px-5 py-3">
//             {table.columns().map((column) => (
//               <th key={column.accessor} className="px-5 py-3">
//                 {column.header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {table.data.map((row, rowIndex) => (
//             <tr
//               key={rowIndex}
//               onClick={() => onRowClick(row)}
//               className="px-5 py-3 cursor-pointer transition-colors hover:bg-gray-100"
//             >
//               {table.columns().map((column) => (
//                 <React.Fragment key={column.accessor}>
//                   {renderCell(column, row)}
//                 </React.Fragment>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export { Table };

