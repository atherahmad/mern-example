import React, { useEffect } from "react";
import { Card, Form, Input, Typography, Button } from "antd";
import styles from "./styles";
import FileBase64 from "react-file-base64";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";


import { Link } from "react-router-dom";
import useAuth from "../../context/auth/useAuth";
import useStory from "../../context/stories/useStory";

const { Title } = Typography;

const StoryForm = ({ selectedId, setSelectedId }) => {
  const [form] = Form.useForm();

  const {createStory} = useStory()

  const story = null; // context is required
  
  const {user, isAuthenticated} = useAuth()
  const username = user?.username;

  useEffect(() => {
    if (story) form.setFieldsValue(story);
  }, [form, story]);

  const onSubmit = (formValues) => {
    createStory(formValues)
/*     selectedId
      ? dispatch(
          updateStory(selectedId, {
            ...formValues,
            username,
          })
        )
      : dispatch(createStory({ ...formValues, username })); */
    reset();
  };

  const reset = () => {
    form.resetFields();
    setSelectedId(null);
  };

  if (!isAuthenticated) {
    return (
      <Card style={styles.formCard}>
        <Title level={4}>
          <span style={styles.formTitle}> Welcome to InstaBesties !</span>
          <br />
          Please <Link to="/authform">login</Link> or{" "}
          <Link to="/authform">register</Link> for sharing instant moments or
          ideas.
        </Title>
      </Card>
    );
  }

  return (
    <Card
      style={styles.formCard}
      title={
        <Title level={4} style={styles.formTitle}>
          {selectedId ? "Editing" : "Share"} a Story
        </Title>
      }
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        size="middle"
        onFinish={onSubmit}
      >
        <Form.Item name="caption" label="Caption" rules={[{ required: true }]}>
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Input allowClear />
        </Form.Item>
        <Form.Item name="image" label="Story Pic" rules={[{ required: true }]}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={(e) =>
              form.setFieldsValue({
                image: e.base64,
              })
            }
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6,
          }}
        >
          <Button
            type="primary"
            block
            htmlType="submit"
            icon={<SendOutlined />}
          >
            Share
          </Button>
        </Form.Item>
        {!selectedId ? null : (
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 6,
            }}
          >
            <Button
              type="primary"
              block
              htmlType="button"
              onClick={reset}
              icon={<CloseOutlined />}
              danger
            >
              Discard
            </Button>
          </Form.Item>
        )}
      </Form>
    </Card>
  );
};

export default StoryForm;
