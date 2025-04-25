import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import TshirtsPage from "./pages/TshirtsPage";
import FiguresPage from "./pages/FiguresPage";
import { Toaster } from "./components/ui/sonner";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="products/t-shirts" element={<TshirtsPage />} />
        <Route path="/products/figures" element={<FiguresPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
