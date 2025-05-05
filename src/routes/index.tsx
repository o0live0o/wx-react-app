import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
// import Dashboard from '../pages/Dashboard'
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthenticatedTemplate>
        {children}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div >
          <h2>please login</h2>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
}
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
    path: "/result/:id",
    lazy: async () => {
      const { default: Result } = await import("../pages/ResultView");
      return { element: <Result /> };
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
          const { default: Category } = await import(
            "../pages/Category/Category"
          );
          return { element: <Category /> };
        },
      },
      {
        path: "category-add",
        lazy: async () => {
          const { default: CategoryAdd } = await import(
            "../pages/Category/CategoryAdd"
          );
          return {
            element: (
              <ProtectedRoute>
                <CategoryAdd />
              </ProtectedRoute>
            ),
          };
        },
      },
      {
        path: "category-detail/:id",
        lazy: async () => {
          const { default: CategoryDetail } = await import(
            "../pages/Category/CategoryDetail"
          );
          return { element: <CategoryDetail /> };
        },
      },
      {
        path: "products",
        lazy: async () => {
          const { default: Products } = await import(
            "../pages/Product/Products"
          );
          return { element: <Products /> };
        },
        children: [
          { index: true, element: <Navigate to="list" replace /> },
          {
            path: "list",
            lazy: async () => {
              const { default: ProductList } = await import(
                "../pages/Product/ProductList"
              );
              return { element: <ProductList /> };
            },
          },
          {
            path: "add",
            lazy: async () => {
              const { default: ProductAdd } = await import(
                "../pages/Product/ProductAdd"
              );
              return { element: <ProductAdd /> };
            },
          },
          {
            path: "detail/:id",
            lazy: async () => {
              const { default: ProductDetail } = await import(
                "../pages/Product/ProductDetail"
              );
              return { element: <ProductDetail /> };
            },
          },
        ],
      },
      {
        path: "*",
        element: <div>404 - Page Not Found.</div>,
      },
    ],
  },
]);
