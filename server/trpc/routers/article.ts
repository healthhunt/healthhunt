import 'dotenv/config';

import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import OpenAI from 'openai';

import { procedure, router } from '../trpc';
import { Article, WithLiked } from '~/server/models';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT = `I need you to select 3 of the following articles:

0. Navigating the Depths of Mental Health
1. Understanding Postpartum Depression
2. Mastering Stress: Your Guide to Effective Stress Management
3. The Importance of Preventive Care
4. Understanding Depression: Causes, Symptoms, and Treatment
5. Eating Disorders: Understanding and Coping
6. The Importance of Child Nutrition
7. Eating Disorders: Understanding and Coping
8. Understanding Cancer: Causes, Types, and Treatment

These should be based on the user's following query. Your response should only contain a JSON array of the relevant article numbers. Do not return any other text at all.`;

const cache = new Map();

export default router({
	getLiked: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/articles/liked',
				summary: 'Get liked articles',
				tags: ['Article'],
			},
		})
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
		.meta({
			openapi: {
				method: 'GET',
				path: '/articles/recommended',
				summary: 'Get recommended articles',
				tags: ['Article'],
			},
		})
		.input(z.object({
			text: z.string(),
		}))
		.output(Article.merge(WithLiked).array())
	// @ts-expect-error - we are overwriting the type here
		.query(async ({ ctx, input }) => {
			if (cache.has(input.text)) {
				return cache.get(input.text);
			}

			const completion = await openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content: PROMPT,
					},
					{
						role: 'user',
						content: input.text.slice(0, 1_000),
					}
				],
				n: 1,
			});

			let ids = [0, 1, 2];

			try {
				ids = JSON.parse(completion.choices[0].message.content);
			} catch {
				//
			}

			if (!Array.isArray(ids) || ids.length !== 3) {
				ids = [0, 1, 2];
			}

			const articles = await ctx.prisma.article.findMany({
				where: {
					id: {
						in: ids,
					},
				},
				include: {
					likedBy: {
						where: {
							id: ctx.session.user.id,
						},
					},
				},
			});

			for (const article of articles) {
				// @ts-expect-error - we are overwriting the type here
				article.liked = article.likedBy.length > 0;
				// @ts-expect-error - we are overwriting the type here
				article.likedBy = undefined;
			}

			cache.set(input.text, articles);

			return articles;
		}),
	get: procedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/articles/{id}',
				summary: 'Get article',
				tags: ['Article'],
			},
		})
		.input(z.object({
			id: z.number().int()
		}))
		.output(Article.merge(WithLiked))
	// @ts-expect-error - we are overwriting the type here
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

			// @ts-expect-error - we are overwriting the type here
			article.liked = article.likedBy.length > 0;
			// @ts-expect-error - we are overwriting the type here
			article.likedBy = undefined;

			return article;
		}),
	like: procedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/articles/{id}/like',
				summary: 'Like article',
				tags: ['Article'],
			},
		})
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
		.meta({
			openapi: {
				method: 'POST',
				path: '/articles/{id}/unlike',
				summary: 'Unlike article',
				tags: ['Article'],
			},
		})
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
