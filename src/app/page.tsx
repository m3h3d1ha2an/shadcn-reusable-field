import { ChevronRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <svg
        role="img"
        aria-label="logo"
        fill="#000000"
        width="48px"
        height="48px"
        viewBox="0 0 48 48"
        enableBackground="new 0 0 48 48"
        id="Layer_3"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <polygon points="8,9 10,9 10,12 10,16 10,39 8,39 8,42 16,42 16,39 14,39 14,16 14,12 14,9 16,9 16,6 8,6  " />
          <polygon points="4,16 7.021,16 7.021,12 0,12 0,36 7.042,36 7.042,32 4,32  " />
          <polygon points="16.979,12 16.979,16 44,16 44,32 16.958,32 16.958,36 48,36 48,12  " />
        </g>
      </svg>
      <h1 className="text-4xl font-bold">Shadcn Reusable Field</h1>
      <p className="text-xl text-muted-foreground mt-2">A reusable modified field component for Shadcn UI</p>
      <div className="mt-2 space-x-4">
        <Link href="/react-hook-form">
          <Button className="hover:bg-green-800">
            React Hook Form <HugeiconsIcon icon={ChevronRight} />
          </Button>
        </Link>
        <Link href="/tanstack-form">
          <Button className="hover:bg-green-800">
            Tanstack Form <HugeiconsIcon icon={ChevronRight} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
