import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, username, passwordHash } = body

  const user = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
    },
  })

  return NextResponse.json(user, { status: 201 })
}