"use client"

import { updateStream } from "@/actions/Stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
};
export const ToggleOption = ({
    label, value, field
}: ToggleCardProps) => {

    const [isPending, startTransition] = useTransition()

    const onChange = () => {
        startTransition(() => {
           updateStream({ [field]: !value })
            .then(() => toast.success("Chat settings updated!"))
            .catch(() => toast.error("Something went wrong"));
        });
      };

    return (
        <div className="rounded-md bg-muted p-4 md:p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm md:text-base lg:text-lg mb-1">
              {label}
            </p>
            <div className="space-y-2">
              <Switch
                disabled={isPending}
                onCheckedChange={onChange}
                checked={value}
              >
                {value ? "On" : "Off"}
              </Switch>
            </div>
          </div>
        </div>
      );
}

export const ToggleCardSkeleton = () => {
    return (
      <Skeleton className="rounded-md h-14 md:h-20 w-full" />
    );
};
