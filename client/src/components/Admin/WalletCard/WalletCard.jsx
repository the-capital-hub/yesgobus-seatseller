import { Card } from "antd";
import "./WalletCard.scss";

const WalletCard = ({ color = "black", name, balance }) => {
  return (
    <Card
      hoverable
      style={{
        backgroundColor: `${color}`,
      }}
      className="wallet-card-container"
    >
      <div className="flex flex-col gap-1">
        <p className="m-0 text-base">Name</p>
        <p className="m-0 text-lg">{name}</p>
        <p className="m-0 text-base">Balance</p>
        <p className="m-0 text-base">Rs. {balance}</p>
      </div>
    </Card>
  );
};

export default WalletCard;
