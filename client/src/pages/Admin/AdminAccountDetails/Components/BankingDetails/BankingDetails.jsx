import { Input, InputNumber, Radio, Form } from "antd";

export default function BankingDetails() {
  return (
    <div className="">
      <p className="text-xl text-primary mb-3">Banking Details</p>
      <div className="form-card rounded-lg">
        <header className="px-5 md:px-5 py-5 border-0 border-b border-solid border-[#b6b6b6]">
          <p className="text-xl font-semibold">Enter Account Details</p>
        </header>

        {/* Account Type */}
        {/* <div className="account-type flex flex-col md:flex-row items-center gap-5 px-5 pt-7">
          <p className="text-xl font-medium m-0">Account Type</p>

          <Radio.Group
            defaultValue="Savings"
            buttonStyle="solid"
            name="accountType"
            className="custom-radio-group"
          >
            <Radio.Button
              value="Savings"
              style={{ borderRadius: "10rem", paddingInline: "3rem" }}
            >
              Savings
            </Radio.Button>
            <Radio.Button
              value="Current"
              style={{ borderRadius: "10rem", paddingInline: "3rem" }}
            >
              Current
            </Radio.Button>
          </Radio.Group>
        </div> */}

        <div className="flex items-center flex-wrap gap-x-10 gap-y-2 px-5 py-5">
          {/* Account Holder Name */}
          <Form.Item
            label={"Account Holder Name"}
            name="accHolderName"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Account Number */}
          <Form.Item
            label={"Account Number"}
            name="bankAccNum"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          {/* Confirm Account Number */}
          <Form.Item
            label={"Confirm Account Number"}
            name="confirmAccountNumber"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          {/* IFSC code */}
          <Form.Item
            label={"IFSC Code"}
            name="ifsc"
            className="custom-form-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}
