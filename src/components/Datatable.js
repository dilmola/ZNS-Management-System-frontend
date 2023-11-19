import React from 'react';
import { useTable } from 'react-table';

function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="table-auto w-full ">
      <thead className="border-b-2 border-gray-600	border-opacity-60	">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className="text-left "> 
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="px-5 py-3">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} className="px-5 py-3">
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
