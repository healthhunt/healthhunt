import 'dotenv/config';

import { v4 as uuidv4 } from 'uuid';

import { NuxtAuthHandler } from '#auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '~/server/prisma';
import type { User } from 'next-auth';
import { createPassword } from '~/server/auth';

declare module 'next-auth' {
	interface User {
		id: number
	}

	interface Session {
		user: User
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: import('next-auth').User
	}
}

// NOTE: https://sidebase.io/nuxt-auth/getting-started
export default NuxtAuthHandler({
	pages: {
		signIn: '/login',
	},
	secret: process.env.SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user as User;
			}

			return token;
		},
		async session({ session, token }) {
			session.user = token.user;

			return session;
		},
	},
	providers: [
		(CredentialsProvider as unknown as { default: typeof CredentialsProvider }).default({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'medihacks' },
				password: { label: 'Password', type: 'password', placeholder: '●●●●●●●●' },
				register: { label: 'Register', type: 'text' },
			},
			async authorize(credentials) {
				if (!credentials || !credentials.username || !credentials.password) return null;

				if (credentials.register === 'true') {
					const salt = uuidv4();
					const hashedPassword = createPassword(credentials.password, salt);

					try {
						const newUser = await prisma.user.create({
							data: {
								username: credentials.username.toLowerCase(),
								password: hashedPassword,
								salt,
							},
						});
	
						return {
							id: newUser.id,
						};
					} catch {
						// User already exists
						return null;
					}
				} else {
					const user = await prisma.user.findFirst({
						where: {
							username: credentials.username.toLowerCase(),
						},
					});
	
					if (!user) {
						return null;
					}
	
					const hashedPassword = createPassword(credentials.password, user.salt);
	
					if (hashedPassword !== user.password) {
						return null;
					}
	
					return {
						id: user.id,
					};
				}
			},
		}),
	],
});
