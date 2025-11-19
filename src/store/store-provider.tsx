"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore, RootState } from "./index";

interface StoreProviderProps {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}

export default function StoreProvider({
  children,
  preloadedState,
}: StoreProviderProps) {
  // useState with lazy initialization: store is created once on mount
  // preloadedState is only used for initial server hydration in Next.js
  const [store] = useState(() => makeStore(preloadedState));

  return <Provider store={store}>{children}</Provider>;
}
