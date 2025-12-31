import { ChevronLeft } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { ProjectTFRaw } from "@/components/project-tf-raw";
import { ProjectTFReusable } from "@/components/project-tf-reusable";
import { Button } from "@/components/ui/button";

const TanstackForm = () => {
  return (
    <div className="p-4">
      <Link href="/">
        <Button className="hover:bg-green-800">
          <HugeiconsIcon icon={ChevronLeft} />
          Back to Home
        </Button>
      </Link>
      <h1 className="text-2xl font-semibold my-4 text-center">Tanstack Form</h1>
      <div className="p-4 flex justify-center items-center gap-4">
        <ProjectTFRaw />
        <ProjectTFReusable />
      </div>
    </div>
  );
};

export default TanstackForm;
