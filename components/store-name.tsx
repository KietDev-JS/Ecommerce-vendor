"use client";

import * as React from "react";
import { Store } from "lucide-react";

import { useRouter } from "next/navigation";

export default function StoreName() {
  const router = useRouter();
  const setting = () => {
    router.push(`/dashboard/settings`);
  };
  return (
    <div
      className="flex items-center justify-center font-semibold text-sm border p-2 rounded-md border-black/30 hover:cursor-pointer group "
      onClick={setting}
    >
      <Store className="mr-2 h-4 w-4 font-semibold" />
      GiaDinhTienDung
    </div>
  );
}
