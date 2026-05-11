import { Button, Col, Form, Input } from "antd";
import AppRowContainer from "@crema/components/AppRowContainer";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  StyledUserProfileForm,
  StyledUserProfileFormTitle,
  StyledUserProfileGroupBtn,
} from "../index.styled";

const ChangePassword = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledUserProfileForm
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <StyledUserProfileFormTitle>
        <IntlMessages id="userProfile.changePassword" />
      </StyledUserProfileFormTitle>
      <AppRowContainer gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="oldPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} />
        <Col xs={24} md={12}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu mới!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  console.log(rule);
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Mật khẩu xác nhận không khớp!",
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
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
    </StyledUserProfileForm>
  );
};

export default ChangePassword;
