"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";


const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Background job started..."
      })
    }
  }));
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button onClick={() => invoke.mutate({email: "Bibhabasu"})} disabled={invoke.isPending}>Invoke</Button>
    </div>
  )
}
export default Page