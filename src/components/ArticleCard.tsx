import type { BlogPost } from "../types";
import { usePostStore } from "../store/usePostStore";

interface ArticleCardProps {
  post: BlogPost;
  showImage?: boolean;
}

export default function ArticleCard({ post, showImage = false }: ArticleCardProps) {
  const selectPost = usePostStore((s) => s.selectPost);

  return (
    <article className="card" onClick={() => selectPost(post)} style={{ cursor: "pointer" }}>
      {showImage && post.imageUrl && (
        <div className="card__image-wrap">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="card__image"
          />
        </div>
      )}
      <h4 className="card__title">
        {post.title}
      </h4>
      <p className="card__excerpt">
        {post.summary}
      </p>
      <p className="card__author">
        By {post.author}
      </p>
    </article>
  );
}
