"use client";

import { Star } from "lucide-react";
import GitHistory from "./git";
export default function Code() {
  return (
    <div className="max-w-6xl py-10">
      <h2 className="text-3xl mb-12">I write a lot of code</h2>
      <GitHistory />
    </div>
  );
}
