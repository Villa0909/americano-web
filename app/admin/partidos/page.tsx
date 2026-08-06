import MatchForm from "@/components/matches/MatchForm";

export default function MatchesAdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-8 py-12">

      <h1 className="mb-10 text-5xl font-black">
        NUEVO PARTIDO
      </h1>

      <MatchForm />

    </main>
  );
}