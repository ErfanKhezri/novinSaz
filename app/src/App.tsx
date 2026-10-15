import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={null} />
      </Route>
    </Routes>
  );
}
