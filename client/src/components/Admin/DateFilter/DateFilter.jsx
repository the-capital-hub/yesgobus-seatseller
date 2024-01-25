import { Button, DatePicker } from "antd";
import { useState } from "react";

export default function DateFilter({ setDateFilters }) {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [status, setStatus] = useState({ from: "", to: "" });

  function handleFromChange(date, dateString) {
    setFromDate(dateString);
    setStatus((prev) => {
      return { ...prev, from: "" };
    });
  }

  function handleToChange(date, dateString) {
    setToDate(dateString);
    setStatus((prev) => {
      return { ...prev, to: "" };
    });
  }

  function handleFetchClick() {
    if (!fromDate) {
      setStatus((prev) => {
        return { ...prev, from: "error" };
      });
      return;
    }
    if (!toDate) {
      setStatus((prev) => {
        return { ...prev, to: "error" };
      });
      return;
    }
    setDateFilters({
      fromDate: fromDate,
      toDate: toDate,
    });
  }

  return (
    <div className="flex flex-col items-end md:flex-row md:items-center gap-4">
      <span className="flex items-center gap-2">
        From
        <DatePicker
          placeholder="From"
          onChange={handleFromChange}
          status={status.from}
        />
      </span>
      <span className="flex items-center gap-2">
        To
        <DatePicker
          placeholder="To"
          onChange={handleToChange}
          status={status.to}
        />
      </span>

      <div className="self-center">
        <Button htmlType="button" type="primary" onClick={handleFetchClick}>
          Fetch
        </Button>
      </div>
    </div>
  );
}
