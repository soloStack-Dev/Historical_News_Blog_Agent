import TheVault from "../components/TheVault";
import FeaturedPost from "../components/FeaturedPost";
import ArticleGrid from "../components/ArticleGrid";
import PullQuote from "../components/PullQuote";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { useAllPosts } from "../hooks/usePosts";

export default function HomePage() {
  const containerRef = useGsapReveal();
  const { data: allPosts = [] } = useAllPosts();

  const politicsPosts = allPosts.filter((p) => p.category === "politics");
  const sciencePosts = allPosts.filter((p) => p.category === "science");
  const societyPosts = allPosts.filter((p) => p.category === "society");

  const featuredPost = politicsPosts[0] || allPosts[0];
  const heroPost = sciencePosts[0];

  return (
    <div ref={containerRef} className="container" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexDirection: "row", flexWrap: "wrap" }}>
        <TheVault />

        <main style={{ flex: 1, minWidth: 0 }}>
          <div className="gsap-reveal">
            {heroPost && <FeaturedPost post={heroPost} />}
          </div>
        </main>
      </div>

      <div className="gsap-reveal">
        <ArticleGrid
          sidebarTitle="Bibliographic Index"
          sidebarItems={[
            { volume: "Vol. XLII - No. 12", label: "The Steam Engine Revolution" },
            { volume: "Vol. XXXIX - No. 04", label: "Arctic Explorations" },
            { volume: "Vol. XLV - No. 07", label: "Medieval Trade Routes" },
          ]}
          featuredPost={featuredPost || allPosts[0]}
          secondaryPosts={[...sciencePosts, ...societyPosts].slice(0, 3)}
        />
      </div>

      <div className="gsap-reveal">
        <PullQuote
          quote="The very ink with which all history is written is merely fluid prejudice."
          attribution="Mark Twain, 1902"
        />
      </div>
    </div>
  );
}
