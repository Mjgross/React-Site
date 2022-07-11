import {React, useEffect, useState} from 'react'
import {Navbar, Button, Input } from 'react-daisyui'
import NavbarButtonLink from "./NavbarComponents.js"
import { baseUrl } from '../constants.js'
const navBarCenterStyle = {
    "justifyContent": "center"
}

const searchBarStyle = {
    color: "black"
}
export default function Navbar1() {
    const [authorized, setAuthorized] = useState(false);
    const base_url = baseUrl();
    // Used to constantly check for the storage item and update the navbar
    // if a user is logged in
    useEffect(() => {
        {}
        setInterval(() => {
            const user_email = localStorage.getItem("user_email")
            if (user_email)
                setAuthorized(true);
            else
                setAuthorized(false);
        }, [])
    }, 5000);
    return (
        
        <Navbar className="shadow-lg bg-neutral text-neutral-content box" >
            <Navbar.Start className="px-2 mx-2">
            <NavbarButtonLink name="Grossi's Store" path={base_url}><span className="text-lg font-bold">Grossi's Store</span></NavbarButtonLink>
            </Navbar.Start>
    
            <Navbar.Center className="px-2 mx-2" style={navBarCenterStyle}>
            <div className="hidden sm:flex items-stretch">
                {authorized ? (
                    <>
                    <NavbarButtonLink size="sm" name="Products" path={base_url + "Products"}>Products</NavbarButtonLink>
                    <NavbarButtonLink size="sm" name="Inventory" path={base_url + "Inventory"}>Inventory</NavbarButtonLink>        
                    </> ) :
                    <>
                    <NavbarButtonLink size="sm" name="Login" path={base_url + "Login"}>Login</NavbarButtonLink>
                    <NavbarButtonLink size="sm" name="Signup" path={base_url + "Signup"}>Signup</NavbarButtonLink>
                    </>
                }
            </div>
            </Navbar.Center>
    
            <Navbar.End className="px-2 mx-2">
                {authorized ? 
                <>
                <NavbarButtonLink size="sm" name="Cart" path={base_url + "Cart"}>Cart</NavbarButtonLink>
                <NavbarButtonLink size="sm" name="Account" path={base_url + "Account"}>Account</NavbarButtonLink>
                <NavbarButtonLink size="sm" name="Signout" path={base_url + "Signout"}>Sign Out</NavbarButtonLink>
                </>

                 : null}
            </Navbar.End>
        </Navbar>
        )

            
};

