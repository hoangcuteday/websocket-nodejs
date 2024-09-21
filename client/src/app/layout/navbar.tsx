import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();

	const handleClicked = () => {
		if (isAuthenticated) {
			logout();
		}
	};

	return (
		<>
			<nav className='w-full px-10 py-2 bg-pink-200'>
				<div className='w-full flex justify-between items-cente'>
					<div className='bg-blue-200 p-2 rounded-lg'>
						<Link to='/' className='text-xl font-bold text-gray-500'>
							Message
						</Link>
					</div>
					<div className='bg-green-200 p-2 rounded-lg' onClick={handleClicked}>
						<Link to='/login' className='text-xl font-bold text-gray-500'>
							{isAuthenticated ? 'Logout' : 'Login'}
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
