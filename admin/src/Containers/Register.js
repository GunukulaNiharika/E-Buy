import React from 'react'
import { Card, Col, Row,  Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import FromInput from '../UI/FormInput';
/**
* @author
* @function Register
**/

const Register = (props) => {
  return(
    <div className="card-center">
      <Card className="card"style={{ width: '25rem' }}>
        <Card.Header className="card-header" >Login</Card.Header>
        <Card.Body>
        <Form >
              <Row>
                <Col md={6}>
                  <FromInput
                    placeholder="First Name"
                    value=""
                    type="text"
                    onChange={()=>{}}
                  />
                </Col>
                <Col md={6}>
                  <FromInput
                    placeholder="Last Name"
                    value=""
                    type="text"
                    onChange={()=>{}}
                  />
                </Col>
              </Row>
              <FromInput
                placeholder="Username"
                value=""
                type="username"
                onChange={()=>{}}
              />
              <FromInput
                placeholder="Email"
                value=""
                type="email"
                onChange={()=>{}}
              />

              <FromInput
                placeholder="Password"
                value=""
                type="password"
                onChange={()=>{}}
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

export default Register