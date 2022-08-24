import React, { useEffect } from "react";
import { Col, Row, Spin } from "antd";
import Story from "../Story/Story.js";
import useAuth from "../../context/auth/useAuth.js";
import useStory from "../../context/stories/useStory.js";


 const StoryList = ({ setSelectedId }) => {


  const {isAuthenticated} = useAuth()
  const {stories, getStories} = useStory()

  useEffect(()=>{
    if(isAuthenticated) getStories()
  }, [])
  return !isAuthenticated? (
    <div
      style={{
        textAlign: "center",
      }}
    >

      {!isAuthenticated?<Spin size="large" />: null}
    </div>
  ) : (
    <Row gutter={[48, 32]}>
      {stories.map((story) => (
        <Col key={story._id} xl={12} lg={24} xxl={8}>
          <Story story={story} setSelectedId={setSelectedId} />
        </Col>
      ))}
    </Row>
  );
};

export default StoryList;
