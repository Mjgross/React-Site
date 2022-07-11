import React, { useState} from "react"
import MainCarousel from "../components/MainCarousel"
import {Divider } from 'react-daisyui'
import HomeProductCard from "../components/Product/HomeProductCard"
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import InventoryTable from "../components/Table/InventoryTable";
//import GET_ALL_PRODUCTS_LIMIT from "../components/schema"
import gql from 'graphql-tag';
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";

  export const GET_ALL_PRODUCTS_TABLE = gql`
  query GetAllProductsTable {
    products_table(limit: 1000) {
      id
      categories
      description
      regular_price
      name
      sku
    }
  }`;
const tableStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const columnHeaders = [
    {label: "Id", func: "id", sortable: true},
    {label: "Name", func: "name", sortable: true},
    {label: "Category", func: "category", sortable: true},
    {label: "Price", func: "price", sortable: true},
    {label: "Rating", func: "Rating", sortable: true},
];

function Inventory() {
    const {loading, error, data} = useQuery(GET_ALL_PRODUCTS_TABLE);

    if (data && data.products_table){
        console.log(data.products_table);
    }
    if (loading){
        return <LoadingIcon/>
    }
    if (error){
        return error.toString();
    }
    return (
    <>
        <h1>Inventory</h1>
        <div style={tableStyle}>
            { data && data.products_table ? (<InventoryTable row_data={data.products_table} headers={columnHeaders} />) : <></>
            }
        
        </div>
        </>
    
    )
  }

  export default Inventory