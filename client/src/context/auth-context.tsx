import React, { useEffect } from 'react';
import users, { UserAtrribute } from '../data/user';

interface State {
	isInitialized: boolean;
	isAuthenticated: boolean;
	user: UserAtrribute | null;
}

enum ActionType {
	INIT = 'INIT',
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT'
}

type LoginAction = {
	type: ActionType.LOGIN;
	payload: {
		user: UserAtrribute;
	};
};

type LogoutAction = {
	type: ActionType.LOGOUT;
};

type InitAction = {
	type: ActionType.INIT;
	payload: {
		isAuthenticated: boolean;
		user: UserAtrribute | null;
	};
};

type Action = LoginAction | LogoutAction | InitAction;

const initialState: State = {
	isInitialized: false,
	isAuthenticated: false,
	user: null
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.INIT:
			return {
				...state,
				isInitialized: true,
				isAuthenticated: action.payload.isAuthenticated,
				user: action.payload.user
			};
		case ActionType.LOGIN:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user
			};
		case ActionType.LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null
			};
		default:
			return state;
	}
};

interface AuthContextType extends State {
	login: (username: string, password: string) => void;
	logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
	...initialState,
	login: () => {},
	logout: () => {}
});

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
	const { children } = props;
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const initialize = () => {
		const user = localStorage.getItem('user');
		if (user) {
			const userObj = Object.values(users).find((a) => a.name === user);
			if (userObj) {
				dispatch({ type: ActionType.INIT, payload: { user: userObj, isAuthenticated: true } });
			} else {
				dispatch({ type: ActionType.INIT, payload: { user: null, isAuthenticated: false } });
				localStorage.removeItem('user');
			}
		} else {
			dispatch({ type: ActionType.INIT, payload: { user: null, isAuthenticated: false } });
		}
	};
	useEffect(() => {
		initialize();
	}, []);

	const login = (username: string, password: string) => {
		const user = Object.values(users).find(
			(user) => user.name === username && user.password === password
		);
		if (user) {
			localStorage.setItem('user', user.name);
			dispatch({ type: ActionType.LOGIN, payload: { user } });
		} else alert('Invalid username or password');
	};

	const logout = () => {
		localStorage.removeItem('user');
		dispatch({ type: ActionType.LOGOUT });
	};
	return (
		<>
			<AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
		</>
	);
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthProvider;
