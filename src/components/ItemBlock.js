import { Card, Button, Badge } from "react-daisyui";
import ProductModal from "./Product/ProductModal";
import { useState } from "react";

const priceTag = {
  fontWeight: "600",
  lineHeight: "1",
  fontSize: "2rem",
  display: "inlineBlock",
  alignItems: "center",
  justifyContent: "center",
}

const badgeStyle = {
  position: "absolute",
  top: "5px",
  left: "5px",
}
export default function ItemBlock({item}) {
  const [showProductModal, setShowProductModal] = useState(false);

    let prod_image;
    if (item){
      prod_image = item.images.split(",");
    }
    const openProductModal = () =>{
      setShowProductModal(true);
    }
    const closeProductModal = () =>{
      setShowProductModal(false);  
    }
    
  return (
    <>
      <Card bordered="false" >
        <Card.Image
          src={prod_image[0]}
          alt="Shoes"
          width="140px"
        />
         {item.stock ?<Badge style={badgeStyle}>In stock!</Badge> : null }
        <Card.Body className="items-center text-center">
          <Card.Title >{item.name}</Card.Title>
          <Card.Actions className="justifyEnd">
          <div style={priceTag}>
              ${item.regular_price}
            </div>
            <Button  onClick={() => openProductModal()} size="sm" color="primary">Buy Now</Button>
          </Card.Actions>
        </Card.Body>
      </Card>

      { showProductModal ? <ProductModal  product={item} onClickClose={closeProductModal}/> : null }  
      </>
      
    )
}