import { Player } from "@/types/player";
import PlayerChip from "./PlayerChip";
import SectionTitle from "../ui/SectionTitle";

interface Props {
  title: string;
  players: Player[];
}

export default function PositionSection({
  title,
  players,
}: Props) {
  if (players.length === 0) return null;

  return (
    <section className="mb-12 md:mb-24">
      <SectionTitle title={title} />

      {/* Carrusel en teléfono */}
      <div className="-mx-4 overflow-x-auto px-4 pb-4 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
        <div className="flex w-max snap-x snap-mandatory gap-8 md:w-auto md:flex-wrap md:gap-8">
          {players.map((player) => (
            <div
              key={player.id}
              className="w-[210px] shrink-0 snap-start sm:w-[230px] md:w-auto"
            >
              <PlayerChip player={player} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}