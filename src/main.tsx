import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { DashboardOverview } from '@/pages/DashboardOverview'
import { DealingDashboard } from '@/pages/DealingDashboard'
import { MarketingDashboard } from '@/pages/MarketingDashboard'
import { BackOfficeDashboard } from '@/pages/BackOfficeDashboard'
import { TaskManagement } from '@/pages/TaskManagement'
import { ReportsPage } from '@/pages/ReportsPage'
import { LoginPage } from '@/pages/LoginPage'
import { HomePage } from '@/pages/HomePage'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/overview",
    element: <DashboardOverview />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/dealing",
    element: <DealingDashboard />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/marketing",
    element: <MarketingDashboard />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/backoffice",
    element: <BackOfficeDashboard />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/tasks",
    element: <TaskManagement />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/reports",
    element: <ReportsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)