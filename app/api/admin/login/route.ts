import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const password = body?.password;

    if (
      typeof password !== "string" ||
      !password
    ) {
      return NextResponse.json(
        {
          error: "Contraseña requerida.",
        },
        {
          status: 400,
        }
      );
    }

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error(
        "ADMIN_PASSWORD no está configurada."
      );

      return NextResponse.json(
        {
          error:
            "El servidor no tiene configurada la contraseña.",
        },
        {
          status: 500,
        }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        {
          error: "Contraseña incorrecta.",
        },
        {
          status: 401,
        }
      );
    }

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set(
      "admin_authenticated",
      "true",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Error en login de admin:",
      error
    );

    return NextResponse.json(
      {
        error: "Error interno.",
      },
      {
        status: 500,
      }
    );
  }
}