import { ComponentType } from "react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

interface IconNavButtonProps {
  icon: any;
  href: string;
  tooltipText: string;
}

export function IconNavButton({
  icon: Icon,
  href,
  tooltipText,
}: IconNavButtonProps) {
  return (
    <>
      <Tooltip id="my-tooltip" />
      <Link className="no-underline text-black" href={href}>
        <Icon
          size={40}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={tooltipText}
          className="btn-rounded onHover bg-white-to-gray"
        />
      </Link>
    </>
  );
}
