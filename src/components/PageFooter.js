import React from 'react'
import {Footer,  } from 'react-daisyui'

const footerStyle = {
    position: "relative",
    left: "0",
    bottom: "0",
    right: "0"
}
export default function PageFooter() {
    return (
        <Footer className="p-10 bg-neutral text-neutral-content" style={footerStyle}>
        <div>
            <Footer.Title>Order Information</Footer.Title>
            <div className="link link-hover">Check Order Status</div>
            <div className="link link-hover">Rebates</div>
            <div className="link link-hover">Payment Information</div>
        </div>
        <div>
            <Footer.Title>Support</Footer.Title>
            <div className="link link-hover">About us</div>
            <div className="link link-hover">Contact</div>
        </div>
        </Footer>
    )
}