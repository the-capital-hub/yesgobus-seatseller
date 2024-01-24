import { Button, Divider, Input, Select, Space } from "antd";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const DEFAULT_LIMITS = [
  { value: 0, label: "0" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

export default function LimitSelect({ record }) {
  let { maxTicket, agentId } = record;

  const [items, setItems] = useState(() => {
    if (!maxTicket) {
      return DEFAULT_LIMITS;
    }

    let labelsArray = DEFAULT_LIMITS.map(({ label }) => {
      return label;
    });

    if (!labelsArray.includes(String(maxTicket))) {
      return [
        ...DEFAULT_LIMITS,
        { value: +maxTicket, label: String(maxTicket) },
      ];
    }

    return DEFAULT_LIMITS;
  });
  const [selectedLimit, setSelectedLimit] = useState();
  const [newLimit, setNewLimit] = useState();
  const [open, setOpen] = useState();
  const inputRef = useRef(null);

  function handleNewLimitChange(e) {
    setNewLimit(e.target.value);
  }

  function addNewItem(e) {
    e.preventDefault();

    if (!newLimit) {
      return;
    }

    let customLimitItem = {
      value: newLimit,
      label: String(newLimit),
    };

    setItems([...items, customLimitItem]);
    setSelectedLimit(String(newLimit));
    setNewLimit("");
    setOpen(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  // Handle TicketSelect change
  function handleTicketLimitChange(value, agentId) {
    setSelectedLimit(String(value));
    console.log(value, agentId);
  }

  return (
    <Select
      style={{
        width: 300,
      }}
      open={open}
      defaultValue={maxTicket ? String(maxTicket) : "0"}
      value={selectedLimit}
      onChange={(value) => handleTicketLimitChange(value, agentId)}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          <Space
            style={{
              padding: "0 8px 4px",
            }}
          >
            <Input
              placeholder="Custom Limit"
              ref={inputRef}
              value={newLimit}
              onChange={handleNewLimitChange}
              onKeyDown={(e) => e.stopPropagation()}
              type="number"
            />
            <Button type="text" icon={<FaPlus />} onClick={addNewItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items}
    />
  );
}
