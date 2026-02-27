"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DoctorsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minFee, setMinFee] = useState(
    searchParams.get("minFee") ?? ""
  );

  const [maxFee, setMaxFee] = useState(
    searchParams.get("maxFee") ?? ""
  );

  function applyFilters() {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (minFee) params.set("minFee", minFee);
    else params.delete("minFee");

    if (maxFee) params.set("maxFee", maxFee);
    else params.delete("maxFee");

    params.set("page", "1");

    router.push(`/doctors?${params.toString()}`);
  }

  function clearFilters() {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.delete("minFee");
    params.delete("maxFee");
    params.set("page", "1");

    router.push(`/doctors?${params.toString()}`);
  }

  return (
    <Card className="w-full lg:w-64">
      <CardHeader>
        <CardTitle>Price Filter</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          type="number"
          label=""
          placeholder="Min Fee"
          value={minFee}
          onChange={(e) => setMinFee(e.target.value)}
        />

        <Input
          type="number"
          label=""
          placeholder="Max Fee"
          value={maxFee}
          onChange={(e) => setMaxFee(e.target.value)}
        />

        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={applyFilters}
          >
            Apply
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}