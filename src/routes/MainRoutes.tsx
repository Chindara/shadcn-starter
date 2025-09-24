import { lazy } from 'react';
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout';
import ErrorBoundary from './ErrorBoundary';
import AuthGuard from '@/utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('@/pages/Dashboard')));

const MainRoutes = {
	path: '/',
	errorElement: <ErrorBoundary />,
	children: [
		{
			path: '/',
			element: (
				<AuthGuard>
					<MainLayout />
				</AuthGuard>
			),
			children: [
				{
					path: 'dashboard',
					element: <Dashboard />,
				},
			],
		},
	],
};

export default MainRoutes;
