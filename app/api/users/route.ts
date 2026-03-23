import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, username, password } = body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: "Bu email zaten kayıtlı" }, { status: 409 })
      }
      console.error("API Hata:", error)
      return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 })
  }
}