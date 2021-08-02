

import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';


// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import HeaderComponent from '../../Components/HeaderComponent';
import './layout.css'
import { NavLink } from 'react-router-dom';
// import SideBar from '../sidebar';
/**
* @author
* @function Layout
**/

const Layout = (props) => {
  const[sidebarOpen,setsidebarOpen]=useState(false);
  const Toggle=(x)=>{
    setsidebarOpen(x);
  }
  return(
    <>
       <HeaderComponent value={sidebarOpen} onChange={Toggle}/>
       {
         props.sidebar ?
         <Container fluid>
          
            {sidebarOpen?
            <Row >
              <Col md={2} className="sidebar">
                <ul>
                  <li></li>
                  <li><NavLink exact to={`/`}>Home</NavLink></li>
                  <li><NavLink to={`/page`}>Page</NavLink></li>
                  <li><NavLink to={`/category`}>Category</NavLink></li>
                  <li><NavLink to={`/products`}>Products</NavLink></li>
                  <li><NavLink to={`/orders`}>Orders</NavLink></li>
                </ul>
              </Col>
              <Col md={10} style={{ marginLeft: 'auto', paddingTop: '20px' }}>
                {props.children}
              </Col>
            </Row>
             :
            <Row >
              <Col md={10} style={{ marginLeft: '0px', paddingTop: '20px' }}>
                {props.children}
              </Col>
            </Row>}   
            
          
        </Container>
        :
        props.children
       }
       
    </>
    )

 }

export default Layout