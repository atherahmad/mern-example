import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Layout, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import styles from "./styles";
import {useNavigate } from "react-router-dom";
import useAuth from "../../context/auth/useAuth";


const { Title } = Typography;
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    email:"",
    password:"",
    confirmPassword:"",
    username:""
                }) 

  const {signIn, signUp, error, resetError, isAuthenticated} = useAuth()

  useEffect(()=>{
    if(isAuthenticated) navigate("/")
  })
 

  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const onSubmit = (e) => {
    

    if(isLogin)
    signIn(userData, navigate)
    else signUp(userData, navigate)
  } 

   const changeHandler = (e) =>{
    const elementName = e.target.name;
    const value = e.target.value;
    resetError()

    setUserData(oldState=>{return {...oldState, [elementName]: value }})
  } 


  return (
    <Layout style={styles.container}>
      <Card
        style={styles.card}
        title={
          <Title level={4} style={{ textAlign: "center" }}>
            {isLogin ? "Login to" : "Join"} Instaverse
          </Title>
        }
      >
        <Form
          name="authform"
          form={form}
          size="large"
          wrapperCol={{ span: 20, offset: 2 }}
          
          onFinish={onSubmit}
          > 
          
          {isLogin || (
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" onChange={changeHandler} name="username" />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-mail address" onChange={changeHandler} name="email"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              onChange={changeHandler} 
              name="password"
            />
          </Form.Item>
          {isLogin || (
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please repeat your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
                onChange={changeHandler} 
                name="confirmPassword"
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isLogin ? "Login" : "Join"}
            </Button>
            
            <span style={{ margin: "0 10px 0 20px" }}>Or</span>
            <Button type="link" onClick={switchMode}>
              {isLogin ? "register now!" : "have an account?"}
            </Button>
          </Form.Item>
        </Form>
        {error? <p>{error}</p>:null}
      </Card>
    </Layout>
  );
};

export default AuthForm;
