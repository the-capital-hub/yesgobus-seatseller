import { Button, Form, Image, Input } from "antd";
import "./ResetPassword.scss";
import { WatermarkIcon } from "../../assets/contact";
import { useState } from "react";

export default function ResetPassword() {
  const [form] = Form.useForm();

  // Local states
  const [loading, setLoading] = useState(false);

  function handlePasswordSubmit(values) {
    console.log(values);
  }

  return (
    <div className="reset-password-wrapper">
      <div className="h-screen max-w-lg mx-auto">
        <div className="grid px-3 pt-40 md:pt-32">
          <Form
            form={form}
            onFinish={handlePasswordSubmit}
            layout="vertical"
            className="grid gap-4"
            initialValues={{
              newPassword: "",
              confirmNewPassword: "",
            }}
            size="large"
            requiredMark="optional"
          >
            {/* Logo */}
            <div className="text-center">
              <Image
                src={WatermarkIcon}
                alt="YesGoBus Tour and Travel"
                width={250}
                preview={false}
              />
            </div>
            <h2 className="font-normal">Reset Password</h2>
            <div className="">
              {/* New Password */}
              <Form.Item
                label="New Password"
                name="newPassword"
                className="custom-form-item"
                rules={[
                  {
                    required: true,
                    message: "New Password is required.",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Enter New Password" />
              </Form.Item>
              {/* Confirm New Password */}
              <Form.Item
                label="Confirm Password"
                name="confirmNewPassword"
                className="custom-form-item"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm the New Password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Confirm New Password" />
              </Form.Item>
            </div>

            {/* Submit */}
            <Button htmlType="submit" type="primary" loading={loading}>
              Reset
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
