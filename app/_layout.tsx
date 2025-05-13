import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/queryClient";
import { ArticleProvider } from "@/features/articles/storage/ArticleContext";

export default function Layout() {

  return (
    <QueryClientProvider client={queryClient}>
      <ArticleProvider>
        <Slot />
      </ArticleProvider>
    </QueryClientProvider>
  );
}