"use client";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="flex pt-8 max-w-8xl">
        <div className="flex-1 pt-20 px-4">
          <div className="font-semibold text-3xl pb-4">
            Join millions worldwide who automate using work using automateR
          </div>
          <div className="pb-6 pt-4">
            <CheckFeature label="Easy setup, no coding required" />
          </div>
          <div className="pb-6">
            <CheckFeature label="Free forever for core features" />
          </div>
          <div className="pb-6">
            <CheckFeature label="14-day trial of premium features & apps" />
          </div>
        </div>
        <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded border-slate-100 ">
          <Input
            label={"Email"}
            onChange={(e) => {}}
            placeholder="Your Email"
            ref={emailRef}
          />
          <Input
            label={"password"}
            onChange={(e) => {}}
            placeholder="Password"
            type="password"
            ref={passwordRef}
          />
          <div className="pt-4">
            <PrimaryButton
              onClick={async () => {
                const res = await axios.post(
                  `${BACKEND_URL}/api/v1/user/signin`,
                  {
                    username: emailRef.current?.value,
                    password: passwordRef.current?.value,
                  }
                );
                localStorage.setItem("token", res.data.token);
                router.push("/dashboard");
              }}
              size="big"
            >
              Get started free
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
