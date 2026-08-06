import { PiSoccerBallFill } from "react-icons/pi";
import { SportShoe } from "lucide-react";
import EventIcon from "./EventIcon";

interface Props {
  goles: any[];
  asistencias: any[];
  amarillas: any[];
  rojas: any[];
}

export default function MatchEvents({
  goles,
  asistencias,
  amarillas,
  rojas,
}: Props) {
  const showGoals = goles.length > 0;
  const showAssists = asistencias.length > 0;
  const showCards =
    amarillas.length > 0 || rojas.length > 0;

  return (
    <div className="space-y-10">

      {(showGoals || showAssists) && (
        <div
          className={`grid gap-10 ${
            showGoals && showAssists
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}
        >

          {showGoals && (
            <section>

              <h2 className="mb-5 text-sm font-black tracking-[3px] text-zinc-500 uppercase">
                GOLES
              </h2>

              <div className="space-y-4">

                {goles.map((player) => (
                  <div
                    key={player.player_id}
                    className="flex items-center gap-3"
                  >
                    <div className="flex gap-0">

                      {Array.from({
                        length: player.goles,
                      }).map((_, i) => (
                        <EventIcon key={i}>
  <PiSoccerBallFill className="h-7 w-7" />
</EventIcon>
                        
                      ))}

                    </div>

<span className="text-lg font-semibold tracking-tight">
                          {player.nombre}
                    </span>

                  </div>
                ))}

              </div>

            </section>
          )}

          {showAssists && (
            <section>

              <h2 className="mb-5 text-sm font-black tracking-[3px] text-zinc-500 uppercase">
                ASISTENCIAS
              </h2>

              <div className="space-y-4">

                {asistencias.map((player) => (
                  <div
                    key={player.player_id}
                    className="flex items-center gap-3"
                  >
                    <div className="flex gap-2">

                      {Array.from({
                        length: player.asistencias,
                      }).map((_, i) => (
                        <SportShoe
                          key={i}
                          className="text-base"
                        />
                      ))}

                    </div>

                    <span className="text-lg font-semibold tracking-tight">
                      {player.nombre}
                    </span>

                  </div>
                ))}

              </div>

            </section>
          )}

        </div>
      )}

      {showCards && (
        <section>

          <div className="border-t pt-8">

            <h2 className="mb-5 text-sm font-black tracking-[3px] text-zinc-500 uppercase">
              TARJETAS
            </h2>

            <div className="space-y-4">

              {amarillas.map((player) => (
                <div
                  key={`y-${player.player_id}`}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-4 rounded-sm bg-yellow-400" />

                  <span className="text-lg font-semibold tracking-tight">
                    {player.nombre}
                  </span>

                </div>
              ))}

              {rojas.map((player) => (
                <div
                  key={`r-${player.player_id}`}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-4 rounded-sm bg-red-600" />

                  <span className="text-lg font-semibold tracking-tight">
                    {player.nombre}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </section>
      )}

    </div>
  );
}