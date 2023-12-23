import { Button, Col, Row } from "antd";
import "./AdminAccountDetails.scss";
import { LuChevronLeft } from "react-icons/lu";

export default function AdminAccountDetails() {
  return (
    <div className="admin-user-details-wrapper">
      <Row>
        <Col
          span={24}
          xl={{ span: 20, offset: 2 }}
          xxl={{ span: 16, offset: 4 }}
        >
          <div className="details-container">
            <Button
              type="text"
              htmlType="button"
              size="large"
              className="back-btn"
            >
              <LuChevronLeft /> Back
            </Button>

            <form className=""></form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
