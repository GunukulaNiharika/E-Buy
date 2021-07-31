import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { Card,  Button } from 'react-bootstrap';
import FromInput from '../UI/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { IsUserLoggedIn, loginRequest } from '../actions/auth_actions';
import { Redirect } from 'react-router-dom';
/**
* @author
* @function Login
**/
// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Login = (props) => {
  const [email,setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError] = useState('');
  const auth=useSelector(state=>state.auth);

  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(IsUserLoggedIn())
    }
  },[])
  const handleLogin=(e)=>{
    e.preventDefault();
    const user={
      email,password
    }
    dispatch(loginRequest(user));
  }
  if(auth.authenticate){
    return <Redirect to="/" />
  }
  return(
    <div className="card-center">
      <Card className="card"style={{ width: '25rem' }}>
        <Card.Header className="card-header" >Login</Card.Header>
        <Card.Body>
          
          <Form onSubmit={handleLogin}>
              <FromInput
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
              />

              <FromInput
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
   )

 }

export default Login