import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Card, Col, Flex, Grid, Row, Space, Typography } from "antd";
import axios from "axios";
import { RUPEE } from "../config/config";
import { FaMinusCircle, FaMinusSquare, FaPlusSquare } from "react-icons/fa";

const Cart = () => {
  const params = useParams();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const { Meta } = Card;
  const { sm } = Grid.useBreakpoint();
let [count,setCount] = useState(0)

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  //inistaldetails
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getprodyct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  // const isCartEmpty = cartItems.length === 0;


  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center ">
              {/* {`hello ${auth.token && auth?.user?.name}`}  */}
              Cart Page
            </h1>
          </div>
          <Row>
            <Col lg={14} xs={24}>
              <h2>Product details</h2>
              <Card style={{ marginBottom: 20 }}>
                <Flex justify="space-between" align="flex-start">
                  <Meta
                    avatar={
                      <Avatar
                        style={{
                          width: sm ? 100 : 64,
                          height: sm ? 100 : 64,
                          borderRadius: 0,
                        }}
                        src="/images/daypacks.png"
                      alt="img"
                      />
                    }
                    title={
                      <Typography.Paragraph style={{ textWrap: "balance" }}>
                        {product.name}School Bag
                      </Typography.Paragraph>
                    }
                    // description={<AddToCart id={item.id} />}
                    style={{ maxWidth: "60%", minWidth: 200 }}
                  />
                  <Space wrap>
                    <Typography.Text strong>
                      {RUPEE}2500
                      {product.selling_price}
                      {/* {item.price * item.quantity} */}
                    </Typography.Text>
                    <Typography.Text delete type="secondary">
                      {/* {RUPEE} */}
                      {/* {item.mrp * item.quantity} */}
                    </Typography.Text>
                  </Space>
                  
                </Flex>
                <div style={{marginTop:10}}>
                <Flex align="center" justify="center" >
                  <Typography.Text strong style={{margin:"0 10px"}}>Add Number of Products</Typography.Text>
                  <FaMinusSquare onClick={()=>setCount(count--)} size={24}/>
                  <span style={{margin:"0 7px"}}>{count}</span>
                  {/* <Button onClick={() => setCount(count++)}>+</Button> */}
                  <FaPlusSquare onClick={() => setCount(count++)} size={'24px'}/>
                </Flex>
                </div>
              </Card>
            </Col>
            <Col lg={2}></Col>
            <Col lg={8} xs={24}>
              <div>
                <h2>Amount checkout</h2>
                <Row style={{ border: "1px solid #f0f0f0",padding:30 }}>
                  <Col span={12}>
                    <Typography.Text>Total Price : </Typography.Text>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Typography.Text strong>
                      {RUPEE} {eval(`2500* ${count}`)}
                      {/* {total.price} */}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>Discount : </Typography.Text>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Typography.Text strong>
                      - {RUPEE} {eval(`100* ${count}`)}
                      {/* {total.price} */}
                    </Typography.Text>
                  </Col>
                  {/* <devider/> */}
                  
                  <Col span={12} style={{margin:"20px 0"}}>
                    <Typography.Text>Order Price : </Typography.Text>
                  </Col>
                  <Col span={12} style={{ textAlign: "right",margin:"20px 0" }}>
                    <Typography.Text strong>
                    {RUPEE} {` ${2500 * count - 100 * count} `}
                      {/* {total.price} */}
                    </Typography.Text>
                  </Col>
                 
                  <Col span={24}>
                    <Button style={{background:"black",color:"white",borderRadius:5}} block>Checkout</Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
