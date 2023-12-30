import { Button } from "antd";
import { useEffect, useState } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

const SORT_OPTIONS = [{ label: "Price", sortTerm: "price" }];

export default function BusSortBy({ handleSortByChange, sortBy, setSortBy }) {
  return (
    <div className="sortBy-container py-4 px-2 border-0 border-b border-solid border-gray-300">
      <div className="flex items-center gap-4 md:gap-8 flex-wrap">
        <p className="text-xl">Sort By:</p>
        {SORT_OPTIONS.map(({ label, sortTerm }, index) => {
          return (
            <SortToggle
              handleSortByChange={handleSortByChange}
              label={label}
              sortTerm={sortTerm}
              key={label}
              sortBy={sortBy}
            />
          );
        })}
        {sortBy && (
          <Button
            htmlType="button"
            style={{ marginLeft: "auto" }}
            onClick={() => setSortBy(null)}
          >
            Clear Sort
          </Button>
        )}
      </div>
    </div>
  );
}

export function SortToggle({ handleSortByChange, sortTerm, label, sortBy }) {
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    if (!sortBy) {
      setIsAscending(true);
    }
  }, [sortBy]);

  function handleClick() {
    if (isAscending) {
      handleSortByChange({ ascending: isAscending, sortBy: sortTerm });
    } else {
      handleSortByChange({ ascending: isAscending, sortBy: sortTerm });
    }

    setIsAscending((prev) => !prev);
  }

  return (
    <button
      className="border-0 bg-transparent outline-none text-lg flex items-center justify-center gap-1"
      onClick={handleClick}
    >
      {label}
      {isAscending ? <IoArrowUp size={20} /> : <IoArrowDown size={20} />}
    </button>
  );
}
