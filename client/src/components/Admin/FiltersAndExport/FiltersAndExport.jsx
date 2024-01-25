import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import DateFilter from "../DateFilter/DateFilter";
import { CSVLink } from "react-csv";

export default function FiltersAndExport({
  setDateFilters,
  csvData,
  csvHeaders,
  fileName,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 pb-2 flex-end flex-container">
      {csvData?.length > 0 && (
        <Button type="primary" icon={<DownloadOutlined />}>
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={`${fileName}.csv`}
          >
            Export to CSV
          </CSVLink>
        </Button>
      )}

      {/* Date Filters */}
      <DateFilter setDateFilters={setDateFilters} />
    </div>
  );
}
