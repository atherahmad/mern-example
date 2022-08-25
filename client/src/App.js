import React from "react";
import { Layout } from "antd";
import Home from "./components/Home/Home.js";
import styles from "./styles";
import AppBar from "./components/AppBar/AppBar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm.js";
import { AuthProvider } from "./context/auth/authContext.js";
import Posts from "./components/Posts/Posts.js";
import { PostProvider } from "./context/posts/PostContext.js";

const { Footer } = Layout;

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout style={styles.layout}>
          <AppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authform" element={<AuthForm />} />
            <Route path="/posts" element={<PostProvider><Posts /></PostProvider>} />

          </Routes>
          <Footer style={styles.footer}>2022 InstaBesties</Footer>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
