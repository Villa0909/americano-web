"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "INICIO", href: "/" },
  { name: "PLANTILLA", href: "/plantilla" },
  { name: "RESULTADOS", href: "/resultados" },
  { name: "ESTADÍSTICAS", href: "/estadisticas" },
  { name: "TABLA", href: "/tabla" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [tablaNueva, setTablaNueva] = useState(false);

  useEffect(() => {
    const tablaVista = localStorage.getItem("tabla-vista");

    if (!tablaVista) {
      setTablaNueva(true);
    }
  }, []);

  const handleTablaClick = () => {
    localStorage.setItem("tabla-vista", "true");
    setTablaNueva(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Franja superior */}

      <div className="h-2 bg-[repeating-linear-gradient(90deg,#000_0px,#000_24px,#fff_24px,#fff_48px)]" />

      <nav className="bg-gradient-to-b from-zinc-900 to-black text-white">
        {/* NAVBAR DE TELÉFONO */}

        <details className="group lg:hidden">
          <summary className="flex h-16 cursor-pointer list-none items-center justify-between px-4 [&::-webkit-details-marker]:hidden">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src="/logo.png"
                alt="Martincitas"
                width={44}
                height={44}
                priority
                className="h-11 w-11 shrink-0 object-contain"
              />

              <div className="min-w-0">
                <h1 className="truncate text-lg font-black leading-none tracking-[2px]">
                  MARTINCITAS
                </h1>

                <p className="mt-1 truncate text-[9px] uppercase tracking-[2px] text-zinc-400">
                  Club de Fútbol
                </p>
              </div>
            </Link>

            {/* Tres líneas */}

            <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px]">
              <span className="h-[2px] w-7 bg-white transition-transform duration-200 group-open:translate-y-[7px] group-open:rotate-45" />

              <span className="h-[2px] w-7 bg-white transition-opacity duration-200 group-open:opacity-0" />

              <span className="h-[2px] w-7 bg-white transition-transform duration-200 group-open:-translate-y-[7px] group-open:-rotate-45" />
            </div>
          </summary>

          {/* Menú móvil */}

          <div className="border-t border-zinc-700 bg-black px-4 py-2">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" &&
                  pathname.startsWith(`${link.href}/`));

              const isTabla = link.href === "/tabla";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={isTabla ? handleTablaClick : undefined}
                  className={`relative flex min-h-14 items-center border-b border-zinc-800 px-3 text-sm font-semibold tracking-[2px] last:border-b-0 ${
                    active
                      ? "bg-white text-black"
                      : "text-zinc-300 active:bg-zinc-900"
                  }`}
                >
                  {link.name}

                  {isTabla && tablaNueva && (
                    <span className="ml-3 rounded bg-yellow-400 px-1.5 py-0.5 text-[8px] font-black tracking-normal text-zinc-900">
                      NUEVO
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </details>

        {/* NAVBAR ORIGINAL DE PC */}

        <div className="mx-auto hidden h-[72px] max-w-7xl items-center justify-between px-8 lg:flex">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Martincitas"
              width={60}
              height={60}
              priority
            />

            <div>
              <h1 className="text-4xl font-black leading-none tracking-[6px]">
                MARTINCITAS
              </h1>

              <p className="text-xs uppercase tracking-[4px] text-zinc-400">
                Club de Fútbol
              </p>
            </div>
          </Link>

          <div className="flex gap-14">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" &&
                  pathname.startsWith(`${link.href}/`));

              const isTabla = link.href === "/tabla";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={isTabla ? handleTablaClick : undefined}
                  className={`group relative text-sm font-semibold tracking-[2px] transition ${
                    active
                      ? "text-white"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.name}

                  {isTabla && tablaNueva && (
                    <span className="absolute -right-7 -top-5 rounded bg-yellow-400 px-1.5 py-0.5 text-[8px] font-black leading-none tracking-normal text-zinc-900">
                      NUEVO
                    </span>
                  )}

                  <span
                    className={`absolute -bottom-2 left-1/2 h-[2px] -translate-x-1/2 bg-white transition-all duration-300 ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Franja inferior */}

      <div className="h-2 bg-[repeating-linear-gradient(90deg,#000_0px,#000_24px,#fff_24px,#fff_48px)]" />
    </header>
  );
}