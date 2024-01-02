import { IconCustomArrow } from "../../../../../components/Admin/SvgIcons";

export default function TransactionArrow({
  backgroundClass = "bg-gray-200",
  colorClass = "text-primary",
  rotateClass = "rotate-0",
  size = "base",
}) {
  let divStyles = {};
  let arrowStyles = {};

  switch (size) {
    case "base":
      divStyles = { width: "50px", height: "50px" };
      arrowStyles = { width: "18px", height: "18px" };
      break;
    case "large":
      divStyles = { width: "80px", height: "80px" };
      arrowStyles = { width: "30px", height: "30px" };
      break;
    default:
      divStyles = { width: "50px", height: "50px" };
      arrowStyles = { width: "18px", height: "18px" };
      break;
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center ${backgroundClass} ${colorClass}`}
      style={divStyles}
    >
      <span className={`${rotateClass}`}>
        <IconCustomArrow style={arrowStyles} />
      </span>
    </div>
  );
}
