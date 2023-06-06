"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { ReactNode, useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <React.Fragment>
      {mounted && <NextThemeProvider>{children}</NextThemeProvider>}
    </React.Fragment>
  );
}
