import React, { useState} from "react"
import {Table, Pagination, Button } from 'react-daisyui'
import "../../index.css"

export default function InventoryTable({row_data, headers}) {
  const numOfRowsInTable = 100;
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [tableData, setTableData] = useState(row_data.length? row_data : []);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [paginationRows, setPaginationRows] = useState(tableData.length/100);
  if (!row_data ){
    return 'Loading';
  }

  function handleSorting(func) {
    console.log(func);
    const sortOrder = func === sortField && order === "asc" ? "desc" : "asc";
   setSortField(func);
   setOrder(sortOrder);
   Sort(func, sortOrder);
  };

  const Sort = (sortField, sortOrder) => {
    if (sortField) {
     const sorted = [...row_data].sort((a, b) => {
      return (
       a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
        numeric: true,
       }) * (sortOrder === "asc" ? 1 : -1)
      );
     });
     
     console.log(sorted);
     setTableData(sorted);
     //setPaginationRows(sorted/100);
     console.log(paginationRows);
    }
   };

   const tableBodyStyle = {
    display: "block",
    height: "500px",
    "overflowY": "scroll",
    
   }

   const tableStyle = {
    display: "block",
    "alignContent": "center"
    
   }
   const paginationStyle = {
    "justifyContent": "center"
   }
  const columnHeaders = [
    {label: "Id", func: "id", sortable: true},
    {label: "Name", func: "name", sortable: true},
    {label: "Categories", func: "categories", sortable: true},
    {label: "Regular_price", func: "regular_price", sortable: true},
    {label: "sku", func: "sku", sortable: true},
  ];

  function handlePaginationClick(index)
  {
    setSliceIndex(index);
  }
  
  /*
                <span>Id</span>
              <span>Name</span>
              <span>Category</span>
              <span>Price</span>
              <span>Rating</span> */
  return (
        <>
        <div style={tableStyle}>
        <div style={tableBodyStyle}>
      <Table zebra="true" compact="true">
        <Table.Head>
          {columnHeaders.map(({ label, func, sortable }) => <span key={func} onClick={() => handleSorting(func)}>{label} <i className="arrow up"></i></span>)}
        </Table.Head>

        <Table.Body>
          {tableData ? (tableData.slice(sliceIndex, sliceIndex+numOfRowsInTable).map((p) => <Table.Row key={p.id}>
            <span>{p.id}</span>
            <span>{p.name}</span>
            <span>{p.categories}</span>
            <span>{p.regular_price}</span>
            <span>{p.sku}</span>
          </Table.Row>))
            : <></>}
        </Table.Body>
      </Table>
    </div>
    <Pagination style={paginationStyle}>
      {Array(paginationRows).fill(0).map((row, idx) => {
      if (Math.floor(sliceIndex/numOfRowsInTable) === idx){
         return <Button active key={1} onClick={() => handlePaginationClick(idx*numOfRowsInTable)}>{idx+1}</Button>;
      }
      else {
        return <Button key={1} onClick={() => handlePaginationClick(idx*numOfRowsInTable)}>{idx+1}</Button>;
      }
      }) }
    </Pagination>
    </div>
      </>
        
      )
}