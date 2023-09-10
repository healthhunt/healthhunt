import fs from 'node:fs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const articles = JSON.parse(fs.readFileSync('./data/articles/data.json', 'utf8'));

	for (const article of articles) {
		const description = fs.readFileSync(`./data/articles/${article.id}.html`, 'utf8');

		await prisma.article.upsert({
			where: {
				id: article.id,
			},
			create: {
				...article,
				description,
			},
			update: {
				...article,
				description,
			},
		});
	}
}

main();
