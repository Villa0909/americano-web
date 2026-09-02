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

      {/* FRANJA SUPERIOR */}

      <div className="h-2 bg-yellow-400" />

      <nav className="bg-yellow-400 text-[#062A63]">

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
                alt="Caballeros"
                width={44}
                height={44}
                priority
                className="h-11 w-11 shrink-0 object-contain"
              />

              <div className="min-w-0">

                <h1 className="truncate text-lg font-black leading-none tracking-[2px] text-[#062A63]">
                  CABALLEROS
                </h1>

                <p className="mt-1 truncate text-[9px] font-bold uppercase tracking-[2px] text-[#17447D]">
                  Fútbol Americano
                </p>

              </div>

            </Link>

            {/* TRES LÍNEAS */}

            <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px]">

              <span className="h-[2px] w-7 bg-[#062A63] transition-transform duration-200 group-open:translate-y-[7px] group-open:rotate-45" />

              <span className="h-[2px] w-7 bg-[#062A63] transition-opacity duration-200 group-open:opacity-0" />

              <span className="h-[2px] w-7 bg-[#062A63] transition-transform duration-200 group-open:-translate-y-[7px] group-open:-rotate-45" />

            </div>

          </summary>

          {/* MENÚ MÓVIL */}

          <div className="border-t border-[#17447D]/20 bg-yellow-400 px-4 py-2">

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
                  onClick={
                    isTabla
                      ? handleTablaClick
                      : undefined
                  }
                  className={`relative flex min-h-14 items-center border-b border-[#17447D]/20 px-3 text-sm font-black tracking-[2px] last:border-b-0 ${
                    active
                      ? "bg-[#062A63] text-yellow-400"
                      : "text-[#062A63] active:bg-yellow-300"
                  }`}
                >

                  {link.name}

                  {isTabla && tablaNueva && (
                    <span className="ml-3 rounded bg-[#062A63] px-1.5 py-0.5 text-[8px] font-black tracking-normal text-yellow-400">
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

          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <Image
              src="/logo.png"
              alt="Caballeros"
              width={60}
              height={60}
              priority
              className="object-contain"
            />

            <div>

              <h1 className="text-4xl font-black leading-none tracking-[6px] text-[#062A63]">
                CABALLEROS
              </h1>

              <p className="text-xs font-bold uppercase tracking-[4px] text-[#17447D]">
                Fútbol Americano
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
                  onClick={
                    isTabla
                      ? handleTablaClick
                      : undefined
                  }
                  className={`group relative text-sm font-black tracking-[2px] transition ${
                    active
                      ? "text-[#062A63]"
                      : "text-[#17447D] hover:text-[#062A63]"
                  }`}
                >

                  {link.name}

                  {isTabla && tablaNueva && (
                    <span className="absolute -right-7 -top-5 rounded bg-[#062A63] px-1.5 py-0.5 text-[8px] font-black leading-none tracking-normal text-yellow-400">
                      NUEVO
                    </span>
                  )}

                  <span
                    className={`absolute -bottom-2 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-[#062A63] transition-all duration-300 ${
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

      {/* FRANJA INFERIOR */}

      <div className="h-2 bg-yellow-400" />

    </header>
  );
}