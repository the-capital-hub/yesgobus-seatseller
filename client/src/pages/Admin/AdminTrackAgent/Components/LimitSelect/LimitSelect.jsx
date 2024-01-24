import { Button, Divider, InputNumber, Select, Space } from "antd";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { updateAgentTicketLimitAPI } from "../../../../../api/admin";
import toast from "react-hot-toast";

const DEFAULT_LIMITS = [
  { value: 0, label: "0" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

export default function LimitSelect({ record, setAgentPerformanceReport }) {
  let { maxTicket, agentId, agentName } = record;

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
    // Submit limit
    handleLimitSubmit(newLimit, agentId);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  // Handle TicketSelect change
  function handleTicketLimitChange(value) {
    setSelectedLimit(String(value));
    // Submit Limit
    handleLimitSubmit(value, agentId);
  }

  //   Handle Limit Submit
  async function handleLimitSubmit(value, agentId) {
    // console.log(value, agentId);
    let updatedLimit = {
      maxTicket: value,
    };
    try {
      const { data } = await updateAgentTicketLimitAPI(updatedLimit, agentId);
      //   console.log(data);
      setAgentPerformanceReport((prev) => {
        let copy = [...prev];
        copy.map((agentData) => {
          if (agentData.agentId === data._id) {
            agentData.maxTicket = data.maxTicket;
          }

          return agentData;
        });

        return [...copy];
      });
      toast.success(`Ticket Limit updated for ${agentName}`);
    } catch (error) {
      console.error("Error updating ticket limit", error);
      toast.error("Error updating Ticket Limit. Please try again!");
    }
  }

  return (
    <Select
      style={{
        width: 270,
      }}
      open={open}
      defaultValue={maxTicket ? String(maxTicket) : "0"}
      value={selectedLimit}
      onChange={handleTicketLimitChange}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
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
            <InputNumber
              placeholder="Custom Limit"
              ref={inputRef}
              value={newLimit}
              onChange={handleNewLimitChange}
              onKeyDown={(e) => e.stopPropagation()}
              type="number"
              min={1}
              max={120}
              style={{ width: "130px" }}
            />
            <Button type="text" icon={<FaPlus />} onClick={addNewItem}>
              Add Limit
            </Button>
          </Space>
        </>
      )}
      options={items}
    />
  );
}
