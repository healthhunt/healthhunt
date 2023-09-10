import { z } from 'zod';

export const Doctor = z.object({
	id: z.number().int(),
	name: z.string(),
	description: z.string(),
	location: z.string(),
	phone: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	stars: z.number().min(0).max(5),
	tags: z.string().array(),
});

export const Article = z.object({
	id: z.number().int(),
	title: z.string(),
	thumbnail: z.string(),
	tags: z.string().array(),
	description: z.string(),
});

export const User = z.object({
	id: z.number().int(),
	username: z.string(),
	profile: z.string().nullable(),
});

export const WithLiked = z.object({
	liked: z.boolean(),
});

export type Doctor = z.infer<typeof Doctor>;
export type Article = z.infer<typeof Article>;
export type User = z.infer<typeof User>;
