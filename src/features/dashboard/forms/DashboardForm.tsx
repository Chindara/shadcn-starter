import { StatCard } from '@/components/StatCard';
import { CircleArrowLeft, CircleArrowRight, Clock, ClockArrowUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WidgetCard } from '@/components/WidgetCard';
import PageTitle from '@/components/PageTitle';

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
	{ month: 'July', desktop: 186, mobile: 80 },
	{ month: 'August', desktop: 305, mobile: 200 },
	{ month: 'September', desktop: 237, mobile: 120 },
	{ month: 'October', desktop: 73, mobile: 190 },
	{ month: 'November', desktop: 209, mobile: 130 },
	{ month: 'December', desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-2)',
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-4)',
	},
} satisfies ChartConfig;

const DashboardForm = () => {
	return (
		<div>
			<PageTitle title='Dashboard' subTitle='Overview of your application' />

			<div className='grid lg:grid-cols-4 gap-4 mb-4'>
				<StatCard title='Average check-in' value='10:33 AM' change={{ percentage: 10, absolute: 213 }} icon={CircleArrowRight} iconColor='blue' />
				<StatCard title='Average check-out' value='19:12 PM' change={{ percentage: 10, absolute: 213 }} icon={CircleArrowLeft} iconColor='green' />
				<StatCard title='Average hours' value='7h 17m' change={{ percentage: 10, absolute: 213 }} icon={ClockArrowUp} iconColor='orange' />
				<StatCard title='On-time arrival' value='98.56%' change={{ percentage: 10, absolute: 213 }} icon={Clock} iconColor='purple' />
			</div>
			<div className='grid lg:grid-cols-4 gap-4'>
				<div className='col-span-2'>
					<WidgetCard title='Revenue' count={chartData.reduce((acc, curr) => acc + curr.desktop + curr.mobile, 0)} unit='rupees'>
						<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
							<ResponsiveContainer width='100%' height='100%'>
								<BarChart accessibilityLayer data={chartData}>
									<CartesianGrid vertical={false} />
									<XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
									<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
									<Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
									<Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</WidgetCard>
				</div>
				<div className='col-span-2'>
					<WidgetCard title='Line Chart - Multiple' count={chartData.reduce((acc, curr) => acc + curr.desktop + curr.mobile, 0)} unit='kWh'>
						<ChartContainer config={chartConfig} className='w-full h-full [&_.recharts-responsive-container]:!h-full'>
							<ResponsiveContainer width='100%' height='100%'>
								<LineChart
									accessibilityLayer
									data={chartData}
									margin={{
										left: 12,
										right: 12,
									}}
								>
									<CartesianGrid vertical={false} />
									<XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
									<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
									<Line dataKey='desktop' type='monotone' stroke='var(--color-desktop)' strokeWidth={2} dot={false} />
									<Line dataKey='mobile' type='monotone' stroke='var(--color-mobile)' strokeWidth={2} dot={false} />
								</LineChart>
							</ResponsiveContainer>
						</ChartContainer>
					</WidgetCard>
				</div>
			</div>
		</div>
	);
};

export default DashboardForm;
