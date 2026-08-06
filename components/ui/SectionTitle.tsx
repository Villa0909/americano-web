interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  return (
    <div className="mb-10">
      <h2 className="text-5xl font-black uppercase tracking-wide text-black">
        {title}
      </h2>

      <div className="mt-3 h-1 w-24 bg-black rounded-full" />
    </div>
  );
}