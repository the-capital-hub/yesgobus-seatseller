import { IconCustomArrow } from "../../../../../components/Admin/SvgIcons";

export default function TransactionArrow({
  backgroundClass = "bg-gray-200",
  colorClass = "text-primary",
  rotateClass = "rotate-0",
}) {
  return (
    <div
      className={`w-[50px] h-[50px] rounded-full flex items-center justify-center ${backgroundClass} ${colorClass}`}
    >
      <span className={`${rotateClass}`}>
        <IconCustomArrow />
      </span>
    </div>
  );
}
