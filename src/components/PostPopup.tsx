import { useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { usePostStore } from "../store/usePostStore";

export default function PostPopup() {
  const { selectedPost, selectPost } = usePostStore();
  const [summary, setSummary] = useState("");

  const summarizeMutation = useMutation({
    mutationFn: async () => {
      if (!selectedPost) throw new Error("No post selected");
      const { summarizePost } = await import("../lib/ai");
      return summarizePost(selectedPost.content, selectedPost.category);
    },
    onSuccess: (result) => {
      setSummary(result);
    },
    onError: (error: Error) => {
      setSummary(`**Error:** ${error.message}`);
    },
  });

  function handleClose() {
    selectPost(null);
    setSummary("");
    summarizeMutation.reset();
  }

  if (!selectedPost) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup__header">
          <h3 className="popup__title">{selectedPost.title}</h3>
          <button onClick={handleClose} className="popup__close">
            <X size={20} />
          </button>
        </div>

        <div className="popup__body">
          <div className="popup__image-col">
            {selectedPost.imageUrl ? (
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="popup__image"
              />
            ) : (
              <div className="popup__image-placeholder">No Image</div>
            )}
          </div>

          <div className="popup__content-col">
            <div className="popup__meta">
              <span className="popup__category">{selectedPost.category}</span>
              <span className="popup__date">{selectedPost.date}</span>
              <span className="popup__author">By {selectedPost.author}</span>
            </div>

            <div className="popup__text">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1>{children}</h1>,
                  h2: ({ children }) => <h2>{children}</h2>,
                  h3: ({ children }) => <h3>{children}</h3>,
                  p: ({ children }) => <p>{children}</p>,
                  ul: ({ children }) => <ul>{children}</ul>,
                  ol: ({ children }) => <ol>{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
                  strong: ({ children }) => <strong>{children}</strong>,
                  hr: () => <hr />,
                }}
              >
                {selectedPost.content.substring(0, 1500) + (selectedPost.content.length > 1500 ? "..." : "")}
              </ReactMarkdown>
            </div>

            <div className="popup__ai-section">
              <button
                onClick={() => summarizeMutation.mutate()}
                disabled={summarizeMutation.isPending}
                className="popup__summarize-btn"
              >
                {summarizeMutation.isPending ? (
                  <>
                    <span className="spinner" />
                    Summarizing...
                  </>
                ) : (
                  "Summarize with AI"
                )}
              </button>

              {summary && (
                <div className="popup__summary">
                  <h4 className="popup__summary-label">AI Summary</h4>
                  <div className="popup__summary-text">
                    <ReactMarkdown>{summary}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
