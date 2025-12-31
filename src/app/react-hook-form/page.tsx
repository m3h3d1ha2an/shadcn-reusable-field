import { ChevronLeft } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Project } from "@/components/project";
import { Button } from "@/components/ui/button";

const ReactHookForm = () => {
  return (
    <div className="p-4 flex flex-col justify-center items-center gap-4">
      <Link href="/">
        <Button className="hover:bg-green-800">
          <HugeiconsIcon icon={ChevronLeft} />
          Back to Home
        </Button>
      </Link>
      <h1 className="text-2xl font-semibold">React Hook Form</h1>
      <Project />
    </div>
  );
};

export default ReactHookForm;
