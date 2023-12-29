import { Button, Form, Spin, message } from "antd";
import "./AdminAccountDetails.scss";
import { LuChevronLeft } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import BankingDetails from "./Components/BankingDetails/BankingDetails";
import { useEffect, useState } from "react";
import { agentRegisterAPI } from "../../../api/admin";

export default function AdminAccountDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const incomingData = location.state;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // local states
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (incomingData) {
      setLoading(false);
    }
    console.log(incomingData);
  }, [incomingData]);

  async function handleDetailsSubmit(values) {
    let { confirmAccountNumber, ...formData } = {
      ...values,
      password: incomingData.password,
      userId: incomingData.userId,
    };

    // console.log("formData", formData);

    try {
      setLoading(true);
      console.log(formData);
      await agentRegisterAPI(formData);
      // const response = await agentRegisterAPI(formData);
      // console.log("register response", response);
      messageApi.open({
        type: "success",
        content: "Your account request has been sent. Please wait for admin approval.",
        duration: 2,
      });
      
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (error) {
      console.error("Error Registering User:", error.response.data.message);
      if (error.response.data.message === "Yesgobus account doesnot exists") {
        messageApi.open({
          type: "error",
          content: "Yesgobus account user id doesnot exists.",
          duration: 3,
        });
      } else if (error.response.data.message === "Agent already exists") {
        messageApi.open({
          type: "error",
          content: "Agent already exists.",
          duration: 3,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Error Submitting Registration. Please try again.",
          duration: 3,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
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

            {/* Form */}
            <Form
              onFinish={handleDetailsSubmit}
              className="flex flex-col gap-10"
              layout="vertical"
              size="large"
              requiredMark="optional"
              form={form}
              initialValues={{
                firstName: incomingData?.firstName || "",
                lastName: incomingData?.lastName || "",
                phNum: incomingData?.phNum || "",
                email: incomingData?.email || "",
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
    </>
  );
}
