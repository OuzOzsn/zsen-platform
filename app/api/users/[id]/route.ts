import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params

    await prisma.user.delete({ where: { id } })

    return NextResponse.json({ message: "Kullanıcı silindi" }, { status: 200 })
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 })
    }
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 })
  }
}