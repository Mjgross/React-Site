
import { Button, Card } from "react-daisyui";
import { useState, React } from "react";

const upArrow = {
    border: "solid black",
    "borderWidth": "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    "transform": "rotate(-135deg)",
    "WebkitTransform": "rotate(-135deg)"

}
const downArrow = {
    border: "solid black",
    "borderWidth": "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    "transform": "rotate(45deg)",
    "WebkitTransform": "rotate(45deg)"

}
const buttonStyle = {
    display: "block"
}

const CardStyle = {
    display: "flex",
    "flexWrap": "wrap",
    maxHeight: "500px"
}
const cardSplitContainer = {

}
const cardSplitContainer2 = {

    flex: "50%"
}
const threeBoxStyle = {
    display: "inline-block",
    float: "left",

}
const priceStyle = {

   "marginTop": "10px",
    height: "100px"
}
const quantityStyle = {
    display:"flex",
    "marginTop": "10px",
    height: "100px"
}

const removeStyle = {
    "marginTop": "10px",
}
export default function CartItem(item) {
    const [quantity, setQuantity] = useState(item.item.quantity);

    function IncrementQty() 
    {
        setQuantity(quantity+1);
    }
    function DecrementQty() 
    {
        if (quantity <= 0)
            return;
        setQuantity(quantity-1);
    }
    function removeFromCart() 
    {
        let currentCart = localStorage.getItem("cart_items");
        const parsedCart = JSON.parse(currentCart);

        var index = parsedCart.findIndex(function(i){
            return i.id == item.item.id;
        })
        if (index !== -1)
            parsedCart.splice(index, 1);
        localStorage.setItem("cart_items", JSON.stringify(parsedCart))
    }

    return(
        <>
        <Card bordered="false" style={CardStyle}>
        <Card.Image style={cardSplitContainer}
            src={item.item.img}
            width="340px"
        />
        <Card.Body className="items-center text-center" style={cardSplitContainer2}>
            <Card.Title className="font-medium text-3xl" >{item.item.name}</Card.Title>
            <Card.Actions className="justifyEnd" style={threeBoxStyle}>
            <div className="font-medium text-2xl" style={priceStyle}>
                Price: ${item.item.price}
            </div>
            <div className="font-medium text-xl" style={quantityStyle}>
                Quantity: {quantity}
                <div className="pl-2">
                    <Button  style={buttonStyle}size="sm"  onClick={() => IncrementQty()}><div style={upArrow}></div></Button>
                    <Button  style={buttonStyle} size="sm"  onClick={() => DecrementQty()}><div style={downArrow}></div></Button>
                </div>
            </div>
            <div style={removeStyle}>
                <Button color="error" size="lg" onClick={() => removeFromCart()}>Remove from Cart</Button>
            </div>
            </Card.Actions>
        </Card.Body>
        </Card>
        </>
    );
}