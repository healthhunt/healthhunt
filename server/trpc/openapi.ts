import { generateOpenApiDocument } from 'trpc-openapi';

import { appRouter } from '../appRouter';

export const openApiDocument = generateOpenApiDocument(appRouter, {
	title: 'HealthHunt API',
	version: '1.0.0',
	baseUrl: 'https://healthhunt.xyz/api',
	tags: ['User', 'Article', 'Doctor'],
});
