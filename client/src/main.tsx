import ReactDOM from 'react-dom/client';
import App from './app';
import './global.css';
import AuthProvider, { AuthConsumer } from './context/auth-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<AuthProvider>
		<AuthConsumer>
			{(auth) => {
				const showSplash = !auth.isInitialized;
				if (showSplash) {
					return <div>Loading...</div>;
				} else {
					return <App />;
				}
			}}
		</AuthConsumer>
	</AuthProvider>
);
