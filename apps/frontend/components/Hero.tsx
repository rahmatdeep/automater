"use client";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { Feature } from "./Feature";

export const Hero = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="text-5xl font-semibold text-center pt-8 max-w-xl">
          Automate as fast as you type
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <div className="text-xl font-normal text-center pt-8 max-w-2xl">
          AI gives you automation superpowers, and automater puts them to work.
          Pairing AI and automateR helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <div className="flex">
          <PrimaryButton onClick={() => {}} size="big">
            Get started free
          </PrimaryButton>
          <div className="pl-4">
            <SecondaryButton onClick={() => {}} size="big">
              Contact Sales
            </SecondaryButton>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Feature title={"Free forever"} subtitle={"for core features"} />
        <Feature title={"More apps"} subtitle={"than other apps"} />
        <Feature title={"Cutting edge"} subtitle={"AI Features"} />
      </div>
    </div>
  );
};
