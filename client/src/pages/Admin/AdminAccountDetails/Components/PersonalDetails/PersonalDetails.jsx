import { Form, Input, InputNumber } from "antd";

export default function PersonalDetails() {
  return (
    <div className="">
      <p className="text-xl text-primary mb-3">Personal Details</p>
      <div className="form-card rounded-lg">
        <header className="px-5 py-5 border-0 border-b border-solid border-[#b6b6b6]">
          <p className="text-xl font-semibold">Enter Your Details</p>
        </header>

        <div className="flex items-center flex-wrap gap-x-10 gap-y-2 px-5 md:px-5 py-5">
          {/* first name */}
          <Form.Item
            label={"First Name"}
            name="firstName"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
              {
                whitespace: true,
              },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          {/* last name */}
          <Form.Item
            label={"Last Name"}
            name="lastName"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
              {
                whitespace: true,
              },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          {/* Mobile */}
          <Form.Item
            label={"Mobile"}
            name="phNum"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid Phone Number",
              },
            ]}
            hasFeedback
          >
            <Input type="tel" />
          </Form.Item>
          {/* Email */}
          <Form.Item
            label={"Email"}
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
            <Input type="email" />
          </Form.Item>
          {/* Pincode */}
          <Form.Item
            validateFirst
            label={"Pincode"}
            name="pincode"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}
