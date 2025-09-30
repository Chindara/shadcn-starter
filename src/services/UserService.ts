import { faker } from '@faker-js/faker';

const getUsers = (page: number, limit: number) => {
	const data = Array.from({ length: 500 }, () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		return {
			id: faker.string.uuid(),
			firstName,
			lastName,
			username: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
			email: faker.internet.email({ firstName }).toLocaleLowerCase(),
			mobile: faker.phone.number({ style: 'international' }),
			status: faker.helpers.arrayElement(['active', 'inactive', 'invited', 'suspended']),
			role: faker.helpers.arrayElement(['superadmin', 'admin', 'cashier', 'manager']),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
		};
	});

	const start = (page - 1) * limit;
	const end = start + limit;
	const paginatedData = data.slice(start, end);

	return {
		items: paginatedData,
		pagination: {
			hasMore: end < data.length,
			page,
			limit,
			totalRecords: data.length,
		},
	};
};

export const UserService = { getUsers };
