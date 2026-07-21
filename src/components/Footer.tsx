import { Rss, Mail, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <h3 className="footer__brand-title">
            Chronicle &amp; Archive
          </h3>
          <p className="footer__brand-desc">
            A vintage newspaper-style digital publication preserving
            historical narratives for future generations.
          </p>
          <div className="footer__social">
            <a href="#" className="footer__social-link">
              <Rss size={20} />
            </a>
            <a href="#" className="footer__social-link">
              <Mail size={20} />
            </a>
            <a href="#" className="footer__social-link">
              <Globe size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer__section-title">
            Quick Links
          </h4>
          <ul className="footer__links">
            {["Archives", "Editorial Policy", "Bibliographic Index", "Contact Registrar"].map(
              (item) => (
                <li key={item}>
                  <Link to="#" className="footer__link">
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="footer__section-title">
            The Repository
          </h4>
          <p className="footer__desc">
            A curated collection of historical narratives, scholarly
            research, and editorial commentary spanning centuries of human
            civilization.
          </p>
          <p className="footer__copyright">
            &copy; 1894&ndash;2024 Chronicle &amp; Archive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
