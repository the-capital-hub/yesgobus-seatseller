import { Button, Card, Col, Row } from "antd";
import "./AdminAccountDetails.scss";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function AdminAccountDetails() {
  const navigate = useNavigate();

  return (
    <div className="admin-user-details-wrapper">
      <div className="details-container flex flex-col gap-7 py-3 lg:py-10 px-3 lg:px-20">
        <Button
          type="text"
          htmlType="button"
          size="large"
          className="back-btn"
          onClick={() => navigate(-1)}
          style={{ padding: "0" }}
        >
          <LuChevronLeft /> Back
        </Button>

        <form className="">
          {/* Personal Details */}
          <div className="">
            <p className="text-xl text-primary mb-5">Personal Details</p>
            <Card
              title={"Enter Your Details"}
              headStyle={{ borderBottom: "1px solid #B6B6B6" }}
              bordered={false}
              className="form-card"
            ></Card>
          </div>
        </form>
      </div>
    </div>
  );
}
