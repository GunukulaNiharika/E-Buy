import React, { useState } from 'react'
import Layout from '../../Components/Layout/layout'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { get_categories, addCategory } from '../../actions/category_actions';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import './category.css'
import {BiAddToQueue} from 'react-icons/bi';
// import {
//   IoIosCheckboxOutline,
//   IoIosCheckbox,
//   IoIosArrowForward,
//   IoIosArrowDown,
//   IoIosAdd,
//   IoIosTrash,
//   IoIosCloudUpload
// } from 'react-icons/io'
/**
* @author
* @function Category
**/

const Category = (props) => {

  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

const [show, setShow] = useState(false);
const handleClose = () => {
  const form= new FormData();
  form.append('name',categoryName);
  if(parentCategoryId!="")
  form.append('parentId',parentCategoryId);
  form.append('categoryImage',categoryImage);
  dispatch(addCategory(form))
  // const cat={
  //   categoryName,
  //   parentCategoryId,
  //   categoryImage
  // };
  setShow(false)};
const handleShow = () => {setShow(true)};

const category=useSelector(state=>state.category);
const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(get_categories())
  },[]);

  const renderCategories =( categories) =>{

    let mycategories=[];
    for(let category of categories){
      mycategories.push(
        <li key={category._id}>
          {category.name}
          {category.children.length>0?
            <ul style={{ listStyleType:'none'}}>
              {renderCategories(category.children)}
            </ul>
            : null
          }
        </li>
      )
    }
    return mycategories;
  }
const createCategoryList =(categories, options = []) => {
  for(let category of categories){
    options.push({value: category._id, name: category.name});
    if(category.children.length>0){
      createCategoryList (category.children, options);
    }
  }
  return options;
}
const handleCategoryImage=(e)=>{
  setCategoryImage(e.target.files[0]);
}

  return(
    <Layout sidebar>
      <Row>
        <Col className="col-md-10">CATEGORIES</Col>
        <Col className="col-md-2 ">
          <Button className="btn btn-lg btn-dark ml-auto" onClick={handleShow} ><BiAddToQueue/></Button>
        </Col>
      </Row>
      <Row>
        <ul>
          {renderCategories(category.categories)}
        </ul>
      </Row>
      <Modal
      show={show} onHide={handleClose} animation={false}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ADD CATEGORY
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
        <Col className="mt-2 col-12" >
            <input
                value={categoryName}
                placeholder={`Category Name`}
                onChange={(e) => setCategoryName(e.target.value)}
                className="form-control-sm col-md-12"
            />
        </Col>
        <Col className="mt-2 col-12">
            <select
                className="form-control form-control-sm"
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e.target.value)}>
                <option>select Parent Category</option>
                {
                  createCategoryList(category.categories).map(option=>
                    <option key={option.value} value={option.value}>{option.name}</option>)
                }
            </select>
        </Col>
      </Row>
      <Row>
          <Col className="mt-2 col-12">
              <input type="file" name="categoryImage" onChange={handleCategoryImage} />
          </Col>
      </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-sm btn-dark" onClick={handleClose}>ADD</Button>
      </Modal.Footer>
    </Modal>
      
    </Layout>
   )

 }

export default Category