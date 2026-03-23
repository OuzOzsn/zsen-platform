import Link from "next/link";
import { routes } from "@/lib/routes";

export default function Home() {
  return (
    <div>
      <Link href={routes.user.create}>Üye Ol</Link>
    </div>
  );
}
