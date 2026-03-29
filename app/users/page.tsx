import { User } from "../generated/prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { UserTableClient } from "./operations";

async function getData(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    cache: "no-store",
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Veri alınamadı");
  }
  return res.json();
}


export default async function AdminUserViewList() {
  const data = await getData();

  return(
    <UserTableClient initialData={data}/>
  );
}