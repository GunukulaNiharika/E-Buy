import React, { useState } from 'react'
import Layout from '../../Components/Layout/layout'
import { Row, Col, Button, Table } from 'react-bootstrap';
import {BiAddToQueue} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import FromInput from '../../UI/FormInput';
import { addProduct } from '../../actions/product_actions';
import NewModal from '../../UI/Modal/Modal';
import { generatePublicUrl } from '../../helpers/baseURL';
import './product.css';
/**
* @author
* @function Product
**/

const Product = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setproductDetailModal] = useState(false);
  const [productDetail, setproductDetail] = useState(null);

  const category=useSelector(state=>state.category);
  const product=useSelector(state=>state.product);


  const handleProductPictures=(e)=>{

    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productpicture", pic);
    }

    dispatch(addProduct(form));
    setShow(false)
  };

  const handleCloseProductModal = () => {setproductDetailModal(false)};
  const handleShow = () => {setShow(true)};
  const createCategoryList =(categories, options = []) => {
    for(let category of categories){
      options.push({value: category._id, name: category.name});
      if(category.children.length>0){
        createCategoryList (category.children, options);
      }
    }
    return options;
  }

  const renderAddProductModal = () =>{
    return (
      <NewModal size={"md"} show={show} handleClose={handleClose} Title={"ADD PRODUCTS"}>
      <Row>
          <Col className="mt-2 col-12" >
              <FromInput
                  value={name}
                  placeholder={`Product Name`}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control-sm col-md-12"
              />
          </Col>
          <Col className="mt-2 col-12" >
              <FromInput
                  value={quantity}
                  placeholder={`Quantity`}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control-sm col-md-12"
              />
          </Col>
          <Col className="mt-2 col-12" >
              <FromInput
                  value={price}
                  placeholder={`Product Price`}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control-sm col-md-12"
              />
          </Col>
          <Col className="mt-2 col-12" >
              <FromInput
                  value={description}
                  placeholder={`Product description`}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control-sm col-md-12"
              />
          </Col>
          <Col className="mt-2 col-12">
              <select
                  className="form-control form-control-sm"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}>
                  <option>select Category</option>
                  {
                    createCategoryList(category.categories).map(option=>
                      <option key={option.value} value={option.value}>{option.name}</option>)
                  }
              </select>
          </Col>
        </Row>
        <Row>
          {productPictures.length > 0 ? 
          productPictures.map((pic,index)=><div key={index}>{pic.name}</div>):null}
            <Col className="mt-2 col-12">
                <input type="file" multiple='multiple' name="productpicture" onChange={handleProductPictures} />
            </Col>
        </Row>
      </NewModal>
    );
  }
  const showProductDetailsModal = (product) =>{
    setproductDetail(product);
    setproductDetailModal(true);
  } 

  const renderShowProductDetailModal = () => {
    if(!productDetail){
      return null;
    }
    return(
      <NewModal size={'lg'} show={productDetailModal} handleClose={handleCloseProductModal} Title={'PRODUCT DETAILS'}> 
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetail.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetail.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetail.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetail.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetail.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetail.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  }
 
  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button onClick={() => showProductDetailsModal(product)}>
                      info
                    </button>
                    {/* <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button> */}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  return(
    <Layout sidebar>
      <Row>
        <Col className="col-md-10">PRODUCTS</Col>
        <Col className="col-md-2 ">
          <Button className="btn btn-lg btn-dark ml-auto" onClick={handleShow} ><BiAddToQueue/></Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <ul>
          {renderProducts()}
        </ul>
      </Row>
        {renderAddProductModal()}
        {renderShowProductDetailModal()}
    </Layout>
   )

 }

export default Product