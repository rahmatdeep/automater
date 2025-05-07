"use client";
import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import { useState } from "react";

export default function CreateZap() {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
    }[]
  >([]);
  return (
    <div>
      <Appbar />
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            name={selectedTrigger ? selectedTrigger : "Trigger"}
            index={1}
          />
        </div>
        <div className="justify-center w-ful py-2">
          {selectedActions.map((action, index) => (
            <div className="py-2 flex justify-center">
              <ZapCell
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : "Action"
                }
                index={2 + index}
                key={2 + index}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div>
            <PrimaryButton
              onClick={() => {
                setSelectedActions((a) => [
                  ...a,
                  {
                    availableActionId: "",
                    availableActionName: "",
                  },
                ]);
              }}
            >
              <div className="text-2xl">+</div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
