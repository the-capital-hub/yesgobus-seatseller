import { Button } from "antd";
import TransactionArrow from "../TransactionArrow/TransactionArrow";
import { GoKebabHorizontal } from "react-icons/go";

export default function SideHistory() {
  return (
    <div className="transactions">
      <div className="flex items-center justify-between py-2 px-5">
        <p className="m-0 text-xl">History</p>
        <span className="flex items-center">
          <GoKebabHorizontal size={30} color="#878787" />
        </span>
      </div>
      {[
        { isDebit: true, text: "Transfer" },
        { isDebit: false, text: "Receive" },
      ].map(({ isDebit, text }, index) => {
        return (
          <div
            className="transaction-bar grid grid-cols-2 place-items-center py-2 px-5 border-0 border-t border-solid border-gray-300"
            key={`${text}-${index}`}
          >
            {/* Details */}
            <div className="flex items-center gap-4">
              <TransactionArrow
                backgroundClass={isDebit ? "bg-black" : "bg-gray-200"}
                colorClass={isDebit ? "text-primary" : "text-black"}
                rotateClass={isDebit ? "" : "rotate-180"}
              />
              <div className="">
                <p className="m-0 text-sm">{text}</p>
                <p className="m-0 text-xs text-gray-400">{"Today"}</p>
              </div>
            </div>
            {/* Amount */}
            <p
              className={`m-0 text-base justify-self-end ${
                isDebit ? "text-primary" : ""
              }`}
            >
              {isDebit ? "-" : "+"}Rs.{"3000"}
            </p>
          </div>
        );
      })}
      {/* View All */}
      <span className="flex items-center justify-center py-2 px-5 border-0 border-t border-solid border-gray-300">
        <Button
          htmlType="button"
          type="primary"
          shape="round"
          style={{
            paddingInline: "2rem",
            fontSize: "12px",
          }}
        >
          View all
        </Button>
      </span>
    </div>
  );
}
