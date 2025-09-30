import { DataTable } from '@/components/shared/DataTable';
import { User, UserStatus } from '../types/schema';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { UserService } from '@/services/UserService';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CreditCard, Shield, UserCheck, Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export const callTypes = new Map<UserStatus, string>([
	['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
	['inactive', 'bg-neutral-300/40 border-neutral-300'],
	['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
	['suspended', 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
]);

export const roles = [
	{
		label: 'Superadmin',
		value: 'superadmin',
		icon: Shield,
	},
	{
		label: 'Admin',
		value: 'admin',
		icon: UserCheck,
	},
	{
		label: 'Manager',
		value: 'manager',
		icon: Users,
	},
	{
		label: 'Cashier',
		value: 'cashier',
		icon: CreditCard,
	},
] as const;

const UserList = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const columns: ColumnDef<User>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label='Select all'
					className='translate-y-[2px]'
				/>
			),
			meta: {
				className: cn('sticky md:table-cell start-0 z-10 rounded-tl-[inherit]'),
			},
			cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' className='translate-y-[2px]' />,
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'firstName',
			header: 'First Name',
			cell: ({ row }) => {
				const { firstName, lastName } = row.original;
				const fullName = `${firstName} ${lastName}`;
				return <Label className='max-w-36'>{fullName}</Label>;
			},
			enableHiding: false,
			enableSorting: true,
		},
		{ accessorKey: 'username', header: 'Username', enableHiding: false, enableSorting: true },
		{ accessorKey: 'email', header: 'Email', enableHiding: true, enableSorting: true },
		{ accessorKey: 'mobile', header: 'Mobile', enableHiding: true, enableSorting: false },
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const { status } = row.original;
				const badgeColor = callTypes.get(status);
				return (
					<div className='flex space-x-2'>
						<Badge variant='outline' className={cn('capitalize', badgeColor)}>
							{row.getValue('status')}
						</Badge>
					</div>
				);
			},
			enableHiding: true,
			enableSorting: true,
		},
		{
			accessorKey: 'role',
			header: 'Role',
			cell: ({ row }) => {
				const { role } = row.original;
				const userType = roles.find(({ value }) => value === role);

				if (!userType) {
					return null;
				}

				return (
					<div className='flex items-center gap-x-2'>
						{userType.icon && <userType.icon size={16} className='text-muted-foreground' />}
						<span className='text-sm capitalize'>{row.getValue('role')}</span>
					</div>
				);
			},
			enableHiding: true,
			enableSorting: false,
		},
	];

	const { data: { items = [], pagination = { hasMore: false, page: 1, limit: 0, totalRecords: 0 } } = {}, isFetching } = useQuery({
		queryKey: ['users', { page, limit }],
		queryFn: () => UserService.getUsers(page, limit),
		refetchOnWindowFocus: false,
		enabled: true,
	});

	return (
		<div>
			<DataTable columns={columns} data={items} page={page} pageSize={limit} totalRows={pagination.totalRecords} onPageChange={setPage} onPageSizeChange={setLimit} />
		</div>
	);
};

export default UserList;
