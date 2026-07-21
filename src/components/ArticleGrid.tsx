import type { BlogPost } from "../types";
import { usePostStore } from "../store/usePostStore";

interface ArticleGridProps {
  sidebarTitle: string;
  sidebarItems: { label: string; volume: string }[];
  featuredPost: BlogPost;
  secondaryPosts: BlogPost[];
  adQuote?: string;
  adText?: string;
}

export default function ArticleGrid({
  sidebarTitle,
  sidebarItems,
  featuredPost,
  secondaryPosts,
  adQuote,
  adText,
}: ArticleGridProps) {
  const selectPost = usePostStore((s) => s.selectPost);

  return (
    <section className="article-grid">
      <hr className="article-grid__divider" />

      <div className="article-grid__layout">
        <aside className="article-grid__sidebar">
          <h4 className="article-grid__sidebar-title">
            {sidebarTitle}
          </h4>
          <ul className="article-grid__sidebar-list">
            {sidebarItems.map((item) => (
              <li key={item.volume} className="article-grid__sidebar-item">
                <p className="article-grid__sidebar-volume">
                  {item.volume}
                </p>
                <span className="article-grid__sidebar-link">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="article-grid__main">
          <h2
            className="article-grid__featured-title"
            onClick={() => selectPost(featuredPost)}
            style={{ cursor: "pointer" }}
          >
            {featuredPost.title}
          </h2>
          <p className="article-grid__featured-subtitle">
            {featuredPost.summary}
          </p>
          <hr className="article-grid__divider" />
          <p className="article-grid__body-text">
            {featuredPost.content.substring(0, 300)}...
          </p>
          <span
            className="article-grid__read-more"
            onClick={() => selectPost(featuredPost)}
            style={{ cursor: "pointer" }}
          >
            Continue Reading the Full Account
          </span>
        </div>
      </div>

      <hr className="article-grid__divider" />

      <div className="article-grid__cards">
        {secondaryPosts.slice(0, 3).map((post) => (
          <article
            key={post.id}
            className="card"
            onClick={() => selectPost(post)}
            style={{ cursor: "pointer" }}
          >
            {post.imageUrl && (
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
          </article>
        ))}
      </div>

      {adQuote && (
        <div className="article-grid__ad">
          <p className="article-grid__ad-quote">
            &ldquo;{adQuote}&rdquo;
          </p>
          {adText && (
            <p className="article-grid__ad-text">
              {adText}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
