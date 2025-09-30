import { Fragment, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getSortedRowModel, Row, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDebounce } from 'use-debounce';
import { Skeleton } from '../ui/skeleton';

type ReactTableProps<T> = {
	data: T[];
	columns: ColumnDef<T>[];
	page?: number;
	limit?: number;
	totalCount: number;
	onPageChange?: (page: number) => void;
	onLimitChange?: (limit: number) => void;
	isFetching: boolean;
	renderSubComponent: (props: { row: Row<T> }) => React.ReactElement;
	showCount: boolean;
};

export default function ReactTable<T>({
	data,
	columns,
	page,
	limit,
	totalCount,
	onPageChange,
	onLimitChange,
	isFetching,
	renderSubComponent,
	showCount = true,
}: ReactTableProps<T>) {
	const [debounceFetch] = useDebounce(isFetching, 1500);
	const [filter, setFilter] = useState('');

	const paginationEnabled = !!(page && limit && onPageChange && onLimitChange);

	// Convert 1-based page index to 0-based for internal use
	const pageIndex = (page ?? 1) - 1;

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: () => true,
		state: {
			pagination: { pageIndex: pageIndex, pageSize: limit ?? 10 },
			globalFilter: filter,
		},
		manualPagination: true,
		pageCount: limit && Math.ceil(totalCount / limit),
		onGlobalFilterChange: setFilter,
	});

	const handleFirstPage = () => {
		onPageChange?.(1); // First page is 1 externally
	};

	const handlePreviousPage = () => {
		if (!!page && page > 1) {
			onPageChange?.(page - 1);
		}
	};

	const handleNextPage = () => {
		if (!!page && !!limit && page < Math.ceil(totalCount / limit)) {
			onPageChange?.(page + 1);
		}
	};

	const handleLastPage = () => {
		onPageChange?.(Math.ceil(totalCount / (limit ?? 10))); // Last page externally
	};

	// Generate page numbers for pagination (using 1-based indexing)
	const generatePaginationButtons = () => {
		const totalPages = Math.ceil(totalCount / (limit ?? 10));
		if (totalPages <= 1) return [];

		const pages = [];
		const maxVisiblePages = 5;

		// Always show first page (page 1)
		pages.push(1);

		// Calculate start and end page indices (1-based)
		let startPage = Math.max(2, (page ?? 1) - Math.floor(maxVisiblePages / 2));
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		// Adjust if we're near the end
		if (endPage - startPage < maxVisiblePages - 1) {
			startPage = Math.max(2, endPage - maxVisiblePages + 1);
		}

		// Add ellipsis after first page if needed
		if (startPage > 2) {
			pages.push('ellipsis1');
		}

		// Add middle pages
		for (let i = startPage; i < endPage; i++) {
			pages.push(i);
		}

		// Add ellipsis before last page if needed
		if (endPage < totalPages) {
			pages.push('ellipsis2');
		}

		// Always show last page if there's more than one page
		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className='w-full p-4'>
			<Table>
				<TableHeader className='bg-[#fafafb] dark:bg-[#1f1f1f]'>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className='font-semibold text-slate-700 dark:text-gray-300'
									style={{
										width: header.column.getSize() !== 150 ? `${header.column.getSize()}px` : undefined,
									}}
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					<>
						{debounceFetch && (
							<>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header, i) => (
											<TableCell
												key={i}
												style={{
													width: header.column.getSize() !== 150 ? `${header.column.getSize()}px` : undefined,
												}}
											>
												<div className='space-y-4'>
													<Skeleton className='h-6 w-[250px] rounded-full' />
													<Skeleton className='h-6 w-[250px] rounded-full' />
													<Skeleton className='h-6 w-[250px] rounded-full' />
													<Skeleton className='h-6 w-[250px] rounded-full' />
													<Skeleton className='h-6 w-[250px] rounded-full' />
												</div>
											</TableCell>
										))}
									</TableRow>
								))}
							</>
						)}
					</>

					{!debounceFetch && (
						<>
							{table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => (
									<Fragment key={row.id}>
										<TableRow>
											{row.getVisibleCells().map((cell) => (
												<TableCell
													key={cell.id}
													className='text-gray-700 dark:text-gray-300'
													style={{
														width: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : undefined,
													}}
												>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
										{row.getIsExpanded() && (
											<TableRow>
												<TableCell colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</TableCell>
											</TableRow>
										)}
									</Fragment>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className='text-center py-4 text-gray-700 dark:text-gray-300'>
										No results found.
									</TableCell>
								</TableRow>
							)}
						</>
					)}
				</TableBody>
			</Table>

			<div className='flex justify-between items-center mt-4'>
				<div className='flex items-center gap-4'>
					{paginationEnabled && (
						<div className='flex items-center gap-2'>
							<span className='text-sm text-gray-500 dark:text-gray-300'>Rows per page:</span>
							<Select value={limit.toString()} onValueChange={(value) => onLimitChange && onLimitChange(parseInt(value))}>
								<SelectTrigger className='w-18 h-8'>
									<SelectValue placeholder={limit.toString()} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='10'>10</SelectItem>
									<SelectItem value='20'>20</SelectItem>
									<SelectItem value='50'>50</SelectItem>
									<SelectItem value='100'>100</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}

					{showCount && <span className='text-sm text-gray-500 dark:text-gray-300'>Total count: {totalCount}</span>}
				</div>

				{paginationEnabled && (
					<div className='flex items-center gap-1'>
						<Button size='icon' variant='ghost' onClick={handleFirstPage} disabled={page <= 1} className='h-8 w-8' aria-label='First page'>
							<ChevronsLeft className='h-4 w-4' />
						</Button>
						<Button size='icon' variant='ghost' onClick={handlePreviousPage} disabled={page <= 1} className='h-8 w-8' aria-label='Previous page'>
							<ChevronLeft className='h-4 w-4' />
						</Button>

						{generatePaginationButtons().map((pageNum, i) => {
							if (pageNum === 'ellipsis1' || pageNum === 'ellipsis2') {
								return (
									<span key={`ellipsis-${i}`} className='px-2'>
										...
									</span>
								);
							}

							return (
								<Button key={`page-${pageNum}`} variant={page === pageNum ? 'default' : 'outline'} onClick={() => onPageChange(pageNum as number)} className='h-8 w-8 mx-0.5'>
									{pageNum}
								</Button>
							);
						})}

						<Button size='icon' variant='ghost' onClick={handleNextPage} disabled={page >= Math.ceil(totalCount / limit)} className='h-8 w-8' aria-label='Next page'>
							<ChevronRight className='h-4 w-4' />
						</Button>
						<Button size='icon' variant='ghost' onClick={handleLastPage} disabled={page >= Math.ceil(totalCount / limit)} className='h-8 w-8' aria-label='Last page'>
							<ChevronsRight className='h-4 w-4' />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
