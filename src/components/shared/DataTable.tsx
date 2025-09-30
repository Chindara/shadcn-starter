import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, SortingState, VisibilityState } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown, Settings2 } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	page: number;
	pageSize: number;
	totalRows: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	onSortingChange?: (sorting: SortingState) => void; // for server-side sorting
	pageSizeOptions?: number[];
	loading?: boolean;
	className?: string;
	emptyMessage?: string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	page,
	pageSize,
	totalRows,
	onPageChange,
	onPageSizeChange,
	onSortingChange,
	pageSizeOptions = [10, 25, 50, 100],
	loading = false,
	className,
	emptyMessage = 'No results found.',
}: DataTableProps<TData, TValue>) {
	const pageCount = Math.ceil(totalRows / pageSize);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns: columns,
		pageCount,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualPagination: true,
		manualSorting: !!onSortingChange,
		onSortingChange: (updater) => {
			const next = updater instanceof Function ? updater(sorting) : updater;
			setSorting(next);
			onSortingChange?.(next);
		},
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			pagination: {
				pageIndex: page,
				pageSize,
			},
			sorting,
			columnVisibility,
		},
	});

	return (
		<div className={clsx('space-y-2', className)}>
			{/* 🔹 Toolbar (column visibility toggle) */}
			<div className='flex items-center justify-between'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm' className='ml-auto'>
							<Settings2 className='h-4 w-4' />
							Columns
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{table
							.getAllLeafColumns()
							.filter((col) => col.getCanHide())
							.map((column) => (
								<DropdownMenuCheckboxItem key={column.id} className='capitalize' checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
									{column.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* 🔹 Table */}
			<div className='rounded-md border overflow-x-auto'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<div
												className={clsx('flex items-center gap-2', header.column.getCanSort() && 'cursor-pointer select-none')}
												onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{header.column.getCanSort() && <ChevronsUpDown className='h-3.5 w-3.5 opacity-50' />}
											</div>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center text-muted-foreground'>
									Loading...
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center text-muted-foreground'>
									{emptyMessage}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* 🔹 Pagination */}
			<PaginationFooter page={page} pageSize={pageSize} pageCount={pageCount} pageSizeOptions={pageSizeOptions} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />
		</div>
	);
}

interface PaginationFooterProps {
	page: number;
	pageSize: number;
	pageCount: number;
	pageSizeOptions: number[];
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
}

function PaginationFooter({ page, pageSize, pageCount, pageSizeOptions, onPageChange, onPageSizeChange }: PaginationFooterProps) {
	return (
		<div className='flex items-center justify-between px-2'>
			<div className='flex items-center space-x-2'>
				<p className='text-sm font-medium'>Rows per page</p>
				<Select
					value={`${pageSize}`}
					onValueChange={(value) => {
						onPageSizeChange(Number(value));
						onPageChange(0);
					}}
				>
					<SelectTrigger className='h-8 w-[70px]'>
						<SelectValue placeholder={pageSize} />
					</SelectTrigger>
					<SelectContent side='top'>
						{pageSizeOptions.map((size) => (
							<SelectItem key={size} value={`${size}`}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className='flex items-center space-x-6 lg:space-x-8'>
				<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
					Page {page + 1} of {pageCount}
				</div>
				<div className='flex items-center space-x-2'>
					<PaginationButton onClick={() => onPageChange(0)} disabled={page === 0} label='First page'>
						<ChevronsLeft className='h-4 w-4' />
					</PaginationButton>
					<PaginationButton onClick={() => onPageChange(page - 1)} disabled={page === 0} label='Previous page'>
						<ChevronLeft className='h-4 w-4' />
					</PaginationButton>
					<PaginationButton onClick={() => onPageChange(page + 1)} disabled={page >= pageCount - 1} label='Next page'>
						<ChevronRight className='h-4 w-4' />
					</PaginationButton>
					<PaginationButton onClick={() => onPageChange(pageCount - 1)} disabled={page >= pageCount - 1} label='Last page'>
						<ChevronsRight className='h-4 w-4' />
					</PaginationButton>
				</div>
			</div>
		</div>
	);
}

function PaginationButton({ children, disabled, onClick, label }: { children: React.ReactNode; disabled: boolean; onClick: () => void; label: string }) {
	return (
		<Button variant='outline' className='h-8 w-8 p-0' onClick={onClick} disabled={disabled} aria-label={label} title={label}>
			{children}
		</Button>
	);
}
