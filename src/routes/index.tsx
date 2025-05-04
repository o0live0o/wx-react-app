import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
// import Dashboard from '../pages/Dashboard'

export const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    lazy: async () => {
      const { default: Home } = await import("../pages/Home");
      return { element: <Home /> };
    },
  },
  {
    path: "/backend",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/backend/dashboard" replace />,
      },
      {
        path: "dashboard",
        lazy: async () => {
          const { default: Dashboard } = await import("../pages/Dashboard");
          return { element: <Dashboard /> };
        },
      },
      {
        path: "category",
        lazy: async () => {
          const { default: Category } = await import("../pages/Category");
          return { element: <Category /> };
        },
      },
      {
        path: "category-add",
        lazy: async () => {
          const { default: CategoryAdd } = await import("../pages/CategoryAdd");
          return { element: <CategoryAdd /> };
        },
      },
      {
        path: "category-detail/:id",
        lazy: async () => {
          const { default: CategoryDetail } = await import(
            "../pages/CategoryDetail"
          );
          return { element: <CategoryDetail /> };
        },
      },
      {
        path: "users",
        lazy: async () => {
          const { default: Users } = await import("../pages/Users");
          return { element: <Users /> };
        },
      },
      {
        path: "products",
        lazy: async () => {
          const { default: Products } = await import("../pages/Products");
          return { element: <Products /> };
        },
        children: [
          { index: true, element: <Navigate to="list" replace /> },
          {
            path: "list",
            lazy: async () => {
              const { default: ProductList } = await import(
                "../pages/ProductList"
              );
              return { element: <ProductList /> };
            },
          },
          {
            path: "add",
            lazy: async () => {
              const { default: ProductAdd } = await import(
                "../pages/ProductAdd"
              );
              return { element: <ProductAdd /> };
            },
          },
        ],
      },
      {
        path: "orders",
        lazy: async () => {
          const { default: Orders } = await import("../pages/Orders");
          return { element: <Orders /> };
        },
      },
      {
        path: "*",
        element: <div>404 - Page Not Found.</div>,
      },
    ],
  },
]);
