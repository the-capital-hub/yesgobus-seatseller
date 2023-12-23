import { Col, Row } from "antd";
import "./AdminLogin.scss";

export default function AdminLogin() {
  return (
    <div className="" style={{ height: "100dvh" }}>
      <Row justify={"center"} align={"stretch"}>
        <Col span={24} xl={{ span: 12, offset: 6 }}>
          <div className="login-container">
            <h1>Welcome Back!</h1>
            <p>Login here</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
