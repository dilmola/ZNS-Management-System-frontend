import React, { useState } from 'react';
import { useTable } from 'react-table';
import ModalContractor from './ModalContractor'; // Import your modal component

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

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <div>
      <table {...getTableProps()} className="table-auto w-full">
        <thead className="border-b-2 border-gray-600 border-opacity-60">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-5 py-3">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleRowClick(row)}
                className="cursor-pointer hover:bg-gray-200"
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-5 py-3">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedRow && (
        <ModalContractor onClose={() => setSelectedRow(null)} data={selectedRow.original}>
          {/* Content of your modal, using selectedRow for data */}
          <p>Row clicked: {JSON.stringify(selectedRow.original)}</p>
        </ModalContractor>
      )}

{/* {selectedRow && (
        <Modal onClose={() => setSelectedRow(null)} data={selectedRow.original}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Username:</label>
            <p className="text-lg font-semibold">{selectedRow.original.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Address:</label>
            <p className="text-lg font-semibold">{selectedRow.original.address}</p>
          </div>
        </Modal>
      )} */}
    </div>
  );
}

export default DataTable;
