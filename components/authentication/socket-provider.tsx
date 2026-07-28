'use client';

import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	ReactNode,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@clerk/nextjs';

interface SocketContextValue {
	socket: Socket | null;
	isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
	socket: null,
	isConnected: false,
});

export function SocketProvider({ children }: { children: ReactNode }) {
	const { getToken, isLoaded, isSignedIn } = useAuth();
	const [isConnected, setIsConnected] = useState(false);
	const socketRef = useRef<Socket | null>(null);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if (!isLoaded || !isSignedIn) return;
		// Already connected
		if (socketRef.current) return;

		let cancelled = false;

		async function connect() {
			const token = await getToken();
			if (cancelled) return;

			const s = io(process.env.NEXT_PUBLIC_WS_URL!, {
				auth: { token },
			});

			s.on('connect', () => setIsConnected(true));
			s.on('disconnect', () => setIsConnected(false));

			// Refresh the Clerk token on every reconnect attempt, since
			// session tokens are short-lived and the original one may
			// have expired by the time socket.io tries to reconnect.
			s.io.on('reconnect_attempt', async () => {
				const freshToken = await getToken();
				s.auth = { token: freshToken };
			});

			socketRef.current = s;
			setSocket(s);
		}

		connect();

		return () => {
			cancelled = true;
			socketRef.current?.disconnect();
			socketRef.current = null;
			setSocket(null);
			setIsConnected(false);
		};
	}, [isLoaded, isSignedIn, getToken]);

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	return useContext(SocketContext);
}
