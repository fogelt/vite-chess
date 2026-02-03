import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { paths } from '@/config/paths'

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppRoot />,
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        { path: paths.game.path, lazy: () => import('./routes/app/game').then(convert(queryClient)) },
        { path: paths.home.path, lazy: () => import('./routes/app/landing').then(convert(queryClient)) },
        { path: paths.register.path, lazy: () => import('./routes/app/register').then(convert(queryClient)) },
        {
          path: '/',
          element: <Navigate to={paths.home.path} replace />,
        }
      ],
    }
  ], { basename: '/vite-chess/' });

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};