import type { BlogPost } from "../types";
import { usePostStore } from "../store/usePostStore";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const selectPost = usePostStore((s) => s.selectPost);

  return (
    <article
      className="featured"
      onClick={() => selectPost(post)}
      style={{ cursor: "pointer" }}
    >
      <div className="featured__image-wrap">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="featured__image"
        />
      </div>
      <p className="featured__caption">
        {post.title}
      </p>
      <p className="featured__tag">
        | {post.category}
      </p>
    </article>
  );
}
