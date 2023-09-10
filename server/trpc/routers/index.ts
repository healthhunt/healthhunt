
import { router } from '../trpc';

import article from './article';
import doctor from './doctor';
import user from './user';

export const appRouter = router({
	article,
	doctor,
	user,
});

export type AppRouter = typeof appRouter;
