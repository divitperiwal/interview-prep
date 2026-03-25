"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingLinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  loadingLabel?: string;
}

const LoadingLinkButton = ({
  href,
  children,
  className,
  loadingLabel = "Loading...",
}: LoadingLinkButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-busy={isPending}
      className={cn(className)}
    >
      {isPending && <span className="spinner" aria-hidden="true" />}
      <span>{isPending ? loadingLabel : children}</span>
    </Button>
  );
};

export default LoadingLinkButton;