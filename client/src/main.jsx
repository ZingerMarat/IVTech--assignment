import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

import { Provider } from "react-redux"
import { store } from "./store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
])

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
