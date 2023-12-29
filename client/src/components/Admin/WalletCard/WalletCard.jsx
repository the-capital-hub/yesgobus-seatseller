import { Card } from "antd";

const WalletCard = ({ color = "black", name, balance }) => {
  return (
    <Card
      hoverable
      style={{
        borderRadius: "1rem",
        width: "19rem",
        backgroundColor: `${color}`,
        color: "#fff",
      }}
      className="wallet-card-container"
    >
      <p className="m-0 text-base">Name</p>
      <p className="m-0 text-lg">{name}</p>
      {/* <p className="m-0 text-base">
        {Array(3)
          .fill(0)
          .map((_, index) => {
            return (
              <span
                style={{ letterSpacing: "0.5ch" }}
                className="me-5"
                key={index}
              >
                &#8226;&#8226;&#8226;&#8226;
              </span>
            );
          })}
        <span>1234</span>
      </p> */}
      <p className="m-0 text-base">Balance</p>
      <p className="m-0 text-base">Rs. {balance}</p>
    </Card>
  );
};

export default WalletCard;
