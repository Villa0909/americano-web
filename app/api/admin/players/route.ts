import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");

console.log("COOKIE HEADER:", cookieHeader);

const cookie = cookieHeader?.includes(
  "admin_authenticated=true"
);

    if (!cookie) {
      return NextResponse.json(
        { error: "No autorizado." },
        { status: 401 }
      );
    }

    const player = await request.json();

    const { data, error } = await supabaseAdmin
      .from("players")
      .insert(player)
      .select()
      .single();

    if (error) {
      console.error("Error creando jugador:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en API de jugadores:", error);

    return NextResponse.json(
      { error: "Error interno." },
      { status: 500 }
    );
  }
}