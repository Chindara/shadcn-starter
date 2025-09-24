interface PageTitleProps {
	title: string;
	subTitle: string;
}

const PageTitle = ({ title, subTitle }: PageTitleProps) => {
	return (
		<div className='flex justify-between items-center mb-4'>
			<div className='flex items-left flex-col'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<h6 className='text-sm text-muted-foreground'>{subTitle}</h6>
			</div>
		</div>
	);
};

export default PageTitle;
