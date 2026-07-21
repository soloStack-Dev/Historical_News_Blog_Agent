import { useQuery } from "@tanstack/react-query";
import { usePostStore } from "../store/usePostStore";
import type { Category } from "../types";

export function usePostsByCategory(category: Category) {
  const getPostsByCategory = usePostStore((s) => s.getPostsByCategory);

  return useQuery({
    queryKey: ["posts", category],
    queryFn: () => {
      return Promise.resolve(getPostsByCategory(category));
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
}

export function useAllPosts() {
  const posts = usePostStore((s) => s.posts);

  return useQuery({
    queryKey: ["posts", "all"],
    queryFn: () => Promise.resolve(posts),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
}

export function usePostById(id: string) {
  const posts = usePostStore((s) => s.posts);

  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => {
      const post = posts.find((p) => p.id === id);
      if (!post) throw new Error("Post not found");
      return Promise.resolve(post);
    },
    staleTime: 1000 * 60 * 5,
  });
}
