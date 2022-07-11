
import React, { useState} from "react"
import MainCarousel from "../components/MainCarousel"
import {Divider } from 'react-daisyui'
import HomeProductCard from "../components/Product/HomeProductCard"
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_FEATURED_PRODUCTS} from "../components/queries";
import ProductModal from "../components/Product/ProductModal";
const style = {
    display: "flex",
    "flexDirection": "row"

};

  function Home() {
    const {data} = useQuery(GET_FEATURED_PRODUCTS);
    const [showProductModal, setShowProductModal] = useState(false);
    const [currentProductModal, setCurrentProductModal] = useState();

    if (data && data.products_table){

    }

    const openProductModal = (product) =>{
        setShowProductModal(true);
        setCurrentProductModal(product)
      }
      const closeProductModal = () =>{
        setShowProductModal(false);
        console.log(showProductModal);
        
      }
    return (
    <>
        <div>
        {data && data.products_table ? (
                    <>
                    <MainCarousel products={data.products_table}/>
                    </> ) :null
                }
            <Divider />
            <div>
                hi
            </div>
            <ul>
                <div style={style}>
                {data && data.products_table ? data.products_table.map((product) => (
                    <><HomeProductCard onClickCall={() => openProductModal(product)} key={product.id} prod_title={product.name} prod_images={product.images} /></>
                )) : null}
                </div>
            </ul>
        { showProductModal ? <ProductModal  product={currentProductModal} onClickClose={closeProductModal}/> : null }    
        </div>
        </>
    
    )
  }

  export default Home