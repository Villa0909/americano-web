interface Props {
  label: string;

  checked: boolean;

  onChange: (
    checked: boolean
  ) => void;
}

export default function Switch({
  label,
  checked,
  onChange,
}: Props) {
  return (
    <label
      className="
      flex
      items-center
      justify-between
    "
    >
      <span className="font-medium">
        {label}
      </span>

      <button
        type="button"
        onClick={() =>
          onChange(!checked)
        }
        className={`
        relative
        h-7
        w-12
        rounded-full
        transition
        ${
          checked
            ? "bg-black"
            : "bg-zinc-300"
        }
      `}
      >
        <span
          className={`
          absolute
          top-1
          h-5
          w-5
          rounded-full
          bg-white
          transition
          ${
            checked
              ? "left-6"
              : "left-1"
          }
        `}
        />
      </button>

    </label>
  );
}