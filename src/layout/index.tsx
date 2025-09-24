import { AppSidebar } from '@/layout/AppSidebar';
import { AppHeader } from '@/layout/AppHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';
import { AppFooter } from './AppFooter';

export default function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />

				<div className='flex flex-1 flex-col gap-4 px-8 py-4 overflow-y-auto'>
					<Outlet />
				</div>
				<AppFooter />
			</SidebarInset>
		</SidebarProvider>
	);
}
