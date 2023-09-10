import fs from 'node:fs';

import { z } from 'zod';

import { procedure, router } from '../trpc';

const articles = JSON.parse(fs.readFileSync('./data/articles.json', 'utf-8'));

const Article = z.object({
	title: z.string(),
	description: z.string(),
	tags: z.string().array(),
	thumbnail: z.string(),
});

export const appRouter = router({
	hello: procedure
		.query(({ ctx }) => {
			return { session: ctx.session };
		}),
	getRecommendedArticles: procedure
		.input(z.object({
			text: z.string(),
		}))
		.output(Article.array())
		.query(async () => {
			// use input.text

			return articles;
		})
});

export type AppRouter = typeof appRouter;
