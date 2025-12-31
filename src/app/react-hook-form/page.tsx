import { ChevronLeft } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { ProjectRHFRaw } from "@/components/project-rhf-raw";
import { ProjectRHFReusable } from "@/components/project-rhf-reusable";
import { Button } from "@/components/ui/button";

const ReactHookForm = () => {
  return (
    <div className="p-4">
      <Link href="/">
        <Button className="hover:bg-green-800">
          <HugeiconsIcon icon={ChevronLeft} />
          Back to Home
        </Button>
      </Link>
      <h1 className="text-2xl font-semibold my-4 text-center">React Hook Form</h1>
      <div className="p-4 flex justify-center items-center gap-4">
        <ProjectRHFRaw />
        <ProjectRHFReusable />
      </div>
    </div>
  );
};

export default ReactHookForm;
