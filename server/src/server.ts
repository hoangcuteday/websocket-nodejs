import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:5173'
	}
});

const users: {
	[key: number]: {
		id: string;
		username: string;
	};
} = {};

io.on('connection', (socket) => {
	console.log(`user connected: ${socket.id}`);
	socket.on('message', (msg) => {
		console.log(msg);
	});
	const { _id, username } = socket.handshake.auth;
	users[_id] = {
		id: socket.id,
		username
	};
	socket.on('private message', (data) => {
		const userReceiver = users[data.to].id;
		socket.to(userReceiver).emit('send private message', {
			content: data.content,
			from: _id
		});
	});
	socket.on('disconnect', () => {
		delete users[_id];
		console.log(`user disconnected: ${socket.id}`);
	});
});

httpServer.listen(3000, () => {
	console.log('Server is running on port 3000');
});
