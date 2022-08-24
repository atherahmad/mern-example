import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import StoryForm from "../StoryForm/StoryForm.js";
import StoryList from "../StoryList/StoryList.js";
import styles from "./styles";
import { StoryProvider } from "../../context/stories/storyContext.js";


const { Sider, Content } = Layout;

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);
  
  return (
    <Layout>
      <StoryProvider>
      <Sider
        width={400}
        style={styles.sider}
        // breakpoint="md"
        // collapsedWidth="0"
      >

          <StoryForm selectedId={selectedId} setSelectedId={setSelectedId} />
      </Sider>
      <Content style={styles.content}>
          <StoryList setSelectedId={setSelectedId} />
     
      </Content>
        </StoryProvider>
    </Layout>
  );
};

export default Home;
