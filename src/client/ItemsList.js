import React, { useEffect, useState} from "react"
import {Button, Pagination } from 'react-daisyui'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { gql } from "@apollo/client";
import ItemBlock from "../components/ItemBlock";
import LoadingIcon from "../components/LoadingIcon/LoadingIcon";

const GET_ITEMS_PAGINATED = gql`
query SearchProductsWithPagination($limit: Int = 25, $paginationStart: Int, $search: String) {
  products_table(limit: $limit, where: {_or: [{name: {_ilike: $search}}, {sku: {_ilike: $search}}]}, order_by: {id: asc}, offset: $paginationStart) {
    id
    categories
    description
    images
    name
    regular_price
    sale_price
    sku
    stock
  }
}`;

const GET_PRODUCT_PAGINATION_COUNT = gql`
query ProductPaginationCount($search: String) {
  products_table_aggregate(where: {_or: [{name: {_ilike: $search}}, {sku: {_ilike: $search}}]}) {
    aggregate {
      count
    }
  }
}`;

  const ItemsListStyle = {
    display: "grid",
    "gridTemplateColumns": "1fr 1fr",
    "gridGap": "60px",
    "maxWidth": "1080px",
    "margin": "0 auto",
    backgroundColor: `white`
  };
  const paginationStyle = {
    "justifyContent": "center"
   };

   const noProductsStyle = {
    justifyContent: "center",
    textAlign: "center",
    marginTop: "20px"
   }
  
   const initialPageArray = {
    start: 0,
    end: 4
   }
export default function ItemsList({searchTerms}) {
  const maxNumPaginationPages = 5;
  const [pageIndex, setPageIndex] = useState(0);
  const [paginationRows, setPaginationRows] = useState(0);   // hard-coded for now
  const [pageArray, setPageArray] = useState(initialPageArray)
  const { loading, error, data, called } = useQuery(GET_ITEMS_PAGINATED, 
    {
      variables:
      {
        paginationStart: pageIndex*25,
        search: "%" + searchTerms + "%"
      }
    }
  ); 
  const [ getPaginationCount,{ loading: loadingPagination, error: errorPagination, data : dataPagination, called: calledPagination }] = useLazyQuery(
    GET_PRODUCT_PAGINATION_COUNT
  ); 
  useEffect(() => {
    if (!loading && data.products_table){
      getPaginationCount(
        {
        variables:
          {
            search: "%" + searchTerms + "%"
          }
        }
      );
    }
  }, [loading, data])

  useEffect(() => {
    if (!loadingPagination && dataPagination && dataPagination.products_table_aggregate){
      let count = dataPagination.products_table_aggregate.aggregate.count;
      setPaginationRows(Math.ceil(dataPagination.products_table_aggregate.aggregate.count/25))
      setPageIndex(0);
      updatePagination(Math.ceil(count/25));
    }
  }, [loadingPagination, dataPagination])

  function updatePagination(rows){
    let startPage;
    let endPage;
    if (rows <= maxNumPaginationPages){
      startPage = 1;
      endPage = rows;
    }
    else {
      startPage = pageIndex;
      if (startPage != rows && (startPage+1) != rows)
        endPage = pageIndex + maxNumPaginationPages - 1;
      else
        endPage = rows;
    }
    let f = [];
    for (let i = startPage; i <= endPage; i++)
      f.push(i);
     
  }

  const isValidIndex = idx => idx >= 0 && idx <= paginationRows+1;

  function decrement(index){
    setPageIndex(index);
    if (isValidIndex(pageArray.start -1) && isValidIndex(pageArray.end-1)){
      
      setPageArray({...pageArray,
        start: pageArray.start -1 ,
        end: pageArray.end -1 ,
      });
    }
  }
  function increment(index){
    setPageIndex(index);
    if (isValidIndex(pageArray.start +1) && isValidIndex(pageArray.end+1)){
      
      setPageArray({
        start: pageArray.start +1 ,
        end: pageArray.end +1 ,
      });
    }

  }
  const pageLoading = (loading || loadingPagination);
  if (error) return <p>Error: {error}</p>;
  
  return (
      <>
        <Pagination style={paginationStyle}>
          <Button disabled={pageIndex < 1} key="prev" onClick={() => decrement(pageIndex-1)}> ← Prev</Button>
        
        {
          Array(paginationRows).fill().slice(pageArray.start, pageArray.end).map((row, idx) => {
          if (Math.floor(pageIndex) === pageArray.start + idx) return <Button active key={pageArray.start + idx} onClick={() => setPageIndex(pageArray.start + idx)}>{pageArray.start + idx+1}</Button>
          else return <Button key={pageArray.start + idx} onClick={() => setPageIndex(pageArray.start + idx)}>{pageArray.start + idx+1}</Button>
          }) 
        }
        <Button disabled={pageIndex >= paginationRows-1}key="next" onClick={() => increment(pageIndex+1)}>Next →</Button>
        
        </Pagination>
        {
          pageLoading ? <LoadingIcon />
          :
          <div style={ItemsListStyle}>
          {
            data.products_table && data.products_table.length ? data.products_table.map(item => (
                <ItemBlock key={item.id} item={item}></ItemBlock>  
            )) 
          : 
            <div style={noProductsStyle}>No Products Found!</div>
          }
          </div> 
        }
      </>
  );
}