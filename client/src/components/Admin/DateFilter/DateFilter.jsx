import { Button, DatePicker } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DateFilter({ setDateFilters }) {
  const [fromDate, setFromDate] = useState({ date: "", dateString: "" });
  const [toDate, setToDate] = useState({ date: "", dateString: "" });
  const [status, setStatus] = useState({ from: "", to: "" });

  function handleFromChange(date, dateString) {
    setFromDate({ date: date, dateString: dateString });
    setStatus((prev) => {
      return { ...prev, from: "" };
    });
  }

  function handleToChange(date, dateString) {
    setToDate({ date: date, dateString: dateString });
    setStatus((prev) => {
      return { ...prev, to: "" };
    });
  }

  // Handle fetch
  function handleFetchClick() {
    if (!fromDate.dateString) {
      setStatus((prev) => {
        return { ...prev, from: "error" };
      });
      return;
    }
    if (!toDate.dateString) {
      setStatus((prev) => {
        return { ...prev, to: "error" };
      });
      return;
    }

    if (new Date(fromDate.dateString) > new Date(toDate.dateString)) {
      toast.error("Invalid Date Range");
      return;
    }

    setDateFilters({
      fromDate: fromDate.dateString,
      toDate: toDate.dateString,
    });
  }

  // Handle clear
  function handleClearClick() {
    setStatus({
      from: "",
      to: "",
    });
    setFromDate("");
    setToDate("");
    setDateFilters({
      fromDate: null,
      toDate: null,
    });
  }

  return (
    <div className="flex flex-col w-full min-[375px]:w-fit md:flex-row md:items-center gap-4">
      <span className="flex items-center justify-end gap-2">
        From
        <DatePicker
          placeholder="From"
          onChange={handleFromChange}
          status={status.from}
          value={fromDate.date}
          onOpenChange={() => setStatus({ from: "", to: "" })}
          placement="bottomLeft"
        />
      </span>
      <span className="flex items-center justify-end gap-2">
        To
        <DatePicker
          placeholder="To"
          onChange={handleToChange}
          status={status.to}
          value={toDate.date}
          placement="bottomLeft"
        />
      </span>

      <div className="self-center flex items-center gap-4">
        <Button htmlType="button" type="primary" onClick={handleFetchClick}>
          Fetch
        </Button>
        {fromDate.dateString && toDate.dateString ? (
          <Button htmlType="button" type="default" onClick={handleClearClick}>
            Clear
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
