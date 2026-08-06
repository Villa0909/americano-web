import { ReactNode } from "react";

interface Stat {
  icon: ReactNode;
  value: number;
}

interface Props {
  stats: Stat[];
}

export default function PlayerStats({
  stats,
}: Props) {
  if (stats.length === 0) return null;
  const isSingle = stats.length === 1;
const isDouble = stats.length === 2;

const columns = isSingle ? 1 : 2;


  return (
    <div
      className="
        rounded-3xl
        border
        border-white/20
        backdrop-blur-sm
        p-6
      "
    >

      <div
        className="grid"
       style={{
  gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
  gap: isDouble ? 42 : 24,
}}
      >

        {stats.map((stat, index) => (

          <div
  key={index}
  style={{
  }}
  className="
    flex
    items-center
    justify-center
    gap-6
  "
>

            <div
  style={{
    fontSize: isDouble ? 62 : 40,
  }}
  className="text-white"
>

              {stat.icon}

            </div>

            <span
  style={{
    fontSize: isDouble ? 74 : 48,
  }}
  className="
    text-white
    font-black
    leading-none
  "
>

              {stat.value}

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}