import React, { useState } from "react";
import { Card, Tooltip, Typography, Image } from "antd";
import { EditOutlined, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import styles from "./styles";
import moment from "moment";
import useAuth from "../../context/auth/useAuth";
import useStory from "../../context/stories/useStory";
//import { useDispatch } from "react-redux";
//import { deleteStory, likeStory } from "../../actions/stories";

const { Meta } = Card;
const { Link, Paragraph, Text } = Typography;
const Story = ({ story, setSelectedId }) => {
  const [expand, setExpand] = useState(true);
 // const dispatch = useDispatch();
/*   const user = JSON.parse(localStorage.getItem("profile"));
 */
  const {user} = useAuth()
  const {deleteStory, likeStory} = useStory()


  const cardActions = [
    <div style={styles.actions}>
      <Tooltip
        placement="top"
        title="Like "
        color="magenta"
        onClick={() => likeStory(story._id)}
      >
        <HeartTwoTone twoToneColor="magenta" />
        &nbsp; {story.likes.length}
      </Tooltip>
    </div>,
    <Tooltip placement="top" title="Edit">
      <EditOutlined
        //   key="edit"
        onClick={() => {
          setSelectedId(story._id);
        }}
      />
    </Tooltip>,
    <Tooltip placement="top" title="Delete" color="red">
      <DeleteTwoTone
        // key="delete"
        twoToneColor="red"
        onClick={() => deleteStory(story._id)}
      />
    </Tooltip>,
  ];

  return (
    <Card
      style={styles.card}
      cover={<Image src={story.image} />}
      actions={
        user?.id === story.userId
          ? cardActions
          : user.id
          ? cardActions.slice(0, 1)
          : null
      }
    >
      <Meta title={story.username} />

      <Paragraph
        style={{ margin: 0 }}
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: "more",
          onExpand: () => {
            setExpand(true);
          },
          onEllipsis: () => {
            setExpand(false);
          },
        }}
      >
        {story.caption}
      </Paragraph>
      {expand ? (
        <Link href="#">{story.tags.split(" ").map((tag) => `#${tag} `)}</Link>
      ) : null}
      <br />
      <Text type="secondary">{moment(story.postDate).fromNow()}</Text>
    </Card>
  );
};

export default Story;
