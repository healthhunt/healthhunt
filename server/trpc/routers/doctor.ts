import { z } from 'zod';

import { procedure, router } from '../trpc';
import { Doctor } from '~/server/models';

export default router({
	list: procedure
		.input(z.object({
			distance: z.object({
				latitude: z.number(),
				longitude: z.number(),
				radius: z.number(),
			}).optional(),
			search: z.string().optional(),
			tags: z.string().array().optional(),
		}))
		.output(Doctor.array())
		.query(async ({ ctx, input }) => {
			const and = [];

			if (input.distance) {
				and.push({
					latitude: {
						gte: input.distance.latitude - input.distance.radius,
						lte: input.distance.latitude + input.distance.radius,
					},
					longitude: {
						gte: input.distance.longitude - input.distance.radius,
						lte: input.distance.longitude + input.distance.radius,
					},
				});
			}

			if (input.tags?.length) {
				and.push({
					tags: {
						hasSome: input.tags,
					},
				});
			}

			return await ctx.prisma.doctor.findMany({
				where: {
					OR: [
						{
							name: {
								contains: input.search,
							},
						},
						{
							description: {
								contains: input.search,
							},
						},
					],
					AND: and,
				}
			});
		})
});
