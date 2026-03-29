"use client"

import { useState } from "react";
import { AdminUserView } from "./columns";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function UserTableClient({initialData}: {initialData: AdminUserView[]}){
    const [data, setData] = useState(initialData);

    const handleDelete = async (id: string) => {
        await fetch(`/api/users/${id}`, { method: "DELETE" })
        setData(dataList => dataList.filter(user => user.id !== id));
    }

    return <DataTable columns={columns(handleDelete)} data={data}/>
}