interface Props {
  label: string;

  value: string;

  options: string[];

  onChange: (value: string) => void;
}

export default function Select({
  label,
  value,
  options,
  onChange,
}: Props) {
  return (
    <div>

      <label
        className="
        mb-2
        block
        font-semibold
      "
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
        w-full
        rounded-xl
        border
        border-zinc-300
        p-3
        outline-none
        transition
        focus:border-black
      "
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}