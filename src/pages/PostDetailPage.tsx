import { useParams, Link } from "react-router-dom";
import { usePostById } from "../hooks/usePosts";
import { useGsapReveal } from "../hooks/useGsapReveal";
import ReactMarkdown from "react-markdown";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const containerRef = useGsapReveal();
  const { data: post, isLoading, error } = usePostById(id || "");

  if (isLoading) {
    return (
      <div className="container container--narrow" style={{ paddingTop: "64px", paddingBottom: "64px", textAlign: "center" }}>
        <p className="loading-text">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container container--narrow" style={{ paddingTop: "64px", paddingBottom: "64px", textAlign: "center" }}>
        <p className="loading-text">Article not found.</p>
        <Link
          to="/"
          style={{ color: "#B8956A", textDecoration: "underline", marginTop: "16px", display: "inline-block", fontSize: "14px" }}
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="container container--narrow" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
      <div className="gsap-reveal">
        <Link to="/" className="post-detail__back">
          &larr; Back to Chronicle
        </Link>
      </div>

      <article>
        <div className="gsap-reveal">
          <p className="post-detail__meta">
            {post.category} | {post.readingTime} read
          </p>
          <h1 className="post-detail__title">
            {post.title}
          </h1>
          <p className="post-detail__byline">
            By {post.author} &bull; {post.date}
          </p>
          <hr className="post-detail__divider" />
        </div>

        {post.imageUrl && (
          <div className="gsap-reveal post-detail__image-wrap">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="post-detail__image"
            />
          </div>
        )}

        <div className="gsap-reveal post-detail__content">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3>{children}</h3>
              ),
              p: ({ children }) => (
                <p>{children}</p>
              ),
              ul: ({ children }) => (
                <ul>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol>{children}</ol>
              ),
              li: ({ children }) => (
                <li>{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote>{children}</blockquote>
              ),
              strong: ({ children }) => (
                <strong>{children}</strong>
              ),
              hr: () => <hr />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {post.tags.length > 0 && (
          <div className="post-detail__tags gsap-reveal">
            <p className="post-detail__tags-label">Tags</p>
            <div className="post-detail__tags-list">
              {post.tags.map((tag) => (
                <span key={tag} className="post-detail__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {post.isAiGenerated && (
          <div className="post-detail__ai-note gsap-reveal">
            <p>
              This article was generated with AI assistance using LangChain and OpenRouter.
              Content has been reviewed for historical accuracy.
            </p>
          </div>
        )}
      </article>
    </div>
  );
}
