import { Button, Card, Col, Form, Input, InputNumber, Radio, Row } from "antd";
import "./AdminAccountDetails.scss";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import BankingDetails from "./Components/BankingDetails/BankingDetails";

export default function AdminAccountDetails() {
  const navigate = useNavigate();

  async function handleDetailsSubmit(e) {
    e.preventDefault();
    console.log("Submitted");
  }

  return (
    <div className="admin-user-details-wrapper container mx-auto">
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
    </div>
  );
}
