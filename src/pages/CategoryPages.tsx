import CategoryPage from "./CategoryPage";
import ImageGrid from "../components/ImageGrid";

export function PoliticsPage() {
  return (
    <CategoryPage
      category="politics"
      description="Explore the political events, movements, and figures that shaped nations and continues to influence governance today."
      quote="Politics is the art of the possible, the attainable — the art of the next best."
      attribution="Otto von Bismarck, 1871"
    />
  );
}

export function SocietyPage() {
  return (
    <CategoryPage
      category="society"
      description="Discover the social movements, cultural shifts, and community stories that defined communities and changed lives."
      quote="Society is a masked ball, where every one hides his real character, and reveals it by hiding."
      attribution="Ralph Waldo Emerson, 1860"
    />
  );
}

export function SciencePage() {
  return (
    <CategoryPage
      category="science"
      description="Uncover the mysteries, discoveries, and scientific breakthroughs that expanded our understanding of the world."
      quote="Science is organized knowledge. Wisdom is organized life."
      attribution="Immanuel Kant, 1784"
    />
  );
}

export function ArchivePage() {
  return (
    <CategoryPage
      category="archive"
      description="Browse our complete collection of historical articles, from ancient civilizations to modern era events."
      quote="The past is never dead. It's not even past."
      attribution="William Faulkner, 1951"
    />
  );
}

export function LettersPage() {
  return (
    <CategoryPage
      category="letters"
      description="Read scholarly correspondence, editorial letters, and reader contributions to the Chronicle."
      quote="A letter always seemed to me like immortality because it is the mind alone without corporeal friend."
      attribution="Emily Dickinson, 1867"
    />
  );
}

export function GalleryPage() {
  return (
    <>
      <CategoryPage
        category="gallery"
        description="Visual archives featuring historical photographs, illustrations, and artwork from our collection."
        quote="A picture is a poem without words."
        attribution="Horace, 20 BC"
      />
      <div className="container" style={{ paddingBottom: "32px" }}>
        <ImageGrid />
      </div>
    </>
  );
}
