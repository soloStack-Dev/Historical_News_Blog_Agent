import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostStore } from "../store/usePostStore";
import { postFormSchema } from "../lib/validation";
import type { BlogPost, Category } from "../types";

const categoryOptions: { value: Category; label: string }[] = [
  { value: "politics", label: "Politics" },
  { value: "society", label: "Society" },
  { value: "science", label: "Science" },
  { value: "archive", label: "The Archive" },
  { value: "letters", label: "Letters" },
  { value: "gallery", label: "Gallery" },
];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PostForm() {
  const { isPostFormOpen, closePostForm, addPost } = usePostStore();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("politics");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const postIdCounter = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ imageFile: "Please select an image file" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ imageFile: "Image must be under 5 MB" });
      return;
    }

    setImageFile(file);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.imageFile;
      return next;
    });

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const generateMutation = useMutation({
    mutationFn: async ({ content, category }: { content: string; category: string }) => {
      const { generateBlogPost } = await import("../lib/ai");
      return generateBlogPost(content, category);
    },
    onSuccess: async (generatedContent) => {
      let imageUrl = "/Posts/PoliticsPost/postOne/image.png";
      if (imageFile) {
        imageUrl = await fileToDataUrl(imageFile);
      }

      const newPost: BlogPost = {
        id: `ai-${Date.now()}-${++postIdCounter.current}`,
        title: title || "AI Generated Historical Post",
        content: generatedContent,
        category,
        imageUrl,
        author: "AI Chronicle Editor",
        date: new Date().toISOString().split("T")[0],
        readingTime: `${Math.ceil(generatedContent.split(" ").length / 200)} min`,
        tags: [category, "AI Generated", "Historical"],
        summary: generatedContent.substring(0, 200) + "...",
        seoTitle: title || "AI Generated Historical Blog Post",
        metaDescription: generatedContent.substring(0, 160),
        urlSlug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        isAiGenerated: true,
      };

      addPost(newPost);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetForm();
      closePostForm();
    },
    onError: (error: Error) => {
      setErrors({ submit: error.message || "Failed to generate blog post" });
    },
  });

  function validate(): boolean {
    const result = postFormSchema.safeParse({ title, content, category });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    generateMutation.mutate({ content, category });
  }

  function resetForm() {
    setTitle("");
    setContent("");
    setCategory("politics");
    setImageFile(null);
    setImagePreview("");
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  if (!isPostFormOpen) return null;

  return (
    <div className="post-form-overlay">
      <div className="post-form">
        <div className="post-form__header">
          <h3 className="post-form__header-title">
            Create Historical Post
          </h3>
          <button
            onClick={() => {
              resetForm();
              closePostForm();
            }}
            className="post-form__close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="post-form__body">
          <div className="post-form__field">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="post-form__error">{errors.category}</p>
            )}
          </div>

          <div className="post-form__field">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your historical topic title"
            />
            {errors.title && (
              <p className="post-form__error">{errors.title}</p>
            )}
          </div>

          <div className="post-form__field">
            <label>Content / Topic Description</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the historical topic you want to write about. Include key events, people, dates, and significance..."
              rows={6}
            />
            {errors.content && (
              <p className="post-form__error">{errors.content}</p>
            )}
          </div>

          <div className="post-form__field">
            <label>
              Cover Image <span style={{ color: "#8A8A8A" }}>(optional, max 5 MB)</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="post-form__file-input"
            />
            {errors.imageFile && (
              <p className="post-form__error">{errors.imageFile}</p>
            )}
            {imagePreview && (
              <div className="post-form__image-preview">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="post-form__image-remove"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {errors.submit && (
            <p className="post-form__submit-error">
              {errors.submit}
            </p>
          )}

          <div className="post-form__actions">
            <button
              type="button"
              onClick={() => {
                resetForm();
                closePostForm();
              }}
              className="post-form__btn post-form__btn--cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={generateMutation.isPending}
              className="post-form__btn post-form__btn--submit"
            >
              {generateMutation.isPending ? (
                <>
                  <span className="spinner" />
                  Generating...
                </>
              ) : (
                "Generate Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
