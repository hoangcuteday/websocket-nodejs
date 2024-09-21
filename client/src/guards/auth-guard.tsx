import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
	children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
	const { children } = props;
	const [checked, setChecked] = useState<boolean>(false);
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			const searchParams = new URLSearchParams({
				returnTo: window.location.href
			}).toString();
			const href = '/login' + `?${searchParams}`;
			navigate(href);
		} else {
			setChecked(true);
		}
	}, [isAuthenticated]);

	if (!checked) return null;

	return <>{children}</>;
};

export default AuthGuard;
