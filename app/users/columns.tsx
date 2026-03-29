"use client"

import { ColumnDef } from "@tanstack/react-table";

import { User } from "../generated/prisma/client";

export type AdminUserView = Pick<User,
    "id" | "username" | "email" | "displayName" | "role" | "status" | "createdAt" | "lastLoginAt">

export const columns = (onDelete: (id: string) => void): ColumnDef<AdminUserView>[] => [
    { accessorKey: "username", header: "Kullanıcı Adı" },
    { accessorKey: "displayName", header: "Ad Soyad" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Rol" },
    { accessorKey: "status", header: "Durum" },
    { accessorKey: "createdAt", header: "Kayıt Tarihi" },
    {
        accessorKey: "lastLoginAt",
        header: "Son Giriş",
        cell: ({ row }) => {
            const date = row.original.lastLoginAt
            if (!date) return <span className="text-muted-foreground">Kayıt yok</span>
            return <span>{new Date(date).toLocaleDateString("tr-TR")}</span>
        }
    },
    {
        id: "actions",
        header: "İşlemler",
        cell: ({row}) => {
            const user = row.original;
            return(
                <button onClick={() => onDelete(row.original.id)} type="button">
                    Kullanıcıyı Sil
                </button>
            )
        }
    }
]