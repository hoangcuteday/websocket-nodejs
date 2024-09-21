import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';
import { useEffect } from 'react';
const App = () => {
	useEffect(() => {}, []);
	return (
		<BrowserRouter>
			<div className='flex flex-col h-full w-full'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
