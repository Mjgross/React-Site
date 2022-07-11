import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { baseUrl } from "../components/constants";
export default function Signout() {
    const navigate = useNavigate();
    localStorage.removeItem('user_email');
    localStorage.removeItem('cart_items');
    useEffect(() => {
        {}
        setTimeout(function() {
            navigate(baseUrl + "Login");
          }, 5000);
    });

    return (
    <>
    <div className="text-center mt-20 text-lg">
        You have been signed out!
        <br></br>
        Redirecting to the Login Page...
    </div>
    </>
    );
}