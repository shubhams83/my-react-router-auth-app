import "./App.css";
import { useRoutes } from "react-router-dom";
import {
  Home,
  HomeContent,
  Login,
  Dashboard,
  Settings,
  RequireAuth,
} from "./components/global";
function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: <HomeContent />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: "/settings",
          element: (
            <RequireAuth>
              <Settings />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);
  return routes;
}

export default App;
