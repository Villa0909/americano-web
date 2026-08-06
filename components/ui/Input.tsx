interface Props {
  label: string;

  value: string;

  type?: string;

  onChange: (value: string) => void;
}

export default function Input({
  label,
  value,
  onChange,
  type = "text",
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

      <input
        type={type}
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
      />

    </div>
  );
}