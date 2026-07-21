import { usePostsByCategory } from "../hooks/usePosts";
import ArticleCard from "../components/ArticleCard";
import PullQuote from "../components/PullQuote";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { usePostStore } from "../store/usePostStore";
import type { Category } from "../types";

interface CategoryPageProps {
  category: Category;
  description: string;
  quote: string;
  attribution: string;
}

export default function CategoryPage({
  category,
  description,
  quote,
  attribution,
}: CategoryPageProps) {
  const containerRef = useGsapReveal();
  const openPostForm = usePostStore((s) => s.openPostForm);
  const { data: posts = [] } = usePostsByCategory(category);

  return (
    <div ref={containerRef} className="container" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
      <div className="gsap-reveal category__header">
        <h2 className="category__title">
          {category}
        </h2>
        <p className="category__description">
          {description}
        </p>
        <hr className="category__divider" />
      </div>

      <div className="category__actions gsap-reveal">
        <button
          onClick={openPostForm}
          className="category__create-btn"
        >
          + Create Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="category__empty gsap-reveal">
          <p>No posts yet in this category. Create the first one!</p>
        </div>
      ) : (
        <div className="category__grid">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="gsap-reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <ArticleCard post={post} showImage />
            </div>
          ))}
        </div>
      )}

      <div className="gsap-reveal">
        <PullQuote quote={quote} attribution={attribution} />
      </div>
    </div>
  );
}
