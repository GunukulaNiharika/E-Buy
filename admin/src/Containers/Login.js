import React, {  useState } from 'react'
import { Form } from 'react-bootstrap';
import { Card,  Button, Container } from 'react-bootstrap';
import FromInput from '../UI/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth_actions';
import { Redirect } from 'react-router-dom';
import Background from '../images/login_bg.jpeg';
import {useWindowDimensions} from '../shared/Dimensions';

/**
* @author
* @function Login
**/


const Login = (props) => {
  const [email,setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError] = useState('');
  const {height, width}= useWindowDimensions();

  const auth=useSelector(state=>state.auth);

  const dispatch = useDispatch();

  const handleLogin=(e)=>{
    e.preventDefault();
    const user={
      email,password
    }
    dispatch(login(user));
  }
  if(auth.authenticate){
    return <Redirect to="/" />
  }

 
  return(
    
    <div style = {{  backgroundImage: `url(${ Background })`,
    backgroundSize: 'cover', position: 'fixed',margin:'0px', 
    width: '100%', height:`${height}px`, zIndex:'0' }} >
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
    </div>
   
   )

 }

export default Login