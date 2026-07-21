import { Calendar, Clock, BookOpen, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const vaultItems = [
  { icon: Calendar, label: "On This Day", active: true },
  { icon: Clock, label: "Recent Archives", active: false },
  { icon: BookOpen, label: "Manuscripts", active: false },
  { icon: Layers, label: "Curated Collections", active: false },
];

export default function TheVault() {
  return (
    <aside className="vault">
      <div className="vault__header">
        <h3 className="vault__title">
          The Vault
        </h3>
        <p className="vault__label">
          Historical Highlights
        </p>
      </div>

      <div className="vault__items">
        {vaultItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`vault__item ${item.active ? "vault__item--active" : ""}`}
            >
              <Icon size={16} className="vault__item-icon" />
              <span className="vault__item-label">{item.label}</span>
            </div>
          );
        })}
      </div>

      <blockquote className="vault__quote">
        <p>
          &ldquo;History is a gallery of pictures in which there are few
          originals and many copies.&rdquo;
        </p>
      </blockquote>

      <Link to="/archive" className="vault__cta">
        Explore Archives
      </Link>
    </aside>
  );
}
