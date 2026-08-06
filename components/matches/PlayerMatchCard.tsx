"use client";

interface Props {
  nombre: string;

  jugo: boolean;

  goles: number;
  asistencias: number;

  amarilla: boolean;
  roja: boolean;

  mvp: boolean;

  onPlayChange: (value: boolean) => void;

  onGoalsChange: (value: number) => void;
  onAssistsChange: (value: number) => void;

  onYellowChange: (value: boolean) => void;
  onRedChange: (value: boolean) => void;

  onMvpChange: (value: boolean) => void;
}

export default function PlayerMatchCard({
  nombre,

  jugo,

  goles,
  asistencias,

  amarilla,
  roja,

  mvp,

  onPlayChange,

  onGoalsChange,
  onAssistsChange,

  onYellowChange,
  onRedChange,

  onMvpChange,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-black">
          {nombre}
        </h2>

        <Switch
          label="Jugó"
          checked={jugo}
          onChange={onPlayChange}
        />

      </div>

      <Counter
        title="Goles"
        value={goles}
        onChange={onGoalsChange}
      />

      <Counter
        title="Asistencias"
        value={asistencias}
        onChange={onAssistsChange}
      />

      <Switch
        label="Amarilla"
        checked={amarilla}
        onChange={onYellowChange}
      />

      <Switch
        label="Roja"
        checked={roja}
        onChange={onRedChange}
      />

      <Switch
        label="MVP"
        checked={mvp}
        onChange={onMvpChange}
      />

    </div>
  );
}

function Counter({
  title,
  value,
  onChange,
}: {
  title: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">

      <span className="font-medium">
        {title}
      </span>

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={() =>
            onChange(Math.max(0, value - 1))
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border transition hover:bg-zinc-100"
        >
          -
        </button>

        <span className="w-8 text-center text-lg font-bold">
          {value}
        </span>

        <button
          type="button"
          onClick={() =>
            onChange(value + 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border transition hover:bg-zinc-100"
        >
          +
        </button>

      </div>

    </div>
  );
}

function Switch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="mb-4 flex items-center justify-between">

      <span className="font-medium">
        {label}
      </span>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${
          checked
            ? "bg-black"
            : "bg-zinc-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>

    </label>
  );
}