"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { Label } from "@/components/ui/label";

type FieldStatusLabelProps = {
  htmlFor: string;
  label: string;
  showStatus: boolean;
  invalid: boolean;
  className?: string;
};

export function FieldStatusLabel({
  htmlFor,
  label,
  showStatus,
  invalid,
  className,
}: FieldStatusLabelProps) {
  return (
    <Label htmlFor={htmlFor} className={className}>
      <span className="flex w-full items-center justify-between gap-2">
        <span>{label}</span>
        {showStatus ? (
          invalid ? (
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className="size-4 text-red-400"
              aria-hidden="true"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="size-4 text-emerald-400"
              aria-hidden="true"
            />
          )
        ) : null}
      </span>
    </Label>
  );
}
