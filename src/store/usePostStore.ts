import { create } from "zustand";
import type { BlogPost, Category } from "../types";
import { politicsPosts } from "../lib/posts/politics";
import { sciencePosts } from "../lib/posts/science";
import { societyPosts } from "../lib/posts/society";

const STORAGE_KEY = "chronicle-user-posts";

interface PostStore {
  posts: BlogPost[];
  isPostFormOpen: boolean;
  activeCategory: Category;
  selectedPost: BlogPost | null;
  addPost: (post: BlogPost) => void;
  openPostForm: () => void;
  closePostForm: () => void;
  setActiveCategory: (category: Category) => void;
  getPostsByCategory: (category: Category) => BlogPost[];
  selectPost: (post: BlogPost | null) => void;
}

function loadUserPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

function saveUserPosts(posts: BlogPost[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // localStorage full or unavailable
  }
}

const builtInPosts: BlogPost[] = [...politicsPosts, ...sciencePosts, ...societyPosts];
const savedPosts = loadUserPosts();

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [...savedPosts, ...builtInPosts],
  isPostFormOpen: false,
  activeCategory: "politics",
  selectedPost: null,

  addPost: (post) => {
    const newPosts = [post, ...get().posts];
    const userPosts = newPosts.filter((p) => p.id.startsWith("ai-"));
    saveUserPosts(userPosts);
    set({ posts: newPosts });
  },

  openPostForm: () => set({ isPostFormOpen: true }),

  closePostForm: () => set({ isPostFormOpen: false }),

  setActiveCategory: (category) => set({ activeCategory: category }),

  getPostsByCategory: (category) => {
    return get().posts.filter((post) => post.category === category);
  },

  selectPost: (post) => set({ selectedPost: post }),
}));
