"use client";

import { PlayerPosition } from "@/types/player";

interface Props {
  nombre: string;
  posicion: PlayerPosition;

  jugo: boolean;

  recepciones: number;
  yardas: number;
  touchdowns: number;

  pases_completos: number;
  yardas_pase: number;
  touchdowns_pase: number;
  touchdowns_carrera: number;

  tackles: number;
  intercepciones: number;
  sacks: number;
  touchdowns_defensivos: number;

  onPlayChange: (value: boolean) => void;

  onRecepcionesChange: (value: number) => void;
  onYardasChange: (value: number) => void;
  onTouchdownsChange: (value: number) => void;

  onPasesCompletosChange: (value: number) => void;
  onYardasPaseChange: (value: number) => void;
  onTouchdownsPaseChange: (value: number) => void;
  onTouchdownsCarreraChange: (value: number) => void;

  onTacklesChange: (value: number) => void;
  onIntercepcionesChange: (value: number) => void;
  onSacksChange: (value: number) => void;
  onTouchdownsDefensivosChange: (value: number) => void;
}

export default function PlayerMatchCard({
  nombre,
  posicion,

  jugo,

  recepciones,
  yardas,
  touchdowns,

  pases_completos,
  yardas_pase,
  touchdowns_pase,
  touchdowns_carrera,

  tackles,
  intercepciones,
  sacks,
  touchdowns_defensivos,

  onPlayChange,

  onRecepcionesChange,
  onYardasChange,
  onTouchdownsChange,

  onPasesCompletosChange,
  onYardasPaseChange,
  onTouchdownsPaseChange,
  onTouchdownsCarreraChange,

  onTacklesChange,
  onIntercepcionesChange,
  onSacksChange,
  onTouchdownsDefensivosChange,
}: Props) {
  const isReceiver =
    posicion === "Receptor" || posicion === "Corredor";

  const isQuarterback =
    posicion === "Quarterback";

  const isDLine =
    posicion === "D-Line";

  const isDefense =
    posicion === "Linebacker" ||
    posicion === "Cornerback" ||
    posicion === "Safety";

  return (
    <div className="rounded-2xl border bg-white p-6 shadow">

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">
            {nombre}
          </h2>

          <p className="mt-1 text-sm font-bold uppercase tracking-wider text-zinc-400">
            {posicion}
          </p>
        </div>

        <Switch
          label="Jugó"
          checked={jugo}
          onChange={onPlayChange}
        />
      </div>

      {isReceiver && (
        <>
          <Counter
            title="Recepciones"
            value={recepciones}
            onChange={onRecepcionesChange}
          />

          <Counter
            title="Yardas"
            value={yardas}
            onChange={onYardasChange}
          />

          <Counter
            title="Touchdowns"
            value={touchdowns}
            onChange={onTouchdownsChange}
          />
        </>
      )}

      {isQuarterback && (
        <>
          <Counter
            title="Pases completos"
            value={pases_completos}
            onChange={onPasesCompletosChange}
          />

          <Counter
            title="Yardas de pase"
            value={yardas_pase}
            onChange={onYardasPaseChange}
          />

          <Counter
            title="TD de pase"
            value={touchdowns_pase}
            onChange={onTouchdownsPaseChange}
          />

          <Counter
            title="TD de carrera"
            value={touchdowns_carrera}
            onChange={onTouchdownsCarreraChange}
          />
        </>
      )}

      {isDLine && (
        <>
          <Counter
            title="Tackles"
            value={tackles}
            onChange={onTacklesChange}
          />

          <Counter
            title="Sacks"
            value={sacks}
            onChange={onSacksChange}
          />
        </>
      )}

      {isDefense && (
        <>
          <Counter
            title="Tackles"
            value={tackles}
            onChange={onTacklesChange}
          />

          <Counter
            title="Intercepciones"
            value={intercepciones}
            onChange={onIntercepcionesChange}
          />

          <Counter
            title="Sacks"
            value={sacks}
            onChange={onSacksChange}
          />

          <Counter
            title="TD defensivos"
            value={touchdowns_defensivos}
            onChange={onTouchdownsDefensivosChange}
          />
        </>
      )}

      {posicion === "O-Line" && (
        <p className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-500">
          Este jugador no tiene estadísticas individuales registradas.
        </p>
      )}

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
    <div className="mb-5 flex items-center justify-between gap-4">

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

        <span className="w-12 text-center text-lg font-bold">
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
    <label className="flex items-center gap-3">
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