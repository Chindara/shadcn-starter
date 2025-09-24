import { createBrowserRouter } from 'react-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

const router = createBrowserRouter([AuthRoutes, MainRoutes]);

export default router;
