import { lazy } from 'react';
import { Outlet } from 'react-router';
import Loadable from '@/components/Loadable';
import ErrorBoundary from './ErrorBoundary';
import GuestGuard from '@/utils/route-guard/GuestGuard';

const Login = Loadable(lazy(() => import('@/pages/Login')));

const LoginRoutes = {
	path: '/',
	errorElement: <ErrorBoundary />,
	children: [
		{
			path: '/',
			element: (
				<GuestGuard>
					<Outlet />
				</GuestGuard>
			),
			children: [
				{
					path: 'login',
					element: <Login />,
				},
			],
		},
	],
};

export default LoginRoutes;
