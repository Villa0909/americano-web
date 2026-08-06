interface Props {
  children: React.ReactNode;
}

export default function EventIcon({
  children,
}: Props) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200">

      {children}

    </div>
  );
}