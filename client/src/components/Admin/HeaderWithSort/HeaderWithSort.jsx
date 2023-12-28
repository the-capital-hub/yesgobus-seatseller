import { Button, Dropdown } from "antd";
import "./HeaderWithSort.scss";
import { TbSortDescending } from "react-icons/tb";
import UserIcon from "../../SvgIcons/UserIcon";
import NotificationIcon from "../../SvgIcons/NotificationIcon";

const items = [
  {
    key: "1",
    label: <span>Amount</span>,
  },
  {
    key: "2",
    label: <span>Date</span>,
  },
  {
    key: "3",
    label: <span>Alphabets</span>,
  },
];

const HeaderWithSort = () => {
  return (
    <header className="admin-details-sort m-2 lg:m-3 flex flex-col md:flex-row items-center justify-between">
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        arrow
      >
        <Button
          className="flex items-center"
          icon={<TbSortDescending size="20" />}
        >
          Sort
        </Button>
      </Dropdown>
      {/* User Actions */}
      <div className="icons flex items-center gap-5">
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
          <UserIcon />
        </div>
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
          <NotificationIcon />
        </div>
      </div>
    </header>
  );
};

export default HeaderWithSort;
