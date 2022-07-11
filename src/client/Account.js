
import React, { useState, useEffect} from "react"
import {Form, Button, Input, Alert } from 'react-daisyui'
import { useQuery, useMutation, useLazyQuery, gql } from '@apollo/client';
import { GET_CURRENT_USER, UPDATE_USER_SETTINGS, CHECK_IF_EMAIL_EXISTS } from "../components/queries";

const initialStateUser = {
  email : '',
  password : '',
  name: ''
}
const responseState = {
  message: '',
  state: null
}
  function Account() {
    const [ getUser,{ loading, error, data, called }] = useLazyQuery(GET_CURRENT_USER); 
    const [ updateUser,{ loading: updateUserLoading, error: updateUserError, data: updateUserData}] = useMutation(UPDATE_USER_SETTINGS); 
    const [ checkifEmailValid,{ data: checkIfEmailValidData, called: checkifEmailValidCalled }] = useLazyQuery(CHECK_IF_EMAIL_EXISTS); 
    const [currentUser, setCurrentUser] = useState(initialStateUser);
    const [response, setResponse] = useState(responseState);

    useEffect(() => {
      let email = localStorage.getItem("user_email");

      getUser(
        {
        variables:
          {
            email: email,
          }
        }
      );
    },[]);

    useEffect(() => {
      if (checkIfEmailValidData && checkIfEmailValidData?.users.length < 1) {
        updateUserFunc();
      }
      else if (checkifEmailValidCalled){
        setResponse({...response, 
          message: "Error: email already in use!",
          status: "error"
        });
      }

    }, [checkIfEmailValidData]);

    useEffect(() => {
      if ( data?.users[0]) {
        let user = data.users[0];
        setCurrentUser({...currentUser,
          email: user.email,
          password: user.password,
          name: user.name
        });
      }
    }, [data]);
    function handleSubmit(event) {
      event.preventDefault();

      if ( localStorage.getItem("user_email") != currentUser.email) {
        checkifEmailValid(
          {
            variables:
            {
              "email": currentUser.email
            }
          }
        )
      }
      else {
        updateUserFunc();
      }
    }

    function updateUserFunc() {
      updateUser(
        {
        variables:
        {
          "email": localStorage.getItem("user_email"),
          "set": {
            "name": currentUser.name,
            "password" : currentUser.password,
            "email": currentUser.email
          }
        }
        }
      )
    }
    
    useEffect(() => {
      if ( updateUserData?.update_users?.returning[0]) {
        localStorage.setItem("user_email", currentUser.email);

        setResponse({...response, 
          message: "User successfully updated!",
          status: "success"
        });
      }
    }, [updateUserData]);

    const divStyle = {
      backgroundColor: `rgb(248 250 252)`
    }
    return (
      <>
      <div>
          <div className="mt-10  m-auto bg-slate-100 rounded-lg border border-primaryBorder shadow-default py-10 px-16 " style={divStyle} >
            {response ? <Alert status={response.status}>{response.message}</Alert> : null}
              <h1>
                  Log in to your account
              </h1>

              <form onSubmit={handleSubmit}>
                  <Form.Label title="Email"></Form.Label>
                  <Input
                      id='email'
                      label='Email'
                      type='email'
                      placeholder='Your email'
                      value={currentUser.email}
                      onChange= {({ target }) => setCurrentUser({...currentUser, email: target.value})}
                      className="form_input"
                  />
                  <Form.Label title="Password"></Form.Label>
                  <Input
                      id='password'
                      label='Password'
                      type='text'
                      placeholder='Your Password'
                      value={currentUser.password}
                      onChange= {({ target }) => setCurrentUser({...currentUser, password: target.value})}
                      className="form_input"
                  />
                  <Form.Label title="Full Name"></Form.Label>
                  <Input
                      id='name'
                      label='Full Name'
                      type='text'
                      placeholder='Your full name'
                      value={currentUser.name}
                      onChange= {({ target }) => setCurrentUser({...currentUser, name: target.value})}
                      className="form_input"
                  />
                  <div>
                      <Button className="mt-5" type='submit'>
                          Update Settings...
                      </Button>
                  </div>
              </form>
          </div>
      </div>
      </>
  );
}
  

  export default Account