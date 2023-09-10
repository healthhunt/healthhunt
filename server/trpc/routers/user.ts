import { z } from 'zod';

import { procedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { checkPassword, createPassword } from '~/server/auth';
import { User } from '~/server/models';

export default router({
	me: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/profile',
				summary: 'Get current user',
				tags: ['User'],
			},
		})
		.input(z.void())
		.output(User)
		.query(async ({ ctx }) => {
			return await ctx.prisma.user.findFirstOrThrow({
				where: {
					id: ctx.session.user.id,
				},
				select: {
					id: true,
					username: true,
					profile: true,
				},
			});
		}),
	updateProfile: procedure
		.meta({
			openapi: {
				method: 'PATCH',
				path: '/profile',
				summary: 'Update profile',
				tags: ['User'],
			},
		})
		.input(z.object({
			data: z.string(),
		}))
		.output(z.void())
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.user.update({
				where: {
					id: ctx.session.user.id,
				},
				data: {
					profile: input.data,
				},
			});
		}),
	resetPassword: procedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/reset-password',
				summary: 'Reset password',
				tags: ['User'],
			},
		})
		.input(z.object({
			currentPassword: z.string(),
			newPassword: z.string(),
		}))
		.output(z.void())
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.findUnique({
				where: {
					id: ctx.session.user.id,
				}
			});

			if (!user) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}

			if (!checkPassword(input.currentPassword, user.password, user.salt)) {
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}

			const password = createPassword(input.newPassword, user.salt);

			await ctx.prisma.user.update({
				where: {
					id: ctx.session.user.id,
				},
				data: {
					password,
				},
			});
		})
});
