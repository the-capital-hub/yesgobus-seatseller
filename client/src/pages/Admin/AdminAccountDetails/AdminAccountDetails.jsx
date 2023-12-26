import { Button, Form, Spin } from "antd";
import "./AdminAccountDetails.scss";
import { LuChevronLeft } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import BankingDetails from "./Components/BankingDetails/BankingDetails";
import { useEffect, useState } from "react";
import { agentRegisterAPI } from "../../../api/admin";

const INITIAL_FORMDATA = [
  {
    name: ["firstName"],
    value: "",
  },
  {
    name: ["lastName"],
    value: "",
  },
  {
    name: ["phNum"],
    value: "",
  },
  {
    name: ["email"],
    value: "",
  },
  {
    name: ["pincode"],
    value: "",
  },
  {
    name: ["accHolderName"],
    value: "",
  },
  {
    name: ["bankAccNum"],
    value: "",
  },
  {
    name: ["ifsc"],
    value: "",
  },
];

export default function AdminAccountDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const incomingData = location.state;

  const [fields, setFields] = useState(INITIAL_FORMDATA);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("incomingData", incomingData);
    const { firstName, lastName, phNum, email } = incomingData;
    form.setFieldsValue({
      firstName: firstName,
      lastName: lastName,
      phNum: phNum,
      email: email,
    });
  }, [incomingData, form]);

  async function handleDetailsSubmit(values) {
    console.log("currentValues", values);
    let formData = { ...values, password: incomingData.password };

    try {
      setLoading(true);
      const response = await agentRegisterAPI(formData);
      console.log("register response", response);
    } catch (error) {
      console.error("Error Registering User:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-user-details-wrapper container mx-auto">
      <Spin spinning={loading}>
        <div className="details-container flex flex-col gap-7 py-3 lg:py-10 px-3 lg:px-20">
          <Button
            type="text"
            htmlType="button"
            size="large"
            className="back-btn"
            onClick={() => navigate(-1)}
            style={{ padding: "0", paddingInlineEnd: "0.5rem" }}
          >
            <LuChevronLeft size={25} /> Back
          </Button>
          <Form
            onFinish={handleDetailsSubmit}
            className="flex flex-col gap-10"
            layout="vertical"
            size="large"
            requiredMark="optional"
            form={form}
            fields={fields}
            onFieldsChange={(_, allFields) => {
              setFields(allFields);
            }}
          >
            {/* Personal Details */}
            <PersonalDetails />
            {/* Banking details */}
            <BankingDetails />
            <div className="action-btn self-end">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{ paddingInline: "5rem" }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </div>
  );
}
