import { Card } from "antd";
import "./VirtualCard.scss";

export default function VirtualCard({ color, name, balance }) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: "1rem",
        flex: "0 0 16rem",
        backgroundColor: `${color}`,
        color: "#fff",
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="m-0 text-base">Name</p>
        <p className="m-0 text-lg">{name}</p>
        <p className="m-0 text-base">Balance</p>
        <p className="m-0 text-base">Rs. {balance}</p>
      </div>
    </Card>
  );
}
