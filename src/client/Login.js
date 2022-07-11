import React, { useState, useEffect } from "react"
import {Input, Form, InputGroup, Button } from 'react-daisyui'
import './Login.css'
import LoadingIcon from "../components/LoadingIcon/LoadingIcon"
import GET_LOGIN from "../components/queries"
import { useNavigate } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { baseUrl } from "../components/constants"
export default function Login() {
  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [ loginUser,{ loading, error, data, called }] = useLazyQuery(
      GET_LOGIN
    ); 

  
    function handleSubmit(event) {
      event.preventDefault();
   
      loginUser(
        {
        variables:
          {
            email: email,
            password: password
          }
        }
      );


    }
    useEffect(() => {
      if ( data?.users[0]?.email) 
      {
        localStorage.setItem('user_email', data.users[0].email)
        navigate(baseUrl());
        
      }
      else if (called)
      {
        setErrorMessage("Invalid Email/Password");
      }
    }, [data])

    if (error) {
      return 'Error'
    }

    const errorMessageStyle = {
      color: "#D8000C",
      backgroundColor: "#FFBABA",
      backgroundImage: `url('https://i.imgur.com/GnyDvKN.png')`,
      border: "1px solid",
      margin: "10px 0px",
      padding: "15px 10px 15px 50px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "10px center"
  }
    return (
        <div className="mt-20 flex bg-white-bg1">
            <div className="w-full max-w-md    m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                <h1 className="text-2xl  font-medium text-primary mt-4 mb-12 text-center">
                    Log in to your account
                </h1>
                {!!errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <Form.Label title="Email"></Form.Label>
                    <Input
                        id='email'
                        label='Email'
                        type='email'
                        placeholder='Your email'
                        value={email}
                        onChange= {({ target }) => setEmail(target.value)}
                        className="form_input"
                    />
                    <Form.Label title="Password"></Form.Label>
                    <Input
                        id='password'
                        label='Password'
                        type='password'
                        placeholder='Your Password'
                        value={password}
                        onChange= {({ target }) => setPassword(target.value)}
                        className="form_input"
                    />
                    {loading ? <LoadingIcon /> : 
                    <div className="flex justify-center items-center mt-6">
                        <Button type='submit'>
                            Continue with Email
                        </Button>
                    </div>
                    }
                </form>
                <div className="mt-2 justify-self-center text-center">Need to create an account? <a className="underline text-blue-600 hover:text-blue-800 pointerCursor" onClick={() => navigate(baseUrl() + "Signup")}>Signup</a></div>
            </div>
        </div>
    );
  }
    
