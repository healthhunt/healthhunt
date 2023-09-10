import { inferAsyncReturnType } from '@trpc/server';
import { H3Event } from 'h3';

import { getServerSession } from '#auth';
import { prisma } from '../prisma';

export async function createContext(event: H3Event) {
	return {
		prisma,
		session: await getServerSession(event),
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
