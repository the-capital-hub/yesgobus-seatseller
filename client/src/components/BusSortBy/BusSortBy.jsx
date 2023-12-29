import { useState } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

const SORT_OPTIONS = [{ label: "Price", sortTerm: "price" }];

export default function BusSortBy({ handleSortByChange }) {
  return (
    <div className="sortBy-container py-4 px-2">
      <div className="flex items-center gap-8">
        <p className="text-xl">Sort By:</p>
        {SORT_OPTIONS.map(({ label, sortTerm }, index) => {
          return (
            <SortToggle
              handleSortByChange={handleSortByChange}
              label={label}
              sortTerm={sortTerm}
            />
          );
        })}
      </div>
    </div>
  );
}

export function SortToggle({ handleSortByChange, sortTerm, label }) {
  const [isAscending, setIsAscending] = useState(true);

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
      className="border-0 bg-transparent outline-none text-lg flex items-center justify-center gap-2"
      onClick={handleClick}
    >
      {label}
      {isAscending ? <IoArrowUp size={20} /> : <IoArrowDown size={20} />}
    </button>
  );
}
