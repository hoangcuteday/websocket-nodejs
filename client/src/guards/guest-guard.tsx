import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
	children: ReactNode;
}

const GuestAuth: React.FC<AuthGuardProps> = (props) => {
	const { children } = props;
	const { isAuthenticated } = useAuth();
	const [checked, setChecked] = useState<boolean>(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		} else {
			setChecked(true);
		}
	}, []);

	if (!checked) {
		return null;
	}

	return <>{children}</>;
};

export default GuestAuth;
