import React, { useState, boolean, useEffect} from "react"
import {Button, Modal, Divider, Card} from 'react-daisyui'
import { GET_PRODUCT_FOR_MODAL_BY_ID } from "../queries"
import { useQuery} from "@apollo/client"
import { MAX_PAGE_SIZE } from "../constants"
const modalStyle = {
  "position": "absolute",
  "top": "50%",
  "left": "50%",
  "transform": "translate(-50%,-50%)",
  "maxWidth": MAX_PAGE_SIZE
}

const modalImage = {

    display: "block",
    width: "33%",
}

const priceTag = {
  fontWeight: "600",
  lineHeight: "1",
  fontSize: "3rem",
  display: "inlineBlock",
  alignItems: "center",
  justifyContent: "center",
}

const titleStyle = {
  fontWeight: "600",
  lineHeight: "1",
  fontSize: "3rem",
}
export default function ProductModal({onClickClose, product}) {
    const [visible, setVisible] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false);
    const {data, loading, error} = useQuery(
        GET_PRODUCT_FOR_MODAL_BY_ID, {
            variables: {id: product.id}
        }
      ); 

    useEffect(() => {
        if (data && data.products_table) {
          setIsLoaded(true);
        }
    }, [data])

    const toggleVisible = () => {
      setVisible(!visible)
      onClickClose();
    }

    const AddToCart = () => {
      setVisible(!visible)
      let item = data.products_table[0];
      let itemUpsert = {
        id: item.id,
        quantity: 1,
        img: item.images.split(",")[0],
        price: item.regular_price,
        name: item.name
      };
      let currentCart = localStorage.getItem("cart_items");
      const parsedCart = currentCart ? JSON.parse(currentCart) : [];
      const newCart = [...parsedCart, itemUpsert];
      localStorage.setItem("cart_items", JSON.stringify(newCart))

      onClickClose();
    }
    if (loading) return null;
    return (
      <>
        <Modal style={modalStyle} responsive="false" open={visible} onClickBackdrop={toggleVisible}>
          <Modal.Header style={titleStyle}>{data.products_table[0].name}</Modal.Header>
          <Divider/>
          <div>
          <Card  bordered="false" >
            <Card.Image style={modalImage}
                src={data.products_table[0].images.split(",")[0]}
                alt="img"  
            />
            </Card>
          <Modal.Body dangerouslySetInnerHTML={{__html: data.products_table[0].description}}>
            
          </Modal.Body>
          </div>
          <Divider/>
          <Modal.Actions>
            <div style={priceTag}>
              ${data.products_table[0].regular_price}
            </div>
            <Button onClick={AddToCart} color="primary">
              Add to Cart
            </Button>
            <Button onClick={toggleVisible}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </>
    )
};