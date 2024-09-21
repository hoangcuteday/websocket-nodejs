import { useEffect, useState } from 'react';
import socket from '../../utils/socket';
import AuthGuard from '../../guards/auth-guard';
import Navbar from '../layout/navbar';
import { useAuth } from '../../hooks/use-auth';
import users from '../../data/user';

const Home = () => {
	const { user } = useAuth();
	const [value, setValue] = useState('');
	const [to, setTo] = useState(2);
	const [messages, setMessages] = useState<{ content: string; from: number; isSender: boolean }[]>(
		[]
	);

	useEffect(() => {
		socket.auth = {
			_id: user?.id,
			username: user?.name
		};

		socket.on('connect', () => {
			console.log('connected');
		});

		socket.on('send private message', (data) => {
			setMessages((prev) => [
				...prev,
				{
					...data,
					isSender: false
				}
			]);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const handleSend = () => {
		if (value !== '') {
			socket.emit('private message', {
				content: value,
				to: to
			});
			setMessages((prev) => [
				...prev,
				{
					content: value,
					from: 1,
					isSender: true
				}
			]);
			setValue('');
		}
	};

	return (
		<>
			<AuthGuard>
				<Navbar />
				<div className='flex justify-center items-center gap-10 p-40'>
					<div className='flex flex-col gap-5 p-20'>
						{Object.values(users).map((data, index) => {
							return (
								<div
									onClick={() => setTo(data.id)}
									key={index}
									className='cursor-pointer w-[200px] bg-gray-600 text-white font-medium rounded text-center'>
									<span>{data.name}</span>
								</div>
							);
						})}
					</div>
					<div className='flex flex-col justify-center items-center gap-10 w-full m-auto'>
						<span className='text-4xl font-bold'>
							Chat to{' '}
							{
								Object.values(users).find((data) => {
									return data.id === to;
								})?.name
							}
						</span>
						<div className='flex flex-col w-full min-h-[500px] max-h-[500px] overflow-y-scroll p-4 gap-2'>
							{messages.map((data, index) => (
								<div key={index} className={`${!data.isSender ? 'text-left' : 'text-right'}`}>
									<span className='px-2 py-1 rounded bg-blue-100 '>{data.content}</span>
								</div>
							))}
						</div>
						<div className='flex gap-4 w-full'>
							<input
								value={value}
								className='outline-none px-4 py-2 border-[2px] border-[black] rounded flex-1'
								onChange={(e) => setValue(e.target.value)}
							/>
							<button onClick={handleSend} className='px-4 py-2 bg-[red] rounded'>
								Send
							</button>
						</div>
					</div>
				</div>
			</AuthGuard>
		</>
	);
};

export default Home;
