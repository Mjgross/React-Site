import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
const cartStyle = {
    display: "grid",
    "gridTemplateColumns": "1fr",
    "gridGap": "60px",
    "maxWidth": "1080px",
    "margin": "0 auto",
    backgroundColor: `white`
  };

  const cartHeader = {
    "textAlign": "center",
    "marginTop": "1rem",
    "marginBottom": "1rem",
    fontWeight: 500,
  }

export default function Cart() {
    const [cart, setCart] = useState();

    useEffect(() => {
        {}
        setInterval(() => {
            setCart(JSON.parse(localStorage.getItem("cart_items")));  
        }, [])
    }, 5000);
    return (
        <>
        <h2 style={cartHeader}>Your Cart</h2>
        {
          <div style={cartStyle}>
          {
            cart && localStorage.getItem("cart_items") ? cart.map(item => (
                <CartItem key={item.id} item={item}></CartItem>  
            )) 
          : 
            <div className="text-center text-xl font-medium">No Items in cart!</div>
          }
          </div> 
        }
        </>
    );
}