import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from '~/server/trpc/context';

const t = initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;

const isAuthenticated = middleware(opts => {
	if (!opts.ctx.session) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return opts.next({
		ctx: {
			session: opts.ctx.session,
		},
	});
});

export const procedure = t.procedure.use(isAuthenticated);
