import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { usePostStore } from "../store/usePostStore";

const navLinks = [
  { label: "Politics", path: "/politics" },
  { label: "Society", path: "/society" },
  { label: "Science", path: "/science" },
  { label: "The Archive", path: "/archive" },
  { label: "Letters", path: "/letters" },
  { label: "Gallery", path: "/gallery" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const openPostForm = usePostStore((s) => s.openPostForm);

  return (
    <header className="header">
      <div className="header__logo">
        <h1 className="header__title">
          Chronicle &amp; Archive
        </h1>
        <p className="header__subtitle">
          London &bull; New York &bull; The World &mdash; Est. 1894
        </p>
      </div>

      <div className="header__nav-wrap">
        <div className="header__nav-bar">
          <nav>
            <ul className="header__nav-links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button
              onClick={openPostForm}
              className="header__btn-post"
            >
              + Post
            </button>
            <button className="header__btn-icon">
              <Search size={18} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="header__btn-icon"
              style={{ display: undefined }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `header__mobile-link ${isActive ? "header__mobile-link--active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                openPostForm();
                setMobileOpen(false);
              }}
              className="header__mobile-post-btn"
            >
              + Post
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
