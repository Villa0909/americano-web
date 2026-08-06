import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  value: number | string;
  iconSize?: number;
  circleSize?: number;
  textSize?: number;
}

export default function StatBadge({
  icon,
  value,
  iconSize = 28,
  circleSize = 58,
  textSize = 56,
}: Props) {
  return (
    <div className="flex items-center gap-4">

      <div
        style={{
          width: circleSize,
          height: circleSize,
        }}
        className="
          flex
          items-center
          justify-center

          rounded-full
          bg-white

          shadow-lg
        "
      >
        <div
          style={{
            fontSize: iconSize,
          }}
        >
          {icon}
        </div>
      </div>

      <span
        style={{
          fontSize: textSize,
        }}
        className="
          font-black
          text-white
          leading-none
        "
      >
        {value}
      </span>

    </div>
  );
}