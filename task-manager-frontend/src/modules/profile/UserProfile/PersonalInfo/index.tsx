import { useState } from "react";
import { Form, Col, Input, Button } from "antd";
import AppRowContainer from "@crema/components/AppRowContainer";
import { useDropzone } from "react-dropzone";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import {
  StyledInfoUpload,
  StyledInfoUploadAvatar,
  StyledInfoUploadBtnView,
  StyledInfoUploadContent,
} from "./index.styled";
import { StyledUserProfileGroupBtn } from "../index.styled";

const PersonalInfo = () => {
  const { user } = useAuthUser();

  const [userImage, setUserImage] = useState("/assets/images/placeholder.jpg");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const onReset = () => {
    setUserImage("/assets/images/placeholder.jpg");
  };

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        ...user,
        userImage: user.photoURL
          ? user.photoURL
          : "/assets/images/placeholder.jpg",
      }}
    >
      <StyledInfoUpload>
        <StyledInfoUploadAvatar src={userImage} />

        <StyledInfoUploadContent>
          <StyledInfoUploadBtnView>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <label htmlFor="icon-button-file">
                <Button type="primary">Tải lên</Button>
              </label>
            </div>
            <Button onClick={onReset}>Đặt lại</Button>
          </StyledInfoUploadBtnView>
          <p>Chỉ hỗ trợ định dạng JPG, GIF hoặc PNG. Dung lượng tối đa 800kB</p>
        </StyledInfoUploadContent>
      </StyledInfoUpload>
      <AppRowContainer gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="displayName"
            rules={[
              { required: true, message: "Vui lòng nhập Họ và tên!" },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập Tên đăng nhập!" },
            ]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ Email!" },
            ]}
          >
            <Input type="text" placeholder="Email" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="company"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
          >
            <Input type="text" placeholder="Công ty" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <StyledUserProfileGroupBtn
            shouldUpdate
            className="user-profile-group-btn"
          >
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
            <Button>Hủy</Button>
          </StyledUserProfileGroupBtn>
        </Col>
      </AppRowContainer>
    </Form>
  );
};

export default PersonalInfo;
