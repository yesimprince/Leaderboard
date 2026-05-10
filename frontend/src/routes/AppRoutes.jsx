import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LeaderboardPage from "../pages/LeaderboardPage";
import RegisterPage from "../pages/RegisterPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LeaderboardPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}