import React from "react"
import {Card, Button} from 'react-daisyui'

const buyButton = {
  top: "10%"
}
const titleStyle = {
  fontSize: "1rem"
}
export default function HomeProductCard({prod_images, prod_title, onClickCall, ...props}) {
  let prod_image;
  if (prod_images){
    prod_image = prod_images.split(",");

  }
  if (onClickCall){

  }
   

  
return (
    <Card  bordered="false" imageFull="true">
      <Card.Image
        src={prod_image[0]}
        width="140px"
      />
      <Card.Body className="items-center text-center">
        <Card.Title  style={titleStyle}>{prod_title}</Card.Title>
        <Card.Actions className="justify-end">
          <Button style={buyButton} size="sm" color="primary" onClick={onClickCall}>Buy Now</Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  )
};
