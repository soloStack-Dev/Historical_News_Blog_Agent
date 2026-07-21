import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostForm from "./components/PostForm";
import PostPopup from "./components/PostPopup";
import PostDetailPage from "./pages/PostDetailPage";
import {
  PoliticsPage,
  SocietyPage,
  SciencePage,
  ArchivePage,
  LettersPage,
  GalleryPage,
} from "./pages/CategoryPages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/politics" replace />} />
              <Route path="/home" element={<Navigate to="/politics" replace />} />
              <Route path="/politics" element={<PoliticsPage />} />
              <Route path="/society" element={<SocietyPage />} />
              <Route path="/science" element={<SciencePage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/letters" element={<LettersPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
            </Routes>
          </main>
          <Footer />
          <PostForm />
          <PostPopup />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
