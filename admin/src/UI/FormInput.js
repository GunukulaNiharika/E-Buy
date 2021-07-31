import React from 'react'
import { Form } from 'react-bootstrap';
/**
* @author
* @function FromInput
**/

const FromInput = (props) => {
  return(
    <Form.Group >
        <Form.Control type={props.type} placeholder={props.placeholder}
            value={props.vale} onChange={props.onChange}></Form.Control>
        <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
    </Form.Group>
   )

 }

export default FromInput