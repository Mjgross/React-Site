
import { Form, Button, Input } from "react-daisyui";
import { empty, gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import "./Signup.css"
import { baseUrl } from "../components/constants";
const SIGNUP = gql`
mutation Signup($email: String, $name: String, $password: String) {
    insert_users_one(object: {password: $password, name: $name, email: $email}, on_conflict: {constraint: users_email_key, update_columns: []}) {
      id
      email
      name
    }
  }`;

    const state = {
    email: '',
    password: '',
    name: '',
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

  export default function Signup() {
    const navigate = useNavigate();
    const [account, setAccount] = useState(state);
    const [errorMessage, setErrorMessage] = useState();
    const [ signupUser,{ loading: loadingUser, error: errorUser, data: dataUser}] = useMutation(
        SIGNUP
      ); 


    function handleSubmit(event)
    {
        event.preventDefault();
        for (let key in account){
            if (!account[key]){
                setErrorMessage("Please enter a valid " + key)
                return;
            }
        }

        signupUser(
        {
            variables:
            {
                email: account.email,
                password: account.password,
                name: account.name

            }
        })
    }

    useEffect(() => {
        if(dataUser && dataUser.insert_users_one) 
        {
            localStorage.setItem('user_email', dataUser.insert_users_one.email);
            navigate(baseUrl());
        }
        else if (dataUser && !dataUser.insert_users_one )
        {
            setErrorMessage("Email Address already in use!");
        }

    }, [dataUser])

    return (
        <>
        <div className="mt-20 flex bg-gray-bg1">
            <div className="w-full max-w-md    m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                <h1 className="text-2xl  font-medium text-primary mt-4 mb-12 text-center">
                    Signup
                </h1>
                {!!errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <Form.Label title="Email"></Form.Label>
                    <Input
                        id='email'
                        label='Email'
                        type='email'
                        placeholder='Your email'
                        value={account.email}
                        onChange= {({ target }) => setAccount({...account, email: target.value})}
                        className="form_input"
                    />
                    <Form.Label title="Full Name"></Form.Label>
                    <Input
                        id='name'
                        label='Full Name'
                        type='text'
                        placeholder='Your Name'
                        value={account.name}
                        onChange= {({ target }) => setAccount({...account, name: target.value})}
                        className="form_input"
                    />
                    <Form.Label title="Password"></Form.Label>
                    <Input
                        id='password'
                        label='Password'
                        type='password'
                        placeholder='Your Password'
                        value={account.password}
                        onChange= {({ target }) => setAccount({...account, password: target.value})}
                        className="form_input"
                    />

                    <div className="flex justify-center items-center mt-6">
                        <Button type='submit'>
                            Create New Account
                        </Button>
                    </div>
                </form>
                <div className="mt-2 justify-self-center text-center">Already have an account? <a className="underline text-blue-600 hover:text-blue-800 pointerCursor" onClick={() => navigate(baseUrl() + "Login")}>Login</a></div>
            </div>
        </div>
        </>
    );
  }