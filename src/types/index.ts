export type Category = "politics" | "society" | "science" | "archive" | "letters" | "gallery";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: Category;
  imageUrl: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  summary: string;
  seoTitle: string;
  metaDescription: string;
  urlSlug: string;
  isAiGenerated: boolean;
}

export interface PostFormData {
  title: string;
  content: string;
  category: Category;
  imageUrl: string;
}

export interface VaultItem {
  icon: string;
  label: string;
  active: boolean;
}
