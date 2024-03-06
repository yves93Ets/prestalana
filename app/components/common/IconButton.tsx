import Link from "next/link";
import { Tooltip } from "react-tooltip";

interface IconButtonProps {
  icon: any;
  action: Function;
  tooltipText: string;
}

export function IconButton({
  icon: Icon,
  action,
  tooltipText,
}: IconButtonProps) {
  return (
    <>
      <Tooltip id="my-tooltip" />
      <Icon
        size={40}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={tooltipText}
        className="btn-rounded onHover bg-white-to-gray"
        onClick={action}
      />
    </>
  );
}
