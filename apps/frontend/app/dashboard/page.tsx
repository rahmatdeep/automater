"use client";
import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/Darkbutton";
import axios from "axios";
import { useEffect, useState } from "react";
import { Zap } from "@repo/common/types";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/buttons/LinkButton";

function useZaps() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    zaps,
  };
}

export default function Dashboard() {
  const { loading, zaps } = useZaps();
  const router = useRouter();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="w-full max-w-screen-lg">
          <div className="flex justify-between pr-8">
            <div className="text-2xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex justify-center">
          {" "}
          <ZapTable zaps={zaps} />{" "}
        </div>
      )}
    </div>
  );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter();

  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="flex">
        <th className="flex-1">Name</th>
        <th className="flex-1">Last Edit</th>
        <th className="flex-1">Running</th>
        <th className="flex-1">Go</th>
      </div>
      {zaps.map((z) => (
        // eslint-disable-next-line react/jsx-key
        <div className="flex border-b border-t py-4">
          <div className="flex-1">
            {z.trigger.type.name} {z.action.map((x) => x.type.name)}
          </div>
          <div className="flex-1">{z.id}</div>
          <div className="flex-1">Nov 12, 2025</div>
          <div className="flex-1">
            <LinkButton
              onClick={() => {
                router.push("/zap." + z.id);
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
}
