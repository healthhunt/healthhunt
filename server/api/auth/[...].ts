import 'dotenv/config';

import { createHmac } from 'node:crypto';

import { NuxtAuthHandler } from '#auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '~/server/prisma';

declare module 'next-auth' {
	interface User {
		id: number
	}

	interface Session {
		user?: User
	}
}

function hashAndSalt(password: string, salt: string) {
	const hasher = createHmac('sha512', salt);

	hasher.update(password);

	return hasher.digest('hex');
}

export default NuxtAuthHandler({
	pages: {
		signIn: '/login',
	},
	secret: process.env.SECRET,
	callbacks: {
		jwt: async ({ token, user }) => {
			token.user = user;

			 return token;
		},
		session: async ({ session, token }) => {
			// @ts-expect-error - We know the types are correct on the other end
			session.user = token.user;

			return session;
		},
	},
	providers: [
		(CredentialsProvider as unknown as { default: typeof CredentialsProvider }).default({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'medihacks' },
				password: { label: 'Password', type: 'password', placeholder: '●●●●●●●●' }
			},
			async authorize(credentials) {
				if (!credentials || !credentials.username || !credentials.password) return null;

				const user = await prisma.user.findUnique({
					where: {
						username: credentials.username.toLowerCase(),
					},
				});

				if (!user) {
					return null;
				}

				const hashedPassword = hashAndSalt(credentials.password, user.salt);

				if (hashedPassword !== user.password) {
					return null;
				}

				return {
					id: user.id,
				};
			},
		}),
	],
});
