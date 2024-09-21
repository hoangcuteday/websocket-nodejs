export interface UserAtrribute {
	id: number;
	name: string;
	password: string;
}

const users: { [key: number]: UserAtrribute } = {
	1: {
		id: 1,
		name: 'messi',
		password: '123456'
	},
	2: {
		id: 2,
		name: 'ronaldo',
		password: '123456'
	},
	3: {
		id: 3,
		name: 'tom',
		password: '123456'
	},
	4: {
		id: 4,
		name: 'jerry',
		password: '123456'
	}
};

export default users;
