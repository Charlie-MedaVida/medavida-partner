"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { getAccess } from "@/lib/auth";

// One-shot authed fetch: redirects to /login if unauthenticated or on 401.
export function useApi<T>(fn: () => Promise<T>) {
  const router = useRouter();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAccess()) {
      router.push("/login");
      return;
    }
    let alive = true;
    fn()
      .then((d) => alive && (setData(d), setLoading(false)))
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) return router.push("/login");
        if (alive) (setError(e?.message || "Error"), setLoading(false));
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
}
