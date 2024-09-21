import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Link, useSearchParams } from 'react-router-dom';
import GuestAuth from '../../guards/guest-guard';
import Navbar from '../layout/navbar';

const Login = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const { login, logout } = useAuth();
	const [searchParams] = useSearchParams();
	const returnTo = searchParams.get('returnTo');
	const handleSubmit = () => {
		login(name, password);
		if (localStorage.getItem('user')) {
			// returnTo could be an absolute path
			window.location.href = returnTo || '/';
		}
	};

	return (
		<GuestAuth>
			<Navbar />
			<div className='m-auto min-h-[700px] flex items-center justify-center'>
				<div className='flex flex-col max-w-[400px] w-full justify-center items-center bg-blue-100 p-4 rounded gap-4'>
					<h1 className='text-3xl font-bold'>Login</h1>
					<div className='min-w-[300px] flex flex-col items-start gap-3'>
						<span className='text-xl font-medium'>Username:</span>
						<input
							className='outline-none px-4 py-2  border-[2px] border-[black] rounded w-full'
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}></input>
					</div>
					<div className='min-w-[300px] flex flex-col items-start gap-3'>
						<span className='text-xl font-medium'>Password:</span>
						<input
							type='password'
							className='outline-none px-4 py-2  border-[2px] border-[black] rounded w-full'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}></input>
					</div>
					<button
						className='bg-red-400 w-full rounded p-2 mt-3 text-xl font-medium'
						onClick={handleSubmit}>
						Login
					</button>
				</div>
			</div>
		</GuestAuth>
	);
};

export default Login;
