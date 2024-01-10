import { useState } from 'react';

const useTable = (data, columns) => {
  const [tableData, setTableData] = useState(data);

  const getColumns = () => columns;

  const updateData = (newData) => {
    setTableData(newData);
  };

  return {
    data: tableData,
    columns: getColumns,
    updateData,
  };
};

export default useTable;
