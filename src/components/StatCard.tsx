import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Wallet, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface StatCardProps {
	title: string;
	value: string | number;
	change: {
		percentage: number;
		absolute: number;
	};
	icon?: LucideIcon;
	iconColor?: 'orange' | 'blue' | 'green' | 'purple' | 'red' | 'yellow';
	className?: string;
}

const iconColorMap = {
	orange: {
		bg: 'bg-orange-50 dark:bg-orange-950/20',
		text: 'text-orange-500 dark:text-orange-400',
		border: 'border-orange-100 dark:border-orange-900/20',
	},
	blue: {
		bg: 'bg-blue-50 dark:bg-blue-950/20',
		text: 'text-blue-500 dark:text-blue-400',
		border: 'border-blue-200 dark:border-blue-900/20',
	},
	green: {
		bg: 'bg-green-50 dark:bg-green-950/20',
		text: 'text-green-500 dark:text-green-400',
		border: 'border-green-100 dark:border-green-900/20',
	},
	purple: {
		bg: 'bg-purple-50 dark:bg-purple-950/20',
		text: 'text-purple-500 dark:text-purple-400',
		border: 'border-purple-100 dark:border-purple-900/20',
	},
	red: {
		bg: 'bg-red-50 dark:bg-red-950/20',
		text: 'text-red-500 dark:text-red-400',
		border: 'border-red-100 dark:border-red-900/20',
	},
	yellow: {
		bg: 'bg-yellow-50 dark:bg-yellow-950/20',
		text: 'text-yellow-500 dark:text-yellow-400',
		border: 'border-yellow-100 dark:border-yellow-900/20',
	},
};

export function StatCard({ title, value, change, icon: Icon = Wallet, iconColor = 'orange', className }: StatCardProps) {
	const isPositive = change.percentage >= 0;
	const colors = iconColorMap[iconColor];
	const formattedValue = typeof value === 'number' ? value.toLocaleString() : value;

	return (
		<Card className={cn('flex flex-col h-full w-full p-0 pb-4 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800', className)}>
			<CardHeader className='pb-0 flex flex-col items-start mb-2'>
				<span className='text-md font-medium text-gray-500 dark:text-gray-400'>{title}</span>
			</CardHeader>
			<CardContent className='flex items-center justify-between py-2 px-6'>
				<p className='text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight'>{formattedValue}</p>
				<Icon className={cn('size-10', colors.text)} strokeWidth={1.5} />
			</CardContent>
			<CardFooter className='pb-0'>
				<div className='flex items-center gap-2 text-md'>
					<Badge className={cn('text-sm font-medium border-blue-300 shadow-none', colors.bg, colors.text, colors.border)}>
						<span className='mr-0.5'>{isPositive ? '↑' : '↓'}</span>
						{Math.abs(change.percentage)}%
					</Badge>
					<span className='text-sm text-gray-600 dark:text-gray-400'>
						{isPositive ? '+' : ''}
						{change.absolute}
					</span>
				</div>
			</CardFooter>
		</Card>
	);
}
