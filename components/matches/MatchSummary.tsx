import MatchMVP from "./MatchMVP";
import MatchEvents from "./MatchEvents";

interface Props {
  goles: any[];
  asistencias: any[];
  amarillas: any[];
  rojas: any[];
  mvp: any;
}

export default function MatchSummary({
  goles,
  asistencias,
  amarillas,
  rojas,
  mvp,
}: Props) {
  return (
    <div className="space-y-12">

      <MatchMVP mvp={mvp} />

      <MatchEvents
        goles={goles}
        asistencias={asistencias}
        amarillas={amarillas}
        rojas={rojas}
      />

    </div>
  );
}