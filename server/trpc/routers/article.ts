import { z } from 'zod';

import { procedure, router } from '../trpc';
import { Article, WithLiked } from '~/server/models';

export default router({
	getLiked: procedure
		.input(z.void())
		.output(Article.array())
		.query(async ({ ctx }) => {
			return await ctx.prisma.article.findMany({
				where: {
					likedBy: {
						some: {
							id: ctx.session.user.id,
						},
					}
				},
			});
		}),
	getRecommended: procedure
		.input(z.object({
			text: z.string(),
		}))
		.output(Article.merge(WithLiked).array())
		.query(async ({ ctx }) => {
			const articles = await ctx.prisma.article.findMany({
				include: {
					likedBy: {
						where: {
							id: ctx.session.user.id,
						},
					},
				}
			});

			for (const article of articles) {
				article.liked = article.likedBy.length > 0;
				article.likedBy = undefined;
			}

			return articles;
		}),
	get: procedure
		.input(z.object({
			id: z.number().int()
		}))
		.output(Article.merge(WithLiked))
		.query(async ({ ctx, input }) => {
			const article = await ctx.prisma.article.findUnique({
				where: {
					id: input.id,
				},
				include: {
					likedBy: {
						where: {
							id: ctx.session.user.id,
						},
					},
				},
			});

			if (!article) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}

			article.liked = article.likedBy.length > 0;
			article.likedBy = undefined;

			return article;
		}),
	like: procedure
		.input(z.object({
			id: z.number().int()
		}))
		.output(z.void())
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.article.update({
				where: {
					id: input.id,
				},
				data: {
					likedBy: {
						connect: {
							id: ctx.session.user.id,
						},
					},
				},
			});
		}),
	unlike: procedure
		.input(z.object({
			id: z.number().int()
		}))
		.output(z.void())
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.article.update({
				where: {
					id: input.id,
				},
				data: {
					likedBy: {
						disconnect: {
							id: ctx.session.user.id,
						},
					},
				},
			});
		}),
});
