import { Routes, Route } from "react-router-dom";

import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<ItemsPage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
    </Routes>
  );
}

export default Router;
