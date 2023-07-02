"use client";

import { SPA } from "./spa";
import { ContextWrapper } from "@/contexts/ContextWrapper";

export default function Home() {
  return (
    <ContextWrapper>
      <SPA />
    </ContextWrapper>
  );
}
