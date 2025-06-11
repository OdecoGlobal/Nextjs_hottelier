import { requireOwner } from "@/auth-guard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";

const OwnersHomePage = async () => {
  const session = await requireOwner();
  if (!session) redirect("/unauthorized");
  return (
    <div>
      <Button>
        <Plus className="flex gap-2 items-center" />
        <Link href="'/owner/onboarding/basic-info'">Create New Hotel</Link>
      </Button>
    </div>
  );
};

export default OwnersHomePage;
