import { Alert, Button, ConfigProvider, Form, Input, Modal } from "antd";
import { useState } from "react";

export default function ForgotPassword() {
  const [form] = Form.useForm();

  // State for forgot password
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState({ message: "", type: "" });

  function showModal() {
    setOpen(true);
  }

  function handleSendLink() {
    form.submit();
  }

  function handleCancel() {
    setOpen(false);
  }

  function handleEmailSubmit(values) {
    console.log(values);
  }

  return (
    <div className="forgot-password">
      <ConfigProvider
        theme={{
          token: {
            colorLink: "#fd5901",
          },
        }}
      >
        <Button
          htmlType="button"
          type="link"
          className="link-button"
          onClick={showModal}
        >
          Forgot Password?
        </Button>
      </ConfigProvider>

      <Modal
        title="Forgot Password"
        open={open}
        onOk={handleSendLink}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Send Link"
        width={600}
      >
        <Form
          form={form}
          onFinish={handleEmailSubmit}
          layout="vertical"
          className="space-y-4"
          initialValues={{
            email: "",
          }}
          size="large"
          requiredMark="optional"
        >
          <h2 className="font-normal">
            Enter your email and we&apos;ll send a link to reset password
          </h2>
          {/* Email */}
          <Form.Item
            name="email"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
              {
                type: "email",
                message: "Please enter a valid Email Address",
              },
            ]}
            hasFeedback
          >
            <Input type="email" placeholder="Enter email address" />
          </Form.Item>

          {/*Error Alert message */}
          {error.message && <Alert message={error.message} type={error.type} />}
        </Form>
      </Modal>
    </div>
  );
}
